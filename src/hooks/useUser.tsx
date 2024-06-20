import {RegisterUserCredentials, User} from '../types/user';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import {LOGIN_URL, REGISTER_URL, USER_URL} from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStorage from './useStorage';

type UserContextType = {
  isPending: boolean;
  user: User | null;
  editUser: (u: Partial<User>) => Promise<void>;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useStorage<User | null>("user-crendentials", null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function checkSavedBasicAuthCredentials() {
      const basicAuthCredentials = await AsyncStorage?.getItem(
        'basicAuthCredentials',
      );

      if (!basicAuthCredentials) {
        return;
      }

      return loginWithBasicAuth(basicAuthCredentials);
    }

    checkSavedBasicAuthCredentials().then((credentials) => {
      startTransition(() => {
        fetch(USER_URL, {
          method: "get",
          headers: {
            Authorization: `Basic ${credentials}`
          }
        })
        .then(response => response.json())
        .then(setUser)
        .catch(console.log)
      });
    });
  }, []);

  async function login(email: string, password: string) {
    // Credentials as Base64
    const basicAuthCredentials = btoa(`${email}:${password}`);

    return loginWithBasicAuth(basicAuthCredentials);
  }

  async function logout() {
    await AsyncStorage.removeItem('basicAuthCredentials');
    setIsLoggedIn(false);
    setUser(null);
  }

  async function loginWithBasicAuth(basicAuthCredentials: string): Promise<string> {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {Authorization: `Basic ${basicAuthCredentials}`},
    });

    if (response.ok) {
      await AsyncStorage?.setItem('basicAuthCredentials', basicAuthCredentials);
      setIsLoggedIn(true);
      return basicAuthCredentials;
    }

    console.log('Login failed. Wrong credentials!');
    return basicAuthCredentials;
  }

  const editUser = useCallback(async (updatedUser: Partial<User>) => {
    startTransition(() => {
      // TODO: send to backend and save updated user
      setUser(prevUserInformation => {
        if (prevUserInformation === null) {
          return null;
        }
        return {
          ...prevUserInformation,
          ...updatedUser,
        };
      });
    });
  }, []);

  const register = useCallback(async (userCredentials: RegisterUserCredentials) => {
    startTransition(() => {
      fetch(REGISTER_URL, {
        body: JSON.stringify(userCredentials),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => response.json())
      .then(async (response) => {
        await login(response.email, userCredentials.password)
        return {...response, password: userCredentials.password};
      })
      .then(setUser)
      .catch(error => console.log(error))
    })
  }, [])

  return (
    <UserContext.Provider
      value={{isPending, user: user, editUser, isLoggedIn, login, logout, register}}>
      {children}
    </UserContext.Provider>
  );
}

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
import {LOGIN_URL, REGISTER_URL} from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [user, setUser] = useState<User | null>(null);
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

    checkSavedBasicAuthCredentials();

    startTransition(() => {
      // TODO: fetch userdata
      // TODO: fetch data
      const userData = {
        id: '1',
        email: 'wal@test.de',
        firstName: 'Blauerwal',
        lastName: '24',
        username: 'blauerwal24',
      };
      setUser(userData);
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

  async function loginWithBasicAuth(basicAuthCredentials: string) {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {Authorization: `Basic ${basicAuthCredentials}`},
    });

    if (response.ok) {
      await AsyncStorage?.setItem('basicAuthCredentials', basicAuthCredentials);
      setIsLoggedIn(true);
      return;
    }

    console.log('Login failed. Wrong credentials!');
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
      // TODO: 1. Send Data to server mit Name, Email und Passwort 
      // TODO: 2. Login User with received credentials
      fetch(REGISTER_URL, {
        body: JSON.stringify(userCredentials),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => response.json())
      .then(response => login(response.email, userCredentials.password))
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

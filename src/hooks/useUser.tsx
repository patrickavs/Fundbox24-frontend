import {User} from '../types/user';
import {
  useTransition,
  useEffect,
  useContext,
  useState,
  createContext,
  useCallback,
  ReactNode,
} from 'react';
import {LOGIN_URL} from '../routes';

type UserContextType = {
  isPending: boolean;
  user: User | null;
  editUser: (u: Partial<User>) => Promise<void>;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
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
    const basicAuthHeader = btoa(`${email}:${password}`);

    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {Authorization: `Basic ${basicAuthHeader}`},
    });

    if (response.ok) {
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

  return (
    <UserContext.Provider
      value={{isPending, user: user, editUser, isLoggedIn, login}}>
      {children}
    </UserContext.Provider>
  );
}

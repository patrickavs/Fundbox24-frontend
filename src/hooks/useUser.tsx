import {User} from '../types/user';
import {
  useTransition,
  useEffect,
  useContext,
  useState,
  createContext, useCallback,
} from 'react';

type UserContextType = {
  isPending: boolean;
  user: User | null;
  editUser: (u: Partial<User>) => Promise<void>
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
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

    const editUser = useCallback(async (updatedUser: Partial<User>) => {
      startTransition(() => {
        // TODO: send to backend and save updated user
        setUser((prevUserInformation) => {
          if(prevUserInformation === null) {
            return null;
          }
            return {
                ...prevUserInformation,
                ...updatedUser
            }
        })
      })
    }, [])

  return (
    <UserContext.Provider value={{isPending, user: user, editUser}}>
      {children}
    </UserContext.Provider>
  );
}

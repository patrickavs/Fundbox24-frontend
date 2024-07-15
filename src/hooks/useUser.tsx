import { RegisterUserCredentials, User } from '../types/user';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import {
  LOGIN_URL,
  REGISTER_URL,
  USER_URL,
  ALL_USER_LOST_REPORTS_URL,
  ALL_USER_FOUND_REPORTS_URL,
} from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStorage from './useStorage';
import { LostReport } from '../types/report-lost.ts';
import { FoundReport } from '../types/report-found.ts';

type UserContextType = {
  isPending: boolean;
  user: User | null;
  editUser: (u: Partial<User>) => Promise<void>;
  refreshUser: () => void;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  getAllLostReports: () => void;
  getAllFoundReports: () => void;
  userLostReports: LostReport[];
  userFoundReports: FoundReport[];
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useStorage<User | null>('user-crendentials', null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [userLostReports, setUserLostReports] = useState<LostReport[]>([]);
  const [userFoundReports, setUserFoundReports] = useState<FoundReport[]>([]);

  const refreshUser = () => {
    checkSavedBasicAuthCredentials().then(credentials => {
      if (!credentials) {
        return;
      }
      startTransition(() => {
        fetch(USER_URL, {
          method: 'get',
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        })
          .then(response => response.json())
          .then(setUser)
          .catch(console.log);
      });
    });
  };

  useEffect(() => {
    checkSavedBasicAuthCredentials().then(credentials => {
      if (!credentials) {
        return;
      }
      startTransition(() => {
        fetch(USER_URL, {
          method: 'get',
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        })
          .then(response => response.json())
          .then(setUser)
          .catch(console.log);
      });
    });
  }, []);

  async function checkSavedBasicAuthCredentials() {
    const basicAuthCredentials = await AsyncStorage?.getItem(
      'basicAuthCredentials'
    );

    if (!basicAuthCredentials) {
      return;
    }

    return loginWithBasicAuth(basicAuthCredentials);
  }

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

  async function loginWithBasicAuth(
    basicAuthCredentials: string
  ): Promise<string> {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { Authorization: `Basic ${basicAuthCredentials}` },
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

  const register = useCallback(
    async (userCredentials: RegisterUserCredentials) => {
      startTransition(() => {
        fetch(REGISTER_URL, {
          method: 'POST',
          body: JSON.stringify(userCredentials),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(async response => {
            await login(response.email, userCredentials.password);
            return { ...response, password: userCredentials.password };
          })
          .then(setUser)
          .catch(error => console.log(error));
      });
    },
    []
  );

  async function getAllLostReports() {
    let lostReports: LostReport[] = [];
    startTransition(() => {
      AsyncStorage?.getItem('basicAuthCredentials').then(
        basicAuthCredentials => {
          if (!basicAuthCredentials) {
            throw 'No Basic Auth Credentials! Please login.';
          }

          fetch(ALL_USER_LOST_REPORTS_URL, {
            method: 'GET',
            headers: {
              Authorization: `Basic ${basicAuthCredentials}`,
            },
          })
            .then(async response => {
              if (response.status === 200) {
                lostReports = await response.json();
                setUserLostReports(lostReports);
              } else {
                throw Error('Error fetching lost reports!');
              }
            })
            .catch(fetchError => {
              console.log(fetchError);
            });
        }
      );
    });
  }

  async function getAllFoundReports() {
    let foundReports: FoundReport[] = [];
    startTransition(() => {
      AsyncStorage?.getItem('basicAuthCredentials').then(
        basicAuthCredentials => {
          if (!basicAuthCredentials) {
            throw 'No Basic Auth Credentials! Please login.';
          }

          fetch(ALL_USER_FOUND_REPORTS_URL, {
            method: 'GET',
            headers: {
              Authorization: `Basic ${basicAuthCredentials}`,
            },
          })
            .then(async response => {
              if (response.status === 200) {
                foundReports = await response.json();
                setUserFoundReports(foundReports);
              } else {
                throw Error('Error fetching found reports!');
              }
            })
            .catch(fetchError => {
              console.log(fetchError);
            });
        }
      );
    });

    return foundReports;
  }

  return (
    <UserContext.Provider
      value={{
        isPending,
        user: user,
        editUser,
        refreshUser,
        isLoggedIn,
        login,
        logout,
        register,
        getAllLostReports,
        getAllFoundReports,
        userLostReports,
        userFoundReports,
      }}>
      {children}
    </UserContext.Provider>
  );
}

import { User } from "../types/user";
import { useTransition, useEffect, useContext, useState, createContext } from "react";

type UserContextType = {
    isPending: boolean;
    user: User | null;
}

const UserContext = createContext<UserContextType>({ isPending: true, user: null });

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
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
                username: 'blauerwal24'
            }
            setUser(userData)
        })
    });

    return (
        <UserContext.Provider value={{ isPending, user: user }}>
            {children}
        </UserContext.Provider>
    )
}
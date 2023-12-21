import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { User } from "../types/auth-types";
import { getCurrentUser } from "../apis/auth";

interface IProps {
    children: ReactNode;
}

const AuthContext = createContext<{ user: User | null }>({
    user: null,
});

export function AuthProvider({ children }: IProps) {
    const [user, setUser] = useState<User | null>(null);

    const getUser = async () => {
        try {
            const res = await getCurrentUser();
            setUser(res.data);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

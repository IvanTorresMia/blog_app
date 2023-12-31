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

// knowing what we know now about using hooks and that they always render after
// a component has rendered the return function.
// We know that that is why our useEffect is not doing what we want it to do.
//
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
        <>
            {!!user && (
                <AuthContext.Provider value={{ user }}>
                    {children}
                </AuthContext.Provider>
            )}
        </>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

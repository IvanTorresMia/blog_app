import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { User } from "../types/auth-types";
import { getCurrentUser } from "../apis/auth";
import { useNavigate } from "react-router-dom";

interface IProps {
    children: ReactNode;
}

const AuthContext = createContext<{ user: User | null }>({
    user: null,
});

export function AuthProvider({ children }: IProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    const getUser = async () => {
        try {
            const res = await getCurrentUser();

            setUser(res.data);
        } catch (e) {
            const errorMessage = e as Error;
            if (errorMessage.message) {
                navigate("/sign-in");
            }
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

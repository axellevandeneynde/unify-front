import LoginBtn from "./login-btn";
import LogoutBtn from "./logout-btn";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Login = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    useEffect(() => {
        console.log(isAuthenticated);
    })
    if (isLoading) {
        return <div></div>
    }
    return <div className="login">
        <>
            <LogoutBtn></LogoutBtn>
            <p>{user?.name}</p>
        </>
        <LoginBtn></LoginBtn>
    </div>
};

export default Login;
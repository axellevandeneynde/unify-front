import { useAuth0 } from "@auth0/auth0-react";

const LoginBtn = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>
        <span className="material-icons">person</span>
        Log In
        </button>;
};

export default LoginBtn;
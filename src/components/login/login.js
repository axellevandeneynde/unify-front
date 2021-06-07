import LoginBtn from "./login-btn";
import LogoutBtn from "./logout-btn";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Login = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [userChecked, setUserChecked] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !userChecked) {
            checkUser()
        }
    })

    async function checkUser() {
        const accessToken = await getAccessTokenSilently();
        fetch(`${process.env.REACT_APP_UNIFY_BACK}/check-new-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(user),
        }).then(() => setUserChecked(true));
    }

    if (isLoading) {
        return <div></div>
    }
    return <div className="login" onClick={() => setMenuOpen(!menuOpen)}>
        {isAuthenticated &&
            <>
                <div className="login-name">
                    <img src={user?.picture} alt="profile"></img>
                    <p>{user?.given_name || user?.nickname}</p>
                </div>
                <div className={`login-menu ${menuOpen ? '' : 'hidden'}`}>
                    <LogoutBtn></LogoutBtn>
                </div>
            </>
        }
        {!isAuthenticated &&
            <LoginBtn></LoginBtn>
        }

    </div>
};


export default Login;
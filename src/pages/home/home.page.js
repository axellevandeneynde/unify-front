import Search from "../../components/search/search";
import Feed from "../../components/feed/feed";
import Schijnwerper from "../../components/schijnwerper/schijnwerper";
import Login from "../../components/login/login";
import { useEffect } from 'react';
import { navBackBtnAtom } from '../../components/navigation/store';
import { useSetRecoilState } from 'recoil';

function HomePage() {
    const setNavBackBtn = useSetRecoilState(navBackBtnAtom);
    useEffect(() => {
        setNavBackBtn(false);
    });

    return (
        <div className="home-page">
            <Search></Search>
            <Login></Login>
            <Schijnwerper></Schijnwerper>
            <Feed></Feed>
        </div>);
}

export default HomePage;
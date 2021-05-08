import Search from "../../components/search/search";
import Feed from "../../components/feed/feed";
import Schijnwerper from "../../components/schijnwerper/schijnwerper";
function HomePage() {
    return (
        <div className="home-page">
            <Search></Search>
            <Schijnwerper></Schijnwerper>
            <Feed></Feed>
        </div>);
}

export default HomePage;
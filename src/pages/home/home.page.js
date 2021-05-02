import Search from "../../components/search/search";
import Feed from "../../components/feed/feed";
function HomePage() {
    return (
        <div className="grid">
            <Search></Search>
            <Feed></Feed>
        </div>);
}

export default HomePage;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./home.module.css";
import GameCard from "../../components/GameCard";
import SearchGame from "./components/SearchGame";
import Sidebar from "../../components/Sidebar";

const API_KEY = "8bec836d4a3c4b2cb150e1d60bde20dd";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState(""); 
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (event) => {
        if (event.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    const fetchGames = async (reset = false) => {
        if (isLoading) return; 
        setIsLoading(true);

        try {
            const currentPage = reset ? 1 : page;
            const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}`;
            const response = await fetch(url);

            if (!response.ok) throw new Error("Errore nel caricamento dei dati");

            const json = await response.json();

            if (json.results.length === 0) {
                setHasMore(false);
                setIsLoading(false);
                return;
            }

            setGames((prev) => (reset ? json.results : [...prev, ...json.results]));
            setPage(currentPage + 1);
        } catch (error) {
            console.error("Errore nel fetching dei giochi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGames(true);
    }, []);

    return (
        <div className={styles.main}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>
            <section className={styles.content}>
                <div className={styles.games}>
                    <div>
                        <h1>New and Trending</h1>
                        <p className={styles.subtitle}>Based on player counts and release date</p>
                    </div>
                    <div className={styles.research}> 
                        <SearchGame/>
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={games.length}
                    next={fetchGames}
                    hasMore={hasMore}
                    loader={<p className={styles.loading}>Loading more games...</p>}
                    endMessage={<p className={styles.endMessage}>No more games to show.</p>}
                >
                    <div className={styles.gamesWrapper}>
                        {games.map((game) => <GameCard key={game.id} game={game} />)}
                    </div>
                </InfiniteScroll>
            </section>
        </div>
    );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; 
import styles from "./home.module.css";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

const API_KEY = "8bec836d4a3c4b2cb150e1d60bde20dd";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState(""); 
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const handleSearch = (event) => {
        if (event.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchQuery}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Errore nel caricamento dei dati");
                }
                const json = await response.json();
                setGames(json.results);
            } catch (error) {
                console.error("Errore nel fetching dei giochi:", error);
            }
        };

        fetchData();
    }, [searchQuery]);

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
                        <input 
                            type="search" 
                            name="search" 
                            placeholder="Search a game" 
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch} 
                        />
                    </div>
                </div>
                <div className={styles.gamesWrapper}>
                    {games.length > 0 ? (
                        games.map((game) => <GameCard key={game.id} game={game} />)
                    ) : (
                        <p className={styles.loading}>Loading games...</p>
                    )}
                </div>
            </section>
        </div>
    );
}

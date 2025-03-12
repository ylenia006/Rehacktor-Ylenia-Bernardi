import { useState, useEffect } from "react";
import styles from "./home.module.css";
import GameCard from "../../components/gameCard";
import Sidebar from "../../components/Sidebar";

const api_key = "8bec836d4a3c4b2cb150e1d60bde20dd";
const url = `https://api.rawg.io/api/games?key=${api_key}`;

export default function Home() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                        <input type="search" name="search" placeholder="Search a game" aria-label="Search" />
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

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from "../Home/Home.module.css";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

export default function Genre() {

    const [games, setGames] = useState([]);
    const { genre } = useParams();

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(`https://api.rawg.io/api/games?key=8bec836d4a3c4b2cb150e1d60bde20dd&genres=${genre}`);
            const json = await response.json();
            console.log(json.results);
            setGames(json.results);
        };
        fetchGenres();
    }, [genre]);

    const capitalizedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);

    return (
        <div className={styles.main}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>
            <section className={styles.content}>
                <div className={styles.games}>
                    <div>
                        <h1>{capitalizedGenre} Games</h1>
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

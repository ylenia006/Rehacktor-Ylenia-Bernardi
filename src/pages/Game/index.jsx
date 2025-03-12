import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from "../Home/Home.module.css";
import GameCard from "../../components/gameCard";
import Sidebar from "../../components/Sidebar";

export default function Game() {
    const [game, setGame] = useState();
    const { id } = useParams();

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(`https://api.rawg.io/api/games/${id}?key=8bec836d4a3c4b2cb150e1d60bde20dd`);
            const json = await response.json();
            setGame(json); 
        };
        fetchGenres();
    }, [id]);

    return (
        <div className={styles.main}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>
            <section className={styles.content}>
                <div className={styles.games}>
                    <div>
                        <h1>{game.name}</h1> 
                        <p className={styles.subtitle}>Based on player counts and release date</p>
                    </div>
                    <div className={styles.research}>
                        <input type="search" name="search" placeholder="Search a game" aria-label="Search" />
                    </div>
                </div>
            </section>
        </div>
    );
}

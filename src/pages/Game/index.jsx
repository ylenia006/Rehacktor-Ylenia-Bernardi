import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from "../Home/Home.module.css";
import GameCard from "../../components/gameCard";
import Sidebar from "../../components/Sidebar";

export default function Platform() {
    const [games, setGames] = useState([]);
    const [platformId, setPlatformId] = useState(null); // Per memorizzare l'ID della piattaforma
    const { platform } = useParams(); // Ottieni il parametro platform dall'URL

    useEffect(() => {
        // Funzione per ottenere l'ID della piattaforma
        const fetchPlatformId = async () => {
            const response = await fetch(`https://api.rawg.io/api/platforms`);
            const json = await response.json();
            // Trova l'ID della piattaforma corrispondente al nome
            const platformData = json.results.find(p => p.slug === platform);
            if (platformData) {
                setPlatformId(platformData.id); // Imposta l'ID della piattaforma nello stato
            } else {
                console.log('Piattaforma non trovata');
            }
        };

        fetchPlatformId();
    }, [platform]); // Effettua il fetch quando il parametro 'platform' cambia

    useEffect(() => {
        if (platformId) {
            // Una volta che abbiamo l'ID della piattaforma, recuperiamo i giochi per quella piattaforma
            const fetchGames = async () => {
                const response = await fetch(`https://api.rawg.io/api/games?key=8bec836d4a3c4b2cb150e1d60bde20dd&platforms=${platformId}`);
                const json = await response.json();
                setGames(json.results); // Imposta i giochi nello stato
            };

            fetchGames();
        }
    }, [platformId]); // Effettua il fetch dei giochi quando platformId cambia

    const capitalizedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);

    return (
        <div className={styles.main}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>
            <section className={styles.content}>
                <div className={styles.games}>
                    <div>
                        <h1>{capitalizedPlatform} Games</h1>
                        <p className={styles.subtitle}>Discover games available on this platform</p>
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

import { useNavigate } from "react-router";
import styles from "../pages/Home/home.module.css";
import { useState } from 'react';

export default function GameCard({ game }) {
    
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(true);

    const genres = game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A';
    const platforms = game.platforms ? game.platforms.map(plat => plat.platform.name).join(', ') : 'N/A';
    const released = game.released || 'N/A';
    const rating = game.rating || 'N/A';
    const metacritic = game.metacritic || 'N/A';

    return (
        <article onMouseEnter={() => setHidden(false)} onMouseLeave={() => setHidden(true)}  onClick={() => navigate(`/game/${game.id}/${game.name}`)}  className={styles.gameCard}>
            <img src={game.background_image} alt={game.name} className={styles.gameImage} />
            <div className={styles.gameContent}>
                <div className={styles.category}><a href={`/games/genre`} className={styles.genre}>{genres}</a></div>
                <h6 className={styles.gameTitle}>{game.name}</h6>
                <a className={styles.gameRead}><p>Read More...</p></a>
            </div>
        </article>
    );
}

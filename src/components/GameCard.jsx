import styles from "../pages/Home/Home.module.css";
import { useState } from 'react';

export default function GameCard({ game }) {
    const [hidden, setHidden] = useState(true);


    const genres = game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A';
    const platforms = game.platforms ? game.platforms.map(plat => plat.platform.name).join(', ') : 'N/A';
    const released = game.released || 'N/A';
    const rating = game.rating || 'N/A';
    const metacritic = game.metacritic || 'N/A';

    return (
        <article onMouseEnter={() => setHidden(false)} onMouseLeave={() => setHidden(true)} className={styles.gameCard}>
            <img src={game.background_image} alt={game.name} className={styles.gameImage} />
            <div className={styles.gameContent}>
                <div className={styles.category}>{genres}</div>
                <h6 className={styles.gameTitle}>{game.name}</h6>
                <a>
                    {hidden && <small>Read More...</small>}
                    {!hidden && 
                        <div> 
                            <div><strong>Platforms:</strong> {platforms}</div>
                            <div><strong>Released:</strong> {released}</div>
                            <div><strong>Rating:</strong> {rating}</div>
                            <div><strong>Metacritic Score:</strong> {metacritic}</div>
                        </div>
                    }
                </a>
            </div>
        </article>
    );
}

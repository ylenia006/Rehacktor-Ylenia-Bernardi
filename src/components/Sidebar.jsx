import { useState, useEffect } from "react";
import { GiConsoleController } from "react-icons/gi";
import { BsFillStarFill } from "react-icons/bs";
import styles from "../pages/Home/home.module.css";

const api_key = "8bec836d4a3c4b2cb150e1d60bde20dd";
const genresUrl = `https://api.rawg.io/api/genres?key=${api_key}`;
const platformsUrl = `https://api.rawg.io/api/platforms?key=${api_key}`;

export default function Sidebar() {
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(genresUrl);
            const data = await response.json();
            setGenres(data.results);
        };

        const fetchPlatforms = async () => {
            const response = await fetch(platformsUrl);
            const data = await response.json();
            setPlatforms(data.results);
        };

        fetchGenres();
        fetchPlatforms();
    }, []);

    return (
        <div>
            <div className={styles.sidebarSection}>
                <div className={styles.drop}>
                    <BsFillStarFill />
                    <h5 className={styles.section}>Genres</h5>
                </div>
                <ul className={styles.list}>
                    {genres.map((genre) => (
                        <li key={genre.id} className={styles.item}>
                            <a href={`/games/${genre.slug}`} className={styles.links}>
                                {genre.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.sidebarSection}>
                <div className={styles.drop}>
                    <GiConsoleController />
                    <h5 className={styles.section}>Platforms</h5>
                </div>
                <ul className={styles.list}>
                    {platforms.map((platform) => (
                        <li key={platform.id} className={styles.item}>
                            <a href={`/platforms/${platform.slug}`} className={styles.links}>
                                {platform.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { GiConsoleController } from "react-icons/gi";
import { FaCode } from "react-icons/fa6";
import { BsFillStarFill } from "react-icons/bs";
import { RiFileCopyFill } from "react-icons/ri";
import styles from "../pages/Home/Home.module.css";

const api_key = "8bec836d4a3c4b2cb150e1d60bde20dd";
const genresUrl = `https://api.rawg.io/api/genres?key=${api_key}`;
const platformsUrl = `https://api.rawg.io/api/platforms?key=${api_key}`;
const publishersUrl = `https://api.rawg.io/api/publishers?key=${api_key}`;
const developersUrl = `https://api.rawg.io/api/developers?key=${api_key}`;

export default function Sidebar() {
    const [genres, setGenres] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [developers, setDevelopers] = useState([]);

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

        const fetchPublishers = async () => {
            const response = await fetch(publishersUrl);
            const data = await response.json();
            setPublishers(data.results);
        };

        const fetchDevelopers = async () => {
            const response = await fetch(developersUrl);
            const data = await response.json();
            setDevelopers(data.results);
        };

        fetchGenres();
        fetchPlatforms();
        fetchPublishers();
        fetchDevelopers();
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
                            <a href={`/games/${platform.slug}`} className={styles.links}>
                                {platform.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.sidebarSection}>
                <div className={styles.drop}>
                    <RiFileCopyFill />
                    <h5 className={styles.section}>Publishers</h5>
                </div>
                <ul className={styles.list}>
                    {publishers.map((publisher) => (
                        <li key={publisher.id} className={styles.item}>
                            <a href={`/games/${publisher.slug}`} className={styles.links}>
                                {publisher.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.sidebarSection}>
                <div className={styles.drop}>
                    <FaCode />
                    <h5 className={styles.section}>Developers</h5>
                </div>
                <ul className={styles.list}>
                    {developers.map((developer) => (
                        <li key={developer.id} className={styles.item}>
                            <a href={`/games/${developer.slug}`} className={styles.links}>
                                {developer.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

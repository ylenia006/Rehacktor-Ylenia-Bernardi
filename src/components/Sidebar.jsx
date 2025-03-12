import { useState, useEffect } from "react";
import { Link } from "react-router";

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
        }

        const fetchPlatforms = async () => {
            const response = await fetch(platformsUrl);
            const data = await response.json();
            setPlatforms(data.results);
        }

        const fetchPublishers = async () => {
            const response = await fetch(publishersUrl);
            const data = await response.json();
            setPublishers(data.results);
        }

        const fetchDevelopers = async () => {
            const response = await fetch(developersUrl);
            const data = await response.json();
            setDevelopers(data.results);
        }

        fetchGenres();
        fetchPlatforms();
        fetchPublishers();
        fetchDevelopers();
    }, []);

    return (
        <div>
            <details>
                <summary>
                    Genres
                </summary>
                <ul className={`${styles.scroll} list-none`}>
                    {genres.map((genre) => (
                        <li key={genre.id}>
                            <Link to={`/games/${genre.slug}`} className="contrast text-center">
                                {genre.name}
                            </Link>
                            <hr />
                        </li>
                    ))}
                </ul>
            </details>
            <details>
                <summary className="filters">
                    Platforms
                </summary>
                <ul className={`${styles.scroll} list-none`}>
                    {platforms.map((platform) => (
                        <li key={platform.id}>
                            <Link to={`/games/${platform.slug}`} className="contrast text-center">
                                {platform.name}
                            </Link>
                            <hr />
                        </li>
                    ))}
                </ul>
            </details>
            <details>
                <summary className="filters">
                    Publishers
                </summary>
                <ul className={`${styles.scroll} list-none`}>
                    {publishers.map((publisher) => (
                        <li key={publisher.id}>
                            <Link to={`/games/${publisher.slug}`} className="contrast text-center">
                                {publisher.name}
                            </Link>
                            <hr />
                        </li>
                    ))}
                </ul>
            </details>
            <details>
                <summary className="filters">
                    Developers
                </summary>
                <ul className={`${styles.scroll} list-none`}>
                    {developers.map((developer) => (
                        <li key={developer.id}>
                            <Link to={`/games/${developer.slug}`} className="contrast text-center">
                                {developer.name}
                            </Link>
                            <hr />
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    );
}
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from "../Home/Home.module.css";
import style from "./game.module.css";
import React from 'react';
import Sidebar from "../../components/Sidebar";

import { FaWindows, FaPlaystation, FaApple, FaAndroid, FaLinux, FaGlobe, FaXbox } from "react-icons/fa";
import { SiNintendo, SiAtari, SiSega, SiCommodore } from "react-icons/si";

const platformIcons = {
    pc: <FaWindows />,
    playstation5: <FaPlaystation />,
    playstation4: <FaPlaystation />,
    xbox: <FaXbox />,
    xbox_one: <FaXbox />,
    nintendo: <SiNintendo />,
    mac: <FaApple />,
    linux: <FaLinux />,
    android: <FaAndroid />,
    ios: <FaApple />,
    web: <FaGlobe />,
    atari: <SiAtari />,
    commodore_amiga: <SiCommodore />,
    sega: <SiSega />,
};

export default function Game() {
    const { id } = useParams();
    const [game, setGame] = useState(null); 
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/games/${id}?key=8bec836d4a3c4b2cb150e1d60bde20dd`);
                if (!response.ok) {
                    throw new Error("Errore nel recupero del gioco");
                }
                const json = await response.json();
                console.log("Dati del gioco:", json);
                setGame(json);

                const screenshotResponse = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=8bec836d4a3c4b2cb150e1d60bde20dd`);
                if (screenshotResponse.ok) {
                    const screenshotJson = await screenshotResponse.json();
                    setScreenshots(screenshotJson.results);
                }
            } catch (error) {
                console.error("Errore nel caricamento del gioco:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!game) {
        return <div>Caricamento...</div>;
    }

    return (
        <div className={styles.main}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>
            <section className={styles.content}>
                <div className={styles.games}>
                    <div></div>
                    <div className={styles.research}>
                        <input type="search" name="search" placeholder="Search a game" aria-label="Search" />
                    </div>
                </div>
                <div className={style.gameDetails}>
                    <div className={style.gameImageWrapper}>
                        <img src={game.background_image ?? "alt"} alt={game.name} className={style.gameImage} />
                        <div className={style.gameTitle}>{game.name}</div>
                    </div>
                    <h3 className={style.about}>About</h3>
                    <div className={style.gameAttributes}>
                        <div className={style.gameRightColumn}>
                            <div className={style.attribute}>
                                <p className={style.description}>{game.description_raw}</p>
                            </div>
                            <div className={style.attribute}>
                                <strong className={style.available}>Available on:</strong>
                                <div className={style.platforms}>
                                    {game.platforms?.map(({ platform }) => (
                                        <span key={platform.id} className={style.platformItem}>
                                            {platformIcons[platform.slug] || <FaXbox />} {platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={style.gameLeftColumn}>
                            <div className={style.screenshotsContainer}>
                                <div className={style.screenshotGrid}>
                                    {screenshots.map(screenshot => (
                                        <div key={screenshot.id} className={style.screenshotItem}>
                                            <img src={screenshot.image} alt="Screenshot" className={style.screenshotSmall} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={style.gameGenres}>
                                <strong className={style.available}>Genres:</strong>
                                <span>
                                    {game.genres?.map((genre, index) => (
                                        <React.Fragment key={index}>
                                            <a href={`/games/${genre.slug}`.toLowerCase().replace(/\s+/g, '-')} className={style.genreLink}>
                                                {genre.name}
                                            </a>
                                            {index < game.genres.length - 1 && ", "}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </div>


                            <div className={style.attribute}>
                                <strong className={style.available}>Released:</strong> 
                                <span className={style.description}>{game.released}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

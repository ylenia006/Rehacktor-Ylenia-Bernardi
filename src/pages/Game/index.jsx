import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from "../Home/Home.module.css";
import style from "./game.module.css";
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/games/${id}?key=8bec836d4a3c4b2cb150e1d60bde20dd`);
                if (!response.ok) {
                    throw new Error("Errore nel recupero del gioco");
                }
                const json = await response.json();
                console.log(json);
                setGame(json);
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
                        <img src={game.background_image} alt={game.name} className={style.gameImage} />
                        <div className={style.gameTitle}>{game.name}</div>
                    </div>
                    <h3 className={style.about}>About</h3>
                    <div className={style.gameAttributes}>
                        <div className={style.gameRightColumn}>
                            <div className={style.attribute}>
                                <p  className={style.description}>{game.description_raw}</p>
                            </div>
                            <div className={style.attribute}>
                                <strong>Genres:</strong>
                                <span>{game.genres.map(genre => genre.name).join(", ")}</span>
                            </div>
                            <div className={style.attribute}>
                                <strong>Released:</strong>
                                <span>{game.released}</span>
                            </div>
                        </div>
                        <div className={style.gameLeftColumn}>
                            
                        </div>
                    </div>
                    <div className={style.attribute}>
                        <strong>Available on:</strong>
                        <div className={style.platforms}>
                            {game.platforms.map(({ platform }) => (
                                <span key={platform.id} className={style.platformItem}>
                                    {platformIcons[platform.slug] || <FaXbox />} {platform.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

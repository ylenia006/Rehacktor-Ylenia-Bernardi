import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from '../Home/home.module.css';
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";
import InfiniteScroll from "react-infinite-scroll-component"; // Aggiunto InfiniteScroll

const API_KEY = "8bec836d4a3c4b2cb150e1d60bde20dd"; // Aggiungi la chiave API se necessaria

export default function Platforms() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1); // Stato per la paginazione
    const [hasMore, setHasMore] = useState(true); // Stato per determinare se ci sono altri giochi
    const [isLoading, setIsLoading] = useState(false); // Stato per il caricamento
    const { platform } = useParams();

    const platformIds = {
        "pc": 4,
        "playstation5": 187,
        "xbox-series-x": 186,
        "nintendo-switch": 7,
        "playstation4": 18,
        "xbox-one": 1,
        "ios": 3,
        "android": 21,
        "macos": 5,
        "linux": 6,
        "xbox-360": 14,
        "playstation3": 16,
        "playstation2": 15,
        "playstation1": 27,
        "ps-vita": 19,
        "psp": 17,
        "wii-u": 10,
        "wii": 11,
        "gamecube": 105,
        "nintendo64": 83,
        "game-boy-advance": 24,
        "game-boy-color": 43,
        "game-boy": 26,
        "snes": 79,
        "nes": 49,
        "macintosh": 55,
        "apple-ii": 41,
        "atari-7800": 46,
        "atari-5200": 28,
        "atari-2600": 31,
        "atari-flashback": 23,
        "atari-8-bit": 22,
        "atari-st": 25,
        "sega-master-system": 34,
        "sega-genesis": 33,
        "sega-cd": 35,
        "sega-32x": 36,
        "sega-saturn": 37,
        "sega-dreamcast": 38,
        "3do": 111,
        "jaguar": 112,
        "game-gear": 77,
        "neo-geo": 12
    };

    const fetchGames = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const platformId = platformIds[platform.toLowerCase()];
            if (!platformId) {
                console.error("Platform not found:", platform);
                return;
            }

            const url = `https://api.rawg.io/api/games?key=${API_KEY}&platforms=${platformId}&page=${page}`;
            const response = await fetch(url);
            const json = await response.json();

            if (json.results.length === 0) {
                setHasMore(false); 
            }

            setGames((prev) => [...prev, ...json.results]);
            setPage(page + 1); 
        } catch (error) {
            console.error("Errore nel fetching dei giochi:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGames(); 
    }, [platform]); 

    const capitalizedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);

    return (
        <div className={style.main}>
            <aside className={style.sidebar}>
                <Sidebar />
            </aside>
            <section className={style.content}>
                <div className={style.games}>
                    <div>
                        <h1>{capitalizedPlatform} Games</h1>
                        <p className={style.subtitle}>Based on player counts and release date</p>
                    </div>
                    <div className={style.research}>
                        <input type="search" name="search" placeholder="Search a game" aria-label="Search" />
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={games.length}
                    next={fetchGames}
                    hasMore={hasMore} 
                    endMessage={<p className={style.endMessage}>No more games to show.</p>}
                >
                    <div className={style.gamesWrapper}>
                        {games.length > 0 ? (
                            games.map((game) => <GameCard key={game.id} game={game} />)
                        ) : (
                            <p className={style.loading}>Loading games...</p>
                        )}
                    </div>
                </InfiniteScroll>
            </section>
        </div>
    );
}

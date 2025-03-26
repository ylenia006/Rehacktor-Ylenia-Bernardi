import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from '../Home/home.module.css';
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";
import InfiniteScroll from "react-infinite-scroll-component"; 

const API_KEY = "8bec836d4a3c4b2cb150e1d60bde20dd"; 

export default function Genre() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 
    const [isLoading, setIsLoading] = useState(false); 
    const { genre } = useParams();

    const fetchGenres = async () => {
        if (isLoading) return; 
        setIsLoading(true);

        try {
            const url = `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genre}&page=${page}`;
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
        fetchGenres();
    }, [genre]);

    const capitalizedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);

    return (
        <div className={style.main}>
            <aside className={style.sidebar}>
                <Sidebar />
            </aside>
            <section className={style.content}>
                <div className={style.games}>
                    <div>
                        <h1>{capitalizedGenre} Games</h1>
                        <p className={style.subtitle}>Based on player counts and release date</p>
                    </div>
                    <div className={style.research}>
                        <input type="search" name="search" placeholder="Search a game" aria-label="Search" />
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={games.length} 
                    next={fetchGenres} 
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

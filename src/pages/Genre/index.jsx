import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from '../Home/home.module.css';
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

export default function Genre() {

    const [games, setGames] = useState([]);
    const { genre } = useParams();

    useEffect(() => {
/*************  ✨ Codeium Command ⭐  *************/
/******  e66df9ec-ce42-4b07-808f-d74599d188a1  *******/
        const fetchGenres = async () => {
            const response = await fetch(`https://api.rawg.io/api/games?key=8bec836d4a3c4b2cb150e1d60bde20dd&genres=${genre}`);
            const json = await response.json();
            console.log(json.results);
            setGames(json.results);
        };
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
                <div className={style.gamesWrapper}>
                    {games.length > 0 ? (
                        games.map((game) => <GameCard key={game.id} game={game} />)
                    ) : (
                        <p className={style.loading}>Loading games...</p>
                    )}
                </div>
            </section>
        </div>
    );
}

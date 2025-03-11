import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import GameCard from "../../components/gameCard";

const api_key = "8bec836d4a3c4b2cb150e1d60bde20dd";
const url = `https://api.rawg.io/api/games?key=${api_key}`;

export default function Home() {

    const [games, setGames] = useState([]); 

    useEffect(() => { 
        const fetchData = async () => {
            const response = await fetch(url);
            const json = await response.json();
            setGames(json.results);
        }

        fetchData();
    }, []);

    return (
        <div className="container">
            <div className={styles.gamesWrapper}>
                {games.map((game) => (
                    <GameCard key={game.id} game={game}/>
                ))}
            </div>
        </div>
    );
    
}



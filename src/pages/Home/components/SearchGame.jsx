import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const API_KEY = "8bec836d4a3c4b2cb150e1d60bde20dd";

export default function SearchGame() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&dates=2019-01-01,2025-01-01&page_size=50`);
                if (!response.ok) throw new Error("Errore nel caricamento dei dati");

                const data = await response.json();
                setGames(data.results || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchGames();
    }, [query]);

    return (
        <div className="container">
            <h1 className="text-center">Stai cercando: {query}</h1>

            {error && <p className="error-message">{error}</p>}
            {loading && <Loading />}

            <div className={styles.gamesWrapper}>
                {games.length > 0 ? (
                    games.map((game) => <GameCard key={game.id} game={game} />)
                ) : (
                    <p className={styles.loading}>Loading games...</p>
                )}
            </div>
        </div>
    );
}

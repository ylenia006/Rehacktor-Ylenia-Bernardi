import { useEffect, useState, useContext } from "react";
import supabase from "../../../supabase/client";
import { toast } from "sonner";
import SessionContext from "../../../context/SessionContext";
import style from "../../Home/home.module.css";
import GameCard from "../../../components/GameCard";

export default function Favourites() {
    const session = useContext(SessionContext);
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user) return;

        const fetchFavourites = async () => {
            try {
                const { data, error } = await supabase
                    .from("favourites")
                    .select("game_id")
                    .eq("profile_id", session.user.id);

                if (error) throw error;

                const gameIds = data?.map(fav => fav.game_id) || [];
                if (gameIds.length === 0) {
                    setFavourites([]);
                    setLoading(false);
                    return;
                }
                
                fetchGameDetails(gameIds);
            } catch {
                toast.error("Errore nel recupero dei preferiti");
                setLoading(false);
            }
        };

        fetchFavourites();
    }, [session]);

    const fetchGameDetails = async (gameIds) => {
        try {
            const gamesData = await Promise.all(
                gameIds.map(async (id) => {
                    try {
                        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=8bec836d4a3c4b2cb150e1d60bde20dd`);
                        if (!response.ok) throw new Error();
                        return response.json();
                    } catch {
                        return null;
                    }
                })
            );
            setFavourites(gamesData.filter(game => game !== null));
        } catch {
            toast.error("Errore nel caricamento dei giochi preferiti");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className={style.title}>Giochi Preferiti</h3>
            <p className={style.subtitle}>Qui troverai tutti i giochi che hai aggiunto ai preferiti</p>
            <div className={style.gamesWrapper}>
                {loading ? (
                    <p className={style.loading}>Loading games...</p>
                ) : favourites.length > 0 ? (
                    favourites.map((game) => <GameCard key={game.id} game={game} />)
                ) : (
                    <p className={style.loading}>Nessun gioco nei preferiti</p>
                )}
            </div>
        </div>
    );
}
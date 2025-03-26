import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import styles from "../Home/home.module.css";
import style from "./game.module.css";
import React from 'react';
import { toast, Toaster } from 'sonner';
import supabase from '../../supabase/client';
import SessionContext from "../../context/SessionContext";
import SearchGame from "../Home/components/SearchGame";
import { FaStar, FaComments, FaHeart, FaHeartBroken } from 'react-icons/fa';
import Sidebar from "../../components/Sidebar";
import Modal from "../Game/components/ReviewModal.jsx";
import Chat from "../Game/components/Chat.jsx";
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
    const [searchQuery, setSearchQuery] = useState("");
    const session = useContext(SessionContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [showRating, setShowRating] = useState(false);
    const [userRating, setUserRating] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [review, setReview] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Aggiungi ai preferiti
    const addToFav = async (game) => {
        const { error } = await supabase
            .from('favourites')
            .insert([{ profile_id: session.user.id, game_id: game.id, game_name: game.name }])
            .select();

        if (error) {
            toast.error('Errore salvataggio Preferiti');
        } else {
            setIsFavorite(true);
            toast.success('Gioco aggiunto ai Preferiti!');
        }
    };

    // Rimuovi dai preferiti
    const removeFromFav = async (game) => {
        const { error } = await supabase
            .from('favourites')
            .delete()
            .eq('profile_id', session.user.id)
            .eq('game_id', game.id);

        if (error) {
            toast.error('Errore nel rimuovere il gioco dai Preferiti');
        } else {
            setIsFavorite(false);
            toast.success('Gioco rimosso dai Preferiti!');
        }
    };

    // Leggi preferiti
    const readFav = async () => {
        const { data: favourites, error } = await supabase
            .from('favourites')
            .select("*")
            .eq('profile_id', session.user.id)
            .eq('game_id', game.id);

        if (error) {
            toast.error('Errore nella lettura dei Preferiti');
        } else {
            setIsFavorite(favourites.length > 0);
        }
    };

    const submitRating = async (rating) => {
        const { error } = await supabase
            .from('ratings')
            .upsert([{
                profile_id: session.user.id,
                game_id: game.id,
                game_name: game.name,
                rating: rating
            }]);

        if (error) {
            console.error('Error:', error);
            toast.error('Errore nel salvataggio della valutazione');
        } else {
            setUserRating(rating);
            toast.success(`Hai valutato ${game.name} con ${rating} stelle!`);
        }
    };

    const handleFormSubmit = async ({ review_title, review_content }) => {
        console.log("Titolo: " + review_title);
        console.log("Contenuto: " + review_content);
        const { data, error } = await supabase
            .from("Comments")
            .insert([{
                profile_id: session.user.id,
                game_id: game.id,
                game_name: game.name,
                review_title: review_title,
                review_content: review_content,
            }])
            .select();

        if (error) {
            toast.error("Errore nell'inserimento della recensione");
        } else {
            setReview([...review, { ...data[0], profiles: { username: session.user.user_metadata.username } }]);
            toast.success("Recensione aggiunta!");
        }
    };

    // Recupero commenti
    const fetchComments = async () => {
        if (game) {
            try {
                const { data: reviews, error } = await supabase
                    .from("Comments")
                    .select("*, profiles(username)")
                    .eq("game_id", game.id);

                if (error) {
                    toast.error("Errore nel caricamento dei commenti");
                } else {
                    setReview(reviews);
                }
            } catch (error) {
                console.error("Errore nel caricamento dei commenti:", error);
            }
        }
    };

    // Recupero dati gioco
    const fetchGameData = async () => {
        try {
            const response = await fetch(`https://api.rawg.io/api/games/${id}?key=8bec836d4a3c4b2cb150e1d60bde20dd`);
            if (!response.ok) {
                throw new Error("Errore nel recupero del gioco");
            }
            const json = await response.json();
            setGame(json);

            const screenshotResponse = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=8bec836d4a3c4b2cb150e1d60bde20dd`);
            if (screenshotResponse.ok) {
                const screenshotJson = await screenshotResponse.json();
                setScreenshots(screenshotJson.results);
            }
        } catch (error) {
            toast.error("Errore nel caricamento del gioco");
        }
    };

    const fetchUserRating = async () => {
        const { data, error } = await supabase
            .from('ratings')
            .select('rating')
            .eq('profile_id', session.user.id)
            .eq('game_id', game.id)
            .single();

        if (!error && data) {
            setUserRating(data.rating);
        }
    };

    // Gestione ricerca gioco
    const handleSearch = (event) => {
        if (event.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    // Effettua il recupero dei dati del gioco e dei commenti
    useEffect(() => {
        fetchGameData();
    }, [id]);

    useEffect(() => {
        if (game) {
            readFav();
            fetchComments();
        }
    }, [game]);

    useEffect(() => {
        if (game) {
            fetchUserRating();
        }
    }, [game]);

    if (!game) {
        return <div>Caricamento...</div>;
    }

    return (
        <div className={styles.main}>
            <aside className={styles.sidebar}>
                <Sidebar />
            </aside>
            <section className={styles.content}>
                <Toaster position="top-center" />
                <div className={styles.games}>
                    <div></div>
                    <div className={styles.research}>
                        <SearchGame />
                    </div>
                </div>
                <div className={style.gameDetails}>
                    <div className={style.gameImageWrapper}>
                        <img src={game.background_image ?? "alt"} alt={game.name} className={style.gameImage} />
                        <div className={style.gameTitle}>{game.name}</div>
                    </div>
                    <div className={style.userActions}>
                        <h3 className={style.about}>About</h3>
                        {session && (
                            <>
                                {!isFavorite ? (
                                    <a className={style.IconsLink} onClick={() => addToFav(game)}><FaHeart /> Aggiungi ai Preferiti</a>
                                ) : (
                                    <a className={style.IconsLink} onClick={() => removeFromFav(game)}><FaHeartBroken />Rimuovi dai Preferiti</a>
                                )}
                                <a className={style.IconsLink} onClick={() => setIsModalOpen(true)}><FaComments /> Lascia un commento</a>
                                {!showRating ? (
                                    <a className={style.IconsLink} onClick={() => setShowRating(true)}><FaStar /> Vota</a>
                                ) : (
                                    <div className={style.Rating}>
                                        <div className={style.starRating}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`${userRating >= star ? style.filledStar : style.emptyStar} ${style.starIcon}`}
                                                    onClick={() => submitRating(star)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className={style.gameAttributes}>
                        <div className={style.gameRightColumn}>
                            <div className={style.attribute}>
                                <p className={style.description}>{game.description_raw}</p>
                            </div>
                            <div className={style.attribute}>
                                <strong className={style.available}>Disponibile su:</strong>
                                <div className={style.platforms}>
                                    {game.platforms?.map(({ platform }) => (
                                        <span key={platform.id} className={style.platformItem}>
                                            {platformIcons[platform.slug] || <FaXbox />} {platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <strong className={style.available}>Commenti su <u>{game.name}</u></strong>
                                <div className={style.commentsSection}>
                                    {review.length > 0 ? (
                                        review.map((rev) => (
                                            <div key={rev.id} className={style.commentBox}>
                                                <div className={style.commentContent}>
                                                    <h6>{rev.review_title}</h6>
                                                    <p>{rev.review_content}</p>
                                                    <p>{rev.profiles.username}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>Sii il primo a lasciare un commento!</div>
                                    )}
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
                                <strong className={style.available}>Generi:</strong>
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
                                <strong className={style.available}>Rilasciato:</strong>
                                <span className={style.description}>{game.released}</span>
                            </div>
                            <div className={style.attribute}>
                                <strong className={style.available}>Rating:</strong>
                                <span className={style.description}>{game.rating} / 5</span>
                            </div>
                            {session && (
                                <Chat game={game} session={session} />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal per commenti */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}

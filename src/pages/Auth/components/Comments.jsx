import { useEffect, useState, useContext } from "react";
import supabase from "@supabase/client";
import { toast } from "sonner";
import SessionContext from "@/../context/SessionContext";
import style from "@/Home/home.module.css";

export default function Comments() {
    const session = useContext(SessionContext);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user) return;

        const fetchComments = async () => {
            try {
                const { data, error } = await supabase
                    .from("Comments")
                    .select("id, created_at, review_title, review_content, game_id, game_name")
                    .eq("profile_id", session.user.id);

                if (error) {
                    toast.error("Errore nel caricamento dei commenti");
                } else {
                    setComments(data);
                }
            } catch (error) {
                console.error("Errore nel caricamento dei commenti:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [session]);

    return (
        <div>
            <h3 className={style.title}>I tuoi commenti</h3>
            <p className={style.subtitle}>Qui troverai tutti i commenti che hai lasciato sui giochi</p>
            <div>
                {loading ? (
                    <p className={style.loading}>Caricamento commenti...</p>
                ) : comments.length > 0 ? (
                    <div className={style.commentContainer}>
                        {comments.map((comment) => (
                            <div key={comment.id} className={style.commentCard}>
                                <h3 className={style.commentGameName}>{comment.game_name}</h3>
                                <h6 className={style.commentTitle}>{comment.review_title}</h6>
                                <p className={style.commentContent}>{comment.review_content}</p>
                                <p className={style.date}>{new Date(comment.created_at).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={style.loading}>Non hai ancora commentato nessun gioco</p>
                )}
            </div>
        </div>
    );
}

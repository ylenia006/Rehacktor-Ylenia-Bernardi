import supabase from '@/../supabase/client';
import style from "../game.module.css";
import { useEffect, useState, useRef } from "react";

export default function RealtimeChat({ game }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [error, setError] = useState("");
    const messageRef = useRef(null);
    const endOfMessagesRef = useRef(null);

    function scrollSmoothToBottom() {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    const getInitialMessages = async () => {
        setLoadingInitial(true);

        const { data, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", game.id)
            .order("created_at", { ascending: true });

        if (error) {
            setError(error.message);
        } else {
            setMessages(data);
        }
        setLoadingInitial(false);
    };

    useEffect(() => {
        getInitialMessages();
        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "messages" },
                (payload) => {
                    setMessages((prevMessages) => [...prevMessages, payload.new]);
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    if (loadingInitial) {
        return <div className={style.loading}>🌀 Caricamento...</div>;
    }

    return (
        <div className={style.messages} ref={messageRef}>
            {error && <article className={style.error}>{error}</article>}
            {messages.map((message) => (
                <article key={message.id} className={style.chat_message}>
                    <p className={style.chat_username}>{message.profile_username}</p>
                    <div className={style.message_container}>
                        <p className={style.message}>{message.content}</p>
                        <small className={style.timestamps}>{new Date(message.created_at).toLocaleTimeString()}</small>
                    </div>
                </article>
            ))}
            <div ref={endOfMessagesRef}></div>
        </div>
    );
}
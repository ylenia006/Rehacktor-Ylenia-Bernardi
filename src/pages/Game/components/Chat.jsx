import RealtimeChat from "./RealtimeChat";
import { toast } from 'sonner';
import { IoIosSend } from "react-icons/io";
import supabase from '../../../supabase/client';
import style from "../game.module.css";
export default function Chat({ game, session }) {
    async function handleMessageSubmit(event) {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));

        if (typeof message === "string" && message.trim().length !== 0) {
            const { data, error } = await supabase
                .from("messages")
                .insert([{
                    profile_id: session.user.id,
                    profile_username: session.user.user_metadata.username,
                    game_id: game.id,
                    content: message
                },
                ])
                .select();

            if (error) {
                toast.error('Errore nell\'invio del messaggio');
            } else {
                toast.success('Messaggio inviato!');
                inputMessage.reset();
                console.log(data, "risposta messaggio");
            }
        }
    }

    return (
        <>
            <div className='chat_game_container'>
                <div className='messages'>
                    <RealtimeChat game={game} />
                </div>
                <div className='message_form_wrapper'>
                    <form onSubmit={handleMessageSubmit}>
                        <fieldset role='group' className={style.typing}>
                            <input type="text" name='message' placeholder='Type Something...' />
                            <button type="submit" className={style.sendBtn}>
                                <IoIosSend />
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
}
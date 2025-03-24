import { useEffect, useState, useContext } from "react";
import supabase from "@/../supabase/client";
import Avatar from "./Avatar";
import SessionContext from "@/../context/SessionContext";
import styles from "../Signup.module.css";

export default function ProfileSettings() {
    const session = useContext(SessionContext)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        let ignore = false
        async function getProfile() {
            setLoading(true)
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select(`username, first_name, last_name, avatar_url`)
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username)
                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setAvatarUrl(data.avatar_url)
                }
            }

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    async function updateProfile(event, avatarUrl) {
        event.preventDefault()

        setLoading(true)
        const { user } = session
        let erroreUpdateProfilo = await supabase.from('profiles').update({ 'avatar_url': null }).eq('id', user.id)
        
        if (!erroreUpdateProfilo){
            throw erroreUpdateProfilo.message
        } 

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl)
        }
        setLoading(false)
    }

    return (
        <div>
            <h3 className={styles.title}>Impostazioni Profilo</h3>
            <p className={styles.subtitle}>Qui puoi modificare e aggiornare tutte le informazioni del tuo profilo</p>
            <div className={styles.mainPage}>
                <div className={styles.formBox}>
                    <form onSubmit={updateProfile} className={styles.form}>
                    <div className={styles.avatar}>
                            <Avatar
                                url={avatar_url}
                                size={150}
                                className={styles.profileAvatar}
                                onUpload={(event, url) => {
                                    updateProfile(event, url);
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input id="email" type="text" value={session.user.email} disabled className={styles.input} />
                        </div>
                        <div>
                            <label htmlFor="username" className={styles.label}>Username</label>
                            <input
                                id="username"
                                type="text"
                                required
                                value={username || ''}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div>
                            <label htmlFor="first_name" className={styles.label}>First Name</label>
                            <input
                                id="first_name"
                                type="text"
                                value={first_name || ''}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name" className={styles.label}>Last Name</label>
                            <input
                                id="last_name"
                                type="text"
                                value={last_name || ''}
                                onChange={(e) => setLastName(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div>
                            <button className={`${styles.profileButton} ${styles.primary}`} type="submit" disabled={loading}>
                                {loading ? 'Loading ...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

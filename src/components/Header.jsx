import { IoIosLogOut } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import { toast, Toaster } from 'sonner';
import { Link, useNavigate } from "react-router";
import styles from "../pages/Home/home.module.css";
import supabase from "../supabase/client";
import { FaUser } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export default function Header() {
    const navigate = useNavigate();
    const session = useContext(SessionContext);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [username, setUsername] = useState(null);

    const signOut = async () => {
        await supabase.auth.signOut();
        toast.success('Logout avvenuto con successo!');
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/");
    };

    useEffect(() => {
        let ignore = false;
        async function getProfile() {
            if (!session?.user) return;
            const { user } = session;
            
            const { data, error } = await supabase
                .from('profiles')
                .select('username, avatar_url')
                .eq('id', user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn("Errore nel recupero del profilo:", error);
                } else if (data) {
                    setUsername(data.username || user.email);

                    if (data.avatar_url) {
                        const { data: publicUrlData } = supabase
                            .storage
                            .from("avatars")
                            .getPublicUrl(data.avatar_url);

                        setAvatarUrl(publicUrlData.publicUrl);
                        console.log("Avatar URL:", publicUrlData.publicUrl);
                    }
                }
            }
        }

        getProfile();

        return () => {
            ignore = true;
        };
    }, [session]);

    return (
        <nav className={styles.headerNav}>
            <ul className={styles.navLeft}>
                <FaReact />
                <li>
                    <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                        <strong>Rehacktor</strong>
                    </Link>
                </li>
            </ul>
            <Toaster position="top-center" />
            <ul className={styles.navRight}>
                {session ? (
                    <details className={styles.dropdown}>
                        <summary className={styles.dropdownToggle}>
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className={styles.avatar}
                                    style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
                                />
                            ) : (
                                <FaUser style={{ marginRight: 8 }} />
                            )}
                            {username}
                        </summary>
                        <ul className={styles.dropdownMenu}>
                            <Link to="/account" className={styles.dropdownItem}>
                                <IoIosSettings /> Account
                            </Link>
                            <li onClick={signOut} className={styles.dropdownItem}>
                                <IoIosLogOut /> Logout
                            </li>
                        </ul>
                    </details>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className={styles.contrast}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className={styles.contrast}>
                                SignUp
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

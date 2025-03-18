import { IoIosLogOut } from "react-icons/io";
import { useContext } from "react";
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
    const username = session?.user?.user_metadata?.username || session?.user?.email || "User";

    const signOut = async () => {
        await supabase.auth.signOut();
        toast.success('Logout avvenuto con successo!');
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/");
    };

    return (
        <nav className={styles.headerNav}>
            <ul className={styles.navLeft}>
                <FaReact />
                <li>
                    <Link to="/" style={{ textDecoration: "none", color: "#fff"}}>
                        <strong>Rehacktor</strong>
                    </Link>
                </li>
            </ul>
            <Toaster position="top-center" />
            <ul className={styles.navRight}>
                {session ? (
                    <details className={styles.dropdown}>
                        <summary className={styles.dropdownToggle}>
                            <FaUser /> {username}
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

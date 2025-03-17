import { BiFontSize } from "react-icons/bi";
import { useEffect } from "react";
import { Outlet } from "react-router";
import styles from "../pages/Home/home.module.css";
import supabase from '../supabase/client';
import { IoIosLogOut } from "react-icons/io";

export default function Header() {

    const signOut = async() => {
        await supabase.auth.signOut();
    }

    useEffect(() => {
        const getInfo = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            console.log(user);
            const { data } = await supabase.auth.getSession();
            console.log(data);
        };
        getInfo();
    }, []);

    return (
        <nav>
            <ul>
                <li><strong>Rehacktor</strong></li>
            </ul>
            <ul>
                <li><a href="/login" className="contrast">Login</a></li>
                <li><a href="/register" className="contrast">SignUp</a></li>
                <li className={styles.logout} onClick={signOut}><a className={styles.logout} href=""><IoIosLogOut /></a></li>
            </ul>
        </nav>
    );
}

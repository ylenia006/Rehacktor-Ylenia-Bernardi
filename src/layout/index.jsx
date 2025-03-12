import { Outlet } from "react-router";
import Header from '../components/Header';
import styles from "./layout.module.css";

export default function Markup() {
    return (
        <div className={styles.container}>
            <Header className={styles.container}/>
            <Outlet className={styles.container}/>
        </div>
    );
}
import { Outlet } from "react-router";
import Header from '../components/Header';

export default function Markup() {
    return (
        <div className="container">
            <Header />
            <Outlet />
        </div>
    );
}
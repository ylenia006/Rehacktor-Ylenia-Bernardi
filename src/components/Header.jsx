import { BiFontSize } from "react-icons/bi";
import { Outlet } from "react-router";

export default function Header() {
    return (
        <nav>
            <ul>
                <li><strong>Rehacktor</strong></li>
            </ul>
            <ul>
                <li><a href="#" className="contrast">Login</a></li>
                <li><a href="#" className="contrast">Register</a></li>
            </ul>
        </nav>
    );
}
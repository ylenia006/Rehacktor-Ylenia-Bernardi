import styles from './Signup.module.css';  
import {toast, Toaster} from 'sonner';
import { useNavigate } from "react-router";
import supabase from '@/supabase/client';


export default function Login() {

    const navigate = useNavigate();

    const handleSignin = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const { user, email, password } = Object.fromEntries(new FormData(formRegister));
        let {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            toast.error('I campi inseriti non sono corretti.');
        } else {
            toast.success('Acesso eseguito con successo!');
            formRegister.reset();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/");
        }
        console.log(user,email,password);
    } 

    return (
        <div className={styles.main}>
            <div className={styles.formBox}>
                <form className={styles.form} onSubmit={handleSignin}>
                    <span className={styles.title}>Login</span>
                    <span className={styles.subtitle}>Please enter your credentials to access your account.</span>
                    <div className={styles.formContainer}>
                        <input type="email" name='email' required className={styles.input} placeholder="Email" />
                        <input type="password"  name='password' required className={styles.input} placeholder="Password" />
                    </div>
                    <button>Login</button>
                </form>
                <div className={styles.formSection}>
                    <p className={styles.account}>Don't have an account? <a href="/register">Sign Up</a></p>
                </div>
                <Toaster position="top-center"/>
            </div>
        </div>
    );
}
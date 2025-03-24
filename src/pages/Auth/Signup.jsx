import styles from './Signup.module.css';  
import {toast, Toaster} from 'sonner';
import { useNavigate } from "react-router";
import supabase from '@supabase/client';


export default function Signup() {

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const { firstname, lastname, username, email, password } = Object.fromEntries(new FormData(formRegister));
        let {error} = await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{
                    firstname,
                    lastname,
                    username
                }
            }
        });
        if (error) {
            toast.error('La tua registrazione NON è andata a buon fine!');
        } else {
            toast.success('La tua registrazione è andata a buon fine!');
            formRegister.reset();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            navigate("/");
        }
        console.log(username,email,password);
    } 

    return (
        <div className={styles.main}>
            <div className={styles.formBox}>
                <form className={styles.form} onSubmit={handleSignup}>
                    <span className={styles.title}>Sign up</span>
                    <span className={styles.subtitle}>Create a free account with your email.</span>
                    <div className={styles.formContainer}>
                        <input type="text" name='firstname' required className={styles.input} placeholder="First Name" />
                        <input type="text" name='lastname' required className={styles.input} placeholder="Last Name" />
                        <input type="text" name='username' required className={styles.input} placeholder="Username" />
                        <input type="email" name='email' required className={styles.input} placeholder="Email" />
                        <input type="password"  name='password' required className={styles.input} placeholder="Password" />
                    </div>
                    <button>Sign up</button>
                </form>
                <div className={styles.formSection}>
                    <p className={styles.account}>Have an account? <a href="/login">Log in</a></p>
                </div>
                <Toaster position="top-center"/>
            </div>
        </div>
    );
}
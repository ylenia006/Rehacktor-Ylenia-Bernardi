import styles from './Signup.module.css';   

export default function Signup() {
    return (
        <div className={styles.main}>
            <div className={styles.formBox}>
                <form className={styles.form}>
                    <span className={styles.title}>Sign up</span>
                    <span className={styles.subtitle}>Create a free account with your email.</span>
                    <div className={styles.formContainer}>
                        <input type="email" className={styles.input} placeholder="Email" />
                        <input type="password" className={styles.input} placeholder="Password" />
                    </div>
                    <button>Sign up</button>
                </form>
                <div className={styles.formSection}>
                    <p className={styles.account}>Have an account? <a href="">Log in</a></p>
                </div>
            </div>
        </div>
    );
}
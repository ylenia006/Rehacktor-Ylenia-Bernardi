import React, { useState } from 'react';
import Styles from "../components/ReviewModal.module.css";

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim() === "" || comment.trim() === "") {
            return;
        }
        onSubmit && onSubmit({ review_title: title, review_content: comment });
        onClose();
    };
    if (!isOpen) return null;

    return (
        <div className={Styles.modal}>
            <div className="container">
                <dialog open>
                    <form onSubmit={handleSubmit}>
                        <h2 className={Styles.title}>Lascia un commento</h2>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="review_title">Titolo</label>
                            <input
                                type="text"
                                id="review_title"
                                name="review_title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Inserisci il titolo"
                                className={Styles.input}
                            />
                        </div>
                        <div className={Styles.inputContainer}>
                            <label htmlFor="review_content">Commento</label>
                            <textarea
                                id="review_content"
                                name="review_content"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Scrivi il tuo commento..."
                                rows="6"
                                className={Styles.input}
                            />
                        </div>
                        <div className={Styles.buttonGroup}>
                            <button type="button" className={Styles.btnClose} onClick={onClose}>
                                Chiudi
                            </button>
                            <button type="submit" className={Styles.btnPublish}>
                                Invia
                            </button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default Modal;

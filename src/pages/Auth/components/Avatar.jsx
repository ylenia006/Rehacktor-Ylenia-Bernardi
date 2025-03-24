import { useEffect, useState } from "react";
import supabase from "@/supabase/client";    
import styles from "../Signup.module.css";

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    async function uploadAvatar(event) {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(event, filePath)
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className={styles.avatarContainer}>
            <div className={styles.avatarWrapper} style={{ height: size, width: size }}>
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className={styles.avatarImage}
                        style={{ height: size, width: size }}
                    />
                ) : (
                    <div className={styles.noImage} style={{ height: size, width: size }} />
                )}
            </div>
            <label htmlFor="single" className={styles.uploadButton}>
                {uploading ? "Caricamento..." : "Cambia avatar"}
            </label>
            <input
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className={styles.hiddenInput}
            />
        </div>
    )
}
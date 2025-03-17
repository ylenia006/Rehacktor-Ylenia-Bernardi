import React, { createContext, useState, useEffect } from 'react';
import supabase from "../supabase/client";

export const SessionContext = createContext(null);

export default function SessionContextProvider({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null);
                } else if (session) {
                    setSession(session);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []); 

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}

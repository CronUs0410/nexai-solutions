"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext({
  user: null,
  role: null,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
          const fetchRoleWithRetry = async (retries = 3) => {
            while(retries > 0) {
              try {
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                if (userDoc.exists()) {
                  setRole(userDoc.data().role);
                } else {
                  setRole("user"); // default
                }
                return; // success
              } catch (error) {
                console.warn(`Firestore Error (Retries left: ${retries - 1}):`, error.message);
                
                // If network/offline error, maybe use default for now without throwing breaking error
                if (error.code === 'unavailable' || error.message.includes("offline")) {
                  console.warn("Client offline. Retrying in 2s...");
                  await new Promise(res => setTimeout(res, 2000));
                  retries--;
                } else {
                  // E.g. "Database '(default)' not found" or permission denied.
                  console.error("Database configuration issue or unrecoverable error:", error);
                  setRole("user");
                  return;
                }
              }
            }
            // Fallback after all retries fail
            setRole("user");
          };

          await fetchRoleWithRetry();
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

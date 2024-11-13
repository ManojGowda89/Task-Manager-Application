
import React, { createContext, useContext, useEffect } from "react";
import { Signup, Login, GoogleAuth, LogOut, changes,sendPasswordReset } from "./authService";
import { validateToken,createTask,getTasksByEmail ,updateTaskById,deleteTaskById} from "./apis";
const FirestoreContext = createContext(null);

export function useFirestore() {
  const contextValue = useContext(FirestoreContext);
  if (!contextValue) {
    throw new Error("useFirestore must be used within a FirestoreProvider");
  }
  return contextValue;
}

export function FirestoreProvider({ children }) {
  const [user, setUser] = React.useState(localStorage?.getItem("checked")||false);
  useEffect(() => {
    async function checkUserState(token) {
      changes.onAuthStateChanged(changes.auth, async (result) => {
        if (result?.email) {
          setUser(true);
          localStorage.setItem("checked",true)
          localStorage.setItem("email", result.email);
        }
      });
    }

    const token = localStorage?.getItem("token");
    checkUserState(token);
    if (!token) {
      LogOut();
      return;
    }
  }, []);
  return (
    <FirestoreContext.Provider
      value={{ Signup, Login, GoogleAuth, LogOut, user,createTask ,getTasksByEmail,deleteTaskById,updateTaskById,sendPasswordReset}}
    >
      {children}
    </FirestoreContext.Provider>
  );
}

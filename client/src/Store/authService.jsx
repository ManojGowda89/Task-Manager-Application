
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import {userValidation} from "./apis.jsx"
import { CommitSharp } from "@mui/icons-material";
import { toast } from 'react-toastify';

export async function Signup(email, password,name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      return await Login(email, password,name);
    }
  } catch (error) {
    
    toast.info(`Please fill all fields.
      This email is already in use or login.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
   
  }
}

export async function Login(email, password,name) {
  console.log(email);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if(user){
      const result = await userValidation(email,password,name)
      return result;
    }
  } catch (error) {
    toast.info("Please fill all fields. or Please check your email and password or sign up", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
  }
}

export async function GoogleAuth() {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  if(userCredential){
    console.log(userCredential.user.email)
    const result = await userValidation(userCredential.user.email,userCredential.user.email,userCredential.user.displayName)
    return result;
  }

  return result;
}

export async function LogOut() {
  const result = await signOut(auth);
  localStorage.clear();
  console.log(result);
}

export async function UserState() {
  onAuthStateChanged(auth, (result) => {
    console.log(result);
  });
}



export const sendPasswordReset = async (email) => {
  try {
     sendPasswordResetEmail(auth, email);
     
  } catch (error) {
    console.error("Error sending password reset email:", error);
    toast.info("Failed to send password reset email. Please try again.");
  }
};
export const changes = { onAuthStateChanged, auth };
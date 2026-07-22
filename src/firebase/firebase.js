// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración real del proyecto "HeadHunting" en Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBSC1ec3TGXzWyAU47kVYG8hBYCphCgiBg",
  authDomain: "headhunting-5a92e.firebaseapp.com",
  projectId: "headhunting-5a92e",
  storageBucket: "headhunting-5a92e.firebasestorage.app",
  messagingSenderId: "522250627799",
  appId: "1:522250627799:web:5bcddfac9c1807218e1e92",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Activa el servicio de autenticación
export const auth = getAuth(app);

// Prepara Firestore para el CRUD de usuarios/vacantes
export const db = getFirestore(app);

// Mantiene la sesión activa aunque el usuario actualice la página
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("No se pudo configurar la persistencia:", error);
});

// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

// Registra un usuario nuevo con correo y contraseña
export const registrarUsuarioAuth = (correo, password) =>
  createUserWithEmailAndPassword(auth, correo, password);

// Inicia sesión con correo y contraseña
export const iniciarSesionAuth = (correo, password) =>
  signInWithEmailAndPassword(auth, correo, password);

// Cierra la sesión activa
export const cerrarSesionAuth = () => signOut(auth);

// Actualiza el nombre visible del perfil
export const actualizarPerfilAuth = (datos) =>
  updateProfile(auth.currentUser, datos);

// Actualiza la contraseña del usuario autenticado
export const actualizarPasswordAuth = (nuevaPassword) =>
  updatePassword(auth.currentUser, nuevaPassword);

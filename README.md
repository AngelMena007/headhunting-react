# HeadHunting - React + Firebase

Migración a React (Vite) del proyecto original en HTML/CSS/JS, conectado a Firebase (proyecto **HeadHunting**) con Authentication (correo/contraseña) y Firestore.

## Configuración

1. Instala dependencias:
   ```
   npm install
   ```
2. Abre `src/firebase/firebase.js` y reemplaza `firebaseConfig` con la configuración real de tu proyecto **HeadHunting** (Firebase Console → Configuración del proyecto → Tus apps → SDK de Firebase).
3. En Firebase Console → Authentication → Método de acceso, confirma que **Correo electrónico/Contraseña** esté habilitado.
4. En Firebase Console → Firestore Database → Reglas, usa temporalmente:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /usuarios/{id} {
         allow read, write: if request.auth != null;
       }
       match /vacantes/{id} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
5. Ejecuta el proyecto:
   ```
   npm run dev
   ```

## Estructura

- `src/pages/Home.jsx` — Landing page (contenido original de index.html).
- `src/pages/Register.jsx` — Registro (wizard 2 pasos) + `createUserWithEmailAndPassword` + guarda datos extra en Firestore (`usuarios`).
- `src/pages/Login.jsx` — Login con `signInWithEmailAndPassword`.
- `src/pages/Dashboard.jsx` — Panel admin (ruta protegida `/dashboard`): header con perfil, editar perfil, actualizar contraseña, cerrar sesión.
- `src/components/dashboard/UsuariosCrud.jsx` — CRUD de usuarios/candidatos (colección `usuarios`).
- `src/components/dashboard/VacantesCrud.jsx` — CRUD de vacantes (colección `vacantes`).
- `src/auth/PrivateRoute.jsx` — Protege `/dashboard`, redirige a `/login` si no hay sesión.
- `src/firebase/firebase.js` — Configuración e inicialización de Firebase.

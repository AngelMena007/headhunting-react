import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cambia "headhunting-react" por el nombre EXACTO de tu repositorio en GitHub
export default defineConfig({
  plugins: [react()],
  base: "/headhunting-react/",
});

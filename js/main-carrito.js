import { inicializarUsuario } from './usuario.js';
import { inicializarTema } from './tema.js';
import { inicializarAudio } from './audio.js';
import { inicializarMenuDesplegable, inicializarSidebar } from './menu.js';
import { renderizarCarrito } from './carritoFEKA.js';

document.addEventListener("DOMContentLoaded", () => {
    inicializarUsuario();
    inicializarTema();
    inicializarAudio();
    inicializarMenuDesplegable();
    inicializarSidebar();
    renderizarCarrito();

    const header = document.querySelector("header");
    if (header) {
        const updateHeaderScrollState = () => {
            header.classList.toggle("scrolled", window.scrollY > 0);
        };
        updateHeaderScrollState();
        window.addEventListener("scroll", updateHeaderScrollState);
    }
});

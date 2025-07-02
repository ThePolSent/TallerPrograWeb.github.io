import { inicializarUsuario } from './usuario.js';
import { inicializarTema } from './tema.js';
import { inicializarAudio } from './audio.js';
import { inicializarMenuDesplegable, inicializarSidebar } from './menu.js';
import { abrirModal, prepararEventosModal } from './modal.js';
import { iniciarCarruselPopulares, inicializarCarruselPorId, ajustarImagenCarrusel } from './carrusel.js';
import { mostrarPopulares, mostrarJuegos } from './juegos.js';

// Ajuste de imágenes
function ajustarTodasLasImagenes() {
    document.querySelectorAll(".image-carrusel, .image-banner").forEach(img => {
        if (img.complete) {
            ajustarImagenCarrusel(img);
        } else {
            img.onload = () => ajustarImagenCarrusel(img);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarUsuario();
    inicializarTema();
    inicializarAudio();
    inicializarMenuDesplegable();
    inicializarSidebar();

    fetch("../../juegos.json")
        .then(res => res.json())
        .then(data => {
            mostrarPopulares(
                data.accion,
                data.aventura,
                data.simulacion,
                data.estrategia,
                data.mundoabierto
            );
            iniciarCarruselPopulares();

            const categorias = [
                ["accion", "carrusel-accion"],
                ["aventura", "carrusel-aventura"],
                ["simulacion", "carrusel-simulacion"],
                ["estrategia", "carrusel-estrategia"],
                ["mundoabierto", "carrusel-mundoabierto"],
            ];

            categorias.forEach(([categoria, id]) => {
                mostrarJuegos(data[categoria], id, "image-carrusel");
                requestAnimationFrame(() => inicializarCarruselPorId(id));
            });

            ajustarTodasLasImagenes();
            prepararEventosModal();
        })
        .catch(err => console.error("Error cargando JSON:", err));

    const header = document.querySelector("header");
    if (header) {
        const updateHeaderScrollState = () => {
            header.classList.toggle("scrolled", window.scrollY > 0);
        };
        updateHeaderScrollState();
        window.addEventListener("scroll", updateHeaderScrollState);
    }
});

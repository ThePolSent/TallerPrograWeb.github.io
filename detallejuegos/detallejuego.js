import { mostrarJuegos } from "../../js/juegos.js";
import { inicializarCarruselPorId } from "../../js/carrusel.js";

const contenedor = document.getElementById('detalleJuegoContainer');

// 1. Obtener el ID del juego desde la URL
const params = new URLSearchParams(window.location.search);
const juegoId = params.get('id');

if (!juegoId) {
    contenedor.innerHTML = `<p>Juego no especificado.</p>`;
    return;
}

// 2. Cargar el JSON desde raíz
fetch('../../../../juegos.json')
    .then(res => res.json())
    .then(data => {
        let juegoEncontrado = null;
        let categoriaPrincipal = null;

        // 3. Buscar en todas las categorías
        for (const categoria in data) {
            const juego = data[categoria].find(j => j.id === juegoId);
            if (juego) {
                juegoEncontrado = juego;
                categoriaPrincipal = categoria;
                break;
            }
        }

        // 4. Mostrar detalles o mensaje de error
        if (juegoEncontrado) {
            renderizarDetalle(juegoEncontrado, categoriaPrincipal, data[categoriaPrincipal]);
        } else {
            contenedor.innerHTML = `<p>Juego no encontrado.</p>`;
        }
    });

function renderizarDetalle(juego, categoria, juegosRelacionados) {
    const ficha = juego.fichaTecnica || {};
    const req = juego.requisitos || {};
    const min = req.minimos || {};
    const rec = req.recomendados || {};

    contenedor.innerHTML = `
        <div class="detalle-juego">
            <h2>${juego.titulo}</h2>

            <section class="imagen-video">
                <img src="${juego.imagen}" alt="${juego.titulo}" class="portada-juego">
                <iframe class="video-juego" src="${juego.video}" frameborder="0" allowfullscreen></iframe>
            </section>

            <h2>Descripción</h2>
            <section class="descripcion-juego">
                <p>${juego.descripcion}</p>
            </section>

            <section class="fecha-tecnica">
                <h2>Ficha Técnica</h2>
                <ul>
                    <li><strong>Fecha de lanzamiento:</strong> ${ficha.fechaLanzamiento}</li>
                    <li><strong>Desarrollador:</strong> ${ficha.desarrollador}</li>
                    <li><strong>Editor:</strong> ${ficha.editor}</li>
                    <li><strong>Género:</strong> ${ficha.genero}</li>
                    <li><strong>Plataformas:</strong> ${ficha.plataformas}</li>
                </ul>
            </section>

            <h2>Requisitos</h2>
            <section class="requisitos-tabla">
                <table>
                    <thead>
                        <tr>
                            <th>Requisitos</th>
                            <th>Mínimo</th>
                            <th>Recomendado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Sistema Operativo</td><td>${min.sistema}</td><td>${rec.sistema}</td></tr>
                        <tr><td>Procesador</td><td>${min.procesador}</td><td>${rec.procesador}</td></tr>
                        <tr><td>RAM</td><td>${min.ram}</td><td>${rec.ram}</td></tr>
                        <tr><td>Tarjeta Gráfica</td><td>${min.graficos}</td><td>${rec.graficos}</td></tr>
                        <tr><td>Espacio en disco</td><td colspan="2">${req.espacio}</td></tr>
                    </tbody>
                </table>
            </section>

            <section class="categorias-juego">
                <h3>Categorías</h3>
                ${juego.categorias.map(cat => `<span class="categoria">${cat}</span>`).join('')}
            </section>

            <section id="relacionados-container">
                <h2>Más juegos de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>
                <div class="carrusel-wrapper">
                    <button class="btn-izq">&#10094;</button>
                    <div class="carrusel-track" id="carrusel-detalle"></div>
                    <button class="btn-der">&#10095;</button>
                </div>
            </section>
        </div>
    `;

    // 5. Mostrar juegos similares (de la misma categoría pero diferente ID)
    const relacionados = juegosRelacionados.filter(j => j.id !== juego.id);
    mostrarJuegos(relacionados, "carrusel-detalle", "image-carrusel");

    // 6. Inicializar carrusel
    requestAnimationFrame(() => inicializarCarruselPorId("carrusel-detalle"));
}

import { ajustarImagenCarrusel } from "./carrusel.js";

export function mostrarPopulares(...listas) {
    const contenedor = document.getElementById("carrusel-populares");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    const juegosPopulares = listas.flat().filter(j => j.categorias?.includes("popular"));

    juegosPopulares.slice(0, 5).forEach((juego) => {
        const div = document.createElement("div");
        div.classList.add("videojuego-popular");

        const imagenVisible = juego.imagenBanner || juego.imagen;

        div.innerHTML = `
            <div class="game-card">
                <img 
                    src="${imagenVisible}" 
                    alt="${juego.titulo}" 
                    class="image-banner"
                    data-title="${juego.titulo}" 
                    data-description="${juego.descripcion}" 
                    data-details-link="${juego.detalle}"
                    data-image="${juego.imagen}"
                    data-price="${juego.precio}"
                    onload="ajustarImagenCarrusel(this)"
                >
                <div class="hover-card">
                    <h3>${juego.titulo}</h3>
                    <p>${juego.descripcion.split(" ").slice(0, 20).join(" ")}...</p>
                    <a class="ver-mas" href="${juego.detalle}">Ver más</a>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

export function mostrarJuegos(lista, contenedorId, claseImg) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    lista.slice(0, 10).forEach((juego) => {
        const div = document.createElement("div");
        div.classList.add("videojuego");

        const categoriasHTML = (juego.categorias || [])
            .slice(0, 3)
            .map(cat => `<span class="tag">${cat}</span>`)
            .join("");

        const imagenHTML = `
            <img src="${juego.imagen}" 
                class="${claseImg}"
                alt="Videojuego-${juego.id}"
                data-title="${juego.titulo}"
                data-description="${juego.descripcion}"
                data-details-link="${juego.detalle}"
                data-image="${juego.imagen}"
                data-price="${juego.precio}"
                onload="ajustarImagenCarrusel(this)">
        `;

        div.innerHTML = `
            <div class="game-card">
                ${imagenHTML}
                <div class="hover-card">
                    <h3>${juego.titulo}</h3>
                    <p>${juego.descripcion.split(" ").slice(0, 20).join(" ")}...</p>
                    <div class="categorias">${categoriasHTML}</div>
                    <a class="ver-mas" href="${juego.detalle}">Ver más</a>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

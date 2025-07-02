import { abrirModal } from "../../js/modal.js";

const contenedor = document.querySelector("[data-categoria]");
const categoria = contenedor?.dataset.categoria;

if (!contenedor || !categoria) {
  console.error("Contenedor o categoría no encontrada en el HTML");
} else {
  fetch("../../juegos.json")
    .then(res => res.json())
    .then(data => {
      const todosLosJuegos = Object.values(data).flat();

      const juegosFiltrados = todosLosJuegos.filter(juego =>
        juego.categorias?.includes(categoria)
      );

      renderizarJuegosCategoria(juegosFiltrados);
    })
    .catch(err => {
      console.error("Error cargando juegos:", err);
      contenedor.innerHTML = "<p>Error al cargar los juegos.</p>";
    });
}

function renderizarJuegosCategoria(juegos) {
  contenedor.innerHTML = "";

  juegos.forEach(juego => {
    const card = document.createElement("div");
    card.classList.add("steam-card");

    const precioNumerico = parseFloat(juego.precio);
    const precio = isNaN(precioNumerico)
      ? "S/ --"
      : (precioNumerico === 0 ? "Gratis" : `S/ ${precioNumerico.toFixed(2)}`);


    const precioHTML = `<span class="final-price">${precio}</span>`;

    const contenidoTarjeta = `
      <div class="steam-card-tooltip">
        <p><strong>${juego.titulo}</strong></p>
        <p>${juego.descripcion.slice(0, 100)}...</p>
        <p>⭐ ${juego.reseñas || "Sin reseñas"}</p>
      </div>

      <img src="${juego.imagenBanner || juego.imagen}" alt="${juego.titulo}">

      <div class="steam-card-info">
        <h3>${juego.titulo}</h3>
        <div class="steam-price">${precioHTML}</div>
        <div class="steam-tags">
          ${(juego.categorias || []).map(cat => `<span class="steam-tag">${cat}</span>`).join("")}
        </div>
      </div>
    `;

    if (juego.detalle) {
      card.innerHTML = `<a href="${juego.detalle}" class="steam-link">${contenidoTarjeta}</a>`;
    } else {
      card.innerHTML = contenidoTarjeta;
      card.addEventListener("click", () => abrirModal(juego));
    }

    contenedor.appendChild(card);
  });
}

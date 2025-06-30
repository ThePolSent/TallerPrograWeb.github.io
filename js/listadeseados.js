console.log('✅ wishlist-page.js ejecutándose');

document.addEventListener("DOMContentLoaded", () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const lista = document.getElementById("wishlist-lista");

    function renderWishlist() {
        lista.innerHTML = "";

        if (wishlist.length === 0) {
            lista.innerHTML = "<p style='text-align:center;'>Tu lista de deseados está vacía.</p>";
            return;
        }

        wishlist.forEach((juego, index) => {
            const item = document.createElement("div");
            item.className = "carrito-item";  // usamos la misma clase para el estilo

            // Descripción reducida al 50%
            const descripcionReducida = juego.descripcion
                ? juego.descripcion.slice(0, Math.floor(juego.descripcion.length / 2)) + "..."
                : "";

            item.innerHTML = `
                <img src="${juego.imagen}" alt="${juego.titulo}">
                <div class="carrito-info">
                    <h4>${juego.titulo}</h4>
                    <p class="precio">S/ ${parseFloat(juego.precio).toFixed(2)}</p>
                    <p class="descripcion">${descripcionReducida}</p>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;

            lista.appendChild(item);
        });

        // Listeners para eliminar
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                eliminarDeWishlist(index);
            });
        });
    }

    function eliminarDeWishlist(index) {
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist();
    }

    renderWishlist();
});

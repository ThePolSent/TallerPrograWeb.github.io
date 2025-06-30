console.log('✅ carrito-page.js ejecutándose');

document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const lista = document.getElementById("carrito-lista");
    const totalTexto = document.getElementById("total-carrito");

    function renderCarrito() {
        lista.innerHTML = "";

        if (carrito.length === 0) {
            lista.innerHTML = "<p style='text-align:center;'>Tu carrito está vacío.</p>";
            totalTexto.textContent = "S/ 0.00";
            return;
        }

        let total = 0;

        carrito.forEach((juego, index) => {
            const item = document.createElement("div");
            item.className = "carrito-item";

            const precio = parseFloat(juego.precio) || 0;
            total += precio;

            // Descripción reducida al 50%
            const descripcionReducida = juego.descripcion
                ? juego.descripcion.slice(0, Math.floor(juego.descripcion.length / 2)) + "..."
                : "";

            item.innerHTML = `
                <img src="${juego.imagen}" alt="${juego.titulo}">
                <div class="carrito-info">
                    <h4>${juego.titulo}</h4>
                    <p class="precio">S/ ${precio.toFixed(2)}</p>
                    <p class="descripcion">${descripcionReducida}</p>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;

            lista.appendChild(item);
        });

        totalTexto.textContent = `S/ ${total.toFixed(2)}`;

        // Listeners para eliminar
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                eliminarDelCarrito(index);
            });
        });
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    }

    document.getElementById("btn-comprar").addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        alert("Compra realizada con éxito. ¡Gracias por tu compra!");
        localStorage.removeItem("carrito");
        renderCarrito();
    });

    renderCarrito();
});

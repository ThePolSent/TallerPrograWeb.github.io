console.log('✅ carrito-page.js ejecutándose');

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user || !user.username) {
        alert("Debes iniciar sesión para ver tu carrito.");
        window.location.href = "../../login/iniciarsesion.html";
        return;
    }

    const key = `carrito_${user.username}`;
    const lista = document.getElementById("carrito-lista");
    const totalTexto = document.getElementById("total-carrito");

    function renderCarrito() {
        lista.innerHTML = "";

        const carrito = JSON.parse(localStorage.getItem(key)) || [];

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

            const descripcionReducida = juego.descripcion
                ? juego.descripcion.slice(0, Math.floor(juego.descripcion.length / 2)) + "..."
                : "";

            item.innerHTML = `
                <img src="${juego.imagen}" alt="${juego.titulo}">
                <div class="carrito-info">
                    <h4>${juego.titulo}</h4>
                    <p class="precio">${precio === 0 ? "Gratis" : `S/ ${precio.toFixed(2)}`}</p>
                    <p class="descripcion">${descripcionReducida}</p>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;

            lista.appendChild(item);
        });

        totalTexto.textContent = total === 0 ? "Gratis" : `S/ ${total.toFixed(2)}`;

        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.getAttribute("data-index"));
                eliminarDelCarrito(index);
            });
        });
    }

    function eliminarDelCarrito(index) {
        const carrito = JSON.parse(localStorage.getItem(key)) || [];
        carrito.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(carrito));
        renderCarrito();
    }

    document.getElementById("btn-comprar").addEventListener("click", () => {
        const carrito = JSON.parse(localStorage.getItem(key)) || [];
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const confirmar = confirm("¿Estás seguro de que deseas completar la compra?");
        if (confirmar) {
            alert("Compra realizada con éxito. ¡Gracias por tu compra!");
            localStorage.removeItem(key);
            renderCarrito();
        }
    });

    renderCarrito();
});

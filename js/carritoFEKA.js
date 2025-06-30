// carrito.js

export function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

export function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function renderizarCarrito() {
    const contenedor = document.getElementById("carrito-lista");
    const totalTexto = document.getElementById("total-carrito");
    const btnComprar = document.getElementById("btn-comprar");

    if (!contenedor || !totalTexto || !btnComprar) return;

    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center;'>Tu carrito está vacío.</p>";
        totalTexto.textContent = "S/ 0.00";
        btnComprar.disabled = true;
        return;
    }

    let total = 0;

    carrito.forEach((juego, index) => {
        const item = document.createElement("div");
        item.className = "carrito-item";
        item.style = "display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding: 12px; background: #222; color: #fff; border-radius: 8px;";

        const precio = parseFloat(juego.precio) || 0;
        total += precio;

        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <img src="${juego.imagen}" alt="${juego.titulo}" style="width:60px; height:60px; border-radius:6px; object-fit:cover;">
                <div>
                    <h4>${juego.titulo}</h4>
                    <p style="color: #1db954;">S/ ${precio.toFixed(2)}</p>
                </div>
            </div>
            <button class="eliminar-btn" data-index="${index}">Eliminar</button>
        `;

        contenedor.appendChild(item);
    });

    totalTexto.textContent = `S/ ${total.toFixed(2)}`;
    btnComprar.disabled = false;

    contenedor.querySelectorAll(".eliminar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.dataset.index);
            const carrito = obtenerCarrito();
            carrito.splice(index, 1);
            guardarCarrito(carrito);
            renderizarCarrito();
        });
    });

    btnComprar.addEventListener("click", () => {
        if (obtenerCarrito().length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        alert("Compra realizada con éxito. ¡Gracias por tu compra!");
        localStorage.removeItem("carrito");
        renderizarCarrito();
    });
}

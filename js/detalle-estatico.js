document.addEventListener("DOMContentLoaded", () => {
    const btnCarrito = document.querySelector(".btn-carrito");
    const btnDeseado = document.querySelector(".btn-deseado");
    const titulo = "Counter-Strike 2";

    // Verificación de existencia de botones
    if (!btnCarrito || !btnDeseado) return;

    // Objeto de juego estático
    const juego = {
        id: "cs2",
        titulo: titulo,
        precio: "0.00",
        descripcion: "Counter-Strike 2 es la evolución del legendario shooter táctico de Valve...",
        imagen: "https://i.pinimg.com/736x/a5/c5/29/a5c529a21b85c978bd4e1874762d29d3.jpg",
        detalle: window.location.pathname
    };

    // Mostrar título en el <title> del documento
    document.title = `PlaySent | ${juego.titulo}`;

    // Verifica si ya está en carrito
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const enCarrito = carrito.some(j => j.id === juego.id);
    if (enCarrito) {
        btnCarrito.textContent = "✔ Ya en el Carrito";
        btnCarrito.disabled = true;
    }

    // Verifica si ya está en wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const enWishlist = wishlist.some(j => j.id === juego.id);
    if (enWishlist) {
        btnDeseado.textContent = "✔ Ya en Wishlist";
        btnDeseado.disabled = true;
    }

    // Evento: Añadir al carrito
    btnCarrito.addEventListener("click", () => {
        if (!enCarrito) {
            carrito.push(juego);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            btnCarrito.textContent = "✔ Añadido al Carrito";
            btnCarrito.disabled = true;
        }
    });

    // Evento: Añadir a lista de deseados
    btnDeseado.addEventListener("click", () => {
        if (!enWishlist) {
            wishlist.push(juego);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            btnDeseado.textContent = "✔ Añadido a Wishlist";
            btnDeseado.disabled = true;
        }
    });
});

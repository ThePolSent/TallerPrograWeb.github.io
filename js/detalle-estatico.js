document.addEventListener("DOMContentLoaded", () => {
    const btnCarrito = document.querySelector(".btn-carrito");
    const btnDeseado = document.querySelector(".btn-deseado");
    const tituloElemento = document.querySelector(".detalle-contenido h2");
    const descripcionElemento = document.querySelector(".detalle-descripcion p");
    const imagenElemento = document.querySelector(".detalle-img");

    if (!btnCarrito || !btnDeseado || !tituloElemento || !descripcionElemento || !imagenElemento) return;

    // Obtener ID desde el nombre del archivo HTML
    const path = window.location.pathname;
    const archivo = path.split("/").pop(); // ej: cs2.html
    const id = archivo.replace(".html", ""); // ej: cs2

    fetch("../../../juegos.json")
        .then(res => res.json())
        .then(juegos => {
            const todos = Object.values(juegos).flat(); // Por si están por categoría
            const encontrado = todos.find(j => j.id === id);
            if (!encontrado) {
                console.warn("Juego no encontrado en juegos.json con ID:", id);
                return;
            }

            // Construir objeto del juego
            const juego = {
                id: encontrado.id,
                titulo: encontrado.titulo,
                precio: encontrado.precio,
                descripcion: encontrado.descripcion,
                imagen: encontrado.imagen,
                detalle: path
            };

            // Actualizar <title> y mostrar precio en el DOM
            document.title = `PlaySent | ${juego.titulo}`;
            mostrarPrecio(juego.precio);

            // Verificar si ya está en el carrito
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const enCarrito = carrito.some(j => j.id === juego.id);
            if (enCarrito) {
                btnCarrito.textContent = "✔ Ya en el Carrito";
                btnCarrito.disabled = true;
            }

            // Verificar si ya está en wishlist
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

            // Evento: Añadir a wishlist
            btnDeseado.addEventListener("click", () => {
                if (!enWishlist) {
                    wishlist.push(juego);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    btnDeseado.textContent = "✔ Añadido a Wishlist";
                    btnDeseado.disabled = true;
                }
            });

        })
        .catch(err => console.error("Error al cargar juegos.json:", err));

    // Mostrar visualmente el precio bajo el título
    function mostrarPrecio(precio) {
        let precioElemento = document.querySelector(".detalle-precio");
        if (!precioElemento) {
            precioElemento = document.createElement("p");
            precioElemento.className = "detalle-precio";
            tituloElemento.insertAdjacentElement("afterend", precioElemento);
        }

        precioElemento.textContent = (precio === "0" || precio === "0.00")
            ? "Precio: Gratis"
            : `Precio: S/. ${precio}`;
    }
});

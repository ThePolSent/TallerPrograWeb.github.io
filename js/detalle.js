document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user || !user.username) {
        alert("Debes iniciar sesión para ver esta página.");
        window.location.href = "../../login/iniciarsesion.html";
        return;
    }

    const btnCarrito = document.querySelector(".btn-carrito");
    const btnDeseado = document.querySelector(".btn-deseado");
    const tituloElemento = document.querySelector(".detalle-contenido h2");
    const descripcionElemento = document.querySelector(".detalle-descripcion p");
    const imagenElemento = document.querySelector(".detalle-img");

    if (!btnCarrito || !btnDeseado || !tituloElemento || !descripcionElemento || !imagenElemento) return;

    const path = window.location.pathname;
    const archivo = path.split("/").pop();
    const id = archivo.replace(".html", "");

    fetch("../../../juegos.json")
        .then(res => res.json())
        .then(juegos => {
            const todos = Object.values(juegos).flat();
            const encontrado = todos.find(j => j.id === id);
            if (!encontrado) {
                console.warn("Juego no encontrado en juegos.json con ID:", id);
                return;
            }

            const juego = {
                id: encontrado.id,
                titulo: encontrado.titulo,
                precio: encontrado.precio,
                descripcion: encontrado.descripcion,
                imagen: encontrado.imagen,
                detalle: path
            };

            document.title = `PlaySent | ${juego.titulo}`;
            mostrarPrecio(juego.precio);

            // --- Cargar por usuario
            const keyCarrito = `carrito_${user.username}`;
            const keyWishlist = `wishlist_${user.username}`;
            const carrito = JSON.parse(localStorage.getItem(keyCarrito)) || [];
            const wishlist = JSON.parse(localStorage.getItem(keyWishlist)) || [];

            const enCarrito = carrito.some(j => j.id === juego.id);
            if (enCarrito) {
                btnCarrito.textContent = "✔ Ya en el Carrito";
                btnCarrito.disabled = true;
            }

            const enWishlist = wishlist.some(j => j.id === juego.id);
            if (enWishlist) {
                btnDeseado.textContent = "✔ Ya en Wishlist";
                btnDeseado.disabled = true;
            }

            btnCarrito.addEventListener("click", () => {
                if (!enCarrito) {
                    const confirmacion = confirm(`¿Deseas añadir "${juego.titulo}" al carrito?`);
                    if (!confirmacion) return;

                    carrito.push(juego);
                    localStorage.setItem(keyCarrito, JSON.stringify(carrito));
                    btnCarrito.textContent = "✔ Añadido al Carrito";
                    btnCarrito.disabled = true;
                    alert(`"${juego.titulo}" se añadió al carrito.`);
                }
            });

            btnDeseado.addEventListener("click", () => {
                if (!enWishlist) {
                    const confirmacion = confirm(`¿Deseas añadir "${juego.titulo}" a tu lista de deseados?`);
                    if (!confirmacion) return;

                    wishlist.push(juego);
                    localStorage.setItem(keyWishlist, JSON.stringify(wishlist));
                    btnDeseado.textContent = "✔ Añadido a Wishlist";
                    btnDeseado.disabled = true;
                    alert(`"${juego.titulo}" se añadió a la lista de deseados.`);
                }
            });

        })
        .catch(err => console.error("Error al cargar juegos.json:", err));

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

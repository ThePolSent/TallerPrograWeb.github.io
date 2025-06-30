document.addEventListener("DOMContentLoaded", () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const lista = document.getElementById("wishlist-lista");

    function renderWishlist() {
        lista.innerHTML = "";

        if (wishlist.length === 0) {
            const mensaje = document.getElementById("wishlist-empty");
            mensaje.style.display = "block";
            return;
        }

        document.getElementById("wishlist-empty").style.display = "none";

        wishlist.forEach((juego, index) => {
            const card = document.createElement("div");
            card.className = "game-card";

            const img = document.createElement("img");
            img.src = juego.imagen;
            img.alt = juego.titulo;

            const hoverCard = document.createElement("div");
            hoverCard.className = "hover-card";

            const titulo = document.createElement("h3");
            titulo.textContent = juego.titulo;

            const precio = document.createElement("p");
            precio.className = "precio";
            precio.textContent = `S/ ${parseFloat(juego.precio).toFixed(2)}`;

            const descripcion = document.createElement("p");
            descripcion.className = "descripcion";
            descripcion.textContent = (juego.descripcion || "").slice(0, 100) + "...";

            hoverCard.appendChild(titulo);
            hoverCard.appendChild(precio);
            hoverCard.appendChild(descripcion);

            const eliminarBtn = document.createElement("button");
            eliminarBtn.className = "btn-eliminar";
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // evita que el click en eliminar redirija
                eliminarDeWishlist(index);
            });

            card.appendChild(img);
            card.appendChild(hoverCard);
            card.appendChild(eliminarBtn);

            // Redirección a página de detalle
            card.addEventListener("click", () => {
                if (juego.detalle) {
                    window.location.href = juego.detalle;
                }
            });

            lista.appendChild(card);
        });
    }

    function eliminarDeWishlist(index) {
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist();
    }

    renderWishlist();
});  
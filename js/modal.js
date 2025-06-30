export function abrirModal(imageData) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalButton = document.getElementById("modal-button");
    const modalDescription = document.getElementById("modal-description");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");

    if (!modal || !modalImage || !modalButton || !modalDescription || !modalTitle || !modalPrice) {
        console.warn("No se encontró un elemento del modal");
        return;
    }

    modal.classList.add("show");
    document.body.classList.add("modal-open", "bloqueado");

    modalImage.src = imageData.dataset.image || imageData.src;
    modalDescription.textContent = imageData.dataset.description || "";
    modalButton.href = imageData.dataset.detailsLink || "#";
    modalTitle.textContent = imageData.dataset.title || "";
    modalPrice.textContent = imageData.dataset.price ? `S/ ${imageData.dataset.price}` : "";

    // Esperamos un frame para que el DOM esté renderizado antes de buscar los botones
    requestAnimationFrame(() => {
        const btnAgregarCarrito = document.querySelector(".btn-cart");
        const btnWishlist = document.querySelector(".btn-wishlist");

        if (!btnAgregarCarrito) {
            console.warn("No se encontró .btn-cart al abrir el modal");
        } else {
            btnAgregarCarrito.onclick = () => {
                const titulo = modalTitle.textContent;
                const imagen = modalImage.src;
                const precio = modalPrice.textContent.replace("S/ ", "");
                const descripcion = modalDescription.textContent;

                const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                const yaExiste = carrito.some(j => j.titulo === titulo);

                if (!yaExiste) {
                    carrito.push({ titulo, imagen, precio, descripcion });
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    alert(`"${titulo}" se ha añadido al carrito`);
                } else {
                    alert(`"${titulo}" ya está en el carrito`);
                }

                cerrarModal();
            };
        }

        if (btnWishlist) {
            btnWishlist.addEventListener("click", () => {
                const titulo = document.getElementById("modal-title").textContent;
                const imagen = document.getElementById("modal-image").src;
                const precioText = document.getElementById("modal-price").textContent;
                const precio = precioText.replace("S/ ", "").trim();
                const descripcion = document.getElementById("modal-description").textContent;

                let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

                const yaExiste = wishlist.some(j => j.titulo === titulo);
                if (!yaExiste) {
                    wishlist.push({ titulo, imagen, precio, descripcion });
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    alert(`"${titulo}" se ha añadido a la lista de deseados`);
                } else {
                    alert(`"${titulo}" ya está en la lista de deseados`);
                }

                cerrarModal();
            });
        }
    });
}

export function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("show");
    document.body.classList.remove("modal-open", "bloqueado");
}

export function prepararEventosModal() {
    document.querySelectorAll(".game-card").forEach((card) => {
        card.addEventListener("click", (e) => {
            // Prevenir que haga algo si hicieron clic en un enlace .ver-mas
            if (e.target.closest(".ver-mas")) return;

            const img = card.querySelector("img");
            if (img) abrirModal(img);
        });
    });

    document.querySelectorAll(".close-btn").forEach((btn) => {
        btn.addEventListener("click", cerrarModal);
    });

    window.addEventListener("click", (event) => {
        if (event.target === document.getElementById("modal")) cerrarModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") cerrarModal();
    });
}

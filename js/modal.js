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
    const precioRaw = parseFloat(imageData.dataset.price || "0");
    modalPrice.textContent = precioRaw === 0 ? "Gratis" : `S/ ${precioRaw.toFixed(2)}`;

    requestAnimationFrame(() => {
        const btnAgregarCarrito = document.querySelector(".btn-cart");
        const btnWishlist = document.querySelector(".btn-wishlist");

        if (!btnAgregarCarrito) {
            console.warn("No se encontró .btn-cart al abrir el modal");
        } else {
            btnAgregarCarrito.onclick = () => {
                const user = JSON.parse(localStorage.getItem("usuario"));
                if (!user || !user.username) {
                    const confirmacion = confirm("Necesitas iniciar sesión para añadir al carrito. ¿Deseas hacerlo ahora?");
                    if (confirmacion) {
                        localStorage.setItem("lastVisitedURL", window.location.href);
                        window.location.href = "../../login/iniciarsesion.html";
                    }
                    return;
                }

                const key = `carrito_${user.username}`;
                const carrito = JSON.parse(localStorage.getItem(key)) || [];

                const titulo = modalTitle.textContent;
                const imagen = modalImage.src;
                const precio = modalPrice.textContent.replace("S/ ", "");
                const descripcion = modalDescription.textContent;

                const yaExiste = carrito.some(j => j.titulo === titulo);

                if (yaExiste) {
                    alert(`"${titulo}" ya está en el carrito`);
                } else {
                    const confirmacion = confirm(`¿Deseas añadir "${titulo}" al carrito?`);
                    if (confirmacion) {
                        carrito.push({ titulo, imagen, precio, descripcion });
                        localStorage.setItem(key, JSON.stringify(carrito));
                        alert(`"${titulo}" se ha añadido al carrito`);
                        cerrarModal();
                    }
                }
            };
        }

        if (btnWishlist) {
            btnWishlist.onclick = () => {
                const user = JSON.parse(localStorage.getItem("usuario"));
                if (!user || !user.username) {
                    const confirmacion = confirm("Necesitas iniciar sesión para añadir a la lista de deseados. ¿Deseas hacerlo ahora?");
                    if (confirmacion) {
                        localStorage.setItem("lastVisitedURL", window.location.href);
                        window.location.href = "../../login/iniciarsesion.html";
                    }
                    return;
                }

                const key = `wishlist_${user.username}`;
                const wishlist = JSON.parse(localStorage.getItem(key)) || [];

                const titulo = modalTitle.textContent;
                const imagen = modalImage.src;
                const precio = modalPrice.textContent.replace("S/ ", "").trim();
                const descripcion = modalDescription.textContent;

                const yaExiste = wishlist.some(j => j.titulo === titulo);
                if (yaExiste) {
                    alert(`"${titulo}" ya está en la lista de deseados`);
                } else {
                    const confirmacion = confirm(`¿Deseas añadir "${titulo}" a la lista de deseados?`);
                    if (confirmacion) {
                        wishlist.push({ titulo, imagen, precio, descripcion });
                        localStorage.setItem(key, JSON.stringify(wishlist));
                        alert(`"${titulo}" se ha añadido a la lista de deseados`);
                        cerrarModal();
                    }
                }
            };
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

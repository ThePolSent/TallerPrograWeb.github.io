export function abrirModal(imageData) {
    const modal = document.getElementById("modal");
    if (!modal) return; // 🛑 No estamos en index.html, no hay modal

    const modalImage = document.getElementById("modal-image");
    const modalButton = document.getElementById("modal-button");
    const modalDescription = document.getElementById("modal-description");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");

    if (!modalImage || !modalButton || !modalDescription || !modalTitle || !modalPrice) {
        console.warn("Faltan elementos del modal");
        return;
    }

    modal.classList.add("show");
    document.body.classList.add("modal-open", "bloqueado");

    modalImage.src = imageData.dataset.image || imageData.src;
    modalDescription.textContent = imageData.dataset.description || "";
    modalButton.href = imageData.dataset.detailsLink || "#";
    modalTitle.textContent = imageData.dataset.title || "";
    modalPrice.textContent = imageData.dataset.price ? `S/ ${imageData.dataset.price}` : "";

    requestAnimationFrame(() => {
        const btnAgregarCarrito = document.querySelector(".btn-cart");
        if (!btnAgregarCarrito) return;

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
        };
    });
}

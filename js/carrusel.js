export function ajustarImagenCarrusel(img) {
    if (!img.complete) return;
    const esAncha = img.naturalWidth / img.naturalHeight > 1.7;
    img.style.objectFit = esAncha ? "contain" : "cover";
}

export function iniciarCarruselPopulares() {
    const track = document.getElementById("carrusel-populares");
    const slides = track?.querySelectorAll(".videojuego-popular") || [];
    if (!track || slides.length === 0) return;

    let index = 0;
    setInterval(() => {
        index = (index + 1) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    }, 5000);
}

export function inicializarCarruselPorId(idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;

    const wrapper = contenedor.closest(".carrusel-wrapper");
    if (!wrapper) return;

    const track = wrapper.querySelector(".carrusel-track");
    const btnIzq = wrapper.querySelector(".btn-izq");
    const btnDer = wrapper.querySelector(".btn-der");
    const items = wrapper.querySelectorAll(".videojuego");

    const visibleItems = 4;
    const itemWidth = items.length > 0 ? items[0].getBoundingClientRect().width + 20 : 200;
    let scrollIndex = 0;
    const maxScrollIndex = Math.max(0, items.length - visibleItems);

    function updateButtons() {
        btnIzq.style.display = scrollIndex <= 0 ? "none" : "block";
        btnDer.style.display = scrollIndex >= maxScrollIndex ? "none" : "block";
    }

    btnIzq.addEventListener("click", () => {
        if (scrollIndex > 0) {
            scrollIndex--;
            track.style.transform = `translateX(-${scrollIndex * itemWidth}px)`;
            updateButtons();
        }
    });

    btnDer.addEventListener("click", () => {
        if (scrollIndex < maxScrollIndex) {
            scrollIndex++;
            track.style.transform = `translateX(-${scrollIndex * itemWidth}px)`;
            updateButtons();
        }
    });

    track.style.animation = "none";
    updateButtons();
}

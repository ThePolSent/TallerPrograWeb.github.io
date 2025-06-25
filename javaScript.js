// ============================
//     INICIALIZACIÓN GENERAL
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // ============================
  //         MODO USUARIO
  // ============================
    const user = localStorage.getItem("usuario");
    const loginIcon = document.getElementById("login-icon");
    const userMenu = document.getElementById("userMenu");
    const userButton = document.getElementById("userButton");
    const logoutBtn = document.getElementById("logoutButton");
    const usernameDisplay = document.getElementById("usernameDisplay");

    if (user) {
        if (loginIcon) loginIcon.style.display = "none";
        if (userMenu) {
        userMenu.style.display = "block";
        usernameDisplay.textContent = user;
        }
    } else {
        if (loginIcon) loginIcon.style.display = "block";
        if (userMenu) userMenu.style.display = "none";
    }

    if (userButton) {
        userButton.addEventListener("click", () => {
        userMenu.querySelector(".submenu").classList.toggle("open");
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.reload();
        });
    }

    if (loginIcon) {
        loginIcon.addEventListener("click", () => {
        localStorage.setItem("lastVisitedURL", window.location.href);
        window.location.href = "../../login/principaliniciosesion/iniciarsesion.html";
        });
    }

    // ============================
    //         TEMA OSCURO
    // ============================
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;
    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "oscuro") {
        body.classList.add("dark-mode");
        themeIcon.setAttribute("name", "sunny-outline");
    } else {
        themeIcon.setAttribute("name", "moon-outline");
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
        const esOscuro = body.classList.toggle("dark-mode");
        localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
        themeIcon.setAttribute("name", esOscuro ? "sunny-outline" : "moon-outline");
        });
    }

    // ============================
    //        BOTÓN DE AUDIO
    // ============================
    const audioBtn = document.getElementById("audio-toggle");
    const audioIcon = document.getElementById("audio-icon");
    const audioPlayer = document.getElementById("audio-player");
    let isPlaying = false;

    if (audioBtn && audioPlayer && audioIcon) {
        audioBtn.addEventListener("click", () => {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        });

        audioPlayer.addEventListener("pause", () => {
        audioIcon.setAttribute("name", "volume-mute-outline");
        isPlaying = false;
        });

        audioPlayer.addEventListener("play", () => {
        audioIcon.setAttribute("name", "volume-high-outline");
        isPlaying = true;
        });
    }

    // ============================
    //        MENÚ DESPLEGABLE
    // ============================
    function toggleSubmenu(event) {
        event.preventDefault();
        event.stopPropagation();

        const parentLi = event.currentTarget.parentElement;

        document.querySelectorAll(".has-submenu").forEach((item) => {
        if (item !== parentLi) {
            item.classList.remove("open");
        }
        });

        parentLi.classList.toggle("open");
    }

    document.querySelectorAll(".has-submenu > a").forEach((link) => {
        link.addEventListener("click", toggleSubmenu);
    });

    document.addEventListener("click", function (event) {
        const isSubmenu = event.target.closest(".has-submenu");
        const isLoginForm = event.target.closest("#login-form");
        const isLoginButton = event.target.closest("#login-btn");

        if (!isSubmenu && !isLoginForm && !isLoginButton) {
        document.querySelectorAll(".has-submenu").forEach((item) => item.classList.remove("open"));
        const loginForm = document.getElementById("login-form");
        if (loginForm) loginForm.style.display = "none";
        }
    });

    // ============================
    //        MENÚ HAMBURGUESA
    // ============================
    const menuHamburguesa = document.querySelector(".menu-hamburguesa");

    if (menuHamburguesa) {
        menuHamburguesa.addEventListener("click", () => {
        const nav = document.querySelector("nav");
        if (nav) nav.classList.toggle("open");
        });
    }

    document.querySelectorAll("nav ul li").forEach((item) => {
        item.addEventListener("click", () => {
        const submenu = item.querySelector(".submenu");
        if (submenu) submenu.classList.toggle("open");
        });
    });

    // ============================
    //        MODAL DE JUEGO
    // ============================
    function abrirModal(imageData) {
        const modal = document.getElementById("modal");
        const modalImage = document.getElementById("modal-image");
        const modalButton = document.getElementById("modal-button");
        const modalDescription = document.getElementById("modal-description");
        const modalTitle = document.getElementById("modal-title");

        modal.classList.add("show");
        document.body.classList.add("modal-open");

        modalImage.src = imageData.src;
        modalDescription.textContent = imageData.dataset.description;
        modalButton.href = imageData.dataset.detailsLink;
        modalTitle.textContent = imageData.dataset.title;
    }

    function cerrarModal() {
        const modal = document.getElementById("modal");
        modal.classList.remove("show");
        document.body.classList.remove("modal-open");
    }

    document.querySelectorAll(".close-btn").forEach((btn) => {
        btn.addEventListener("click", cerrarModal);
    });

    window.addEventListener("click", (event) => {
        const modal = document.getElementById("modal");
        if (event.target === modal) cerrarModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") cerrarModal();
    });

    // ============================
    //     CARRUSEL DE JUEGOS
    // ============================
    fetch("../../juegos.json")
    .then((res) => res.json())
    .then((data) => {
        mostrarJuegos(data.accion, "carrusel-accion", "image-carrusel");
        requestAnimationFrame(() => inicializarCarruselPorId("carrusel-accion"));
        mostrarJuegos(data.aventura, "carrusel-aventura", "image-carrusel");
        requestAnimationFrame(() => inicializarCarruselPorId("carrusel-aventura"));
        mostrarJuegos(data.simulacion, "carrusel-simulacion", "image-carrusel");
        requestAnimationFrame(() => inicializarCarruselPorId("carrusel-simulacion"));
        mostrarJuegos(data.estrategia, "carrusel-estrategia", "image-carrusel");
        requestAnimationFrame(() => inicializarCarruselPorId("carrusel-estrategia"));
        mostrarJuegos(data.mundoabierto, "carrusel-mundoabierto", "image-carrusel");
        requestAnimationFrame(() => inicializarCarruselPorId("carrusel-mundoabierto"));
        prepararEventosModal();
    })
    .catch((err) => console.error("Error cargando JSON:", err));

    // Nueva función:
    function inicializarCarruselPorId(idContenedor) {
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


    // ============================
    //      HEADER SCROLL FIX
    // ============================
    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            header.classList.add("scrolled");
            header.style.zIndex = "1000";
        } else {
            header.classList.remove("scrolled");
            header.style.zIndex = "1";
        }
        });
    }

    // ============================
    //      CARGA DE JUEGOS
    // ============================

    function mostrarJuegos(lista, contenedorId, claseImg) {
        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) return;

        lista.slice(0,10).forEach((juego) => {
        const div = document.createElement("div");
        div.classList.add(contenedorId === "videojuegos-populares" ? "videojuego-popular" : "videojuego");

        div.innerHTML = `
            <div class="game-card">
            <img src="${juego.imagen}" 
                class="${claseImg}"
                alt="Videojuego-${juego.id}"
                data-title="${juego.titulo}"
                data-description="${juego.descripcion}"
                data-details-link="${juego.detalle}">
            <div class="overlay-text">${juego.titulo} (${juego.año})</div>
            </div>
        `;
        contenedor.appendChild(div);
        });
    }

    function prepararEventosModal() {
        document.querySelectorAll(".game-card").forEach((card) => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            if (img) abrirModal(img);
        });
        });
    }

    function toggleDescripcion() {
        const descripcion = document.querySelector(".descripcion-juego");
        const botonVerMas = document.querySelector(".ver-mas-btn");

        if (descripcion && botonVerMas) {
        if (descripcion.classList.contains("colapsada")) {
            descripcion.classList.remove("colapsada");
            botonVerMas.textContent = "Ver menos";
        } else {
            descripcion.classList.add("colapsada");
            botonVerMas.textContent = "Ver más";
        }
        }
    }
});



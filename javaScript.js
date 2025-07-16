document.addEventListener("DOMContentLoaded", () => {
    // --- MODO USUARIO ---
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

    window.ajustarImagenCarrusel = function (img) {
        if (!img.complete) return;
        const esAncha = img.naturalWidth / img.naturalHeight > 1.7;
        img.style.objectFit = esAncha ? "contain" : "cover";
    };

    // --- TEMA OSCURO ---
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

    // --- AUDIO ---
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

    // --- MENÚ DESPLEGABLE ---
    function toggleSubmenu(event) {
        event.preventDefault();
        event.stopPropagation();
        const parentLi = event.currentTarget.parentElement;
        document.querySelectorAll(".has-submenu").forEach((item) => {
            if (item !== parentLi) item.classList.remove("open");
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

    // --- MENÚ HAMBURGUESA ---
    const menuBtn = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && e.target !== menuBtn) {
                sidebar.classList.remove("open");
            }
        });

        sidebar.querySelectorAll("a").forEach((enlace) => {
            enlace.addEventListener("click", () => {
                sidebar.classList.remove("open");
            });
        });
    }

    // --- COLAPSABLES SIDEBAR ---
    document.querySelectorAll(".collapsible-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const section = btn.closest(".collapsible-section");
            section.classList.toggle("open");
        });
    });

    // --- MODAL DE JUEGO ---
    function abrirModal(imageData) {
        const modal = document.getElementById("modal");
        const modalImage = document.getElementById("modal-image");
        const modalButton = document.getElementById("modal-button");
        const modalDescription = document.getElementById("modal-description");
        const modalTitle = document.getElementById("modal-title");
        const modalPrice = document.getElementById("modal-price");

        modal.classList.add("show");
        document.body.classList.add("modal-open", "bloqueado");

        modalImage.src = imageData.dataset.image || imageData.src;
        modalDescription.textContent = imageData.dataset.description;
        modalButton.href = imageData.dataset.detailsLink;
        modalTitle.textContent = imageData.dataset.title;
        modalPrice.textContent = imageData.dataset.price ? `S/ ${imageData.dataset.price}` : "";

        // 🔁 Evento correcto que se asigna cada vez que se abre el modal
        const btnAgregarCarrito = document.querySelector(".btn-cart");
        btnAgregarCarrito.onclick = () => {
            const titulo = modalTitle.textContent;
            const imagen = modalImage.src;
            const precioRaw = modalPrice.textContent;
            const precio = precioRaw.replace("S/ ", "");

            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            const yaExiste = carrito.some(j => j.titulo === titulo);
            if (!yaExiste) {
                carrito.push({ titulo, imagen, precio });
                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert(`"${titulo}" se ha añadido al carrito`);
            } else {
                alert(`"${titulo}" ya está en el carrito`);
            }

            console.log("Evento disparado con juego:", titulo); // para pruebas
        };
    }

    function cerrarModal() {
        const modal = document.getElementById("modal");
        modal.classList.remove("show");
        document.body.classList.remove("modal-open", "bloqueado"); // 🔓 RESTAURA INTERACCIÓN
    }

    document.querySelectorAll(".close-btn").forEach((btn) => {
        btn.addEventListener("click", cerrarModal);
    });

    window.addEventListener("click", (event) => {
        if (event.target === document.getElementById("modal")) cerrarModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") cerrarModal();
    });

    // --- CARRUSEL POPULARES AUTO ---
    function iniciarCarruselPopulares() {
        const track = document.getElementById("carrusel-populares");
        const slides = track.querySelectorAll(".videojuego-popular");
        if (!track || slides.length === 0) return;

        let index = 0;
        setInterval(() => {
            index = (index + 1) % slides.length;
            track.style.transform = `translateX(-${index * 100}%)`;
        }, 5000);
    }

    // --- FETCH DE DATOS Y CARGA ---
    fetch("../../juegos.json")
        .then((res) => res.json())
        .then((data) => {
            mostrarPopulares(
                data.accion,
                data.aventura,
                data.simulacion,
                data.estrategia,
                data.mundoabierto
            );
            iniciarCarruselPopulares();

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

    // --- FUNCIONES DE CARGA ---
    function mostrarPopulares(...listas) {
        const contenedor = document.getElementById("carrusel-populares");
        if (!contenedor) return;

        contenedor.innerHTML = "";

        const juegosPopulares = listas.flat().filter(j => j.categorias?.includes("popular"));

        juegosPopulares.slice(0, 5).forEach((juego) => {
            const div = document.createElement("div");
            div.classList.add("videojuego-popular");

            const imagenVisible = juego.imagenBanner || juego.imagen;

            div.innerHTML = `
                <div class="game-card">
                    <img 
                        src="${imagenVisible}" 
                        alt="${juego.titulo}" 
                        class="image-banner"
                        data-title="${juego.titulo}" 
                        data-description="${juego.descripcion}" 
                        data-details-link="${juego.detalle}"
                        data-image="${juego.imagen}"
                        data-price="${juego.precio}"
                        onload="ajustarImagenCarrusel(this)"
                    >
                    <div class="hover-card">
                        <h3>${juego.titulo}</h3>
                        <p>${juego.descripcion.split(" ").slice(0, 20).join(" ")}...</p>
                        <a class="ver-mas" href="${juego.detalle}">Ver más</a>
                    </div>
                </div>
            `;
            contenedor.appendChild(div);
        });
    }

    function mostrarJuegos(lista, contenedorId, claseImg) {
        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) return;

        lista.slice(0, 10).forEach((juego) => {
            const div = document.createElement("div");
            const esPopular = contenedorId === "videojuegos-populares";
            div.classList.add(esPopular ? "videojuego-popular" : "videojuego");

            const categoriasHTML = (juego.categorias || [])
                .slice(0, 3)
                .map((cat) => `<span class="tag">${cat}</span>`)
                .join("");

            const imagenHTML = `
                <img src="${juego.imagen}" 
                    class="${claseImg}"
                    alt="Videojuego-${juego.id}"
                    data-title="${juego.titulo}"
                    data-description="${juego.descripcion}"
                    data-details-link="${juego.detalle}"
                    data-image="${juego.imagen}"
                    data-price="${juego.precio}"
                    onload="ajustarImagenCarrusel(this)">
            `;

            div.innerHTML = `
                <div class="game-card">
                    ${imagenHTML}
                    <div class="hover-card">
                        <h3>${juego.titulo}</h3>
                        <p>${juego.descripcion.split(" ").slice(0, 20).join(" ")}...</p>
                        <div class="categorias">${categoriasHTML}</div>
                        <a class="ver-mas" href="${juego.detalle}">Ver más</a>
                    </div>
                </div>`;

            contenedor.appendChild(div);
        });
    }

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

    // --- HEADER SCROLL FIX ---
    const header = document.querySelector("header");
    function updateHeaderScrollState() {
        if (window.scrollY > 0) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    if (header) {
        updateHeaderScrollState();
        window.addEventListener("scroll", updateHeaderScrollState);
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


    document.querySelector(".btn-wishlist").addEventListener("click", () => {
        const titulo = document.getElementById("modal-title").textContent;
        alert(`"${titulo}" se ha añadido a la lista de deseados`);
        // Lógica para agregar a deseados
    });
    // --- CARRITO DE COMPRAS ---
    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    }

    function guardarCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function renderizarCarrito() {
        const contenedor = document.querySelector(".carrito-lista");
        const resumen = document.querySelector(".carrito-resumen");

        if (!contenedor || !resumen) return;

        const carrito = obtenerCarrito();
        contenedor.innerHTML = "";

        if (carrito.length === 0) {
            contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
            resumen.innerHTML = "";
            return;
        }

        let total = 0;

        carrito.forEach((juego, index) => {
            total += parseFloat(juego.precio);

            const item = document.createElement("div");
            item.classList.add("carrito-item");

            item.innerHTML = `
                <img src="${juego.imagen}" alt="${juego.titulo}">
                <div>
                    <h4>${juego.titulo}</h4>
                    <p>S/ ${juego.precio}</p>
                </div>
                <button data-index="${index}">Eliminar</button>
            `;

            contenedor.appendChild(item);
        });

        resumen.innerHTML = `
            <h3>Total: S/ ${total.toFixed(2)}</h3>
            <button class="btn-comprar">Comprar</button>
        `;

        // Eventos eliminar
        contenedor.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                const carrito = obtenerCarrito();
                carrito.splice(index, 1);
                guardarCarrito(carrito);
                renderizarCarrito();
            });
        });

        // Evento comprar
        resumen.querySelector(".btn-comprar").addEventListener("click", () => {
            alert("¡Gracias por tu compra!");
            localStorage.removeItem("carrito");
            renderizarCarrito();
        });
    }

    // --- AGREGAR JUEGO AL CARRITO DESDE MODAL ---
    const btnAgregarCarrito = document.querySelector(".btn-cart");
    if (btnAgregarCarrito) {
        btnAgregarCarrito.addEventListener("click", () => {
            const titulo = document.getElementById("modal-title").textContent;
            const imagen = document.getElementById("modal-image").src;
            const precioRaw = document.getElementById("modal-price").textContent;
            const precio = precioRaw.replace("S/ ", "");

            const carrito = obtenerCarrito();

            const yaExiste = carrito.some(j => j.titulo === titulo);
            if (!yaExiste) {
                carrito.push({ titulo, imagen, precio });
                guardarCarrito(carrito);
                alert(`"${titulo}" se ha añadido al carrito`);
            } else {
                alert(`"${titulo}" ya está en el carrito`);
            }
        });
    }


    // --- MOSTRAR CARRITO SI ESTAMOS EN carrito.html ---
    if (document.querySelector(".carrito-lista") && document.querySelector(".carrito-resumen")) {
        renderizarCarrito();
    }

});


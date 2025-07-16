export function inicializarUsuario() {
    const user = JSON.parse(localStorage.getItem("usuario"));
    const isLogged = !!(user && user.username?.trim());

    const loginIcon = document.getElementById("login-icon");
    const userMenu  = document.getElementById("userMenu");
    const userBtn   = document.getElementById("userButton");
    const logoutBtn = document.getElementById("logoutButton");
    const nameLbl   = document.getElementById("usernameDisplay");

    // Estado inicial de íconos y menú
    toggle(loginIcon, !isLogged);
    toggle(userMenu,  isLogged);
    if (isLogged && nameLbl) nameLbl.textContent = user.username;
    if (!isLogged) userMenu?.classList.remove("open");

    // Eventos menú usuario
    userBtn?.addEventListener("click", () => userMenu?.classList.toggle("open"));

    document.addEventListener("click", e => {
        if (userMenu && !userMenu.contains(e.target) && e.target !== userBtn) {
            userMenu.classList.remove("open");
        }
    });

    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = "../../index.html";
    });

    loginIcon?.addEventListener("click", () => {
        localStorage.setItem("lastVisitedURL", window.location.href);
        window.location.href = "../../login/iniciarsesion.html";
    });

    procesarFormularioLogin();
    procesarFormularioRegistro();
}

// Manejo del formulario de inicio de sesión
function procesarFormularioLogin() {
    const form = document.getElementById("form-login");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const username = form.username.value.trim();
        if (username === "") {
            alert("Ingresa un nombre de usuario");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const encontrado = usuarios.find(u => u.username === username);

        if (!encontrado) {
            alert("Usuario no encontrado. Regístrate primero.");
            return;
        }

        localStorage.setItem("usuario", JSON.stringify({ username }));
        const destino = localStorage.getItem("lastVisitedURL") || "../../index.html";
        window.location.href = destino;
    });
}

// Manejo del formulario de registro
function procesarFormularioRegistro() {
    const form = document.getElementById("form-registro");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const fullName        = form["full-name"].value.trim();
        const username        = form["username"].value.trim();
        const email           = form["email"].value.trim();
        const birthdate       = form["birthdate"].value;
        const password        = form["password"].value;
        const confirmPassword = form["confirm-password"].value;

        if (!fullName || !username || !email || !birthdate || !password || !confirmPassword) {
            alert("Por favor completa todos los campos");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const yaExiste = usuarios.find(u => u.username === username || u.email === email);

        if (yaExiste) {
            alert("Ya existe un usuario con ese nombre o correo");
            return;
        }

        usuarios.push({ fullName, username, email, birthdate, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        localStorage.setItem("usuario", JSON.stringify({ username }));

        let destino = localStorage.getItem("lastVisitedURL") || "../../index.html";

        // Asegurarse de no redirigir al formulario de login o registro
        if (destino.includes("iniciarsesion") || destino.includes("registro")) {
            destino = "../../index.html";
        }

        alert("¡Cuenta creada exitosamente! Redirigiendo...");
        window.location.href = destino;

    });
}

// Helper para mostrar u ocultar elementos
function toggle(el, show) {
    if (!el) return;
    el.style.display       = show ? "inline-block" : "none";
    el.style.visibility    = show ? "visible"      : "hidden";
    el.style.pointerEvents = show ? "auto"         : "none";
}

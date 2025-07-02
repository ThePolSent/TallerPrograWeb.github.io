export function inicializarUsuario() {
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
            if (usernameDisplay) usernameDisplay.textContent = user;
        }
    } else {
        if (loginIcon) loginIcon.style.display = "block";
        if (userMenu) userMenu.style.display = "none";
    }

    if (userButton) {
        userButton.addEventListener("click", () => {
            const submenu = userMenu?.querySelector(".submenu");
            if (submenu) submenu.classList.toggle("open");
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
            window.location.href = "../../login/iniciarsesion.html";
        });
    }
}

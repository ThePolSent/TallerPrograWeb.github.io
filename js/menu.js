export function inicializarMenuDesplegable() {
    document.querySelectorAll(".has-submenu > a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const parentLi = e.currentTarget.parentElement;
            document.querySelectorAll(".has-submenu").forEach((item) => {
                if (item !== parentLi) item.classList.remove("open");
            });
            parentLi.classList.toggle("open");
        });
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
}

export function inicializarSidebar() {
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

    document.querySelectorAll(".collapsible-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const section = btn.closest(".collapsible-section");
            if (section) section.classList.toggle("open");
        });
    });
}

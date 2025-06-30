export function inicializarTema() {
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;
    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "oscuro") {
        body.classList.add("dark-mode");
        if (themeIcon) themeIcon.setAttribute("name", "sunny-outline");
    } else {
        if (themeIcon) themeIcon.setAttribute("name", "moon-outline");
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const esOscuro = body.classList.toggle("dark-mode");
            localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
            if (themeIcon) themeIcon.setAttribute("name", esOscuro ? "sunny-outline" : "moon-outline");
        });
    }
}

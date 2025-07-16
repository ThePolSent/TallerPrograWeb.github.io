document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        const username = form.username.value.trim();

        if (username === "") {
        alert("Ingresa un nombre de usuario");
        return;
        }

        localStorage.setItem("usuario", JSON.stringify({ username }));
        const destino = localStorage.getItem("lastVisitedURL") || "../../index.html";
        window.location.href = destino;
    });
});

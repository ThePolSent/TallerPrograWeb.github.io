document.addEventListener("DOMContentLoaded", () => {
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

        // Guardar el nuevo usuario
        usuarios.push({
            fullName,
            username,
            email,
            birthdate,
            password, // ⚠️ ¡No seguro para producción!
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
        window.location.href = "../../login/principaliniciosesion/iniciarsesion.html";
    });
});

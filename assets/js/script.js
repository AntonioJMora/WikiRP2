const personajes = [
    "Ellie Ashford",
    "Liv Dawson"
];

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const radios = document.querySelectorAll('input[name="boton"]');

    if (!form || !radios.length) return;

    // Contenedor dinámico para los campos del formulario
    const contenedor = document.createElement("div");
    contenedor.id = "campos_dinamicos";
    form.appendChild(contenedor);

    // Botón enviar
    const botonEnviar = document.createElement("button");
    botonEnviar.type = "submit";
    botonEnviar.textContent = "Enviar datos";
    form.appendChild(botonEnviar);

    // Cargar campos iniciales (añadir viene checked por defecto)
    mostrarCampos("añadir", contenedor);

    // Escuchar cambio de radio
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            mostrarCampos(radio.value, contenedor);
        });
    });

    // Enviar formulario
    form.addEventListener("submit", e => {
        e.preventDefault();
        mostrarBannerExito(form);
    });

});


/* MOSTRAR CAMPOS SEGÚN RADIO*/

const mostrarCampos = (tipo, contenedor) => {
    contenedor.innerHTML = "";

    if (tipo === "añadir") {
        contenedor.appendChild(crearFormularioAñadir());
    }

    if (tipo === "modificar") {
        contenedor.appendChild(crearFormularioModificar());
    }
};


const crearFormularioAñadir = () => {
    const fieldset = document.createElement("fieldset");

    fieldset.innerHTML = `
        <legend>Datos del personaje</legend>

        <label for="pj_nombre">Nombre</label>
        <input type="text" id="pj_nombre" required placeholder = "Nombre del personaje">

        <label for="pj_apodo">Apodo</label>
        <input type="text" id="pj_apodo" placeholder = "Apodo del personaje">

        <label for="pj_fecha_nac">Fecha de nacimiento</label>
        <input type="date" id="pj_fecha_nac">

        <label for="pj_edad">Fecha de nacimiento</label>
        <input type="number" id="pj_edad" min="0" max="120" placeholder = "Fecha de nacimiento">

        <label for="pj_estatura">Estatura</label>
        <input type="text" id="pj_estatura" placeholder = "Por ejemplo: 1.70 m">

        <label for="pj_sexualidad">Sexualidad</label>
        <input type="text" id="pj_sexualidad" placeholder = "Por ejemplo: Hetero">

        <label for="pj_historia">Historia</label>
        <textarea id="pj_historia" rows="4" placeholder = "Introduce la historia de tu personaje o un breve resumen"></textarea>

        <label for="pj_descripcion_fisica">Descripción física</label>
        <textarea id="pj_descripcion_fisica" rows="4" placeholder = "Como es, si tiene cicatrices, si tiene tatuajes, etc."></textarea>

        <label for="pj_personalidad">Personalidad</label>
        <textarea id="pj_personalidad" rows="3" placeholder = "Por ejemplo: Cabezota"></textarea>

        <label for="pj_curiosidades">Curiosidades</label>
        <textarea id="pj_curiosidades" rows="3" placeholder = "Curiosidades del personaje"></textarea>

        <label for="pj_relaciones">Relaciones</label>
        <textarea id="pj_relaciones" rows="3" placeholder = "Relaciones del personaje, puedes poner sentimentales o de amistades (especifica que tipo de relacion es)"></textarea>

        <label for="pj_foto">Foto (URL)</label>
        <input type="text" id="pj_foto" placeholder = "Introduce una URL">
    `;

    return fieldset;
};

const crearFormularioModificar = () => {
    const fs = document.createElement("fieldset");
    fs.id = "fieldset_modificar";

    const opciones = personajes
        .map(nombre => `<option value="${nombre}">${nombre}</option>`)
        .join("");

    fs.innerHTML = `
        <legend>Datos del personaje a modificar</legend>

        <label for="pj_selector">Selecciona el personaje</label>
        <select id="pj_selector">
            <option value="">-- Selecciona un personaje --</option>
            ${opciones}
        </select>

        <p class="aviso_modificar">Solo rellena los campos que quieras modificar.</p>

        <fieldset class="fieldset_interno">
            <label for="mod_nombre">Nombre</label>
            <input type="text" id="mod_nombre" placeholder="Nuevo nombre">

            <label for="mod_apodo">Apodo</label>
            <input type="text" id="mod_apodo" placeholder="Nuevo apodo">

            <label for="mod_fecha_nac">Fecha de nacimiento</label>
            <input type="date" id="mod_fecha_nac">

            <label for="mod_estatura">Estatura</label>
            <input type="text" id="mod_estatura" placeholder="Nueva estatura">

            <label for="mod_sexualidad">Sexualidad</label>
            <input type="text" id="mod_sexualidad" placeholder="Nueva sexualidad">

            <label for="mod_historia">Historia breve</label>
            <textarea id="mod_historia" rows="3" placeholder="Nueva historia..."></textarea>

            <label for="mod_descripcion_fisica">Descripción física</label>
            <textarea id="mod_descripcion_fisica" rows="3" placeholder="Nueva descripción física..."></textarea>

            <label for="mod_personalidad">Personalidad</label>
            <textarea id="mod_personalidad" rows="3" placeholder="Nueva personalidad..."></textarea>

            <label for="mod_curiosidades">Curiosidades</label>
            <textarea id="mod_curiosidades" rows="3" placeholder="Nuevas curiosidades..."></textarea>

            <label for="mod_relaciones">Relaciones</label>
            <textarea id="mod_relaciones" rows="3" placeholder="Nuevas relaciones..."></textarea>

            <label for="mod_foto">Foto (URL o ruta)</label>
            <input type="text" id="mod_foto" placeholder="Nueva URL">
        </fieldset>
    `;

    return fs;
};

const mostrarBannerExito = (form) => {
    const radioActivo = document.querySelector('input[name="boton"]:checked');
    const accion = radioActivo?.value === "añadir" ? "añadir un personaje" : "modificar un personaje";

    // Eliminar banner anterior si existe
    document.getElementById("banner_exito")?.remove();

    const banner = document.createElement("div");
    banner.id = "banner_exito";
    banner.className = "banner_exito";
    banner.innerHTML = `
        Tu solicitud para <strong>${accion}</strong> ha sido enviada correctamente. ¡Gracias!
        <button class="banner_cerrar" id="btn_cerrar_banner">✕</button>
    `;
// Insertar al principio del body, antes de todo
    document.body.insertBefore(banner, document.body.firstChild);

    // Botón para cerrar manualmente
    document.getElementById("btn_cerrar_banner").addEventListener("click", () => {
        banner.remove();
    });

    form.reset();

    const contenedor = document.getElementById("campos_dinamicos");
    if (contenedor) mostrarCampos("añadir", contenedor);

    // Desaparece automáticamente tras 5 segundos
    setTimeout(() => {
        banner.classList.add("banner_salida");
        banner.addEventListener("animationend", () => banner.remove());
    }, 5000);
}
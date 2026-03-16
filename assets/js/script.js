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
};


let grupos = [
    {
        id: 1,
        nombre: "ITP",
        descripcion: "Industrias Trevol Philips, o también conocido como ITP, es un grupo criminal del norte, asentado a las afueras de Sandy.",
        servidor: "InfamesRP",
        estado: "Disuelto",
        foto: "assets/imagenes/imagenes_grupos/itp-reunion.png"
    },
    {
        id: 2,
        nombre: "Ultimate Extasis",
        descripcion: " Este grupo fue creado en la última versión de InfamesRP y llevado hasta el Legacy para seguir con la historia de sus personajes. Los primeros miembros fueron Aiko, Tamy, Kai, Kendrick, Clancy y Noah.",
        servidor: "InfamesRP",
        estado: "Disuelto",
        foto: "assets/imagenes/imagenes_grupos/the-ultimate.png"
    },
    {
        id: 3,
        nombre: "The Lost",
        descripcion: "The Lost MC es un grupo motero que se mueve por la Ruta 68, en Sandy. Estos estaban asentados en unas carabanas al sur del lago. En su momento de elevarse su presidente fue James Scott, más conocido como M.",
        servidor: "InfamesRP",
        estado: "Disuelto",
        foto: "assets/imagenes/imagenes_grupos/The_Lost_logo.png"
    }
];
let filtroGrupos = "todos";

const initGestorGrupos = () => {
    const section = document.querySelector(".lista_diccionario");
    if (!section) return;

    // Crear contenedor del gestor debajo del section existente
    const gestor = document.createElement("div");
    gestor.id = "gestor_grupos";
    gestor.innerHTML = `
        <h2>Añadir grupo criminal</h2>

        <form id="form_grupos" novalidate>
            <fieldset>
                <legend>Datos del grupo</legend>

                <label for="grp_nombre">Nombre</label>
                <input type="text" id="grp_nombre" placeholder="Nombre del grupo" autocomplete="off">
                <span class="error_msg" id="err_grp_nombre"></span>

                <label for="grp_descripcion">Descripción</label>
                <textarea id="grp_descripcion" rows="3" placeholder="Descripción breve del grupo"></textarea>
                <span class="error_msg" id="err_grp_descripcion"></span>

                <label for="grp_servidor">Servidor</label>
                <select id="grp_servidor">
                    <option value="">-- Selecciona un servidor --</option>
                    <option value="InfamesRP">InfamesRP</option>
                    <option value="ONX ESP">ONX ESP</option>
                    <option value="Dominio Roleplay">Dominio Roleplay</option>
                </select>
                <span class="error_msg" id="err_grp_servidor"></span>

                <label for="grp_estado">Estado</label>
                <select id="grp_estado">
                    <option value="">-- Selecciona un estado --</option>
                    <option value="Activo">Activo</option>
                    <option value="Disuelto">Disuelto</option>
                </select>
                <span class="error_msg" id="err_grp_estado"></span>

                <label for="grp_foto">Foto (URL)</label>
                <input type="text" id="grp_foto" placeholder="URL de la imagen" autocomplete="off">

                <div class="input_button">
                    <button type="submit" id="btn_añadir_grupo">Añadir grupo</button>
                </div>
            </fieldset>
        </form>

        <div class="filtros_grupos">
            <button class="filtro_grp_btn activo_filtro" data-filtro="todos">Todos</button>
            <button class="filtro_grp_btn" data-filtro="Activo">Activos</button>
            <button class="filtro_grp_btn" data-filtro="Disuelto">Disueltos</button>
            <button class="filtro_grp_btn" data-filtro="InfamesRP">InfamesRP</button>
            <button class="filtro_grp_btn" data-filtro="ONX ESP">ONX ESP</button>
            <button class="filtro_grp_btn" data-filtro="Dominio Roleplay">Dominio Roleplay</button>
        </div>

        <div id="galeria_grupos"></div>
    `;

    section.parentNode.insertBefore(gestor, section.nextSibling);

    initValidacionGrupos();
    initFiltrosGrupos();
    renderGaleriaGrupos();
};

// ── Validación en tiempo real ─────────────────────────────────
const camposGrupos = [
    { inputId: "grp_nombre",      errorId: "err_grp_nombre" },
    { inputId: "grp_descripcion", errorId: "err_grp_descripcion" },
    { inputId: "grp_servidor",    errorId: "err_grp_servidor" },
    { inputId: "grp_estado",      errorId: "err_grp_estado" }
];

const initValidacionGrupos = () => {
    camposGrupos.forEach(({ inputId, errorId }) => {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (!input || !error) return;

        input.addEventListener("input", () => validarCampoGrupo(input, error));
        input.addEventListener("change", () => validarCampoGrupo(input, error));
    });

    document.getElementById("form_grupos")?.addEventListener("submit", e => {
        e.preventDefault();

        const todoValido = camposGrupos.every(({ inputId, errorId }) => {
            const input = document.getElementById(inputId);
            const error = document.getElementById(errorId);
            return validarCampoGrupo(input, error);
        });

        if (!todoValido) return;

        const nuevoGrupo = {
            id: Date.now(),
            nombre: document.getElementById("grp_nombre").value.trim(),
            descripcion: document.getElementById("grp_descripcion").value.trim(),
            servidor: document.getElementById("grp_servidor").value,
            estado: document.getElementById("grp_estado").value,
            foto: document.getElementById("grp_foto").value.trim()
        };

        grupos.push(nuevoGrupo);
        document.getElementById("form_grupos").reset();
        camposGrupos.forEach(({ inputId, errorId }) => {
            document.getElementById(inputId)?.classList.remove("input_ok", "input_error");
            document.getElementById(errorId).textContent = "";
        });

        filtroGrupos = "todos";
        document.querySelectorAll(".filtro_grp_btn").forEach(b => b.classList.remove("activo_filtro"));
        document.querySelector('.filtro_grp_btn[data-filtro="todos"]')?.classList.add("activo_filtro");

        renderGaleriaGrupos();
        document.getElementById("galeria_grupos")?.scrollIntoView({ behavior: "smooth" });
    });
};

const validarCampoGrupo = (input, errorEl) => {
    const valor = input.value.trim();
    if (!valor) {
        errorEl.textContent = "Este campo es obligatorio.";
        input.classList.add("input_error");
        input.classList.remove("input_ok");
        return false;
    }
    errorEl.textContent = "";
    input.classList.remove("input_error");
    input.classList.add("input_ok");
    return true;
};

// ── Filtros ───────────────────────────────────────────────────
const initFiltrosGrupos = () => {
    document.querySelectorAll(".filtro_grp_btn").forEach(btn => {
        btn.addEventListener("click", ({ target }) => {
            document.querySelectorAll(".filtro_grp_btn").forEach(b => b.classList.remove("activo_filtro"));
            target.classList.add("activo_filtro");
            filtroGrupos = target.dataset.filtro;
            renderGaleriaGrupos();
        });
    });
};

// ── Galería ───────────────────────────────────────────────────
const renderGaleriaGrupos = () => {
    const galeria = document.getElementById("galeria_grupos");
    if (!galeria) return;

    const filtrados = filtroGrupos === "todos"
        ? grupos
        : grupos.filter(g => g.estado === filtroGrupos || g.servidor === filtroGrupos);

    if (filtrados.length === 0) {
        galeria.innerHTML = `<p class="sin_resultados">No hay grupos en esta categoría.</p>`;
        return;
    }

    galeria.innerHTML = "";

    filtrados.forEach(({ id, nombre, descripcion, servidor, estado, foto }) => {
        const card = document.createElement("article");
        card.className = "card_grupo";
        card.dataset.id = id;

        const imgHTML = foto
            ? `<img src="${foto}" alt="Logo de ${nombre}">`
            : `<div class="sin_imagen">Sin imagen</div>`;

        card.innerHTML = `
            <div class="card_grupo_header">
                <h3>${nombre}</h3>
                <span class="badge_categoria badge_${estado}">${estado}</span>
            </div>
            <p>${descripcion}</p>
            <p class="card_grupo_servidor">📍 ${servidor}</p>
            ${imgHTML}
            <button class="btn_eliminar_grupo" data-id="${id}">🗑 Eliminar</button>
        `;

        galeria.appendChild(card);
    });

    document.querySelectorAll(".btn_eliminar_grupo").forEach(btn => {
        btn.addEventListener("click", ({ target }) => {
            const id = Number(target.dataset.id);
            grupos = grupos.filter(g => g.id !== id);
            renderGaleriaGrupos();
        });
    });
};

// ── Inicializar si estamos en grupos.html ─────────────────────
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".lista_diccionario")) {
        initGestorGrupos();
    }
});
// Inicializa Firestore
var db = firebase.apps[0].firestore();
window.onload = iniciarTemporizadorInactividad;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Referencias a los campos del formulario
const signoInput = document.querySelector('#signo');
const rangoInput = document.querySelector('#rango');
const elementoSelect = document.querySelector('#elemento');
const astroInput = document.querySelector('#astro');
const piedraInput = document.querySelector('#piedra');
const btnGuardar = document.querySelector('#btnGuardar');

// Cargar los datos del documento en los campos del formulario
db.collection("datosZodiaco").doc(id).get()
    .then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            // Asignar valores a los campos del formulario
            signoInput.value = data.signo || "";
            rangoInput.value = data.rango || "";
            elementoSelect.value = data.elemento || "";
            astroInput.value = data.astro || "";
            piedraInput.value = data.piedra || "";
        } else {
            console.error("No se encontró el documento.");
            alert("Documento no encontrado.");
        }
    })
    .catch((error) => {
        console.error("Error al obtener el documento:", error);
    });

// Validación del formulario antes de guardar
function validarFormulario() {
    if (
        signoInput.value.trim() === "" &&
        rangoInput.value.trim() === "" &&
        elementoSelect.value === "" &&
        astroInput.value.trim() === "" &&
        piedraInput.value.trim() === ""
    ) {
        alert("Por favor, complete al menos un campo.");
        return false;
    }
    return true;
}

btnGuardar.addEventListener('click', () => {
    if (validarFormulario()) {
        const signoActualizado = signoInput.value.trim();
        const rangoActualizado = rangoInput.value.trim();
        const elementoActualizado = elementoSelect.value;
        const astroActualizado = astroInput.value.trim();
        const piedraActualizado = piedraInput.value.trim();

        
        actualizarDatos(signoActualizado, rangoActualizado, elementoActualizado, astroActualizado, piedraActualizado);
    }
});

// Función para actualizar los datos en Firestore
function actualizarDatos(signo, rango, elemento, astro, piedra) {
    db.collection("datosZodiaco").doc(id).update({
        signo: signo || " ",
        rango: rango || " ",
        elemento: elemento || " ",
        astro: astro || " ",
        piedra: piedra || " "
    })
    .then(() => {
       
        document.location.href = 'lista.html'; //no redirige ni idea pq
    })
    .catch((error) => {
        console.error("Error al actualizar el documento:", error);
        alert("Error al actualizar los datos: " + error.message);
    });
}


// Cerrar sesión después de 3 minutos de inactividad
function iniciarTemporizadorInactividad() {
    clearTimeout(timeoutInactividad);
    //  temporizador de 3 minutos (180,000 ms)
    timeoutInactividad = setTimeout(() => {
        cerrarSesion();
    }, 180000);
}

// (clics o movimiento del ratón)
document.addEventListener('mousemove', iniciarTemporizadorInactividad);
document.addEventListener('click', iniciarTemporizadorInactividad);

// Cerrar sesión del usuario
function cerrarSesion() {
    auth.signOut().then(() => {
        alert("Sesión cerrada por inactividad.");
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
}

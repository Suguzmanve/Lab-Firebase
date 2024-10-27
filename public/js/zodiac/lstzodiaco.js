var db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query){
    tabla.innerHTML="";
    var salida = "";
    query.forEach(function(doc){
        salida += '<div class="divAnuncio m-3">'
            salida += '<div class="imgBlock"><a href="editarsigno.html?id=' + doc.id + '"><img src="' + doc.data().url + '" width="100%" /></a></div>'
            salida += '<div>'+ doc.data().signo + '<br/>' + doc.data().rango + '<br/>'+ doc.data().elemento + '<br/>' + doc.data().astro + '<br/>' + doc.data().piedra + '</div><br/>'
        salida += '</div>'
    })
    tabla.innerHTML = salida;
})

window.onload = iniciarTemporizadorInactividad;


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

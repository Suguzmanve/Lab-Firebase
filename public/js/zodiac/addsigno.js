// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtArchi = document.querySelector('#txtArchi');
const elemento = document.querySelector('#elemento'); //tomar elemento, astro y piedra
const astro = document.querySelector('#astro');
const piedra = document.querySelector('#piedra');
const btnLoad  = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function(){
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if(archivo == null){
        alert('Debe seleccionar una imagen');
    }else{
        const metadata = {
            contentType : archivo.type
        }
        const subir = container.child('zodiaco/'+nomarch).put(archivo, metadata);
        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then( url =>{
                db.collection("datosZodiaco").add({
                    "posic" : parseInt(txtPosic.value),
                    "signo" : txtSigno.value,
                    "rango" : txtRango.value,
                    "url"   : url,
                    "elemento":elemento.value,
                    "astro":astro.value,
                    "piedra":piedra.value
                }).then(function(docRef) {
                    alert("ID del registro: " + docRef.id);
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al subir la imagen: " + FirebaseError);
                });
            });
    }
});

function limpiar(){
    txtPosic.value = ''
    txtSigno.value = '';
    txtRango.value = '';
    txtArchi.value = '';
    txtPosic.focus();
}

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

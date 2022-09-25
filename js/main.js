"use strict";

// Variables
let search = document.getElementById('search');
let btn = document.querySelector('.from__btn');
let load = document.querySelector('.loader');
let search_dni = "";

// limpiar input
window.addEventListener("load", function () {
     search.value = "";
});

// bloquear opcion de pegar en el input
search.addEventListener("paste", function (e) {
    e.preventDefault();
});

// bloquear opcion de copiar en el input
search.addEventListener("copy", function (e) {
    e.preventDefault();
});

//funcion para que el input text solo recibirá numeros
 function validaNumericos(event) {
     if (event.charCode >= 48 && event.charCode <= 57) {

            if (search.value.length<8) {    
                input_valid(search.value.length);
                    return true;
            } else {             
                    return false;
                }

      }else{
        return false;
      }

}

//VALIDAR QUE SOLO SE INGRESEN 7 CARACTERES
function input_valid (params) {

    if (params== 7) {
        document.querySelector('.from__input').style = "border-bottom: 2px solid var(--color2);";
        
    } else {
        document.querySelector('.from__input').style = " border-bottom: 2px solid var(--color5); color: var(--color5);";
    }

}

//acciones a ejecutar dando click
btn.addEventListener("click", function () {
    
     setTimeout(() => {// tiempo de ejecucion del load
        load.style = "display: flex;";//habilitar el load
        load.innerHTML = '<div class="loader__spiner"></div>';//crear elemento dentro del load  
     }, 1000);
    
     setTimeout(() => {// mostrara la ventana de los datos
        carga_data();
    }, 2000);
   
    
});

//mostar el archivo json
function carga_data() {
    fetch(getJson()).then(response => response.json())
        .then(data => {
                
            if (data.dni == undefined) {
                load.style = "display: none;";//habilitar el load
                load.innerHTML = '<div class="loader__spiner"></div>';
                document.getElementById("msg").innerHTML="Ciudadano no encontrado";
                document.querySelector('.from__input').style = " border-bottom: 2px solid var(--color5); color: var(--color5);";
            } else {
                crearVentana();
                mostrarData(data);
                
            //se recargara el body
            setTimeout(() => { 
                    document.location.reload();
                }, 50000);
            }
        }).catch(error => console.log(error));    
}

//API DEL DNI
function getJson() {
    return 'https://dniruc.apisperu.com/api/v1/dni/' +search.value+ '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImprbTc4OTc1QHp3b2hvLmNvbSJ9.DIOyPMNAVeODWYyIn9zACls_Ep5B0vKVJ1KM5Zv4CfQ';
}

//ELEGIR LOS DATOS ALETORIAMENTE
function aletorio(value) {
    return Math.floor((Math.random() * (value - 1)) + 1);
}

//CARGAR LOS DATOS EN HTML
function mostrarData(datos) {
    document.getElementById('NAME').innerHTML = datos.nombres;
    document.getElementById('LASTNAME').innerHTML = datos.apellidoPaterno + " " + datos.apellidoMaterno;
    document.getElementById('DNI').innerHTML = datos.dni;

    //------------------------------------------------------- 
    document.querySelector('.num_order').textContent = "N° de Orden: " + aletorio(200);

    //-------------------------------------------------------
    document.getElementById('hora').innerHTML = horario(search.value.charAt(7));

    //-------------------------------------------------------
    document.querySelector('.type_voto').textContent = 'CONVENCIONAL';
    document.querySelector('.mesa').textContent =
        'N° de Mesa de Sufragio: 0' + aletorio(99999);
    //-------------------------------------------------------
    database(aletorio(200));//registro del lugar de votación
}

//CREAR LA VENTANA
function crearVentana() {
    document.body.removeChild(document.querySelector('.form'));
    document.body.removeChild(document.querySelector('.loader'));
     document.body.innerHTML = `
   
    <div class="modal" id="shared" ></div>

    <div class="container" >
        <div class="col">
            <h1 class="col_welcon">Bienvenido(A)</h1>
            <span class="type col_lbl" >No es miembro de mesa</span>
            <span class="col_lbl">Nombres:</span>
            <span class="name col_lbl" id="NAME"></span>
            <span class="col_lbl">Apellidos:</span>
            <span class="lastname col_lbl" id="LASTNAME"></span>
            <span class="col_lbl">DNI:</span>
            <span class="dni col_lbl" id="DNI"></span>
            <a href="https://cvae.eleccionesgenerales2021.pe/" class="col_btn col_btn1"><i class="fas fa-laptop"></i>  Capacítate</a>
            <a class="col_btn col_btn2" onclick="create_modal()"><i class="fas fa-share-alt"></i>  Comparte</a>
            <a class="col_btn col_btn2" onclick="PDFtoPrint()"> <i class="fas fa-print"></i>  Imprime</a>
        </div>
        <div class="col">
                <span class="region col_lbl"></span>
                <span class="col_lbl">Tipo de voto:</span>
                <span class="col_lbl type_voto"></span>
                
                <span class="col_lbl mesa"></span>
                <span class="num_order col_lbl"></span>
                <span class="col_lbl ">Horario:</span>
                <span class="hora col_lbl" id="hora"></span>
                
                <span class="col_lbl">Local de Votación:</span>
                <span class="col_lbl local"></span>
                <span class="col_lbl">Dirección:</span>
                <span class="col_lbl address"></span>
                <span class="col_lbl">Referencia:</span>
                <span class="col_lbl reference" ></span>             
        </div>
    </div>`;
}

//SELECIONARL EL HORARIO DE VOTACION
function horario(params) {
    if (params == "1") {
        return "DE 9 A 10 A. M.";
    } else if (params == "2") {
        return "DE 10 A 11 A. M.";
    } else if (params == "3") {
        return "DE 11 A 12 P. M.";
    } else if (params == "4") {
        return "DE 12 A 1 P. M.";
    } else if (params == "5") {
        return "DE 1 A 2 P. M.";
    } else if (params == "6") {
        return "DE 2 A 3 P. M.";
    } else if (params == "7") {
        return "DE 3 A 4 P. M.";
    } else if (params == "8") {
        return "DE 4 A 5 P. M.";
    } else if (params == "9") {
        return "DE 5 A 6 P. M.";
    } else if (params == "0") {
        return "DE 6 A 7 P. M.";
    } else {
        return "ERROR";
    }
}

//INSERCION DE LOS DATOS 
function database(key) {
    document.querySelector('.type').textContent = datos_json.databd[key].type;
    document.querySelector('.region').textContent = datos_json.databd[key].region;
    document.querySelector('.local').textContent = datos_json.databd[key].local;
    document.querySelector('.address').textContent = datos_json.databd[key].direccion;
    document.querySelector('.reference').textContent = datos_json.databd[key].referencia;
}

//IMPRIMIR LA VENTANA EN PDF
function PDFtoPrint(){
    window.print();
}

//crear una ventana modal
function create_modal(){

document.getElementById('shared').style = "display: flex";  
   document.getElementById('shared').innerHTML = `

    <div class="container_modal">
         <div class="modal_dispose" onclick='exit()' title="Cerrar">
                <i class="fas fa-times modal_exit"></i>
         </div>

         <div class="modal_body">

         <a target="_blank" href="http://www.facebook.com/sharer.php?u=https://obrian-code.github.io/Lugar-de-Votacion/" class="modal_social" title="Comparte en facebook"><i class="fab fa-facebook-square"></i></a>
         <a target="_blank" href="http://twitter.com/home?status=https://obrian-code.github.io/Lugar-de-Votacion//" title="Comparte en twitter" class="modal_social"><i class="fab fa-twitter-square"></i></a>
         <a target="_blank" href="https://api.whatsapp.com/send?text=https://obrian-code.github.io/Lugar-de-Votacion/" class="modal_social" title="Comparte en Whatsapp"><i class="fab fa-whatsapp-square"></i></a>

                </div>

     </div>`;

}

//CERRAR EL MODAL 
function exit() {
        document.querySelector('.modal').style = "display: none;";        
}

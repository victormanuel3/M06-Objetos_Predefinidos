//Si acierta cerrar encerta (padre) desde esta página.
//si no le da al botón compara en 7 segundos cerrar la ventana.
let heredar = window.opener;

let obtener_numero = parseInt(heredar.document.getElementById("div_numero").textContent); //numero ventana padre.

let num_intentos = 0;

function intentos(){
    num_intentos++;
}

function compara(){ //function comparación

    console.log("ENTRÓ AQUÍ")
    let ipt_numero = parseInt(document.getElementById("ipt_numero").value); //numero ventana actual.

    let message = document.getElementById("message"); //mensaje ventana actual
    
    if(ipt_numero === obtener_numero){
        message.innerText = "Haz acertado";
        window.open("Exercici02.html", "Exercici02", "width=400, height=250, left=500, top=500");
        return true;
    }else {
        message.innerText = "No haz acertado";
        window.open("Exercici02.html", "Exercici02", "width=400, height=250, left=500, top=500");
        return false;
    }
}


let timeout = window.setTimeout(window.close, 7000);

document.getElementById("btn_compara").onclick = function(){
    if (compara()) { //Si acierta
        clearTimeout(timeout); //Frenamos el temporizador.
        window.close; //Cerramos esta ventana
    }// Si no pues el contador sigue
}


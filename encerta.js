//Mientras no acierte el contador suma y cierra a los 7 segundos
let heredar = window.opener;

let obtener_numero = parseInt(heredar.document.getElementById("div_numero").textContent); //numero ventana padre.

let intents = 0;

function compara(){ //function comparación.
    console.log("ENTRÓ AQUÍ");
    intents++;
    heredar.document.getElementById("intents").innerText = `Intentos: ${intents}`;;

    let ipt_numero = parseInt(document.getElementById("ipt_numero").value); //numero ventana actual.

    let message = document.getElementById("message"); //mensaje ventana actual
    
    if(ipt_numero == obtener_numero){
        message.innerText = "Haz acertado";

        // Aquí actualizamos el mensaje en la ventana principal
        heredar.document.getElementById("message_received").innerText = message.textContent;

        window.close();
        return true;
    }else {
        message.innerText = "No haz acertado";

        // Aquí actualizamos el mensaje en la ventana principal
        heredar.document.getElementById("message_received").innerText = message.textContent;

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
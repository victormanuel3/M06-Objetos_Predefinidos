// let heredar_encerta = window.opener;
// //Obtenemos el mensaje del div de la ventana que abre esta.

// let mensaje_heredado = heredar_encerta.document.getElementById("message").textContent;

// let message = document.getElementById("message"); //Obtenemos el elemento del mensaje.
// message.innerText = mensaje_heredado; //Añadimos el mensaje de la anterior ventana a este.

// if(mensaje_heredado == 'Haz acertado'){//Si he acertado cierro la ventana anterior.
//     heredar_encerta.close(); //Cerramos la ventana que abre la actual de la cual heredamos.
// }


//------------------------------------------------------------------------------------------------

let windows = []; // Lista para almacenar las ventanas abiertas con su color
let first_window = true; // Para verificar si es la primera ventana
let count_window = 0;
let lastClickedColor = null; // Para almacenar el color de la última ventana clickeada
let lastClickedWindow = null; // Para almacenar la última ventana clickeada

function btn_start(){
    let element_countdown = document.getElementById("countdown");
    let countdown = 30;
        
    let colores = ["#BF244E", "#4A96D9", "#F2CA50", "#F27405"];
        
    let interval = setInterval(()=>{
        countdown--; //Disminuyo la cuenta atras
        element_countdown.innerHTML = countdown;
            
        //Cada 3 segundos abrir una ventana.
        if (countdown % 3 == 0){
            openNewWindow(colores);
        }

        if (countdown == 0){
            clearInterval(interval);
        }
    },1000);
            
}

function openNewWindow(colores) {
    let width = 200;
    let height = 200;
    let left, top;

    // Si es la primera ventana, se abre centrada
    if (first_window) {
        left = (window.screen.width / 2) - (width / 2);
        top = (window.screen.height / 2) - (height / 2);
        first_window = false;
    }else {
        // Para las siguientes ventanas, se abrirán en una posición aleatoria
        left = Math.random() * (window.screen.width - width);
        top = Math.random() * (window.screen.height - height);
    }

    // Seleccionar un color aleatorio
    let randomColor = colores[Math.floor(Math.random() * colores.length)];

    // Abrir la nueva ventana
    let newWindow = window.open("", "_blank", `width=${width},height=${height},top=${top},left=${left}`);
        
    if(newWindow) {
        newWindow.document.body.style.backgroundColor = randomColor; //Añadirle color de fondo
        newWindow.document.body.innerHTML = `<h1 style="color: white; font-family: monospace;">${randomColor}</h1>`;
        
        // Almacenar la ventana y su color
        windows.push({
            window: newWindow,
            color: randomColor
        });
        count_window++;
        document.getElementById("count_windows").innerText = count_window;
    }

    // Añadir un event listener a la nueva ventana para detectar clics
    newWindow.document.body.addEventListener("click", function() {
        console.log("ENTRO AQUI PRIMERO");
        compareWindows(newWindow, randomColor);
    });
}

// Función para comparar ventanas
function compareWindows(clickedWindow, clickedColor) {
    if (lastClickedColor === clickedColor && lastClickedWindow !== clickedWindow) {
        // Cerrar la ventana actual y la última ventana clickeada
        clickedWindow.close();
        lastClickedWindow.close();

        // Eliminar ambas ventanas de la lista
        windows = windows.filter(w => w.window !== clickedWindow && w.window !== lastClickedWindow);

        // Actualizar el contador de ventanas
        count_window -= 2;
        document.getElementById("count_windows").innerText = count_window;

        // Reiniciar las variables de color y ventana
        lastClickedColor = null;
        lastClickedWindow = null;
    
        // Verificar si se han cerrado todas las ventanas
        if (count_window === 0) {
            alert("¡Has ganado!");
        }
    } else {
        // Si no son iguales, actualizar el color y la ventana clickeada
        lastClickedColor = clickedColor;
        lastClickedWindow = clickedWindow;
    }
}
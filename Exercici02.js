let countdownValue = 30;
let countdownInterval;
const colors = ["#BF244E", "#4A96D9", "#F2CA50", "#F27405"];
let windows = []; // Lista para rastrear las ventanas abiertas
let firstClick = null; // Guardar información de la primera ventana clicada
let activeWindows = 0; // Contador de ventanas activas
let gameHistory = [];
let maxWindowsCreated = 0;

function initializeGameInfo() {
    // Verifica si hay historial de partidas y muestra la información
    if (gameHistory.length > 0) {
        let lastGame = gameHistory[gameHistory.length - 1];
        let message = `Última partida ${
            lastGame.win ? "ganaste" : "perdiste"
        } con ${lastGame.windowsCreated} ventanas creadas en total.`;
        document.getElementById("message").innerText = message;
    }
}


function btn_start() {
    let gameStarted = false; // Bandera para verificar si el juego ha comenzado
    maxWindowsCreated = 0;

    // Restablecemos el valor del contador cada vez que se inicia el botón START
    countdownValue = 30;
    document.getElementById("countdown").innerText = countdownValue;

    // Limpiamos cualquier intervalo existente para evitar superposiciones
    clearInterval(countdownInterval);

    // Reiniciar el contador de ventanas activas
    activeWindows = 0;
    //--------------------------------------------------------------------------------
    // Iniciamos el intervalo para el countdown
    countdownInterval = setInterval(() => {
        countdownValue--;

        // Verificamos si es tiempo de abrir una nueva ventana (cada 3 segundos)
        if (countdownValue % 3 == 0) {
            gameStarted = true; // Bandera para verificar si el juego ha comenzado
            openNewWindow();
        }

        // Actualizamos el contenido del contador en pantalla
        document.getElementById("countdown").innerText = countdownValue;

        // Verificar si no hay más ventanas activas
        if (activeWindows == 0 && gameStarted) {
            clearInterval(countdownInterval); // Detenemos el countdown
            alert("¡Felicidades! Has ganado.");
            gameHistory.push({ win: true, windowsCreated: maxWindowsCreated });
            initializeGameInfo();
        }

        // Detenemos el countdown cuando llegue a 0
        if (countdownValue == 0) {
            clearInterval(countdownInterval);
            // Si hay ventanas activas, el jugador pierde
            if (activeWindows > 0) {
                // Cerramos todas las ventanas activas
                windows.forEach(win => {
                        win.window.close();
                });
                
                // Actualizamos la lista de ventanas activas y el contador
                windows = [];
                activeWindows = 0;
                document.getElementById("count_windows").innerText = `Ventanas abiertas: ${activeWindows}`;
                // Luego mostramos la alerta
                alert("¡Perdiste! El tiempo se acabó y aún quedan ventanas activas. Inténtalo de nuevo.");
                gameHistory.push({ win: false, windowsCreated: maxWindowsCreated });
                initializeGameInfo();
            }
        }
    }, 1000); // Disminuye cada segundo
}

// Función para obtener un color aleatorio
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function openNewWindow() {
    maxWindowsCreated++;
    // Generamos un color aleatorio
    const randomColor = getRandomColor();
    
    // Calculamos las dimensiones de la ventana
    const width = 200;
    const height = 200;
    let left, top;

    // Si es la primera ventana, la centramos en la pantalla
    if (windows.length == 0) {
        left = (window.screen.width - width) / 2;
        top = (window.screen.height - height) / 2;
    } else {
        // Para las siguientes ventanas, la posición será aleatoria
        left = Math.random() * (window.screen.width - width);
        top = Math.random() * (window.screen.height - height);
    }

    // Abrimos una nueva ventana
    const newWindow = window.open(
        "",
        "_blank",
        `width=${width},height=${height},left=${left},top=${top}`
    );

    // Aplicamos el color de fondo
    if (newWindow) {
        newWindow.document.body.style.backgroundColor = randomColor;
        newWindow.document.body.innerHTML = `<h1 style="color:white;text-align:center;">${randomColor}</h1>`;
    }

    // Guardamos la ventana en la lista
    windows.push({ window: newWindow, color: randomColor });

    // Incrementamos el contador de ventanas activas
    activeWindows++;
    document.getElementById("count_windows").innerText = `Ventanas abiertas: ${activeWindows}`;

    // Agregar evento al clic de la ventana
    newWindow.onclick = () => handleWindowClick(newWindow);
}


function handleWindowClick(clickedWindow) {
    let clickedColor = clickedWindow.document.body.style.backgroundColor;
    
    if (!firstClick) {
        // Registrar el primer clic
        firstClick = { window: clickedWindow, color: clickedColor };
        console.log("Primer clic registrado:", clickedColor);
    } else {
        // Comparar con el segundo clic
        console.log("Segundo clic:", clickedColor);
        if (
            firstClick.color == clickedColor && // Mismo color
            firstClick.window != clickedWindow // Diferente ventana
        ) {
            console.log("¡Ventanas con el mismo color! Cerrándolas...");
            firstClick.window.close();
            clickedWindow.close();

            // Actualizar lista de ventanas abiertas
            windows = windows.filter(
                (win) => win.window != firstClick.window && win.window != clickedWindow
            );

            // Actualizar contador de ventanas activas
            activeWindows -= 2;
            document.getElementById("count_windows").innerText = `Ventanas abiertas: ${activeWindows}`;
        } else if (
            firstClick.color == clickedColor && // Mismo color
            firstClick.window == clickedWindow // Misma ventana
        ) {
            // Si es la misma ventana y el mismo color, cambiamos el color y abrimos una nueva ventana
            console.log("¡Misma ventana y mismo color! Actualizando color...");

            // Cambiar el color de la ventana clicada
            let randomColor = getRandomColor();
            clickedWindow.document.body.style.backgroundColor = randomColor;
            clickedWindow.document.body.innerHTML = "<h1 style='color: white; text-align: center;'>" + randomColor + "</h1>";
            
            // Actualizar la información de la ventana en la lista `windows`
            for (let i = 0; i < windows.length; i++) {
                if (windows[i].window === clickedWindow) {
                    windows[i].color = randomColor; // Modificar directamente el color
                    break; // Salimos del bucle, ya que encontramos la ventana
                }
            }

            // Generar una posición aleatoria en la pantalla
            const width = 200;
            const height = 200;
            const left = Math.random() * (window.screen.width - width);
            const top = Math.random() * (window.screen.height - height);

            // Crear una nueva ventana con un color aleatorio
            let newWindow = window.open("", "", `width=${width},height=${height},left=${left},top=${top}`);
            let newColor = getRandomColor();
            newWindow.document.body.style.backgroundColor = newColor;

            maxWindowsCreated++;
            // Cambiar el fondo de la nueva ventana para que muestre el nombre del color como texto
            newWindow.document.body.innerHTML = "<h1 style='color: white; text-align: center;'>" + newColor + "</h1>";

            // Guardar la nueva ventana en la lista
            windows.push({ window: newWindow, color: newColor });

            // Actualizar contador de ventanas activas
            activeWindows++;
            document.getElementById("count_windows").innerText = `Ventanas abiertas: ${activeWindows}`;

            // **Agregar evento al clic de la nueva ventana**
            newWindow.onclick = () => handleWindowClick(newWindow);

            console.log("Nueva ventana abierta con un color aleatorio.");
        }

        // Reiniciar el registro de clics
        firstClick = null;
    }
}

// Función para finalizar el juego manualmente
function endGame() {
    // Cerrar todas las ventanas
    windows.forEach(win => win.window.close());
    windows = [];
    activeWindows = 0;

    clearInterval(countdownInterval);
}
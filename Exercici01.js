function play_encerta(){
    let random = Math.floor(Math.random() * 11);//Floor no usa decimales.
    let div_numero = document.getElementById("div_numero");
    div_numero.innerText = random;

    if(random < 5){
        div_numero.style.color = "red";
    }else {
        div_numero.style.color = "green";
    }
    window.open("encerta.html", "Encerta", "width=400, height=250, left=300, top=300"); //URL, ID página, estilo
}
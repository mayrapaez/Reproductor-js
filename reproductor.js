let maximo, medio, reproducir, barra, progreso, silenciar, volumen, bucle,;

function iniciar(){
    maximo = 500;
    medio = document.getElementById('medio');
    reproducir = document.getElementById('reproducir');
    barra = document.getElementById('barra');
    progreso = document.getElementById('progreso');
    silenciar = document.getElementById('silenciar');
    volumen = document.getElementById('volumen');

    reproducir = addEventListener("click", presionar);
    silenciar = addEventListener("click",sonido);
    barra = addEventListener("click",mover);
    volumen = addEventListener("change",nivel);
}

function presionar() {
    if (!medio.paused && !medio.ended){
        medio.paused();
        reproducir.value =">";
        clearInterval(bucle);
    }else {
        medio.play();
        reproducir.value = "||";
        bucle = setInterval(estado,1000);
    }
}
//Funcion que actualiza la barra de progreso de reproduccion //
// valua si el video/ musica ha finalizado//
 function estado() {
    if (!medio.ended){
       let largo =parseInt(medio.currentTime * maximo/medio.duration);
        progreso.style.with = largo +'px';        
    }else {
        progreso.style.with = '0px';
        reproducir.value = ">";
        clearInterval(bucle);
        
    } 
 }
//funcion que reporduce el video/musica desde la posicion que quiera el usuario//
 function mover(evento){
	if(!medio.paused && !medio.ended){
     let ratonX = evento.offsetX - 2; 
     if(ratonX < 0){
      ratonX = 0;
     }else if(ratonX > maximo){
      ratonX = maximo;
     }
     let tiempo = ratonX * medio.duration / maximo; 
     medio.currentTime = tiempo;
     progreso.style.width = ratonX+'px';
	}
}
// fc que activa o desactiva el sonido//
function sonido(){
	if(silenciar.value == 'Silencio'){
     medio.muted = true; 
     volumen.value = 0
     silenciar.value = "Sonido";
	}else{
     medio.muted = false;
     volumen.value = 0.6
     silenciar.value = "Silencio";
	}
}
function nivel(){
	medio.volume = volumen.value
}

window.addEventListener("load",iniciar)
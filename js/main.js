const btnIniciar = document.getElementById("btnIniciar");
const btnDesistir = document.getElementById("btnSalir");
const btnAgregar = document.getElementById("btnAgregar");
const btnCancelar = document.getElementById("btnCancelar");
const agregarPalabra = document.getElementById("agregarPalabra");
const ahorcado = document.getElementById("ahorcado");
const btnAhorcado = document.getElementById("btnAhorcado");
const inicio = document.getElementById("inicio");
let palabras = ["ballena", "perro", "gato", "conejo","tiburon", "cocodrilo"];
let palabraElegida;
let errores = 0;
let aciertos = 0;
let gano = document.querySelector("#acerto");
let erro = document.querySelector("#error");
const pantalla = document.querySelector("canvas");
let pincel = pantalla.getContext('2d');

//Vista de pantalla de inicio
inicio.style.display="flex";
agregarPalabra.style.display="none";
ahorcado.style.display="none";
btnAhorcado.style.display="none";

// funcion desistir
btnDesistir.onclick = function(){
    inicio.style.display="flex";
    agregarPalabra.style.display="none";
    ahorcado.style.display="none";
    btnAhorcado.style.display="none";
}
//funcion para ver el layout de agregar palabra
btnAgregar.onclick = function(){
    inicio.style.display="none";
    agregarPalabra.style.display="flex";
    ahorcado.style.display="none";
    btnAhorcado.style.display="none";
    
}
//funcion para cancelar y vovler al inicio
btnCancelar.onclick = function(){
    inicio.style.display="flex";
    agregarPalabra.style.display="none";
    ahorcado.style.display="none";
    btnAhorcado.style.display="none";
}
// funcion del juego
btnIniciar.onclick = function iniciar(){
   ahorcado.style.display="flex";
   btnAhorcado.style.display="flex";
   inicio.style.display="none";
   errores = 0;
   aciertos = 0;
   azarPalabra();
}
//funcion agregar palabra, no esta terminada
btnGuardar.addEventListener("click", function(){
   let nuevaPalabra = document.getElementById("sumarPalabra").value;
   palabras.push(nuevaPalabra);
   console.log(palabras);
   ahorcado.style.display="flex";
   btnAhorcado.style.display="flex";
   inicio.style.display="none";
   agregarPalabra.style.display="none";
   errores = 0;
   aciertos = 0;
   azarPalabra();
});
//funcion para q se selecciones palabra al azar
function azarPalabra(){
 const elegida = document.getElementById("palabraElegida");
 elegida.innerHTML = '';
 const cantidadPalabras = palabras.length;
 const palabraAzar = Math.floor( Math.random()*palabras.length);
 palabraElegida = palabras[palabraAzar]. toUpperCase();
 console.log(palabraElegida);
 const cantLetras = palabraElegida.length;

 for (i=0; i<cantLetras; i++){
     const linea = document.createElement('span');
     elegida.appendChild(linea);
 }
}
//funcion para clickear las letras y adivinar
const letrasBtn = document.querySelectorAll('#letras button');
for (i=0; i<letrasBtn.length; i++){
   letrasBtn[i].addEventListener('click', letraClick);
}
function letraClick(event){
   const span = document.querySelectorAll("#palabraElegida span");
   const boton = event.target;
   boton.disabled = true;
   const letra = boton.innerHTML.toUpperCase();
   let acerto = false;
   for(i=0; i<palabraElegida.length; i++){ //variable i posicion de las letra en la palabra
     if (letra == palabraElegida[i]){// i posicion de letra en la palabra
      span[i].innerHTML = letra;
      aciertos++;
      acerto = true;
       console.log(acerto);
      }
   }
   if (acerto == false){
      errores++;
      const dibujo = dibujarAhorcado[errores]
      ? dibujarAhorcado[errores]() : errores =10;
      if (errores ==10){
         erro.innerHTML = "Te equivocaste la palabra es " + palabraElegida;
      }
      console.log(errores);
      console.log(dibujo);
   }else if (aciertos == palabraElegida.length){
      gano.innerHTML = "Felicitaciones!! Ganaste!!!";  
   }
}
function error(){
   if (errores =10){
   erro.innerHTML = "Te equivocaste la palabra es " + palabraElegida;
}
}
//funcion del reiniciar juego// juego nuevo
function reinicio(){
   pincel.clearRect(0,0,500,400);
   errores = 0;
   aciertos = 0;
   gano.innerHTML = " ";
   erro.innerHTML = " ";
   azarPalabra();
   for (i=0; i<letrasBtn.length; i++){
      letrasBtn[i].disabled = false;
   }
}
btnNuevo.addEventListener('click', reinicio);
// LOGICA DEL CANVAS
const dibujarAhorcado = {
      1:()=> {// poste
         pincel.beginPath();
         pincel.moveTo(150,100); //mastil final
         pincel.lineTo(150,50);
         pincel.lineTo(0,50);
         pincel.lineTo(0,350);// mastil largo
         pincel.lineTo(200,350);// base
         pincel.lineWidth = 20;
         pincel.stroke();
         pincel.closePath();
      },
      2:()=>{// cabeza
         pincel.beginPath();
         pincel.arc(150, 140, 40, 0, Math.PI * 2);
         pincel.lineWidth = 5;
         pincel.stroke();
         pincel.closePath();
      },
      3:()=>{// cuerpo
         pincel.moveTo(150,180);
         pincel.lineTo(150,250);
         pincel.lineWidth = 5;
         pincel.stroke();
         pincel.closePath();
      },
      4:()=>{//brazo izquierdo
         pincel.beginPath();
         pincel.moveTo(180,220);
         pincel.lineTo(150,180);
         pincel.lineWidth = 5;
         pincel.stroke();
         pincel.closePath();
      },
      5:()=>{// brazo Derecho
         pincel.beginPath();
         pincel.moveTo(120,220);
         pincel.lineTo(150,180);
         pincel.lineWidth = 5;
         pincel.stroke();
         pincel.closePath();
      },
      6:()=>{// pie izquierdo
         pincel.beginPath();
         pincel.moveTo(150,250);
         pincel.lineTo(180,290);
         pincel.lineWidth = 5;
         pincel.stroke();
         pincel.closePath(); 
      },
      7:()=>{// pie derecho
         pincel.beginPath();
         pincel.moveTo(120,290);
         pincel.lineTo(150,250);
         pincel.lineWidth = 5;
         pincel.stroke();
         pincel.closePath();
      },
      8:()=>{// ojo izquierdo
         pincel.beginPath();
         pincel.moveTo(125,120);
         pincel.lineTo(145,145);
         pincel.moveTo(145,120);
         pincel.lineTo(125,145);
         pincel.lineWidth = 5;
         pincel.stroke();
         pincel.closePath();
      },
      9:()=>{// ojo derecho
         pincel.beginPath();
         pincel.moveTo(155,120);
         pincel.lineTo(175,145);
         pincel.moveTo(175,120);
         pincel.lineTo(155,145);
         pincel.lineWidth = 5;
         pincel.stroke();
         pincel.closePath();
      }
   } 

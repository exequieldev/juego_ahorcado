//Elementos del HTML
var start = document.querySelector('#startButton');
var addWordB = document.querySelector('#addWordButton');
var newWord = document.querySelector('.newWord');
var save = document.querySelector('#saveButton');
var cancel = document.querySelector('#cancelButton');
var newGame = document.querySelector('#newGameButton');
var returnB = document.querySelector('#returnButton');
var rWord = document.querySelector('.rightWord');
var wWord = document.querySelector('.wrongWord');
var retButton = document.querySelector('.returnButton');
var draw = document.querySelector('.draw');
var title = document.querySelector('.title');
var addword = document.querySelector('.addWord')
var game = document.querySelector('.game');
var rLetter = document.getElementsByClassName('rightLetter');
var wLetter = document.getElementsByClassName('wrongLetter');
var ahorcado = document.getElementsByClassName('ahorcado');
var win = document.querySelector('.win');
var lose = document.querySelector('.lose');
var dibujo = document.querySelector('#dibujo')
var nombre = document.querySelector('#nombre')
var letraV = document.querySelector('#letraVirtual')
var pausa = document.querySelector('#pausa')

//Variables para el juego
var palabras = ['SOL','CASA','ARBOL','SALIDA','COLOREAR','SALMUERA','PODA','TALAR','PESCADO','ALADO','ALIANZA','ALTURA','CAJONES','CORREA','CADENAS','COMETA','CAIMAN','REAL','PUERTA','AVARO','APATICO','POLEA','ALPACA','MINIMO','RATON','CALOR','OLEADA','INVIERNO','VERANO','PAREJO','APARATO','APAREJO','OPULENTO','SALVAJE','SANTO','SORBER','CEPILLO','SORTEA','ALAMBRE','SARGENTO','ALARDEO','ARQUEA','CURVA','PELOTA','DEPORTE'];
var palabra = palabras[Math.floor(Math.random()*palabras.length)]; //Selección aleatoria de palabra
var arrayPalabra = palabra.toString().split('');
var largo = arrayPalabra.length;
var keypressed = '';
var key = 'A';
var pos = arrayPalabra.indexOf(key);
var wLetters = []; //almacena las letras incorrectas
const intentos = 7;
var restaintentos = 7; //Verifica si quedan intentos
var validador = new Array(0); //Valida las letras correctas
var jugando = false; //verifica si está activo el juego
var alphabet = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']
var responsive = window.matchMedia("(max-width: 700px)")
var desktop = window.matchMedia("(min-width: 701px)")
//Funciones para mostrar u ocultar objetos
function ocultar (algo) {
    algo.style.display= 'none';
}

function tapar (algo) {
    algo.style.visibility = 'hidden';
}

function mostrar (algo) {
    algo.style.display= 'flex';
}

function destapar (algo) {
    algo.style.visibility = 'visible';
}

//Funciones para dar inicio a la partida
function comenzar() {
    for (i=0 ; i< largo ; i++) {
        letterSpace = document.createElement('div');
        letterSpace.classList.add("rightLetter");
        letterSpace.setAttribute('id','rl'+i);
        rWord.appendChild(letterSpace);
    }
        for(i=0; i<intentos; i++){
            var fallidoSpace = document.createElement('div');
            fallidoSpace.classList.add('wrongLetter');
            wWord.appendChild(fallidoSpace);    
            }
    if(responsive.matches){
        mostrar(letraV);
        //letraV.focus();
    }
    letraV.focus();
    jugando = true;
    letraV.value = '';
}

function arranque() {
    ocultar(title);
    ocultar(addword);
    ocultar(dibujo);
    ocultar(nombre);
    mostrar(game);
    comenzar();
}

//Funciones para jugar
function jugarDesktop() {
    if(jugando == true && desktop.matches){
        captarTecla(event);
        if(alphabet.indexOf(key) != -1){
            mostrarletra();
            mostrarerror();
            fin();
        }
    }
}

function jugarmobile() {
    if(jugando == true){
        if(responsive.matches){
           
            key = letraV.value;
            key = key.toUpperCase();
        }
        if(alphabet.indexOf(key) != -1) {
            mostrarletra();
            mostrarerror();
            fin();
        }
        letraV.value = '';
        letraV.focus();
    }
}

function pausar(){
    if(jugando == true){
        mostrar(pausa);
    }
}

function continuar() {
    ocultar(pausa);
}

function captarTecla (event) {
        keypressed = event.which || event.keyCode;
        if((keypressed>64 && keypressed<91)||keypressed==192){   
            key = String.fromCharCode(keypressed);
        }else{key = ''}
        
}

function mostrarletra(){
    if(validador.indexOf(key) == -1)
        for (i=0; i<arrayPalabra.length; i++){
            if (key == arrayPalabra[i] ){
                rLetter[i].innerHTML = key;
                validador.push(key);
            }    
    }
}

function mostrarerror(){
    if(arrayPalabra.indexOf(key) == -1 && wLetters.indexOf(key) == -1){
        wLetters.push(key);
        wLetter[intentos-restaintentos].innerHTML = wLetters[intentos-restaintentos];
        destapar(ahorcado[intentos+3-restaintentos]);
        restaintentos--;
    }
}

function fin() {
    if(validador.length == arrayPalabra.length) {
        win.innerHTML = "Has ganado!!!";
        jugando = false;
    }
    if(restaintentos == 0) {
        lose.innerHTML = "Has fallado";
        rWord.innerHTML = "La palabra era: "+palabra;
        jugando = false;
    }
    if(jugando == false){
        ocultar(letraV);
    }

}

//Funciones para reiniciar el juego
function reroll() {
    limpiar();
    palabra = palabras[Math.floor(Math.random()*palabras.length)];
    arrayPalabra = palabra.toString().split('');
    largo = arrayPalabra.length;
    comenzar();
}

function limpiar () {
    win.innerHTML = '';
    lose.innerHTML = '';
    wLetter.innerHTML = '';
    rWord.innerHTML = '';
    validador.length = 0;
    wLetters = [];
    restaintentos = 7;
    newWord.value = '';
    for (i=3; i<ahorcado.length;i++){
        tapar(ahorcado[i]);
    }
    if(rLetter.length > 0){
        borrachild(largo,rWord,rLetter);
    }
    if(game.style.display == "flex"){
        borrachild(intentos,wWord,wLetter)
    }
}

function borrachild(ciclos,padre,hijo) {
    for (i=0; i<ciclos; i++) {
        padre.removeChild(hijo[0]);
    }
}

function volver(){
    limpiar()
    palabra = palabras[Math.floor(Math.random()*palabras.length)];
    arrayPalabra = palabra.toString().split('');
    largo = arrayPalabra.length;
    ocultar(game);
    ocultar(addword);
    mostrar(title);
    mostrar(dibujo);
    mostrar(nombre);
}

//Funciones para incorporar palabras

function sumaPalabra(){
    jugando = false;
    palabra = '';
    arrayPalabra = [];
    ocultar(title);
    ocultar(dibujo);
    ocultar(nombre);
    mostrar(addword);
    newWord.focus();
}

function palabraPropia(){
    palabra = newWord.value;
    palabra = palabra.toUpperCase();
    arrayPalabra = palabra.split("");
}

function savestart(){
    var cumple = 0
    for(i=0; i< arrayPalabra.length; i++){
        if(alphabet.indexOf(arrayPalabra[i]) != -1){
           cumple++            
        }
    }
    if(cumple == arrayPalabra.length){
        largo = arrayPalabra.length
        if(palabra.length<9){
            if(palabra != ''){    
                arranque();
            }else{alert("Ups, olvidaste escribir la palabra!!!")}
        }else{"Sólo admite palabras de hasta 8 letras."}
            newWord.value = '';
        cumple = 0;
    }else{alert("La palabra debe contener sólo letras sin caracteres especiales");
          cumple = 0;
          newWord.value = ''; 
    }  
}
//Acciones de los botones
startButton.onclick = arranque
newGameButton.onclick = reroll
document.onkeydown = jugarDesktop
addWordButton.onclick = sumaPalabra
returnButton.onclick = volver
cancelButton.onclick = volver
saveButton.onclick = savestart
letraV.oninput = jugarmobile
letraV.addEventListener("focusout", pausar);
letraV.addEventListener("focus", continuar);
pausa.addEventListener("click", continuar);
newWord.addEventListener("keyup", palabraPropia);
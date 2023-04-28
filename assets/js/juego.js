const miModulo = (()=>{

    'use strict'
let deck = [];
const tipos = ["C","D","H","S"],
      especiales = ["A","J","Q","K"];
/* let puntosJugador = 0,
    puntosComputadora = 0;
 */ 

let puntosJugadores = [];

//referencias
const btnPedir = document.querySelector("#btnPedir"),
      btnDetener = document.querySelector("#btnDetener"),
      btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugadores = document.querySelectorAll('.divCartas'),
      puntosHTML = document.querySelectorAll('small');
      
//Iniciar Juego
const inicializarJuego =(numJugadores = 2)=>{
    deck = crearDeck();

    puntosJugadores =[];
    for(let i = 0; i<numJugadores;i++){
        puntosJugadores.push(0);
    }
    puntosHTML.forEach(elem => elem.innerText = 0)
    divCartasJugadores.forEach(elem => elem.innerHTML = "" );

    btnDetener.disabled = false;
    btnPedir.disabled = false;

    

}
const crearDeck = ()=>{
    deck = []
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }

    }

    return _.shuffle(deck);
    

}



//Esta funcion me permite tomar una carta

const pedirCarta = () =>{
    if(deck.length === 0 ){
        throw "No hay cartas en el deck"

    }
    return deck.pop(); 
}
const valorCarta = (carta)=>{
    const valor = carta.substring(0,carta.length -1);
    return (isNaN(valor))?
            (valor === 'A') ? 11:10
            :valor * 1; 

}
const valor = valorCarta(pedirCarta());
console.log({valor});

const acumularPuntos = ( carta, turno ) =>{

    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores;
    return puntosJugadores[turno]

}

const crearCarta = (carta, turno) => {

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);

}

const determinarGanador = () => {
    const [puntosMinimos,puntosComputadora] =puntosJugadores;
    setTimeout(() => {
    
        if(puntosComputadora === puntosMinimos){
            alert("Nadie Gana");
        }else if(puntosMinimos > 21){
            alert("Computadora gana");
        }else if (puntosComputadora > 21){
            alert("Jugador Gana");
        } 
            
        
    }, 100);
}

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
let puntosComputadora = 0;
do {
    const carta = pedirCarta();
   puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
    crearCarta(carta, puntosJugadores.length - 1 )
    if (puntosMinimos > 21) {
        break;
    }
        
} while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
determinarGanador();




}

//EVENTOS

btnPedir.addEventListener('click', () =>{

    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0)
  
    // imagen carta 
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add("carta");

    divCartasJugador.append(imgCarta);



    if(puntosJugador>21){
        console.warn('Lo siento mucho,perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
    }else if(puntosJugador===21){
        console.warn("21,genial!");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
    }

})

btnDetener.addEventListener('click',()=>{
    btnDetener.disabled = true
    btnPedir.disabled = true
    turnoComputadora(puntosJugadores[0]);
})

btnNuevo.addEventListener('click',()=>{
    inicializarJuego();
   

});


return {
    nuevoJuego: inicializarJuego

};




})();





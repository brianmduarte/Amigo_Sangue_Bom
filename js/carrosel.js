const persona = document.querySelectorAll('.persona');
const setaEsquerda = document.getElementById('setaEsquerda');
const setaDireita = document.getElementById('setaDireita');

let currentPersona = 0;

function hidePersona(){
    persona.forEach(item => item.classList.remove('on'))
}

function showPersona(){
    persona[currentPersona].classList.add('on');
}

function setaDireitaSlider(){
    
    hidePersona()
    if(currentPersona === persona.length -1){
        currentPersona = 0;
        }else{
        currentPersona++;
    }
    showPersona();
}

function setaEsquerdaSlider(){
    hidePersona()
    if(currentPersona === 0){
        currentPersona = persona.length -1;
    }else{
        currentPersona--;
    }
    showPersona();
}

setaDireita.addEventListener('click' , setaDireitaSlider);
setaEsquerda.addEventListener('click', setaEsquerdaSlider);



setInterval(setaDireitaSlider, 4000);
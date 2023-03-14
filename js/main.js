import {planetsData} from './planetsData.js';

// Obtener la referencia al formulario y a los campos de edad y peso
let form = document.querySelector('#calculator-form');
let weightInput = document.querySelector('#weight');
let heightInput = document.querySelector('#height');
let ageInput = document.querySelector('#age');;

const articlePlanet=document.getElementById("flex-articles");
const templateArticlePlanet=document.getElementById("template-articlePlanet").content;
const fragment=document.createDocumentFragment();
const earthGravity=systemSolarPlanets[2].gravedad;
const earthDaysYear=systemSolarPlanets[2].periodoOrbitalDias;
const formUserValues=document.querySelector("#formUserValues");
let userWeight, userAge;

// Escuchar el evento submit del formulario
form.addEventListener("submit", function (event) {
  // Prevenir el comportamiento por defecto del formulario
  event.preventDefault();
  userWeight=event.target.inputWeight.value;
  userAge=event.target.inputAge.value;
  event.target.inputWeight.value='';
  event.target.inputAge.value='';
  calcNewValues(userWeight,userAge,systemSolarPlanets);
})

function calcNewValues(numPeso,numAge,arrayPlanets){
  let newWeight=0; 
  let newAge=0;
  const unidadPeso=" Kg.";
  const unidadEdad=" años";
  arrayPlanets.forEach(element =>{
    newWeight=Number((numPeso*element.gravedad/earthGravity).toFixed(2));
    newAge=Number((numAge*earthDaysYear/element.periodoOrbitalDias).toFixed(2));
    templateArticlePlanet.querySelector('.pPeso').textContent=newWeight+unidadPeso;
    templateArticlePlanet.querySelector('.pEdad').textContent=newAge+unidadEdad;
    templateArticlePlanet.querySelector('img').setAttribute('src',element.imgPlanet);
    templateArticlePlanet.querySelector('img').setAttribute('alt',"Planeta "+element.planeta);
    templateArticlePlanet.querySelector('h2 a').textContent=element.planeta;
    templateArticlePlanet.querySelector('h2 a').setAttribute('name',"planeta"+element.planeta);
    const clone=templateArticlePlanet.cloneNode(true);
    fragment.appendChild(clone);
  });
    
  // Agregar el contenido generado al documento
  const section = document.querySelector("#planets-results");
  section.appendChild(fragment);
}

// Función para calcular el peso en un planeta dado
function calculateWeight(weight, gravity) {
  const newWeight = (weight / 9.81) * gravity;
  return newWeight;
}

// Función para calcular la altura en un planeta dado
function calculateHeight(height, gravity) {
  const newHeight = (height / 9.81) * gravity;
  return newHeight;
}

// Función para calcular la edad en un planeta dado
function calculateAge(age, orbitalPeriod) {
  const newAge = age * 365.24 / orbitalPeriod;
  if(newAge>=1){
    return Math.floor(newAge).toFixed()+" años"
  }
  return Math.floor(newAge * 365.24).toFixed()+" días";
}
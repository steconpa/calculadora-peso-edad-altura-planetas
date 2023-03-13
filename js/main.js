import {planetsData} from './planetsData.js';

// Obtener la referencia al formulario y a los campos de edad y peso
const form = document.querySelector('#calculator-form');
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const ageInput = document.getElementById("age");

// Escuchar el evento submit del formulario
form.addEventListener("submit", function (event) {
  // Prevenir el comportamiento por defecto del formulario
  event.preventDefault();
  
  //Valida si los datos ingresados son validos
  if(validateFormData()){
    const menuNav = document.querySelector("nav");
    menuNav.style.setProperty('display', 'block');
    //Ejecuta la función para calcular 
    calculateResults();
  }
});

// Verificacion de los datos ingresados en el formulario
function validateFormData() {
  const AGE_MIN = 1;
  const AGE_MAX = 211;
  const WEIGHT_MIN = 1;
  const WEIGHT_MAX = 691;
  const HEIGHT_MIN = 23;
  const HEIGHT_MAX = 397;

  const errorMessages = {
    age: "Ingrese una edad entre 1 y 211 años",
    weight: "Ingrese un peso entre 1 y 691 Kg.",
    height: "Ingrese una altura entre 23 y 397 cm."
  };

  const isValidAge = validateInput(ageInput, AGE_MIN, AGE_MAX, errorMessages.age);
  const isValidWeight = validateInput(weightInput, WEIGHT_MIN, WEIGHT_MAX, errorMessages.weight);
  const isValidHeight = validateInput(heightInput, HEIGHT_MIN, HEIGHT_MAX, errorMessages.height);

  return isValidAge && isValidWeight && isValidHeight;
}

// Verificacion de cada input
function validateInput(input, min, max, errorMessage) {
  if (!input.value || input.value < min || input.value > max) {
    input.classList.add("invalid-input");
    input.nextElementSibling.innerText = errorMessage;
    return false;
  } else {
    input.classList.remove("invalid-input");
    input.nextElementSibling.innerText = "";
    return true;
  }
}

//Función para 
function calculateResults(){

  // Obtener la peso, altura y edad ingresados por el usuario
  const weight = Number(weightInput.value);
  const height = Number(heightInput.value);
  const age = Number(ageInput.value);

  // Crear un fragmento de documento para contener el contenido generado
  const fragment = new DocumentFragment();
    
  // Itera sobre cada planeta en el array "planetsData"
  planetsData.forEach((planet) => {
      
    // Calcular el peso y la edad en cada planeta
    const planetWeight = calculateWeight(weight, planet.gravity);
    const planetHeight = calculateHeight(height, planet.gravity);
    const planetAge = calculateAge(age, planet.yearLength);
      
    // Crear una copia del template del planeta y asignar los valores correspondientes
    const planetTemplate = document.getElementById("planet-template");
    const planetCopy = planetTemplate.content.cloneNode(true);
    
    // Actualiza los valores de los elementos en la copia del template
    const planetArticle = planetCopy.querySelector(".planet-result");
    planetArticle.id= planet.name;
    
    const planetName = planetCopy.querySelector(".planet-presentation h2");
    planetName.textContent = planet.name;
      
    const planetImage = planetCopy.querySelector("img");
    planetImage.src = planet.image;
    planetImage.alt = `Imagen de ${planet.name}`;
      
    const planetDescription = planetCopy.querySelector(".planet-presentation p");
    planetDescription.textContent = planet.description;
      
    const planetWeightSpan = planetCopy.querySelector(".planet-weight p span");
    planetWeightSpan.textContent = planetWeight.toFixed(2);
      
    const planetHeightSpan = planetCopy.querySelector(".planet-height p span");
    planetHeightSpan.textContent = planetHeight.toFixed(2);

    const planetAgeSpan = planetCopy.querySelector(".planet-age p span");
    planetAgeSpan.textContent = planetAge;
      
    const planetRadius = planetCopy.querySelector("li:nth-of-type(1) span");
    planetRadius.textContent = planet.radius;
      
    const planetMass = planetCopy.querySelector("li:nth-of-type(2) span");
    planetMass.textContent = planet.mass;
      
    const planetGravity = planetCopy.querySelector("li:nth-of-type(3) span");
    planetGravity.textContent = planet.gravity;
      
    const planetDay = planetCopy.querySelector("li:nth-of-type(4) span");
    planetDay.textContent = planet.dayLength;
      
    const planetYear = planetCopy.querySelector("li:nth-of-type(5) span");
    planetYear.textContent = planet.yearLength;
      
    const planetDistance = planetCopy.querySelector("li:nth-of-type(6) span");
    planetDistance.textContent = planet.distanceFromSun;
      
    const planetTemperature = planetCopy.querySelector("li:nth-of-type(7) span");
    planetTemperature.textContent = planet.surfaceTemperature;

    const planetMoreInfo = planetCopy.querySelector("li:nth-of-type(8) a");
    planetMoreInfo.href = planet.moreInfo;
      
    // Agregar la información del planeta al fragmento de documento
    fragment.appendChild(planetCopy);
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

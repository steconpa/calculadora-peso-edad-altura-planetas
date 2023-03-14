import {planetsData} from './planetsData.js';

// Obtener la referencia al formulario y a los campos de edad y peso
let form = document.querySelector('#calculator-form');
let weightInput = document.querySelector('#weight');
let heightInput = document.querySelector('#height');
let ageInput = document.querySelector('#age');;


// Escuchar el evento submit del formulario
form.addEventListener("submit", function (event) {
  // Prevenir el comportamiento por defecto del formulario
  event.preventDefault();
  
  // Crear una nueva instancia de la clase FormValidator
  const formValidator = new FormValidator();
  const validateResult = formValidator.validateFormData(weightInput, heightInput, ageInput);

  //Valida los datos ingresados son validos
  if(validateResult){
    // Eliminar los resultados anteriores
    const section = document.querySelector("#planets-results");
    section.innerHTML = '';

    //Ejecuta la función para calcular 
    calculateResults( weightInput.value, heightInput.value, ageInput.value );

    form.reset();
  }

});

class FormValidator {
  // Valores mínimos y máximos para cada entrada
  inputRanges = {
    age: [1, 211], // Rango de edades válidas
    weight: [5, 691], // Rango de pesos válidos
    height: [43, 397], // Rango de alturas válidas
  };

  // Mensajes de error para cada entrada
  errorMessages = {
    age: "Ingrese una edad entre 1 y 211 años",
    weight: "Ingrese un peso entre 5 y 691 Kg.",
    height: "Ingrese una altura entre 43 y 397 cm.",
  };

  // Método para validar una entrada
  validateInput(input, inputType) {
    // Obtener los valores mínimos y máximos y el mensaje de error correspondiente a la entrada
    const [min, max] = this.inputRanges[inputType];
    const errorMessage = this.errorMessages[inputType];

    // Validar la entrada
    if (!input.value || input.value < min || input.value > max) {
      // Marcar la entrada como inválida y mostrar el mensaje de error
      input.classList.add("invalid-input");
      input.nextElementSibling.innerText = errorMessage;
      return false;
    } else {
      // Marcar la entrada como válida y eliminar cualquier mensaje de error previo
      input.classList.remove("invalid-input");
      input.nextElementSibling.innerText = "";
      return true;
    }
  }

  // Método para validar el formulario completo
  validateFormData(weightInput, heightInput, ageInput) {
    // Validar cada entrada utilizando el método validateInput de esta misma clase
    const isValidAge = this.validateInput(ageInput, "age");
    const isValidWeight = this.validateInput(weightInput, "weight");
    const isValidHeight = this.validateInput(heightInput, "height");

    // Devolver verdadero solo si todas las entradas son válidas
    return isValidAge && isValidWeight && isValidHeight;
  }
}

//Función para calcular el peso, altura y edad en cada planeta
function calculateResults( weightInput, heightInput, ageInput ){
  
  // Crear un fragmento de documento para contener el contenido generado
  const fragment = new DocumentFragment();
    
  // Itera sobre cada planeta en el array "planetsData"
  planetsData.forEach((planet) => {
      
    // Calcular el peso y la edad en cada planeta
    const planetWeight = calculateWeight(weightInput, planet.gravity);
    const planetHeight = calculateHeight(heightInput, planet.gravity);
    const planetAge = calculateAge(ageInput, planet.yearLength);
      
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

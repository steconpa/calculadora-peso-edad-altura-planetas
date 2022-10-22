const gravityPerPlanet=[
  { planeta: "Mercurio",
    gravedad: 3.7,},
  { planeta: "Venus",
    gravedad: 8.87,},
  { planeta: "Tierra",
    gravedad: 9.8,},
  { planeta: "Marte",
    gravedad: 3.71,},
  { planeta: "Júpiter",
    gravedad: 24.79,},
  { planeta: "Saturno",
    gravedad: 10.44,},
  { planeta: "Urano",
    gravedad: 8.87,},
  { planeta: "Neptuno",
    gravedad: 11.15,},
];

let userWeight;
const formUserWeight=document.querySelector("#formUserWeight");

formUserWeight.addEventListener("submit",(event)=>{
  event.preventDefault();
  userWeight=event.target.inputWeight.value;
  event.target.inputWeight.value="";
  calcularNuevoPeso(userWeight,gravityPerPlanet);
})

function calcularNuevoPeso(numPeso,arrayPlanetsGravity){
  let earthGravity=arrayPlanetsGravity[2].gravedad;
  let nuevoPeso=0;
  arrayPlanetsGravity.forEach(element =>{
    let planeta=element.planeta;
    //Condicional para validar que los planetas sean diferentes a la Tierra
    if (planeta!=arrayPlanetsGravity[2].planeta){
      let tituloPlaneta=document.querySelector("a#planeta"+planeta);
      tituloPlaneta.textContent=planeta;
      nuevoPeso=numPeso*element.gravedad/earthGravity;
      let parrafoNuevoPeso=document.querySelector("p#p"+planeta);
      parrafoNuevoPeso.textContent="Tu peso en "+planeta+" es "+nuevoPeso+" kg.";
    } 
  });
}
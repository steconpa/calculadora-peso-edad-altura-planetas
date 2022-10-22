const gravityPerPlanet=[
  { planeta: "Mercurio",
    gravedad: 3.7,
    velRotacionKmH: 10.83,
    duracioDiaHr:4222.6,
    velTraslacionKmH:170640,
    periodoOrbitalDias:88,},
  { planeta: "Venus",
    gravedad: 8.87,
    velRotacionKmH:6.52,
    duracioDiaHr:2802,
    velTraslacionKmH:126000,
    periodoOrbitalDias:224.7,},
  { planeta: "Tierra",
    gravedad: 9.8,
    velRotacionKmH:1674,
    duracioDiaHr:24,
    velTraslacionKmH:107280,
    periodoOrbitalDias:365.2,},
  { planeta: "Marte",
    gravedad: 3.71,
    velRotacionKmH:866,
    duracioDiaHr:24.7,
    velTraslacionKmH:86760,
    periodoOrbitalDias:687,},
  { planeta: "Júpiter",
    gravedad: 24.79,
    velRotacionKmH:45583,
    duracioDiaHr:9.9,
    velTraslacionKmH:47160,
    periodoOrbitalDias:4331,},
  { planeta: "Saturno",
    gravedad: 10.44,
    velRotacionKmH:36840,
    duracioDiaHr:10.7,
    velTraslacionKmH:34920,
    periodoOrbitalDias:10747,},
  { planeta: "Urano",
    gravedad: 8.87,
    velRotacionKmH:14794,
    duracioDiaHr:17.2,
    velTraslacionKmH:24480,
    periodoOrbitalDias:30589,},
  { planeta: "Neptuno",
    gravedad: 11.15,
    velRotacionKmH:9719,
    duracioDiaHr:16.1,
    velTraslacionKmH:19440,
    periodoOrbitalDias:59800,},
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
    if (planeta!==arrayPlanetsGravity[2].planeta){
      let tituloPlaneta=document.querySelector("a#planeta"+planeta);
      tituloPlaneta.textContent=planeta;
      nuevoPeso=Number((numPeso*element.gravedad/earthGravity).toFixed(2));
      let parrafoNuevoPeso=document.querySelector("p#p"+planeta);
      parrafoNuevoPeso.textContent="Tu peso en "+planeta+" es "+nuevoPeso+" kg.";
    } 
  });
}
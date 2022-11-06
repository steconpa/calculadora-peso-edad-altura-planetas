const systemSolarPlanets=[
  { planeta: "Mercurio", gravedad: 3.7, velRotacionKmH: 10.83, duracionDiaHr:4222.6, velTraslacionKmH:170640,periodoOrbitalDias:88, imgPlanet:"images/0mercurio.svg",},
  { planeta: "Venus", gravedad: 8.87, velRotacionKmH:6.52, duracionDiaHr:2802, velTraslacionKmH:126000, periodoOrbitalDias:224.7,imgPlanet:"images/1venus.svg",},
  { planeta: "Tierra", gravedad: 9.8, velRotacionKmH:1674, duracionDiaHr:24, velTraslacionKmH:107280, periodoOrbitalDias:365.2,imgPlanet:"images/2tierra.svg",},
  { planeta: "Marte", gravedad: 3.71, velRotacionKmH:866, duracionDiaHr:24.7, velTraslacionKmH:86760, periodoOrbitalDias:687,imgPlanet:"images/3marte.svg",},
  { planeta: "Júpiter", gravedad: 24.79, velRotacionKmH:45583, duracionDiaHr:9.9, velTraslacionKmH:47160, periodoOrbitalDias:4331,imgPlanet:"images/4jupiter.svg",},
  { planeta: "Saturno", gravedad: 10.44, velRotacionKmH:36840, duracionDiaHr:10.7, velTraslacionKmH:34920, periodoOrbitalDias:10747,imgPlanet:"images/5saturno.svg",},
  { planeta: "Urano", gravedad: 8.87, velRotacionKmH:14794, duracionDiaHr:17.2, velTraslacionKmH:24480, periodoOrbitalDias:30589,imgPlanet:"images/6urano.svg",},
  { planeta: "Neptuno", gravedad: 11.15, velRotacionKmH:9719, duracionDiaHr:16.1, velTraslacionKmH:19440, periodoOrbitalDias:59800,imgPlanet:"images/7neptuno.svg",},
];

const articlePlanet=document.getElementById("flex-articles");
const templateArticlePlanet=document.getElementById("template-articlePlanet").content;
const fragment=document.createDocumentFragment();
const earthGravity=systemSolarPlanets[2].gravedad;
const earthDaysYear=systemSolarPlanets[2].periodoOrbitalDias;
const formUserValues=document.querySelector("#formUserValues");
let userWeight, userAge;

formUserValues.addEventListener("submit",(event)=>{
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
  articlePlanet.appendChild(fragment);
}
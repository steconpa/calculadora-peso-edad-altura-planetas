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
const formUserValues=document.querySelector("#formUserValues");
const inputsValues=document.querySelectorAll('#formUserValues input');

const hacerValidaciones=(event)=>{
  let limitePeso=640;
  let limiteEdad=125;
  switch (event.target.name){
    case "inputWeight":
      let valorPeso=event.target.value;
      if(valorPeso>0&&valorPeso<=limitePeso){
        console.log("cumple Peso");
      }else{
        console.log("No cumple Peso");
      }
    break;
    case "inputAge":
      let valorEdad=event.target.value;
      if(valorEdad>0&&valorEdad<=limiteEdad){
        console.log("cumple Edad");
      }else{
        console.log("No cumple Edad");
      }
    break;
  }
}

inputsValues.forEach((input)=>{
  input.addEventListener('keyup',hacerValidaciones);
  input.addEventListener('blur',hacerValidaciones);
});

formUserValues.addEventListener("submit",(event)=>{
  event.preventDefault();
  let userWeight, userAge;
  userWeight=event.target.inputWeight.value;
  userAge=event.target.inputAge.value;
  event.target.inputWeight.value='';
  event.target.inputAge.value='';
  calcNewValues(userWeight,userAge,systemSolarPlanets);
})

function calcNewValues(numWeight,numAge,arrayPlanets){
  let newWeight, newAge=0;
  let articulos=document.querySelector("#flex-articles .grid-planet");
  if (articulos!==null){
    document.getElementById("flex-articles").textContent ="";
  }
  arrayPlanets.forEach(element =>{
    newWeight=getNewWeight(numWeight,element.gravedad);
    newAge=getNewAge(numAge,element.periodoOrbitalDias);
    templateArticlePlanet.querySelector('.pPeso').textContent=newWeight;
    templateArticlePlanet.querySelector('.pEdad').textContent=newAge;
    templateArticlePlanet.querySelector('img').setAttribute('src',element.imgPlanet);
    templateArticlePlanet.querySelector('img').setAttribute('alt',"Planeta "+element.planeta);
    templateArticlePlanet.querySelector('h2 a').textContent=element.planeta;
    templateArticlePlanet.querySelector('h2 a').setAttribute('name',"planeta"+element.planeta);
    templateArticlePlanet.querySelector('#gravedad').textContent=element.gravedad+" m/s2";
    templateArticlePlanet.querySelector('#velRotacionKmH').textContent=element.velRotacionKmH+" Km/h";
    templateArticlePlanet.querySelector('#duracionDiaHr').textContent=element.duracionDiaHr+" Hr.";
    templateArticlePlanet.querySelector('#velTraslacionKmH').textContent=element.velTraslacionKmH+" Km/h";
    templateArticlePlanet.querySelector('#periodoOrbitalDias').textContent=element.periodoOrbitalDias+" días";
    const clone=templateArticlePlanet.cloneNode(true);
    fragment.appendChild(clone);
  });
  articlePlanet.appendChild(fragment);
}

function getNewWeight(weight,gravity){
  const earthGravity=systemSolarPlanets[2].gravedad;
  let newWeight=Number((weight*gravity/earthGravity).toFixed(2))+" Kg.";
  return newWeight;
}

function getNewAge(age,periodoOrbital){
  const earthDaysYear=systemSolarPlanets[2].periodoOrbitalDias;
  let newAge=Number(age*earthDaysYear/periodoOrbital);
  if(newAge<1){
    newAge=Math.floor(newAge*earthDaysYear)+" días";
    return newAge;
  }else{
    newAge=Math.floor(newAge)+" años";
    return newAge;
  }
}


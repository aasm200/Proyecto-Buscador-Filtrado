//variables

const marca = document.querySelector('#marca'); 
const year = document.querySelector('#year'); 
const minimo = document.querySelector('#minimo'); 
const maximo = document.querySelector('#maximo'); 
const puertas = document.querySelector('#puertas'); 
const transmision = document.querySelector('#transmision'); 
const color = document.querySelector('#color'); 


const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max - 12;

const searchUser = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: ""
}

//eventos

document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos); //muestra todo los autos por default al cargar
  llenarSelect(); // llena nuestra opciones de selet

})

// Escuchar Selects

marca.addEventListener('change', e => {
  searchUser.marca = e.target.value;
  filtrarAuto();
})

year.addEventListener('change', e => {
  searchUser.year = parseInt(e.target.value);
  filtrarAuto();
})

minimo.addEventListener('change', e => {
  searchUser.minimo = e.target.value;
  filtrarAuto();
})

maximo.addEventListener('change', e => {
  searchUser.maximo = e.target.value;
  filtrarAuto();
})


puertas.addEventListener('change', e => {
  searchUser.puertas = parseInt(e.target.value);
  filtrarAuto();
})


transmision.addEventListener('change', e => {
  searchUser.transmision = e.target.value;
  filtrarAuto();
})

color.addEventListener('change', e => {
  searchUser.color = e.target.value;
  filtrarAuto();
})


//funciones

function mostrarAutos(autos) {
  limpiarHtml();

  autos.forEach(auto => {
    const {marca,modelo,year,precio,puertas,color,transmision} = auto;
    const autoHtml = document.createElement('p');
    autoHtml.textContent = `${marca} - ${modelo} - ${year} -${puertas} puertas - color: ${color} - Transmision: ${transmision} - precio:${precio}\$`;

    resultado.appendChild(autoHtml);
  });
}

function limpiarHtml() {
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);  
  }
}

function llenarSelect() {
  for( let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);   
  }
}


//funcion que busca en la base a la búsquedad

function filtrarAuto(){
  //funcion de alto nivel , funciones que estan dentro de otras funciones, y usamos un chaining
  const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

 
  if(resultado.length){

    mostrarAutos(resultado);
  } else {
    noResultados();
  }

}

function noResultados(){
  limpiarHtml();
  const noResultados = document.createElement('div');
  noResultados.textContent = 'No hay resultados en la busquedad, intenta con otros terminos';
  noResultados.classList.add('error','alerta');

  resultado.appendChild(noResultados);
}

function filtrarMarca(auto) {
  const {marca} = searchUser;
  if(marca){                     
    return auto.marca === marca;  
  }
  return auto;
}

function filtrarYear(auto) {
  const {year} = searchUser;
  if(year){                     
    return auto.year === year;  
  }
  return auto;
}

function filtrarMinimo(auto) {
  const {minimo} = searchUser;
  if(minimo){                     
    return auto.precio >= minimo;  
  }
  return auto;
}

function filtrarMaximo(auto) {
  const {maximo} = searchUser;
  if(maximo){                     
    return auto.precio <= maximo;  
  }
  return auto;
}

function filtrarPuertas(auto) {
  const {puertas} = searchUser;
  if(puertas){                     
    return auto.puertas === puertas;  
  }
  return auto;
}

function filtrarTransmision(auto) {
  const {transmision} = searchUser;
  if(transmision){                     
    return auto.transmision === transmision;  
  }
  return auto;
}

function filtrarColor(auto) {
  const {color} = searchUser;
  if(color){                     
    return auto.color === color;  
  }
  return auto;
}

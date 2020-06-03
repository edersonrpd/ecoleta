function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for(state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
     
    });
}

populateUfs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  console.log(event.target.value);
  const ufValue = event.target.value
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;
  const indexOfSelectStatate = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectStatate].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  citySelect.innerHTML = "<option vale>Selecione a Cidade</option>";
  citySelect.disabled = true;
  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectItem(event) {
  const itemLi = event.target;
  //adicionar ou remover uma classe com javascript
  itemLi.classList.toggle("selected");
  const itemId = itemLi.dataset.id;

  //verificar items selecionados, se sim
  // pegar os itens selecionados
  const alredySelected = selectedItems.findIndex((item) => {
    const itemFound = item === itemId; // isso sera true ou false
    return itemFound;
  });

  //se já estiver selecionado,
  if (alredySelected >= 0) {
    //tirar da seleção
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });
    selectedItems = filteredItems;
  } else {
    //se não estiver selecionado, adicioanr a seleção
    selectedItems.push(itemId);
  }
  //atualizar o campo escondido com os items selecionados
  collectedItems.value = selectedItems;
}

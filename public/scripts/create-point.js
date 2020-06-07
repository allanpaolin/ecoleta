function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()})
    //.then( res => res.json() ) é a mesma coisa que acima
    .then( states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( (res) => {return res.json()})
    //.then( res => res.json() ) é a mesma coisa que acima
    .then( cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItem = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover classes
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados e pegar os itens

    const alreadySelected = selectedItem.findIndex( function(item){
        const itemFound = item === itemId
        return itemFound
    })
    
    // se já estiver selecionado, tirar a seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItem.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItem = filteredItems
    } else {
        // se não estiver selecionado, adicionar a seleção
        selectedItem.push(itemId)
    }
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItem
}
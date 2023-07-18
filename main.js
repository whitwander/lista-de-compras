let listaDeItens = []
let itemAEditar

const form = document.getElementById('form-itens')
const itensInput = document.getElementById('receber-item')
const ulItens = document.getElementById('lista-de-itens')
const ulItensComprados = document.getElementById('itens-comprados')
const listaRecuperada = localStorage.getItem('listaDeItens')

function atualizaLocalStorage(){
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
}

if(listaRecuperada){
    listaDeItens = JSON.parse(listaRecuperada)
    mostraItem()
} else {
    listaDeItens = []
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    salvarItem()
    mostraItem()
    itensInput.focus()
})

function salvarItem() {
    const produto = itensInput.value
    const verificaDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === produto.toUpperCase())

    if (verificaDuplicado) {
        alert('Item já adicionado')
    } else {
        listaDeItens.push({
            valor: produto,
            checar: false
        })
    }

    itensInput.value = ''
}

function mostraItem() {
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''

    listaDeItens.forEach((elemento, index) => {
        if (elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
        </li>
            `
        } else {
            ulItens.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
        </div>
        <div>
            ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
        </li>
        `
        }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach((i) => {
        i.addEventListener('click', (e) => {
            const valorDoElemento = e.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens[valorDoElemento].checar = e.target.checked
            mostraItem()
        })
    })

    const deletar = document.querySelectorAll('.deletar')

    deletar.forEach((i) => {
        i.addEventListener('click', (e) => {
            const valorDoElemento = e.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valorDoElemento, 1)
            mostraItem()
        })
    })

    const itensParaEditar = document.querySelectorAll('.editar')

    itensParaEditar.forEach((i) => {
        i.addEventListener('click', (e) => {
            itemAEditar = e.target.parentElement.parentElement.getAttribute('data-value')
            mostraItem()
        })
    })

    atualizaLocalStorage()
}

function salvarEdicao() {
    const itensEditados = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    listaDeItens[itemAEditar].valor = itensEditados.value
    itemAEditar = -1
    mostraItem()
}
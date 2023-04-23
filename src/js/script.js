let inputTarefa = document.querySelector('#tarefa')
let xModal = document.querySelector('.bx.bx-x')
let cancelarModal = document.querySelector('.cancelar')
var cont = 0

inputTarefa.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        adicionarTarefa()
    }
})

xModal.addEventListener('click', () => {
    fecharModal()
})

cancelarModal.addEventListener('click', () => {
    fecharModal()
})

function adicionarTarefa() {
    let nome = document.querySelector('#tarefa').value
    let tarefa = document.querySelector('.lista')

    if(nome.length > 0){
        let divAvo = document.createElement('div')
        divAvo.classList.add('item-tarefa')
        divAvo.id = `div-${cont}`

            let span = document.createElement('span')
            span.classList.add('txt-tarefa')
            span.innerHTML = nome
            divAvo.appendChild(span)

            let divBotoes = document.createElement('div')
            divBotoes.classList.add('botoes')
            divAvo.appendChild(divBotoes)

                let botaoFinalizar = document.createElement('button')
                botaoFinalizar.classList.add('finalizado')
                divBotoes.appendChild(botaoFinalizar)
                botaoFinalizar.addEventListener('click', () => {
                    completarTarefa(divAvo.id)
                })

                    let iconCheck = document.createElement('i')
                    iconCheck.classList.add('bx')
                    iconCheck.classList.add('bx-check')
                    botaoFinalizar.appendChild(iconCheck)

                let botaoEditar = document.createElement('button')
                botaoEditar.classList.add('editar')
                divBotoes.appendChild(botaoEditar)
                botaoEditar.addEventListener('click', () => {
                    editarTarefa(divAvo.id)
                })

                    let iconPencil = document.createElement('i')
                    iconPencil.classList.add('bx')
                    iconPencil.classList.add('bx-pencil')
                    botaoEditar.appendChild(iconPencil)
                
                let botaoApagar = document.createElement('button')
                botaoApagar.classList.add('apagar')
                divBotoes.appendChild(botaoApagar)
                botaoApagar.addEventListener('click', () => {
                    apagarTarefa(divAvo.id)
                })

                    let iconTrash = document.createElement('i')
                    iconTrash.classList.add('bx')
                    iconTrash.classList.add('bxs-trash-alt')
                    botaoApagar.appendChild(iconTrash)

            let divCompleto = document.createElement('div')
            divCompleto.classList.add('completo')
            divCompleto.id = 'comp-' + cont
            divAvo.appendChild(divCompleto)

        tarefa.appendChild(divAvo)
        inputTarefa.value = ''

        cont++
    }

    function completarTarefa(event) {
        let divA = document.getElementById(event)
        let botaoFinal = divA.querySelector('.finalizado')
        let iconeCheck = botaoFinal.querySelector(`.bx`)
        let botaoEditar = divA.querySelector('.editar')
        let botaoApagar = divA.querySelector('.apagar')
        let divComp = divA.querySelector(`.completo`)
        let nClasses = divComp.classList.length
        
        if (nClasses == 1) {

            iconeCheck.classList.remove('bx-check')
            iconeCheck.classList.add('bx-check-double')
            botaoEditar.style.display = 'none'
            botaoApagar.classList.add('ativo')
            botaoFinal.classList.add('ativo')
            divComp.classList.add('ativo')
        
        } else {
            
            iconeCheck.classList.remove('bx-check-double')
            iconeCheck.classList.add('bx-check')
            botaoEditar.style.display = 'flex'
            botaoApagar.classList.remove('ativo')
            botaoFinal.classList.remove('ativo')
            divComp.classList.remove('ativo')
            
        }
    }
}

function editarTarefa(event) {
    let div = document.getElementById(event)
    let nomeTarefa = div.querySelector('.txt-tarefa').innerHTML
    
    abrirModal(nomeTarefa, event)
}

function abrirModal (n, dID) {
    let modalContainer = document.querySelector('.modal-container')
    let inputModal = document.getElementById('modal-text')
    let btnConfirmar = modalContainer.querySelector('.confirmar')

    inputModal.value = n
    modalContainer.style.display = 'flex'

    inputModal.addEventListener('keydown', (e) => {
        if(e.key == 'Enter') {
            let div = document.querySelector('#' + dID)
            let nomeTarefa = div.querySelector('.txt-tarefa')

            nomeTarefa.innerHTML = inputModal.value

            fecharModal()
            div = null
            nomeTarefa = null

            modalContainer = null
            inputModal = null
        }
    })

    btnConfirmar.addEventListener('click', () => {        
        let div = document.querySelector('#' + dID)
        let nomeTarefa = div.querySelector('.txt-tarefa')

        nomeTarefa.innerHTML = inputModal.value

        fecharModal()

        div = null
        nomeTarefa = null

        modalContainer = null
        inputModal = null
    })

}

function fecharModal () {
    let modalContainer = document.querySelector('.modal-container')

    modalContainer.style.display = 'none'
}

function apagarTarefa(event) {
    let confirmacao = confirm('Você tem certeza que deseja excluir essa tarefa?')
    
    if (confirmacao == true) {
        let lista = document.querySelector('.lista')
        let divAvo = document.getElementById(event)

        lista.removeChild(divAvo)
        alert('Tarefa excluída com sucesso')
    }
}
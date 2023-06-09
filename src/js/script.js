const novaTarefa = document.getElementById('txt-nova-tarefa')
const btnCriarTarefa = document.querySelector('.adicionar')
const lista = document.querySelector('.lista')
var cont = 0

//Carregar a lista quando o documento foi carregado 
document.addEventListener('DOMContentLoaded', e => {
    listarTarefas()
    adicionarOuvintesBotoes()
})

//Criar tarefa
btnCriarTarefa.addEventListener('click', (e) => {
    criarTarefa()
    novaTarefa.value = ''
})

document.addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        criarTarefa()
        novaTarefa.value = ''
    } 
})

atualizarMargin()

function atualizarMargin() {
    let tarefas = lista.querySelectorAll('.tarefa')

    if (lista.scrollHeight > lista.clientHeight) {

        tarefas.forEach((tarefa) => {
            tarefa.style.width = '99%'
            tarefa.style.marginRight = '1%'
        })

    } else {

        tarefas.forEach((tarefa) => {
            tarefa.style.width = '100%'
            tarefa.style.marginRight = '0%'
        })

    }
}

function listarTarefas () {
    try {
        if(localStorage.getItem('lista')){
            let response = JSON.parse(localStorage.getItem('lista'))

            response.map(tarefa => {
                criarEstruturaTarefa(tarefa.tarefaId, tarefa.nomeTarefa, tarefa.concluido)

                if(tarefa.tarefaId > cont) {
                    cont = tarefa.tarefaId
                }
            })
        } else {
            cont = 0
        }
    } catch (error) {
        throw error
    }
}

function adicionarOuvintesBotoes () {
    let botoes = document.querySelectorAll('.botao')

    botoes.forEach(botao => {
        if(botao.classList.contains('apagar')){
            botao.addEventListener('click', apagarTarefa)
        } else if(botao.classList.contains('concluir')){
            botao.addEventListener('click', concluirTarefa)
        } else if(botao.classList.contains('editar')){
            botao.addEventListener('click', abrirModalEditarTarefa)
        }
    })
}

function criarTarefa () {
    let tamanho = novaTarefa.value.trim()

    if(tamanho.length > 0){
        try {
            let novoDado = {
                tarefaId: 'div-'+cont,
                nomeTarefa: novaTarefa.value,
                concluido: false
            }
    
            if(localStorage.getItem('lista')){
                let response = JSON.parse(localStorage.getItem('lista'))
                response.push(novoDado)
    
                localStorage.setItem('lista', JSON.stringify(response))
            } else{
                let novaLista = []
    
                novaLista.push(novoDado)
    
                localStorage.setItem('lista', JSON.stringify(novaLista))
            }
    
            criarEstruturaTarefa(novoDado.tarefaId, novoDado.nomeTarefa, novoDado.concluido)
        } catch (error) {
            throw error
        }
    }
}

function criarEstruturaTarefa(id, nome, conclusao) {
    let tarefa = document.createElement('div')
    let nmTarefa = document.createElement('p')
    let botoes = document.createElement('div')
    let btnConcluir = document.createElement('button')
    let btnEditar = document.createElement('button')
    let btnApagar = document.createElement('button')
    let iconConcluir = document.createElement('i')
    let iconEditar = document.createElement('i')
    let iconApagar = document.createElement('i')
    let concluido = document.createElement('div')
    let pConcluido = document.createElement('p')

    tarefa.appendChild(nmTarefa)
    tarefa.appendChild(botoes)
    tarefa.appendChild(concluido)
    botoes.appendChild(btnConcluir)
    botoes.appendChild(btnEditar)
    botoes.appendChild(btnApagar)
    btnConcluir.appendChild(iconConcluir)
    btnEditar.appendChild(iconEditar)
    btnApagar.appendChild(iconApagar)
    concluido.appendChild(pConcluido)
    
    tarefa.classList.add('tarefa')
    nmTarefa.classList.add('nome-tarefa')
    botoes.classList.add('container-botoes')
    btnConcluir.classList.add('botao')
    btnConcluir.classList.add('concluir')
    btnEditar.classList.add('botao')
    btnEditar.classList.add('editar')
    btnApagar.classList.add('botao')
    btnApagar.classList.add('apagar')
    iconConcluir.classList.add('bx')
    iconEditar.classList.add('bx')
    iconEditar.classList.add('bx-pencil')
    iconApagar.classList.add('bx')
    iconApagar.classList.add('bx-trash')
    concluido.classList.add('concluido')
    pConcluido.classList.add('palavra-concluido')

    if (conclusao == true) {
        concluido.classList.add('ativo')
        iconConcluir.classList.add('bx-check-double')
        btnEditar.style.display = 'none'
    } else {
        iconConcluir.classList.add('bx-check')
    }
    
    tarefa.id = id

    nmTarefa.innerText = nome

    lista.appendChild(tarefa)
    cont++
    atualizarMargin()
    adicionarOuvintesBotoes()
}

function apagarTarefa(e) {
    let botaoClicado = e.currentTarget
    let avo = botaoClicado.parentNode.parentNode
    let id = avo.id

    try {
        let lista = document.querySelector('.lista')
        let tarefa = document.querySelector(`#${id}`)
        let listaJson = JSON.parse(localStorage.getItem('lista'))
        let indexTarefa = listaJson.findIndex(tar => tar.tarefaId == id)

        try {
            if(indexTarefa !== -1) {
                listaJson.splice(indexTarefa, 1)
                lista.removeChild(tarefa)
                localStorage.setItem('lista', JSON.stringify(listaJson))
            }
        } catch (e) {
            throw e
        }
    } catch (error) {
        alert('Erro ao excluir a tarefa. Erro: ' + error)
    }
}

function concluirTarefa(e) {
    let botaoClicado = e.currentTarget
    let avo = botaoClicado.parentNode.parentNode
    let id = avo.id
    let concluido = avo.querySelector('.concluido')
    let containerBotoes = avo.querySelector('.container-botoes')
    let iconCheck = botaoClicado.querySelector('.bx')
    let iconEditar = avo.querySelector('.editar')
    let lista = JSON.parse(localStorage.getItem('lista'))
    let index = lista.findIndex(tarefa => tarefa.tarefaId == id)

    try {
        if(index !== -1 && lista[index].concluido == false){
            concluido.classList.add('ativo')
            iconCheck.classList.remove('bx-check')
            iconCheck.classList.add('bx-check-double')
            iconEditar.style.display = 'none'
            containerBotoes.classList.toggle('.concluido')
            lista[index].concluido = true

            localStorage.setItem('lista', JSON.stringify(lista))
        } else if(index !== -1 && lista[index].concluido == true){
            concluido.classList.remove('ativo')
            iconCheck.classList.add('bx-check')
            iconCheck.classList.remove('bx-check-double')
            containerBotoes.classList.toggle('.concluido')
            iconEditar.style.display = 'flex'
            lista[index].concluido = false

            localStorage.setItem('lista', JSON.stringify(lista))
        }
    } catch (error) {
        throw error
    }
}

//Modal
const containerModal = document.querySelector('.container-modal')
const modal = document.querySelector('.modal')
const campoTexto = document.getElementById('txt-modal')
const botaoCancelar = modal.querySelector('.cancelar')
const botaoConfirmar = modal.querySelector('.confirmar')

botaoConfirmar.addEventListener('click', () => {
    containerModal.classList.add('fechar')
    modal.classList.add('fechado')

    setTimeout(() => {
        containerModal.classList.remove('abrir')
        containerModal.classList.remove('fechar')
        modal.style.display = 'none'
        modal.classList.remove('fechado')
    }, 400);

    //Procura a tarefa de acordo com o valor em data-div
    try {
        const idTarefa = campoTexto.dataset.div
        const tarefa = document.getElementById(idTarefa)
        const pNomeTarefa = tarefa.querySelector('.nome-tarefa')

        fecharModalEditarTarefa(idTarefa, pNomeTarefa)
    } catch (error) {
        console.log('Falha em atualizar a tarefa. Erro: '+ error);
    }
})

botaoCancelar.addEventListener('click', () => {
    containerModal.classList.add('fechar')
    modal.classList.add('fechado')

    setTimeout(() => {
        containerModal.classList.remove('abrir')
        containerModal.classList.remove('fechar')
        modal.style.display = 'none'
        modal.classList.remove('fechado')
    }, 400);
})

function abrirModalEditarTarefa(e) {
    //Obtendo a tarefa e o id
    const botaoClicado = e.currentTarget
    const tarefa = botaoClicado.parentNode.parentNode
    const id = tarefa.id
    const pNomeTarefa = tarefa.querySelector('.nome-tarefa')

    //Animações Modal
    containerModal.classList.add('abrir')
    modal.style.display = 'flex'

    campoTexto.value = pNomeTarefa.textContent
    campoTexto.dataset.div = id
}

function fecharModalEditarTarefa (id, nomeTarefa) {

    //lista
    const lista = JSON.parse(localStorage.getItem('lista'))
    const index = lista.findIndex(tarefa => tarefa.tarefaId == id)

    if (campoTexto.value.trim() != nomeTarefa.textContent) {
        try {
            nomeTarefa.textContent = campoTexto.value.trim()
            lista[index].nomeTarefa = campoTexto.value.trim()

            localStorage.setItem('lista', JSON.stringify(lista))
        } catch (error) {
            throw error
        }
    }
}

// Caso queira resetar a lista com uma tecla
// function limparLista() {
//     localStorage.removeItem('lista')
//     cont = 0
//     alert('Lista limpa')
//     location.reload()
// }
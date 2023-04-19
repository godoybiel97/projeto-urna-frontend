//A princípio precisamos controlar o momento em que os conteúdos aparecerão na tela
let seuVotoPara = document.querySelector(".divisao-1-1 span")
let cargo = document.querySelector(".divisao-1-2 span")
let descricao = document.querySelector(".divisao-1-4")
let aviso = document.querySelector(".divisao-2")
let lateral = document.querySelector(".divisao-1-direita")
let numeros = document.querySelector(".divisao-1-3")
let etapaAtual = 0
let numero = ""
let votoBranco = false
let votos = []

//A 1ª etapa terá início do elemento 0 do array
function comecarEtapa() {
    let etapa = etapas[etapaAtual]
    let numeroHtml = ""
    numero = ""
    votoBranco = false

    //Em cada índice verificaremos se o conteúdo foi preenchido ou não, dessa forma podemos controlar a animação
    for(let i = 0; i < etapa.numeros; i++) {
        if(i === 0) {
            numeroHtml += "<div class='numero pisca'></div>"
        }
        else {
            numeroHtml += "<div class='numero'></div>"
        }
    }

    //Usaremos o controle dos conteúdos para iniciar as novas informações
    seuVotoPara.style.display = "none"
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ""
    aviso.style.display = "none"
    lateral.innerHTML = ""
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true
        }
        else {
            return false
        }
    })

    if(candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
        
        let fotosHtml = ""
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].pequena) {
                fotosHtml += `<div class="divisao-1-image pequena"><img src="./assets/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
            }
            else {
                fotosHtml += `<div class="divisao-1-image"><img src="./assets/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHtml
    }
    else {
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        descricao.innerHTML = "<div class='aviso--grande pisca'>VOTO NULO</div>"
    }
}

//Criar as funções de clique
function clicou(n) {
    let numeroPisca = document.querySelector(".numero.pisca")

    //A animação será passada para o próximo elemento
    if(numeroPisca !== null) {
        numeroPisca.innerHTML = n
        numero = `${numero}${n}`

        //Verificar se existe um próximo elemento, se existir transfere a animação
        numeroPisca.classList.remove("pisca")
        if(numeroPisca.nextElementSibling !== null) {
            numeroPisca.nextElementSibling.classList.add("pisca")
        }
        else {
            atualizaInterface()
        }
    }
}

function branco() {
    if(numero === "") {
        votoBranco = true
        seuVotoPara.style.display = "block"
        aviso.style.display = "block"
        numeros.innerHTML = ""
        descricao.innerHTML = "<div class='aviso--grande pisca'>VOTO EM BRANCO</div>"
    }
    else {
        alert("Não preencha o campo se seu voto for BRANCO")
    }
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if(votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: "BRANCO"
        })
    }
    else if(numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }
    if(votoConfirmado) {
        etapaAtual++

        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        }
        else {
           document.querySelector(".tela").innerHTML = "<div class='aviso--gigante pisca'>FIM</div>"
           console.log(votos)
        }
    }
}

comecarEtapa()
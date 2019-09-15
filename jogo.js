var altura = 0
var largura = 0
var vida = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search

nivel = nivel.replace('?','')

if(nivel === 'normal'){
    var criaMosquitoTempo = 1500
    tempo = 10
}else if(nivel === 'dificil'){
    var criaMosquitoTempo = 1000
    tempo = 15
}else if(nivel === 'chuck'){
    var criaMosquitoTempo = 750
    tempo = 20
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
}

ajustaTamanhoPalcoJogo()

document.getElementById('cronometro').innerHTML = tempo

var cronometro = setInterval(function(){
    tempo -= 1

    //tempo acabou e player sobreviveu
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        document.location.href = 'vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo
    }

   
}, 1000)

//Gerando posições aleatorias com base no tamanho da tela
function posicaoRandomica() {

    //remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        //removendo vida
        if (vida > 3) {
            window.location.href = 'fim_de_jogo.html'
        } else {
            document.getElementById('v' + vida).src = 'imagens/coracao_vazio.png'
            vida++
        }

    }


    let posicaoX = Math.floor(Math.random() * largura) - 90
    let posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //criar o elemento html
    let mosquito = document.createElement('img')

    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3)

    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'

    }
}

var criaMosquito = setInterval(function () {
    posicaoRandomica()
}, criaMosquitoTempo)
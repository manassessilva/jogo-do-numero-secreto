let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let h1 = "";

//Auterando o conteúdo do h1 no html pelo JavaScript
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

     //scipt para leitura do texto da página
     responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

//Mensagem inicial da tela
function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

//Fazendo o código gerar o número secreto
function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
   }

   //Fazendo o gerador não repetir o numero sorteado
   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
   }
   else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }

}

//verificar se o valor do chute é igual ao número secreto
function verificarChute(){
    let chute = document.querySelector("input").value; //utilizamos o ".value" para selecionar apenas o valor inserido no "input"
   
    if(chute == numeroSecreto){
        exibirTextoNaTela("h1", "Acertou!" );

        //Criando a auto escolha do plural para a mensagem de tentativas
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";

        //Criando o contador de tentativas
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        exibirTextoNaTela("p", mensagemTentativas);

        //habilitando o botão "Novo Jogo"
        document.getElementById("reiniciar").removeAttribute("disabled");

    }
    else{
        if(chute > numeroSecreto){
            exibirTextoNaTela("p", "O número secreto é menor. Tente novamente.");
        }
        else{
            exibirTextoNaTela("p", "O número secreto é maior. Tente novamente.");
        }
        tentativas++; //Para somar mais uma tentativa
        limparCampo() //Para limpar o numero do input
    }
    
}

//Limpando o input após cada chute
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = "";
}

//Utilizando o botão "Novo Jogo"
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    //controlando o status para acionar o botão "Novo Jogo" apenas quando acertar o numero secreto
    document.getElementById("reiniciar").setAttribute("disabled", true);
}




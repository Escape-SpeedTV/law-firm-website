let areaSelecionada = ""; //Aqui, ele vai guardar qual área foi selecionada 

// Seleciona todas as opções de área (Imobiliário e Consumidor)
const opcaoArea = document.querySelectorAll(".opcao-area");

// Local onde serão colocados os problemas
const listaProblemas = document.getElementById("listaProblemas");

const botaoEnviar = document.getElementById("btnEnviar");
const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const celular = document.getElementById("celular");
const descricao = document.getElementById("descricao");

botaoEnviar.addEventListener("click", function(){

    const problemaSelecionado = document.querySelector(
        'input[name="problema"]:checked'
    );

    if(!problemaSelecionado){
        alert("Selecione um problema");
        return;
    }

    const mensagem =
    `Olá! Gostaria de um atendimento.

    Nome:
    ${nome.value}

    Área:
    ${areaSelecionada}

    Problema:
    ${problemaSelecionado.value}

    Telefone:
    ${telefone.value}

    Celular:
    ${celular.value}

    Descrição:
    ${descricao.value}`;

    const texto = encodeURIComponent(mensagem);

    window.open(
        `https://wa.me/5561992259321?text=${texto}`,
        "_blank"
    );

});



//Aqui são os problemas guardados dentro do JavaScript
const problemas = {
    imobiliario: [
        "Atraso na entrega do imóvel",
        "Imóvel em risco",
        "Compra e venda",
        "Usucapião",
        "Aluguel",
        "Tributação",
        "Outros"
    ],

    consumidor: [
        "Venda casada",
        "Cobranças indevidas",
        "Negativação indevida",
        "Cobrança em duplicidade",
        "Fraudes e golpes bancários",
        "Prestação de serviço",
        "Outros"
    ]
};

function mostrarProblemas(area){
    listaProblemas.innerHTML = ""; //O innerHTML ele é usado para alterar o conteudo dentro do html.

    problemas[area].forEach(function(item){ //O forEach ele vai rodar todas as opções que está no problemas. 
        //Aqui, estamos criando uma Label
        const label = document.createElement("label");

        //Aqui, eu vou colocar o h
        label.innerHTML = `
            <input type="radio" name="problema" value="${item}"> <span>${item}</span> `;

        //Coloca na tela
        listaProblemas.appendChild(label);
    });
}

opcaoArea.forEach(function(opcao){
    opcao.addEventListener("click", function(){

        //Esse trecho, ele vai remover a seleção anterior
        opcaoArea.forEach(function(card){
            card.classList.remove("ativa");
        });

        //Aqui, ele vai adicionar uma seleção no card, após a pessoa clicar
        opcao.classList.add("ativa");

        //Descobre qual área foi selecionada
        const area = opcao.dataset.area;

        areaSelecionada = area;

        //Aqui ele vai selecionar o problema
        mostrarProblemas(area);
    });
});

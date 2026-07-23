let areaSelecionada = ""; //Aqui, ele vai guardar qual área foi selecionada 

// Seleciona todas as opções de área (Imobiliário e Consumidor)
const opcaoArea = document.querySelectorAll(".opcao-area");

// Local onde serão colocados os problemas
const listaProblemas = document.getElementById("listaProblemas");

const header = document.getElementById("header");

const passo1 = document.getElementById("passo1")
const passo2 = document.getElementById("passo2")
const passo3 = document.getElementById("passo3")
const passo4 = document.getElementById("passo4")

//Nesse trecho eu meio que estou alterando o css! No meu css ficou: "Display:Flex", aqui, para colocar uma excessão, eu estou mudando o display flex, para display none.
passo2.style.display = "none";
passo3.style.display = "none";
passo4.style.display = "none";

//Aqui é aba de informar o telefone, descrição e nome.
const botaoEnviar = document.getElementById("btnEnviar");
const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const celular = document.getElementById("celular");
const descricao = document.getElementById("descricao");
const botaoContinuar = document.getElementById("continuar");
botaoContinuar.disabled = true;

function mascaraTelefone(input){
    let valor = input.value.replace(/\D/g, "");
    valor = valor.slice(0,11);

    if(valor.length > 2){
        valor = "(" + valor.slice(0,2) + ") " + valor.slice(2);
    }

    if(valor.length > 10){
        valor = valor.slice(0,10) + "-" + valor.slice(10);
    }
    input.value = valor;
}

telefone.addEventListener("input", function(){
    mascaraTelefone(telefone);
});

celular.addEventListener("input", function(){
    mascaraTelefone(celular);
})

botaoContinuar.addEventListener("click", function(){
    if(nome.value == ""){
        alert("Informe seu nome.");
        return;
    } else if(telefone.value == ""){
        alert("Informe seu telefone");
        return;
    } else if(descricao.value == ""){
        alert("Informe uma descrição");
        return;
    }

    passo4.style.display = "flex";

})

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

    passo4.style.display = "flex";
    
    window.open(
        `https://wa.me/5561992259321?text=${texto}`,
        "_blank"
    );

    //Aqui, após a pessoa enviar para o wpp, ele vai limpar os valores declarados.
    nome.value = "";
    telefone.value = "";
    celular.value = "";
    descricao.value = "";

    //Aqui, ele vai remover o problema selecionado pelo o usuário.
    document.querySelectorAll('input[name="problema"]').forEach(function(radio){
        radio.checked = false;
    });

    //Aqui, vamos limpar a lista de problemas
    listaProblemas.innerHTML = "";

    //Aqui, vamos remover o destaque da área
    opcaoArea.forEach(function(opcao){
        opcao.classList.remove("selecionada");
    });

    //Nesse trecho, será limpo as variáveis
    areaSelecionada = "";

    passo4.style.display = "none";
    passo1.style.display = "none";
    passo2.style.display = "none";
    passo3.style.display = "none";
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

        passo1.style.display = "none";

        //Aqui, eu estou fazendo com que o código apareça no display.
        passo2.style.display = "flex";

        listaProblemas.addEventListener("change", function(){
            passo3.style.display = "flex";
        })
    });
});

function verificarFormulario(){
    if(nome.value.trim() != "" && telefone.value.trim() != "" && descricao.value.trim() != ""){
        botaoContinuar.disabled = false;
        botaoContinuar.classList.add("ativo");
    }else{
        botaoContinuar.disabled = true;
        botaoContinuar.classList.remove("ativo");
    }
}

nome.addEventListener("input", verificarFormulario);
telefone.addEventListener("input", verificarFormulario);
celular.addEventListener("input", verificarFormulario);
descricao.addEventListener("input", verificarFormulario);

window.addEventListener("scroll", function(){
    if(window.scrollY > 350){
        header.classList.add("fixo");
    }else{
        header.classList.remove("fixo");
    }
});

const menuMobile = document.getElementById("menuMobile");
const menu = document.querySelector(".menu");

menuMobile.addEventListener("click", function(){
    menu.classList.toggle("ativo");

    if(menu.classList.contains("ativo")){
        menuMobile.innerHTML = "X";
    }else{
        menuMobile.innerHTML = "☰";
    }
})

const linksMenu = document.querySelectorAll(".menu a");
linksMenu.forEach(function(link){
    link.addEventListener("click", function(){
        menu.classList.remove("ativo");
        menuMobile.innerHTML = "☰";
    });
});
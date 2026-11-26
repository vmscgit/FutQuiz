// 1. PERGUNTAS DO JOGO
// "correta" indica a posição da resposta certa (começando em zero).


const categorias = [
    {
        id: "copa",
        nome: "Copa do Mundo",
        fases: [
            {
                minAcertos: 3,
                perguntas: [
                    { texto: "Qual seleção tem mais títulos da Copa do Mundo?", opcoes: ["Argentina", "Brasil", "Alemanha", "Itália"], correta: 1, explicacao: "O Brasil tem 5 títulos." },
                    { texto: "Em que ano aconteceu a primeira Copa do Mundo?", opcoes: ["1922", "1930", "1938", "1950"], correta: 1, explicacao: "A primeira Copa foi em 1930." },
                    { texto: "Qual país sediou a Copa do Mundo de 2014?", opcoes: ["Alemanha", "Brasil", "África do Sul", "Rússia"], correta: 1, explicacao: "A Copa de 2014 foi no Brasil." },
                    { texto: "Quem foi a campeã da Copa do Mundo de 2022?", opcoes: ["França", "Argentina", "Croácia", "Brasil"], correta: 1, explicacao: "A Argentina venceu a França nos pênaltis." },
                    { texto: "Quem venceu a Copa do Mundo de 2014?", opcoes: ["Argentina", "Holanda", "Alemanha", "Brasil"], correta: 2, explicacao: "A Alemanha venceu a Argentina na final." }
                ]
            },
            {
                minAcertos: 3,
                perguntas: [
                    { texto: "Quem é o maior artilheiro da história das Copas?", opcoes: ["Pelé", "Ronaldo", "Miroslav Klose", "Lionel Messi"], correta: 2, explicacao: "Klose marcou 16 gols em Copas." },
                    { texto: "Qual país sediou a Copa de 2002 junto com o Japão?", opcoes: ["China", "Coreia do Sul", "Tailândia", "Austrália"], correta: 1, explicacao: "A Copa de 2002 foi no Japão e na Coreia do Sul." },
                    { texto: "Em que ano o Brasil conquistou o pentacampeonato?", opcoes: ["1994", "1998", "2002", "2006"], correta: 2, explicacao: "O penta veio em 2002." },
                    { texto: "Quem foi a campeã da Copa do Mundo de 2010?", opcoes: ["Holanda", "Espanha", "Alemanha", "Uruguai"], correta: 1, explicacao: "A Espanha venceu a Holanda na final." },
                    { texto: "Qual país sediou e venceu a primeira Copa, em 1930?", opcoes: ["Brasil", "Argentina", "Itália", "Uruguai"], correta: 3, explicacao: "O Uruguai foi sede e campeão em 1930." }
                ]
            }
        ]
    },
    {
        id: "regras",
        nome: "Regras do Futebol",
        fases: [
            {
                minAcertos: 3,
                perguntas: [
                    { texto: "Qual jogador pode usar as mãos dentro da própria área?", opcoes: ["Atacante", "Volante", "Goleiro", "Zagueiro"], correta: 2, explicacao: "O goleiro pode usar as mãos na própria área." },
                    { texto: "O que significa receber um cartão amarelo?", opcoes: ["Advertência", "Expulsão", "Gol", "Substituição obrigatória"], correta: 0, explicacao: "O cartão amarelo é uma advertência." },
                    { texto: "Quantos jogadores cada time tem em campo?", opcoes: ["9", "10", "11", "12"], correta: 2, explicacao: "São 11 jogadores por time, contando o goleiro." },
                    { texto: "Quanto tempo dura uma partida (sem acréscimos)?", opcoes: ["60 minutos", "80 minutos", "90 minutos", "120 minutos"], correta: 2, explicacao: "São dois tempos de 45 minutos." },
                    { texto: "O que acontece com quem leva dois cartões amarelos no mesmo jogo?", opcoes: ["Nada", "É expulso", "Paga multa", "Sai e volta depois"], correta: 1, explicacao: "O segundo amarelo resulta em cartão vermelho." }
                ]
            }
        ]
    },
    {
        id: "jogadores",
        nome: "Jogadores Lendários",
        fases: [
            {
                minAcertos: 3,
                perguntas: [
                    { texto: 'Qual jogador é conhecido como "Rei do Futebol"?', opcoes: ["Pelé", "Ronaldo", "Neymar", "Romário"], correta: 0, explicacao: "Pelé é conhecido como o Rei do Futebol." },
                    { texto: 'Quem é conhecido como "Fenômeno"?', opcoes: ["Ronaldo", "Rivaldo", "Kaká", "Adriano"], correta: 0, explicacao: "Ronaldo ganhou o apelido de Fenômeno." },
                    { texto: 'Quem marcou o gol da "Mão de Deus" em 1986?', opcoes: ["Zico", "Maradona", "Platini", "Cruyff"], correta: 1, explicacao: "Maradona marcou contra a Inglaterra." },
                    { texto: "Em qual clube Neymar começou a carreira profissional?", opcoes: ["Santos", "Barcelona", "Flamengo", "São Paulo"], correta: 0, explicacao: "Neymar surgiu no Santos." },
                    { texto: "Cristiano Ronaldo nasceu em qual país?", opcoes: ["Espanha", "Brasil", "Portugal", "Itália"], correta: 2, explicacao: "Ele nasceu em Portugal, na ilha da Madeira." }
                ]
            }
        ]
    }
];


const itensLoja = [
    { id: "dica", nome: "Dica", descricao: "Remove duas opções erradas.", preco: 30 },
    { id: "pular", nome: "Pular", descricao: "Pula uma pergunta sem perder acerto.", preco: 50 },
    { id: "dobro", nome: "Dobro", descricao: "Dobra os pontos dos acertos da fase.", preco: 60 }
];


const PONTOS_POR_ACERTO = 10;
const BONUS_FASE = 20;


// 2. DADOS DO JOGADOR E DA PARTIDA


let jogador;
let categoriaAtual;
let faseAtual;
let perguntas;
let numeroPergunta = 0;
let acertos = 0;
let pontosDaFase = 0;
let respondida = false;
let dobroAtivo = false;


// 3. FUNÇÕES GERAIS


function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(function(tela) {
        tela.classList.add("escondido");
    });
    document.getElementById(id).classList.remove("escondido");
}


function salvarJogador() {
    const jogadores = JSON.parse(localStorage.getItem("futquiz_jogadores")) || {};
    jogadores[jogador.nome] = jogador;
    localStorage.setItem("futquiz_jogadores", JSON.stringify(jogadores));
}


function atualizarPontos() {
    document.getElementById("placar-pontos").textContent = jogador.pontos + " pts";
}


function atualizarRanking() {
    const ranking = JSON.parse(localStorage.getItem("futquiz_ranking")) || [];
    const jogadorNoRanking = ranking.find(function(item) {
        return item.nome === jogador.nome;
    });


    if (jogadorNoRanking) {
        jogadorNoRanking.pontos = jogador.pontosTotais;
    } else {
        ranking.push({ nome: jogador.nome, pontos: jogador.pontosTotais });
    }


    ranking.sort(function(a, b) {
        return b.pontos - a.pontos;
    });


    localStorage.setItem("futquiz_ranking", JSON.stringify(ranking.slice(0, 10)));
}


// 4. ENTRADA DO JOGADOR


document.getElementById("btn-comecar").addEventListener("click", function() {
    const nome = document.getElementById("campo-nome").value.trim();


    if (nome === "") {
        alert("Digite seu nome para começar!");
        return;
    }


    const jogadores = JSON.parse(localStorage.getItem("futquiz_jogadores")) || {};


    if (jogadores[nome]) {
        jogador = jogadores[nome];
    } else {
        const progresso = {};
        categorias.forEach(function(categoria) {
            progresso[categoria.id] = 1;
        });


        jogador = {
            nome: nome,
            pontos: 0,
            pontosTotais: 0,
            inventario: { dica: 0, pular: 0, dobro: 0 },
            progresso: progresso
        };
    }


    salvarJogador();
    document.getElementById("menu").classList.remove("escondido");
    atualizarPontos();
    abrirCategorias();
});


// 5. CATEGORIAS E FASES


function abrirCategorias() {
    document.getElementById("ola-jogador").textContent = "Bem-vindo, " + jogador.nome + "!";
    const lista = document.getElementById("lista-categorias");
    lista.innerHTML = "";


    categorias.forEach(function(categoria) {
        const botao = document.createElement("button");
        botao.className = "card";
        botao.innerHTML = "<strong>" + categoria.nome + "</strong><small>" +
            jogador.progresso[categoria.id] + " fase(s) liberada(s)</small>";


        botao.addEventListener("click", function() {
            abrirFases(categoria);
        });


        lista.appendChild(botao);
    });


    mostrarTela("tela-categorias");
}


function abrirFases(categoria) {
    categoriaAtual = categoria;
    document.getElementById("titulo-categoria").textContent = categoria.nome;


    const lista = document.getElementById("lista-fases");
    lista.innerHTML = "";


    categoria.fases.forEach(function(fase, indice) {
        const numero = indice + 1;
        const liberada = numero <= jogador.progresso[categoria.id];
        const botao = document.createElement("button");


        botao.className = liberada ? "card" : "card bloqueada";
        botao.innerHTML = (liberada ? "Fase " + numero : "Bloqueada - Fase " + numero) +
            "<small>Acerte " + fase.minAcertos + " de " + fase.perguntas.length + "</small>";


        if (liberada) {
            botao.addEventListener("click", function() {
                iniciarFase(numero);
            });
        }


        lista.appendChild(botao);
    });


    mostrarTela("tela-fases");
}


document.getElementById("btn-voltar-categorias").addEventListener("click", abrirCategorias);


// 6. PERGUNTAS E RESPOSTAS


function iniciarFase(numero) {
    faseAtual = categoriaAtual.fases[numero - 1];
    numeroFaseAtual = numero;
    perguntas = faseAtual.perguntas.slice();
    perguntas.sort(function() { return Math.random() - 0.5; });


    numeroPergunta = 0;
    acertos = 0;
    pontosDaFase = 0;
    dobroAtivo = false;


    mostrarTela("tela-quiz");
    mostrarPergunta();
}


function mostrarPergunta() {
    respondida = false;
    const pergunta = perguntas[numeroPergunta];


    document.getElementById("progresso").textContent =
        "Pergunta " + (numeroPergunta + 1) + " de " + perguntas.length;
    document.getElementById("pontos-fase").textContent = "Acertos: " + acertos;
    document.getElementById("texto-pergunta").textContent = pergunta.texto;


    const opcoes = document.getElementById("opcoes");
    opcoes.innerHTML = "";


    pergunta.opcoes.forEach(function(opcao, indice) {
        const botao = document.createElement("button");
        botao.className = "opcao";
        botao.textContent = opcao;


        botao.addEventListener("click", function() {
            responder(indice, botao);
        });


        opcoes.appendChild(botao);
    });


    document.getElementById("feedback").classList.add("escondido");
    document.getElementById("btn-proxima").classList.add("escondido");
    atualizarItens();
}


function responder(indiceEscolhido, botaoEscolhido) {
    if (respondida) return;
    respondida = true;


    const pergunta = perguntas[numeroPergunta];
    const acertou = indiceEscolhido === pergunta.correta;


    document.querySelectorAll(".opcao").forEach(function(botao, indice) {
        botao.disabled = true;
        if (indice === pergunta.correta) botao.classList.add("certa");
    });


    let mensagem;


    if (acertou) {
        acertos++;
        const pontos = PONTOS_POR_ACERTO * (dobroAtivo ? 2 : 1);
        pontosDaFase += pontos;
        mensagem = "Correto! " + pergunta.explicacao + " (+" + pontos + " pts)";
    } else {
        botaoEscolhido.classList.add("errada");
        mensagem = "Resposta incorreta. " + pergunta.explicacao;
    }


    const feedback = document.getElementById("feedback");
    feedback.textContent = mensagem;
    feedback.classList.remove("escondido");
    document.getElementById("pontos-fase").textContent = "Acertos: " + acertos;


    const botaoProxima = document.getElementById("btn-proxima");
    botaoProxima.textContent = numeroPergunta === perguntas.length - 1 ? "Ver resultado" : "Próxima";
    botaoProxima.classList.remove("escondido");
    atualizarItens();
}


document.getElementById("btn-proxima").addEventListener("click", function() {
    numeroPergunta++;


    if (numeroPergunta < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarFase();
    }
});


function finalizarFase() {
    const passou = acertos >= faseAtual.minAcertos;
    let total = pontosDaFase;


    if (passou) {
        total += BONUS_FASE;


        if (numeroFaseAtual === jogador.progresso[categoriaAtual.id]) {
            jogador.progresso[categoriaAtual.id]++;
        }
    }


    jogador.pontos += total;
    jogador.pontosTotais += total;
    salvarJogador();
    atualizarRanking();
    atualizarPontos();


    document.getElementById("titulo-resultado").textContent =
        passou ? "Fase concluída!" : "Não foi dessa vez";


    let texto = "Você acertou " + acertos + " de " + perguntas.length +
        ". Pontos ganhos: " + total + ".";


    if (passou) {
        texto += " Você recebeu " + BONUS_FASE + " pontos de bônus.";
    } else {
        texto += " Você precisava de " + faseAtual.minAcertos + " acertos para avançar.";
    }


    document.getElementById("texto-resultado").textContent = texto;


    const temProxima = passou && numeroFaseAtual < categoriaAtual.fases.length;
    document.getElementById("btn-proxima-fase").classList.toggle("escondido", !temProxima);


    mostrarTela("tela-resultado");
}


document.getElementById("btn-proxima-fase").addEventListener("click", function() {
    iniciarFase(numeroFaseAtual + 1);
});
document.getElementById("btn-repetir").addEventListener("click", function() {
    iniciarFase(numeroFaseAtual);
});
document.getElementById("btn-resultado-voltar").addEventListener("click", abrirCategorias);


// 7. ITENS ESPECIAIS


function atualizarItens() {
    ["dica", "pular", "dobro"].forEach(function(item) {
        document.getElementById("qtd-" + item).textContent = jogador.inventario[item];
    });


    document.getElementById("btn-dica").disabled = respondida || jogador.inventario.dica === 0;
    document.getElementById("btn-pular").disabled = respondida || jogador.inventario.pular === 0;
    document.getElementById("btn-dobro").disabled = dobroAtivo || jogador.inventario.dobro === 0;
}


document.getElementById("btn-dica").addEventListener("click", function() {
    if (respondida || jogador.inventario.dica === 0) return;


    jogador.inventario.dica--;
    const erradas = Array.from(document.querySelectorAll(".opcao")).filter(function(botao, indice) {
        return indice !== perguntas[numeroPergunta].correta && !botao.classList.contains("escondido");
    });


    erradas.sort(function() { return Math.random() - 0.5; });
    erradas.slice(0, 2).forEach(function(botao) {
        botao.classList.add("escondido");
    });


    salvarJogador();
    atualizarItens();
});


document.getElementById("btn-pular").addEventListener("click", function() {
    if (respondida || jogador.inventario.pular === 0) return;


    jogador.inventario.pular--;
    salvarJogador();
    numeroPergunta++;


    if (numeroPergunta < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarFase();
    }
});


document.getElementById("btn-dobro").addEventListener("click", function() {
    if (dobroAtivo || jogador.inventario.dobro === 0) return;


    jogador.inventario.dobro--;
    dobroAtivo = true;
    salvarJogador();
    atualizarItens();
});


// 8. LOJA


function abrirLoja() {
    const lista = document.getElementById("lista-loja");
    lista.innerHTML = "";


    itensLoja.forEach(function(item) {
        const produto = document.createElement("div");
        produto.className = "produto";


        const informacao = document.createElement("div");
        informacao.innerHTML = "<strong>" + item.nome + " (você tem " +
            jogador.inventario[item.id] + ")</strong><p>" + item.descricao + "</p>";


        const botao = document.createElement("button");
        botao.textContent = "Comprar por " + item.preco + " pts";
        botao.disabled = jogador.pontos < item.preco;


        botao.addEventListener("click", function() {
            comprarItem(item);
        });


        produto.append(informacao, botao);
        lista.appendChild(produto);
    });


    mostrarTela("tela-loja");
}


function comprarItem(item) {
    if (jogador.pontos < item.preco) {
        alert("Pontos insuficientes!");
        return;
    }


    jogador.pontos -= item.preco;
    jogador.inventario[item.id]++;
    salvarJogador();
    atualizarPontos();
    abrirLoja();
}


// 9. RANKING E MENU


function abrirRanking() {
    const ranking = JSON.parse(localStorage.getItem("futquiz_ranking")) || [];
    const lista = document.getElementById("lista-ranking");
    lista.innerHTML = "";


    if (ranking.length === 0) {
        lista.textContent = "Ninguém jogou ainda. Seja o primeiro!";
    }


    ranking.forEach(function(item, indice) {
        const linha = document.createElement("div");
        linha.className = "linha-ranking";


        const posicao = (indice + 1) + "º";


        linha.innerHTML = "<span>" + posicao + " " + item.nome +
            "</span><strong>" + item.pontos + " pts</strong>";
        lista.appendChild(linha);
    });


    mostrarTela("tela-ranking");
}


document.getElementById("btn-categorias").addEventListener("click", abrirCategorias);
document.getElementById("btn-loja").addEventListener("click", abrirLoja);
document.getElementById("btn-ranking").addEventListener("click", abrirRanking);

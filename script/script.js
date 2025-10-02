let listaProdutos = JSON.parse(localStorage.getItem("produtos")) || [];
// let listaProdutos = [];
const btnCadastroProduto = document.getElementById("btnCadastroProduto");
const formulario = document.querySelector(".formulario");
const tabela = document.querySelector("table"); 
const tbody = tabela.querySelector("tbody"); 

const valorTotalCadastrados = document.querySelector(".valorTotalCadastrados");
const valorTotalInvestimento = document.querySelector(".valorTotalInvestimento");
const valorTotalProdutos = document.querySelector(".valorTotalProdutos");
const  valorEstoqueBaixo = document.querySelector(".valorEstoqueBaixo");
const linkValoresProdutos = document.querySelector(".linkValoresProdutos");
const linkEstoqueBaixo = document.getElementById("linkEstoqueBaixo");
const limiteEstoqueBaixo = 5;

btnCadastroProduto.addEventListener("click", () => {
    if (formulario.style.display === "none" || formulario.style.display === ""){
        formulario.style.display = "grid";
    } else {
        formulario.style.display = "none";
    }
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nomeProduto = document.getElementById("nomeProduto").value;
    const categoriaProduto = document.getElementById("categoriaProduto").value;
    const quantidadeProduto = parseInt(document.getElementById("quantidadeProduto").value);
    const valorUnitario = parseFloat(document.getElementById("valorUnitario").value);
    const valorVenda = parseFloat(document.getElementById("valorVenda").value);

    if (
        nomeProduto.trim() === "" || 
        categoriaProduto.trim() === "" || 
        isNaN(quantidadeProduto) || quantidadeProduto <= 0 || 
        isNaN(valorUnitario) || valorUnitario <= 0 || 
        isNaN(valorVenda) || valorVenda <= 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    };

    if (valorVenda < valorUnitario) {
        alert("O valor de venda não pode ser menor que o valor unitário!");
        return;
    };
    let vendidos = 0;
    const produto = {
        nome: nomeProduto,
        categoria: categoriaProduto,
        quantidade: quantidadeProduto,
        valor: valorUnitario,
        venda: valorVenda,
        total: vendidos * valorVenda,
        vendidos: vendidos,
        investimento: quantidadeProduto * valorUnitario
        };

        listaProdutos.push(produto);

        formulario.reset();

    atualizarTabela();
});

function atualizarTabela() {
    tabela.style.display = "table";

    tbody.innerHTML = "";

    if (listaProdutos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8">Nenhum produto cadastrado</td></tr>`;
        return;
    };

    listaProdutos.forEach((produto,index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.quantidade}</td>
            <td>R$${produto.valor}</td>
            <td>R$${produto.venda}</td>  
            <td>${produto.vendidos}</td>
            <td>R$${produto.total}</td>
            <td>
                <button onclick = "editarProduto(${index})">Editar Quantidade</button>
                <button onclick = "removerProduto(${index})">Excluir</button>
                <button onclick = "editarVenda(${index})">Vendidos</button>
            </td>
            `;
            
            tbody.appendChild(linha);
        });

        atualizarResumo();

        localStorage.setItem("produtos", JSON.stringify(listaProdutos));
    };



function editarProduto(index) {
    const novaQuantidade = parseInt(prompt(`Editar quantidade do produto: ${listaProdutos[index].nome}`, listaProdutos[index].quantidade)
    );

    if (!isNaN(novaQuantidade) && novaQuantidade >= 0) {
        if (novaQuantidade > listaProdutos[index].quantidade) {
            const adicional = novaQuantidade - listaProdutos[index].quantidade;
            listaProdutos[index].investimento += adicional * listaProdutos[index].valor;
        }
        listaProdutos[index].quantidade = novaQuantidade;
        atualizarTabela();
    }
}

function editarVenda(index) {
    const quantidadeVendida = parseInt(
        prompt(`Quantidade vendida do produto: ${listaProdutos[index].nome}`, 1)
    );

    if (!isNaN(quantidadeVendida) && quantidadeVendida > 0) {
        if (quantidadeVendida <= listaProdutos[index].quantidade) {
            // aumenta velor de vendidos
            listaProdutos[index].vendidos += quantidadeVendida;

            // diminui valor do estoque
            listaProdutos[index].quantidade -= quantidadeVendida;

            // total
            listaProdutos[index].total = listaProdutos[index].vendidos * listaProdutos[index].venda;

            atualizarTabela();
        } else {
            alert("Quantidade vendida maior que o estoque disponível!");
        };
    };
}

function removerProduto(index) {
    listaProdutos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(listaProdutos));
    atualizarTabela();
}

// campo resumo:

function atualizarResumo() {
    let totalCadastrados = 0;
    let totalInvestimento = 0;
    let totalProdutos = 0;
    let produtoEstoqueBaixo = 0;

    listaProdutos.forEach (produto => {
        totalCadastrados += produto.quantidade;
        totalInvestimento += produto.investimento;
        totalProdutos += produto.vendidos * produto.venda;

        if ( produto.quantidade < limiteEstoqueBaixo ) {
            produtoEstoqueBaixo++;
        }
    });

    valorTotalCadastrados.textContent = totalCadastrados; //! deve ser a quantidade de linhas!!
    valorTotalInvestimento.textContent = "R$ " + totalInvestimento.toFixed(2);
    valorTotalProdutos.textContent = "R$ " + totalProdutos.toFixed(2);
    valorEstoqueBaixo.textContent = produtoEstoqueBaixo;
};

window.addEventListener("load", atualizarTabela);
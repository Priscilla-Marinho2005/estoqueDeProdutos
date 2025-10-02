const limiteEstoqueBaixo = 5;
const tbody = document.getElementById("tabelaEstoqueBaixo");

let listaProdutos = JSON.parse(localStorage.getItem("produtos")) || [];

let produtosEstoqueBaixo = listaProdutos.filter( p => p.quantidade < limiteEstoqueBaixo );

if ( produtosEstoqueBaixo.length === 0 ) {
    tbody.innerHTML = `<tr><td colspan="7">Nenhum produto com estoque baixo</td></tr>`;
} else {
    produtosEstoqueBaixo.forEach(produto => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.quantidade}</td>
            <td>R$${produto.valor}</td>
            <td>R$${produto.venda}</td>  
            <td>${produto.vendidos}</td>
            <td>R$${produto.total}</td>
        `;

        tbody.appendChild(linha);
    });
}


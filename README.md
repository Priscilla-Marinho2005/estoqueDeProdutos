# 🛒 CRUD de Estoque de Produtos

Sistema simples de **gerenciamento de estoque** com interface web interativa, permitindo cadastrar, editar, excluir produtos e acompanhar resumos de investimento e vendas.
Criado em JavaScript, HTML, CSS.

## ✨**Funcionalidades:**

Resumo de estoque no incio da página:
- Total de produtos cadastrados.
- Total investido.
- Valor total de vendas.
- Quantidade de produtos com estoque baixo.
<br>

- Cadastro de produtos: Inclui nome, categoria, quantidade, valor unitário e valor de venda.
- Edição de quantidade: Permite alterar a quantidade de produtos cadastrados.
- Registro de vendas: Atualiza quantidade de produtos e calcula automaticamente total vendido.
- Exclusão de produtos: Remove produtos do sistema.
- Visualização de estoque baixo: Página separada mostrando apenas produtos com estoque crítico (quantidade menor que 5).
- Persistência local: Todos os dados são armazenados no LocalStorage, mantendo os produtos cadastrados mesmo após recarregar a página.
- Interface responsiva e estilizada com Tailwind CSS e gradientes.

## 💻**Tecnologias Utilizadas:**
- **HTML5** – Estrutura da página.
- **CSS3** + **Tailwind CSS** – Estilo e responsividade.
- **JavaScript** (Vanilla) – Lógica do CRUD e manipulação do DOM.
- **LocalStorage** – Armazenamento de dados no navegador.

## ⚠️ **Observações Importantes:**

- ❌ O valor de venda não pode ser menor que o valor unitário
- 💾 Dados persistem no LocalStorage do navegador

## 🔍**Próximos Passos / Melhorias:**
- Terminar as funcionalidades dos resumos no inicio da página.
- Adcinar filtro por categorias.
- Adcionar gráficos ou resumo em PDF de resumo de vendas.


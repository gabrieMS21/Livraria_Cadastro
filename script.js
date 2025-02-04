// class livro {
//     constructor(pNomeDoLivro, pPaginasDoLivro, pAutor, pPublicadora, pPreco, pTema, pDataLancamento) {
//         this.nomeLivro = pNomeDoLivro;
//         this.paginasLivro = Number(pPaginasDoLivro);
//         this.autor = pAutor;
//         this.publicadora = pPublicadora;
//         this.preco = Number(pPreco);
//         this.tema = pTema;
//         this.dataLancamento = pDataLancamento;
//         this.tempoDeLeitura = this.mediaLeitura();
//     }
//     mediaLeitura() {
//         const horasLidas = this.paginasLivro / 60;
//         return horasLidas.toFixed()
//     }
// }

// var vetor = []
// //transforma o Objeto javaScript em um JSON.
// document.body.onload = function () {
//     vetor = JSON.parse(localStorage.getItem("vetAut")) || [];
// }

// f1.onsubmit = function (e) {
//     e.preventDefault()  // cancela submit do formulário
//     // Criar objeto livro
//     var criandoLivro = new livro(nomeLivro.value, paginasLivro.value, autor.value,
//         publicadora.value, preco.value, tema.value, dataLancamento.value);
//     vetor.push(criandoLivro); //coloca esse novo objeto por ultimo na lista.
//     localStorage.setItem("vetAut", JSON.stringify(vetor))
//     f1.reset();// reseta o formulario para que o usuario possa adicionar novos livros
// }

// //Codigo abaixo faz o objeto livro ser apresentado.
// bListar.onclick = function () {
//     if (!Array.isArray(vetor)) vetor = []; // "!Array" Garante que vetor é um array
//     while (dListar.hasChildNodes()) {
//         dListar.removeChild(dListar.childNodes[0]);
//     }
//     for (let a of vetor) {
//         const descr = 
//         `<hr>
//             <h1><strong>Nome do Livro:</strong> ${a.nomeLivro}</h1></br>
//             <strong>Numero de paginas:</strong> ${a.paginasLivro}</br>
//             <strong>Autor:</strong> ${a.autor}</br>
//             <strong>Publicadora:</strong> ${a.publicadora}</br>
//             <strong>Preço:</strong> R$: ${a.preco}</br>
//             <strong> Tema: </strong> ${a.tema}</br>
//             <strong>Data de lançamento:</strong> ${a.dataLancamento}</br>
//             <strong>Tempo de leitura:</strong> ${a.tempoDeLeitura} horas</br>`;
//         const novoParagrafo = document.createElement('p');
//         novoParagrafo.innerHTML = descr;
//         dListar.appendChild(novoParagrafo);
//     }
// };


class Livro {
    constructor(pNomeDoLivro, pPaginasDoLivro, pAutor, pPublicadora, pPreco, pTema, pDataLancamento) {
        this.nomeLivro = pNomeDoLivro;
        this.paginasLivro = Number(pPaginasDoLivro);
        this.autor = pAutor;
        this.publicadora = pPublicadora;
        this.preco = Number(pPreco);
        this.tema = pTema;
        this.dataLancamento = pDataLancamento;
        this.tempoDeLeitura = this.mediaLeitura();
    }

    mediaLeitura() {
        const horasLidas = this.paginasLivro / 60;
        return horasLidas.toFixed();
    }
}

var vetor = [];

// Carregar dados do localStorage ao carregar a página
document.body.onload = function () {
    vetor = JSON.parse(localStorage.getItem("vetAut")) || [];
}

// Adicionar livro ao vetor e salvar no localStorage
f1.onsubmit = function (e) {
    e.preventDefault(); // Cancela submit do formulário

    // Criar objeto livro
    var criandoLivro = new Livro(nomeLivro.value, paginasLivro.value, autor.value,
        publicadora.value, preco.value, tema.value, dataLancamento.value);

    vetor.push(criandoLivro); // Coloca o novo livro no vetor
    localStorage.setItem("vetAut", JSON.stringify(vetor)); // Salva o vetor no localStorage
    f1.reset(); // Reseta o formulário
}

// Função para listar os livros com botões de editar e excluir
bListar.onclick = function () {
    if (!Array.isArray(vetor)) vetor = []; // Garantir que vetor é um array

    // Limpa a lista de livros exibida
    while (dListar.hasChildNodes()) {
        dListar.removeChild(dListar.childNodes[0]);
    }

    // Exibe todos os livros com seus detalhes e botões
    for (let i = 0; i < vetor.length; i++) {
        const a = vetor[i];
        const descr = `
        <hr>
            <h1><strong>Nome do Livro:</strong> ${a.nomeLivro}</h1></br>
            <strong>Numero de paginas:</strong> ${a.paginasLivro}</br>
            <strong>Autor:</strong> ${a.autor}</br>
            <strong>Publicadora:</strong> ${a.publicadora}</br>
            <strong>Preço:</strong> R$: ${a.preco}</br>
            <strong> Tema: </strong> ${a.tema}</br>
            <strong>Data de lançamento:</strong> ${a.dataLancamento}</br>
            <strong>Tempo de leitura:</strong> ${a.tempoDeLeitura} horas</br>
            <button class="editar" onclick="editarLivro(${i})">Editar</button>
            <button class="excluir" onclick="excluirLivro(${i})">Excluir</button>
        `;
        const novoParagrafo = document.createElement('p');
        novoParagrafo.innerHTML = descr;
        dListar.appendChild(novoParagrafo);
    }
};

// Função para editar um livro
function editarLivro(index) {
    const livro = vetor[index];

    // Preenche o formulário com os dados do livro
    nomeLivro.value = livro.nomeLivro;
    paginasLivro.value = livro.paginasLivro;
    autor.value = livro.autor;
    publicadora.value = livro.publicadora;
    preco.value = livro.preco;
    tema.value = livro.tema;
    dataLancamento.value = livro.dataLancamento;

    // Atualizar a função de envio do formulário para editar o livro
    f1.onsubmit = function (e) {
        e.preventDefault();
        
        // Atualiza os dados do livro no vetor
        vetor[index] = new Livro(nomeLivro.value, paginasLivro.value, autor.value,
            publicadora.value, preco.value, tema.value, dataLancamento.value);

        // Atualiza o localStorage
        localStorage.setItem("vetAut", JSON.stringify(vetor));

        // Limpa o formulário
        f1.reset();

        // Redefine a função de submit para adicionar livro novamente
        f1.onsubmit = function (e) {
            e.preventDefault();
            var criandoLivro = new Livro(nomeLivro.value, paginasLivro.value, autor.value,
                publicadora.value, preco.value, tema.value, dataLancamento.value);
            vetor.push(criandoLivro);
            localStorage.setItem("vetAut", JSON.stringify(vetor));
            f1.reset();
        }

        // Atualiza a lista de livros
        bListar.onclick();
    };
}

// Função para excluir um livro
function excluirLivro(index) {
    if (confirm("Tem certeza que deseja excluir este livro?")) {
        vetor.splice(index, 1); // Remove o livro do vetor
        localStorage.setItem("vetAut", JSON.stringify(vetor)); // Atualiza o localStorage
        bListar.onclick(); // Atualiza a lista de livros
    }
}

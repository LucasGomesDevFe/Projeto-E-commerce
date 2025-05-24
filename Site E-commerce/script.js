let contadorCarrinho = document.querySelector('.contador-carrinho');
const produtoModal = document.getElementById('produto-modal');
const modalImagem = document.getElementById('modal-imagem');
const modalNome = document.getElementById('modal-nome');
const modalPreco = document.getElementById('modal-preco');
const modalComprar = document.getElementById('modal-comprar');
const fecharModal = document.querySelector('.fechar-modal');
const carrinhoIcon = document.querySelector('.carrinho');
const carrinhoModal = document.getElementById('carrinho-modal');
const fecharCarrinho = document.querySelector('.fechar-carrinho');

let carrinho = [];

carrinhoIcon.addEventListener('click', () => {
    carrinhoModal.style.display = 'flex'; 
    exibirCarrinho();
});

fecharCarrinho.addEventListener('click', () => {
    carrinhoModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target === carrinhoModal) {
        carrinhoModal.style.display = 'none';
    }
});
function exibirCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = ''; 

    carrinho.forEach((item, index) => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'carrinho-item';

        produtoDiv.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="carrinho-item-info">
                <h3>${item.nome}</h3>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Preço: R$ ${item.preco}</p>
            </div>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;

        carrinhoItens.appendChild(produtoDiv);
    });

    const totalElement = document.getElementById('total');
    totalElement.textContent = calcularTotal();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1); 
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
    exibirCarrinho(); 
    atualizarContadorCarrinho(); 
};

const limparCarrinho = document.getElementById('limpar-carrinho');

limparCarrinho.addEventListener('click', () => {
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
    atualizarContadorCarrinho();
})
function adicionarAoCarrinho(produtoId) {
    const produto = {
        id: produtoId,
        nome: modalNome.textContent, 
        preco: modalPreco.textContent.replace('R$ ', ''),
        imagem: modalImagem.src, 
        quantidade: 1
    };

    const produtoExistente = carrinho.find(item => item.id === produtoId);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push(produto);
    }

    atualizarContadorCarrinho();
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado ao carrinho!');
}

function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    contadorCarrinho.textContent = totalItens;

    contadorCarrinho.style.transform = 'scale(1.2)';
    setTimeout(() => {
        contadorCarrinho.style.transform = 'scale(1)';
    }, 300);
};

window.onload = function () {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarContadorCarrinho();
    }
};
function calcularTotal() {
    const total = carrinho.reduce((acc, item) => {
        return acc + (parseFloat(item.preco) * item.quantidade);
    }, 0);
    return total.toFixed(2);
};
const finalizarCompra = document.getElementById('finalizar-compra');

finalizarCompra.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        alert(`Compra finalizada! Total: R$ ${calcularTotal()}`);
        carrinho = []; 
        localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
        exibirCarrinho(); 
        atualizarContadorCarrinho(); 
    }
});


function abrirModalProduto(produto) {
    modalImagem.src = produto.querySelector('img').src; 
    modalNome.textContent = produto.querySelector('h3').textContent; 
    modalPreco.textContent = produto.querySelector('p').textContent; 
    modalComprar.setAttribute('data-id', produto.querySelector('.btn').getAttribute('data-id')); 
    produtoModal.style.display = 'flex'; 
}

function fecharModalProduto() {
    produtoModal.style.display = 'none';
}

document.querySelectorAll('.produto').forEach(produto => {
    produto.addEventListener('click', (e) => {
        console.log('Produto clicado:', produto); 
        e.preventDefault();
        abrirModalProduto(produto);
    });
});

fecharModal.addEventListener('click', fecharModalProduto);

window.addEventListener('click', (e) => {
    if (e.target === produtoModal) {
        fecharModalProduto();
    }
});

modalComprar.addEventListener('click', () => {
    const produtoId = modalComprar.getAttribute('data-id'); 
    adicionarAoCarrinho(produtoId); 
    fecharModalProduto(); 
});

window.onload = function () {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarContadorCarrinho();
    }
};

const swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});
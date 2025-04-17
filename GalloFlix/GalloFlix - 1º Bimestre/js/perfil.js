let perfis = [];
let emEdicao = false;
let perfilEdicao = null;

function inicializarDados() {
    let dados = JSON.parse(localStorage.getItem("galloflix-users"));
    if (dados === null) {
        dados = [
            {
                nome: "Gallo",
                avatar: "img/users/avatar.png",
                crianca: false
            },
            {
                nome: "Capitão",
                avatar: "img/users/avatar4.png",
                crianca: false
            },
            {
                nome: "Trizóio",
                avatar: "img/users/avatar5.png",
                crianca: true
            }
        ];
        localStorage.setItem("galloflix-users", JSON.stringify(dados));
    }
    perfis = dados;
}

// Ao carregar a página executa as funções de buscar os dados
document.addEventListener("DOMContentLoaded", async () => {
    carregarPerfis();
    toggleLoading();
    let nome = document.getElementById('Nome');
    nome.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector('.btn-light').click();
        }
    });
    let icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.style.display = 'none';
    })
});

function carregarPerfis() {
    inicializarDados();
    let cards = document.querySelector('.cards');
    cards.innerHTML = '';
    perfis.forEach(perfil => {
        cards.innerHTML +=
            `<div class="card rounded-4">
                <a href="#" class="text-decoration-none" onclick="redirecionarPagina('${perfil.nome}')">
                    <div id="profile-image" class="position-relative rounded-4">
                        <img src="${perfil.avatar}" alt="Avatar" class="img-fluid rounded-4">
                        <i class="icon bi bi-pencil-fill"></i>
                    </div>
                    <p class="text-secondary text-center mt-2 fs-5 mb-0">${perfil.nome}</p>
                </a>
            </div>`;
    });
    cards.innerHTML +=
        `<div class="card rounded-4">
            <a data-bs-toggle="modal" data-bs-target="#addPerfil"
                class="text-decoration-none d-flex flex-column flex-fill">
                <i
                    class='bx bxs-plus-circle rounded-4 d-flex justify-content-center align-items-center flex-fill'></i>
                <p class="text-secondary text-center mt-2 fs-5 mb-0">Adicionar perfil</p>
            </a>
        </div>`;
}

function adicionarPerfil() {
    let perfil = {
        nome: document.getElementById('Nome').value,
        avatar: 'img/users/avatar2.png',
        crianca: document.getElementById('Crianca').checked,
    }
    perfis.push(perfil);
    localStorage.setItem("galloflix-users", JSON.stringify(perfis));
    document.getElementById('Nome').value = '';
    document.getElementById('Crianca').checked = false;
    document.querySelector('.btn-close').click();
    carregarPerfis();
}

function gerenciarPerfil() {
    let icons = document.querySelectorAll('.icon');
    let display = icons[0].style.display == 'none' ? "flex" : "none";
    icons.forEach(icon => {
        icon.style.display = display;
    });
    let button = document.querySelector('#gerenciar');
    if (display == 'none') {
        button.innerText = 'Gerenciar perfis';
        button.classList.remove('gerenciando');
        button.classList.add('gerenciar');
    } else {
        button.innerText = 'Concluído';
        button.classList.add('gerenciando');
        button.classList.remove('gerenciar');
    }
    emEdicao = display == 'flex';
}

function exibirEdicaoPerfil(perfil) {
    let divPerfis = document.querySelector('.perfis');
    divPerfis.classList.remove('d-flex');
    divPerfis.classList.add('d-none');
    let divEdicao = document.querySelector('.edicao');
    divEdicao.classList.remove('d-none');
    divEdicao.classList.add('d-flex');
    let p = perfis.find(o => o.nome == perfil);
    perfilEdicao = perfis.indexOf(p);
    document.querySelector('#avatar').src = p.avatar;
    document.querySelector('#nomeEdicao').value = p.nome;
}

function exibirExcluirPerfil(perfil) {
    let divPerfis = document.querySelector('.perfis');
    divPerfis.classList.remove('d-flex');
    divPerfis.classList.add('d-none');
    let divEdicao = document.querySelector('.edicao');
    divEdicao.classList.remove('d-flex');
    divEdicao.classList.add('d-none');
    let divExcluir = document.querySelector('.excluir');
    divExcluir.classList.remove('d-none');
    divExcluir.classList.add('d-flex');
    let p = perfis.find(o => o.nome == perfil);
    perfilEdicao = perfis.indexOf(p);
    document.querySelector('#avatarExcluir').src = p.avatar;
    document.querySelector('#nomeExcluir').value = p.nome;
}

function exibirPainelPerfil() {
    let divEdicao = document.querySelector('.edicao');
    divEdicao.classList.remove('d-flex');
    divEdicao.classList.add('d-none');
    let divExcluir = document.querySelector('.excluir');
    divExcluir.classList.remove('d-flex');
    divExcluir.classList.add('d-none');
    let divPerfis = document.querySelector('.perfis');
    divPerfis.classList.remove('d-none');
    divPerfis.classList.add('d-flex');
}

function redirecionarPagina(perfil) {
    if (emEdicao) {
        exibirEdicaoPerfil(perfil);
    } else {
        window.location.href = 'index.html';
    }
}

function countText() {
    let charCount = document.getElementById('gameId').value.length;
    document.getElementById('caracteres').innerText = charCount;
}

function atualizarPerfil() {
    let perfil = {
        nome: document.getElementById('nomeEdicao').value,
        avatar: 'img/users/avatar2.png',
        crianca: perfis[perfilEdicao].crianca,
    }
    perfis[perfilEdicao] = perfil;
    localStorage.setItem("galloflix-users", JSON.stringify(perfis));
    carregarPerfis();
    let icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.style.display = 'flex';
    });
    exibirPainelPerfil();
}

function excluirPerfil() {
    perfis.splice(perfilEdicao, 1);
    localStorage.setItem("galloflix-users", JSON.stringify(perfis));
    carregarPerfis();
    let icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.style.display = 'flex';
    });
    exibirPainelPerfil();
}
// Ao carregar a página executa as funções de buscar os dados
document.addEventListener("DOMContentLoaded", async () => {
  await banner();
  await trendingMovies();
  await topRatedMovies();
  toggleLoading();
});

async function banner() {
  let trendings = [];
  await fetch('https://api.themoviedb.org/3/trending/all/week?language=pt-BR', options)
      .then(res => res.json())
      .then(res => res.results.forEach(movie => {
          trendings.push(movie);
      }))
      .catch(err => console.error(err));
  let carousel = document.querySelector('.carousel-inner');
  carousel.innerHTML = '';
  for (let i = 0; i < trendings.length; i++) {
      let active = i == 0 ? 'active' : '';
      carousel.innerHTML +=
          `<div class="carousel-item ${active}" data-bs-interval="10000">
          <a href='detalhes.html?id=${trendings[i].id}&media=${trendings[i].media_type}'>
              <img src="https://image.tmdb.org/t/p/original/${trendings[i].backdrop_path}" class="d-block w-100" alt="">
              <div class="carousel-caption d-md-block">
                  <h3>${trendings[i].title ?? trendings[i].name}</h3>
                  <p class="d-none d-md-block" >${trendings[i].overview}</p>
              </div>
              </a>
          </div>`
  }
}

async function trendingMovies() {
  let trendings = [];
  await fetch('https://api.themoviedb.org/3/trending/movie/day?language=pt-BR', options)
      .then(res => res.json())
      .then(res => res.results.forEach(movie => {
          trendings.push(movie);
      }))
      .catch(err => console.error(err));

  let trendingContainer = document.querySelector('#trendingMovies');
  trendingContainer.innerHTML = '';
  for (let i = 0; i < trendings.length; i++) {
      trendingContainer.innerHTML +=
          `<a href='detalhes.html?id=${trendings[i].id}&media=${trendings[i].media_type}'>
              <img src="https://image.tmdb.org/t/p/original/${trendings[i].poster_path}" alt="">
          </a>`
  }
}

async function topRatedMovies() {
  let toprated = [];
  await fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR', options)
      .then(res => res.json())
      .then(res => res.results.forEach(movie => {
          toprated.push(movie);
      }))
      .catch(err => console.error(err));
  //console.log(toprated);
  
  let topRatedContainer = document.querySelector('#topRatedMovies');
  topRatedContainer.innerHTML = '';
  for (let i = 0; i < toprated.length; i++) {
      topRatedContainer.innerHTML +=
          `<a href='detalhes.html?id=${toprated[i].id}&media=movie'>
              <img src="https://image.tmdb.org/t/p/original/${toprated[i].poster_path}" alt="">
          </a>`
  }
}

// Trending Movies Scroll
const containerTrendingMovies = document.getElementById("trendingMovies");

let scrollIntervalTrendingMovies; // Controlador para o intervalo de scroll
let scrollDirectionTrendingMovies = 0; // Direção do scroll (0 = parado, 1 = direita, -1 = esquerda)

containerTrendingMovies.addEventListener("mousemove", (e) => {
  const boundingRect = containerTrendingMovies.getBoundingClientRect();
  const mouseX = e.clientX;

  const threshold = 200; // Distância das bordas para ativar o scroll

  if (mouseX < boundingRect.left + threshold) {
    scrollDirectionTrendingMovies = -1; // Scroll para a esquerda
    containerTrendingMovies.style.cursor = "url('/img/arrow-left.png'), auto"; // Cursor para a esquerda
  } else if (mouseX > boundingRect.right - threshold) {
    scrollDirectionTrendingMovies = 1; // Scroll para a direita
    containerTrendingMovies.style.cursor = "url('/img/arrow-right.png'), auto"; // Cursor para a direita
  } else {
    scrollDirectionTrendingMovies = 0; // Parar scroll
    containerTrendingMovies.style.cursor = "pointer"; // Cursor padrão
  }
});

containerTrendingMovies.addEventListener("mouseleave", () => {
  scrollDirectionTrendingMovies = 0; // Parar scroll quando o mouse sai do elemento
  containerTrendingMovies.style.cursor = "default"; // Resetar cursor
});

// Função para scroll contínuo
function autoScrollTrendingMovies() {
  if (scrollDirectionTrendingMovies !== 0) {
    containerTrendingMovies.scrollLeft += scrollDirectionTrendingMovies * 6; // Ajuste a velocidade (5 = rápido)
  }
}

scrollIntervalTrendingMovies = setInterval(autoScrollTrendingMovies, 16); // ~60 FPS

// TopRated Movies Scroll
const containerTopRated = document.getElementById("topRatedMovies");

let scrollIntervalTopRated; // Controlador para o intervalo de scroll
let scrollDirectionTopRated = 0; // Direção do scroll (0 = parado, 1 = direita, -1 = esquerda)

containerTopRated.addEventListener("mousemove", (e) => {
    const boundingRect = containerTopRated.getBoundingClientRect();
    const mouseX = e.clientX;

    const threshold = 200; // Distância das bordas para ativar o scroll

    if (mouseX < boundingRect.left + threshold) {
        scrollDirectionTopRated = -1; // Scroll para a esquerda
        containerTopRated.style.cursor = "url('/img/arrow-left.png'), auto"; // Cursor para a esquerda
    } else if (mouseX > boundingRect.right - threshold) {
        scrollDirectionTopRated = 1; // Scroll para a direita
        containerTopRated.style.cursor = "url('/img/arrow-right.png'), auto"; // Cursor para a direita
    } else {
        scrollDirectionTopRated = 0; // Parar scroll
        containerTopRated.style.cursor = "pointer"; // Cursor padrão
    }
});

containerTopRated.addEventListener("mouseleave", () => {
    scrollDirectionTopRated = 0; // Parar scroll quando o mouse sai do elemento
    containerTopRated.style.cursor = "default"; // Resetar cursor
});

// Função para scroll contínuo
function autoScrollTopRated() {
    if (scrollDirectionTopRated !== 0) {
        containerTopRated.scrollLeft += scrollDirectionTopRated * 6; // Ajuste a velocidade (5 = rápido)
    }
}

// Inicia o intervalo de verificação
scrollIntervalTopRated = setInterval(autoScrollTopRated, 16); // ~60 FPS
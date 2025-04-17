// API key
const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1YzQyOGM5MjVkMzAyNzBhYThjZDhjNjk1YjI0ZiIsIm5iZiI6MTc0MjQyNDU5Ni43MjMsInN1YiI6IjY3ZGI0YTE0MDg3NDllZmUzNGU3ODk2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GiUEsVzQgak9VlHrGtGAN_Q7KvCbEzoZGe8KQoru7Oo'
  }
};


// Exibir loading
function toggleLoading() {
  let loader = document.querySelector(".loader");
  loader.style.display = loader.style.display == "none" ? "block" : "none";
}


// Page Scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// Formatar Data
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [day, month, year].join('/');
}
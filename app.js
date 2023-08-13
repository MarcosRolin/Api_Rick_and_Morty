"use strict"
const body = document.querySelector("body");
const main = document.querySelector("main");
const loading = document.querySelector(".lds-hourglass");
const paginatorContainer = document.querySelector(".paginator");
const btn = document.getElementById("get");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);
const cardsContainer = document.getElementById("cards-container");
btn.addEventListener("click", loadingMsg);
let  url = 'https://rickandmortyapi.com/api/character';
let data = [];

function loadingMsg(delay = 2000){
  btn.classList.add("hidden");
  loading.classList.remove("hidden");
  setTimeout(()=>{
    loading.classList.add("hidden")
    handleGetData();
  },delay)
}


const  handleGetData = async () =>{
  try {
    const res = await fetch(url);
    const characters = await res.json()
    data = characters
    renderData(characters)
  } catch (err) {
    console.log(err);
  }
}

function renderData(data) {  
  data.results.forEach(char => {
    const cardBody = document.createElement("div");    
    cardBody.classList.add("card")
    cardBody.innerHTML = `
    <div class="img-container">
    <img src="${char.image}" alt="${char.name}"/>
    </div>
    <h2>${char.name}</h2>
    <p>Species: ${char.species}</p>
    <p>Status: ${char.status}</p>
    `;
    cardsContainer.appendChild(cardBody)    
  });
  paginator(data.info.prev, data.info.next)
}


function paginator(prev, next){
  paginatorContainer.classList.remove("hidden");

  // !prev? prevBtn.setAttribute("disabled", true) : prevBtn.removeAttribute("disabled");
  if(prev === null) {
    prevBtn.setAttribute("disabled", true)
  } else {
    prevBtn.removeAttribute("disabled")
  }

  
  !next? nextBtn.setAttribute("disabled", true) : nextBtn.removeAttribute("disabled");  
}

function prevPage(){
  console.log("Funciona?");
  url = data.info.prev;
  clearPage();
  loadingMsg(500);
}
function nextPage(){
  url = data.info.next;
  clearPage();
  loadingMsg(500);
}

function clearPage(){
  cardsContainer.querySelectorAll("*").forEach((card)=> card.remove())
}

// function getData(){
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(characters => {
    
    //     paginatorContainer.classList.remove("hidden")
    
//     renderData(characters) ;
//   })
//   .catch(err => console.log(err))  
// }

//async/await
// async function getData() {
// try {
//   const res = await fetch('https://rickandmortyapi.com/api/character');
//   const characters = await res.json()
//   renderData(characters)
// } catch (err) {
//   console.log(err);
// }
// }


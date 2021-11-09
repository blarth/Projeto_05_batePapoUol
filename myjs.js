let now = new Date();
let hora = now.getHours();
let minutos = now.getMinutes();
let segundos = now.getSeconds();

const mensagemPadraoData = `${hora}:${minutos}:${segundos}`;

let usuario = prompt("Qual o seu lindo nome ?");

const localChat = document.querySelector(".chat-uol");

function criaMsgEntrada() {
  localChat.innerHTML += `<div class="mensagem status">
        (${hora}:${minutos}:${segundos}) 
        \u00A0<span>${usuario}</span>\u00A0 
        entrou na sala...
        </div>`;
}
function criaMsgSaida() {
  localChat.innerHTML += `<div class="mensagem status">(${mensagemPadraoData})\u00A0<span>${usuario}</span>\u00A0sai da sala... </div>`;
}
criaMsgEntrada();
criaMsgSaida();
/* criaMsgEntrada(); */
function criaMsgTodos() {
  localChat.innerHTML += `<div class="mensagem">(${mensagemPadraoData})\u00A0<span>${usuario}</span>\u00A0 para \u00A0<span>Todos</span>\u00A0 ${mensagem} </div>`;
}

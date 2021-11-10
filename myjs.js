let now = new Date();
let hora = now.getHours();
let minutos = now.getMinutes();
let segundos = now.getSeconds();
requisicaoGet = axios("https://mock-api.driven.com.br/api/v4/uol/messages");
const mensagemPadraoData = `${hora}:${minutos}:${segundos}`;

let usuario = { name: prompt("Qual o seu lindo nome ?") };

const localChat = document.querySelector(".chat-uol");

function trazerMsgsTela(resposta) {
  const respostaData = resposta.data;
  console.log(respostaData);
  for (let i = 0; i < respostaData.length; i++) {
    switch (respostaData[i].type) {
      case "status":
        if (respostaData[i].text === "entra na sala...") {
          criaMsgEntrada(respostaData[i].from, respostaData[i].time);
        } else {
          criaMsgSaida(respostaData[i].from, respostaData[i].time);
        }
        break;
      case "message":
        criaMsgTodos(
          respostaData[i].from,
          respostaData[i].time,
          respostaData[i].to,
          respostaData[i].text
        );
        break;
      case "private_message":
        if (respostaData[i].to === usuario) {
          criaMsgReservada(
            respostaData[i].from,
            respostaData[i].time,
            respostaData[i].to,
            respostaData[i].text
          );
        } else {
        }
        break;
      default:
        console.log(respostaData[i].type);
    }
  }
  const ultimaMsg = document.querySelectorAll(".mensagem");
  ultimaMsg[ultimaMsg.length - 1].scrollIntoView();
}

function refreshMsgs() {
  requisicaoGet.then(trazerMsgsTela);
}

function criaMsgEntrada(usuariox, time) {
  return (localChat.innerHTML += `<div class="mensagem status" data-identifier="message">
        (${time}) 
        \u00A0<span>${usuariox}</span>\u00A0 
        entrou na sala...
        </div>`);
}

function criaMsgSaida(usuariox, time) {
  return (localChat.innerHTML += `<div class="mensagem status" data-identifier="message">
(${time})\u00A0<span>${usuariox}</span>\u00A0sai da sala... 
  </div>`);
}
/* criaMsgEntrada();
criaMsgSaida(); */
/* criaMsgEntrada(); */
function criaMsgTodos(usuariox, time, destinatario, mensagemx) {
  return (localChat.innerHTML += `<div class="mensagem" data-identifier="message">
  (${time})\u00A0<span>${usuariox}</span>\u00A0 para \u00A0<span>${destinatario}</span>\u00A0 ${mensagemx} 
  </div>`);
}

function criaMsgReservada(usuariox, time, destinatario, mensagemx) {
  return (localChat.innerHTML += `<div class="mensagem private" data-identifier="message">
  (${time})\u00A0<span>${usuariox}</span>\u00A0 para \u00A0<span>${destinatario}</span>\u00A0 ${mensagemx} 
  </div>`);
}
requisicaoGet.then(trazerMsgsTela);
setInterval(refreshMsgs, 3000);

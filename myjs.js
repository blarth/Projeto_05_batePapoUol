let now = new Date();
/* let hora = now.getHours();
let minutos = now.getMinutes();
let segundos = now.getSeconds(); */
let requisicaoGetMsg = axios(
  "https://mock-api.driven.com.br/api/v4/uol/messages"
);
let requisicaoPostMsg;
let requisicaoPostUsuario;
let requisicaoPostStatus;
/* const mensagemPadraoData = `${hora}:${minutos}:${segundos}`; */
const localChat = document.querySelector(".chat-uol");
let usuario;

//funcao para cadastrar o usuario no servidor quando ele entra no site
/* function cadastrarUsuario() {
  usuario = {
    name: prompt("Qual o seu lindo nome ?"),
  };

  requisicaoPostUsuario = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/participants",
    usuario
  );

  requisicaoPostUsuario.catch(cadastrarUsuario);
  requisicaoPostUsuario.then(tudoCertoNoCadastro);
}
 */
/* function tudoCertoNoCadastro(response) {
  console.log(response.status);
  ativarIntervalVerificacao();
}
 */
let cadastrarUsuario = () => {
  usuario = {
    name: prompt("Qual o seu lindo nome ?"),
  };

  console.log(usuario.name);
  requisicaoPostUsuario = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/participants",
    usuario
  );

  requisicaoPostUsuario.catch(cadastrarUsuario);
  requisicaoPostUsuario.then((response) => {
    console.log(response.status);
    ativarIntervalVerificacao();
  });
};
cadastrarUsuario();

/* function tudoCertoNoCadastro(response) {
  console.log(response.status);
  ativarIntervalVerificacao();
}
; */
//funcao para verficiar o sevidor

function enviarVerificacao() {
  requisicaoPostStatus = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/status",
    usuario
  );
  requisicaoPostStatus.then((resposta) => {
    console.log("a verificacao ta rolando");
    console.log(resposta.status);
  });
  requisicaoPostStatus.catch((erro) => {
    window.location.reload();
  });
}
/* function VerificacaoMalSucedida(erro) {
  window.location.reload();
} */
/* function VerificacaoSucedida(resposta) {
  console.log("a verificacao ta rolando");
  console.log(resposta.status);
} */
//funcao responsavel por trazer as msgs na tela
function trazerMsgsTela(resposta) {
  const respostaData = resposta.data;
  localChat.innerHTML = "";
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
//funcao para o timeInterval
function refreshMsgs() {
  requisicaoGetMsg = axios(
    "https://mock-api.driven.com.br/api/v4/uol/messages"
  );
  requisicaoGetMsg.then(trazerMsgsTela);
}

function criaMsgEntrada(usuariox, time) {
  return (localChat.innerHTML += `<div class="mensagem status" data-identifier="message">
        <span class="horario"> (${time})</span> <span class="usuario">${usuariox}</span>  
        entrou na sala...
        </div>`);
}

function criaMsgSaida(usuariox, time) {
  return (localChat.innerHTML += `<div class="mensagem status" data-identifier="message">
<span class="horario"> (${time}) </span><span class="usuario"> ${usuariox} </span>sai da sala... 
  </div>`);
}

function criaMsgTodos(usuariox, time, destinatario, mensagemx) {
  return (localChat.innerHTML += `<div class="mensagem" data-identifier="message">
  <span class="horario"> (${time}) </span>
  <span class="usuario"> ${usuariox} </span>
  para <span> ${destinatario} </span>: ${mensagemx} 
  </div>`);
}

function criaMsgReservada(usuariox, time, destinatario, mensagemx) {
  return (localChat.innerHTML += `<div class="mensagem private" data-identifier="message">
  <span class="horario"> (${time}) </span><span class="usuario"> ${usuariox} </span> para <span> ${destinatario} </span>: ${mensagemx} 
  </div>`);
}
//Primeira requisicao quando entra na pagina
requisicaoGetMsg.then(trazerMsgsTela);
//Funcoes que vao rodar em paralelo alimentando o servidor
function ativarIntervalVerificacao(response) {
  setInterval(enviarVerificacao, 4999);
}

setInterval((resposta) => {
  requisicaoGetMsg = axios(
    "https://mock-api.driven.com.br/api/v4/uol/messages"
  );
  console.log(" setInterval ta correto");
  requisicaoGetMsg.then(trazerMsgsTela);
}, 3000);
//parte para enviar msg para o servidor
function enviaMsgTodos(botao) {
  const mensagem = document.querySelector("input").value;
  console.log(mensagem);

  objetoMensagem = {
    from: usuario.name,
    to: "Todos",
    text: mensagem,
    type: "message",
  };
  requisicaoPostMsg = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/messages",
    objetoMensagem
  );
  requisicaoPostMsg.then((resposta) => {
    console.log(resposta);
    console.log("a msg foi!");
    requisicaoGetMsg = axios(
      "https://mock-api.driven.com.br/api/v4/uol/messages"
    );

    requisicaoGetMsg.then(trazerMsgsTela);
  });
  requisicaoPostMsg.catch((error) => {
    window.location.reload();
  });
}
//funcao para deixar o input vazio quando clicado
function espacoBranco(botao) {
  botao.value = "";
}
//funcao para lidar com o envio da msg
/*  function printTaCerto(resposta) {
  console.log(resposta);
  console.log("a msg foi!");
  requisicaoGetMsg = axios(
    "https://mock-api.driven.com.br/api/v4/uol/messages"
  );
  requisicaoGetMsg.then(trazerMsgsTela);
} 

 function printDoErro(error) {
  console.dir(error.response);
  window.location.reload();
}
*/

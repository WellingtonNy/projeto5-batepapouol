const nomeDeUsuario = prompt('digite seu nome aqui');

const nome = { name: nomeDeUsuario };

const tela = document.querySelector('.lista');

let lastMsg;

const intervalo5s = 5000;
const intervalo3s = 3000;

const resposta = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);

resposta.then(iniciar);
resposta.catch(recarregar);


function iniciar() {
    carregarMensagens();
    setInterval(carregarMensagens, intervalo3s);
    setInterval(statusAtivo, intervalo5s);
}


function carregarMensagens() {
    const dados = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    dados.then(exibirNaTela);
}


function exibirNaTela(dados) {
    const mensagens = dados.data;
    tela.innerHTML = '';
    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[i].type === 'status') {

            tela.innerHTML +=
                `<li data-test="message" class="mensagem status">
             <span>(${mensagens[i].time})</span> <b>${mensagens[i].from}
             </b>:  ${mensagens[i].text}</li>`;

        } else if (mensagens[i].type === "message") {

            tela.innerHTML +=
                `<li data-test="message" class="mensagem padrao">
             <span>(${mensagens[i].time})</span> <b>${mensagens[i].from}
             </b> para <b>${mensagens[i].to}</b>
             :  ${mensagens[i].text}</li>`;

        } else if (mensagens[i].type === "private_message" &&
            (mensagens[i].to === nomeDeUsuario ||
                mensagens[i].from === nomeDeUsuario)) {

            tela.innerHTML +=
                `<li data-test="message" class="mensagem reservado">
            <span>(${mensagens[i].time})</span><b>${mensagens[i].from}
            </b> reservadamente para <b>${mensagens[i].to}</b>
            :  ${mensagens[i].text}</li>`;

        }
    }
    descerParaNovaMsg();
}

function recarregar() {
    window.location.reload(true);
}


function statusAtivo() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome);
    promessa.catch(desconectado);
}


function desconectado() {
    alert('Você está off');
    recarregar();
}


function enviar() {
    const msg = document.querySelector('input').value;
    const objMsg = {
        from: nomeDeUsuario,
        to: "Todos",
        text: msg,
        type: "message"
    };
    const respostinha = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objMsg);

    respostinha.then(carregarMensagens);
    respostinha.catch(desconectado);
    document.querySelector('input').value = '';
}


function descerParaNovaMsg() {
    if (lastMsg === undefined || lastMsg !== tela.lastElementChild.innerHTML) {
        lastMsg = tela.lastElementChild.innerHTML;
        tela.lastElementChild.scrollIntoView();
    }
}
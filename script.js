
let nomeDeUsuario=prompt('digite seu nome aqui')

let nome = {name:nomeDeUsuario}

const tela = document.querySelector('.lista')

const resposta = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nome)

resposta.then(iniciar)
resposta.catch(recarregar)

 function iniciar(acerto) {
   carregarMensagens()
   setInterval(carregarMensagens,3000)
   setInterval(statusAtivo, 5000)

    } 

    function carregarMensagens(params) {
        let dados = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
        dados.then(exibirNaTela)
        
    }

    function exibirNaTela(dados) {
        const mensagens=dados.data
        tela.innerHTML=''
        for (let i = 0; i < mensagens.length; i++) {
            if(mensagens[i].type === 'status'){

             tela.innerHTML+=`<li class="mensagem status"> <span>(${mensagens[i].time})</span><b>${mensagens[i].from}</b>  ${mensagens[i].text}</li>`
             
            }else if(mensagens[i].type === "message"){

                tela.innerHTML+=`<li class="mensagem padrao"> <span>(${mensagens[i].time})</span><b>${mensagens[i].from}</b> para <b>${mensagens[i].to}</b>:  ${mensagens[i].text}</li>`

            }else if(mensagens[i].type==="private_message" && mensagens[i].to ===nomeDeUsuario){

                tela.innerHTML+=`<li class="mensagem reservado"> <span>(${mensagens[i].time})</span><b>${mensagens[i].from}</b> reservadamente para <b>${mensagens[i].to}</b>:  ${mensagens[i].text}</li>`

            }
            
        }
       tela.lastElementChild.scrollIntoView();
    }

function recarregar(erro) {
    window.location.reload(true)
}

function statusAtivo(){
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',nome)
    promessa.catch(desconectado)
}

function desconectado(desc) {
    alert('Você está off')
     recarregar()    
}


function enviar() {
 let msg =document.querySelector('input').value
    let objMsg ={
        from:nomeDeUsuario,
        to: "Todos",
        text: msg,
        type: "message"
    }
    const resposta = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',objMsg)

    resposta.then(carregarMensagens)
    resposta.catch(desconectado)
    document.querySelector('input').value=''
}



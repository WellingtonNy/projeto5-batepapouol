
let nomeDeUsuario=prompt('digite seu nome aqui')

let nome = {name:nomeDeUsuario}

const tela = document.querySelector('.lista')

const resposta = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nome)

resposta.then(iniciar)
resposta.catch(recarregar)

 function iniciar(acerto) {
   setInterval(carregarMensagens,3000)

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

            }
            
        }
    
    }

function recarregar(erro) {
    window.location.reload(true)
}

setInterval(statusAtivo, 5000)

function statusAtivo(){
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',nome)
    promessa.catch(desconectado)
}

function desconectado(desc) {
    alert('Você está off')
     recarregar()    
}






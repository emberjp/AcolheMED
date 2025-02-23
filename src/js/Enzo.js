function mudarEspecificade()
{
    var select = document.getElementById('Especificidade');
    var Label1 =document.getElementById('Les1');
    var Label2 =document.getElementById('Les2');
    var Label3 =document.getElementById('Les3');
    var Label4 =document.getElementById('Les4');
    var Label5=document.getElementById('Les5');
    var Mudanca=document.getElementById('Es2');

    var selecionado = select.value;
    if(selecionado==="padrao")
    {
        Label1.textContent ="----";
        Label2.textContent ="----";
        Label3.textContent ="----";
        
        Label4.textContent ="----";
    }
    if(selecionado==="Intoxicações")
    {
    Label1.textContent ="Tempo da ingestão/inalação";
    Label2.textContent ="Sintomas";
    Label3.textContent ="Anafilia";
    Label4.textContent ="Alteração do nivel de consciência";
    Label5.textContent ="Alterações dérmicas apenas locais";
    Mudanca.type='Text';
    }
    if(selecionado==="PA")
    {
  Label1.textContent ="PAD";
  Label2.textContent="PAS";
  Label3.textContent="Sinais de choque";
   Label4.textContent ="Sintomas Associados";
   Label5.textContent ="Hipotensão em criança";
   Mudanca.type='Number';
    };
};
function verifica() {
    // Pega todos os elementos de formulário com atributo "required"
    const camposObrigatorios = document.querySelectorAll('[required]');
    
    let formularioValido = true;
    let mensagemErro = "";
  
    // Itera sobre todos os campos obrigatórios
    camposObrigatorios.forEach(campo => {
      // Verifica se o campo está vazio
      if (!campo.value.trim()) {
        formularioValido = false;
        mensagemErro += `O campo "${campo.previousElementSibling.textContent}" é obrigatório.\n`;
      }
    });
  
    // Se algum campo não foi preenchido, mostra a mensagem de erro
    if (!formularioValido) {
      alert(mensagemErro); // Exibe as mensagens de erro em um alerta
    } else {
      // Se todos os campos obrigatórios foram preenchidos
      alert("Formulário enviado com sucesso!");
      // Aqui você pode adicionar o código para enviar o formulário se necessário
    }
  }
  
 document.addEventListener("DOMContentLoaded", function () {
    const disconnectBtn = document.getElementById("ButDesconectar");
    
    disconnectBtn.addEventListener("click", function () {
        if (confirm("Deseja realmente sair?")) {
            localStorage.removeItem("user"); // Remove o usuário do localStorage
            window.location.href = "login.html";
        }
    });
});   

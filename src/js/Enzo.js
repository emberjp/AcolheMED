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
    }
}
function verifica() {
    var Label5 = document.getElementById('Les5');
    var inputs = document.querySelectorAll('.preencher');
    var todosPreenchidos = true;

    // Verifica se algum input está vazio
    inputs.forEach(function(input) { // Usar 'input' no lugar de 'inputs' aqui
        if (input.value === '') {
            todosPreenchidos = false;
        }
    });

    // Exibe a mensagem dependendo da verificação
    var mensagem = document.getElementById('mensagem');
    if (todosPreenchidos) {
        mensagem.textContent = 'Todos os campos foram preenchidos!';
        Label5.textContent = "HAAAAAAAAAAAAAAA";
    } else {
        mensagem.textContent = 'Por favor, preencha todos os campos.';
        Label5.textContent = "BBBBBBBBBBBBBBBB";
    }
}


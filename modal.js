
const modal_cadastro = document.getElementById("modal_cadastro");

/*
Simples função para mostrar e tirar um item da tela:

se estiver como display "none", ao clicar no elemento desejado ele irá colocar como display "block",
e assim por diante, se estiver em "block" se clicado novamente ele vai desaparecer colocando em display "none".
*/

document.getElementById('login_signup').addEventListener('click', () => {
    modal_cadastro.style.display = "block";
})
document.getElementById('cancel_signup').addEventListener('click', () => {
    modal_cadastro.style.display = "none";
})


// Função para validar CPF
function validarCPF(cpf) {

    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        document.getElementById("wrong_cpf").style.display = 'block';
        return false;
    }

    // Verifica se todos os dígitos são iguais (exemplo: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        document.getElementById("wrong_cpf").style.display = 'block';
        return false;
    }

    // Cálculo do primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = soma % 11;
    var digitoVerificador1 = (resto < 2) ? 0 : 11 - resto;

    // Verifica o primeiro dígito verificador
    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
        document.getElementById("wrong_cpf").style.display = 'block';
        return false;
    }

    // Cálculo do segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    var digitoVerificador2 = (resto < 2) ? 0 : 11 - resto;

    // Verifica o segundo dígito verificador
    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
        document.getElementById("wrong_cpf").style.display = 'block';
        return false;
    }

    return true;
}

// Função para validar Email
function validarEmail(email) {

    //Regex usado para verificar os caracteres antes do @ e depois e checa também após o .
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //Se o regex for testado (.test) e não estiver certo o email, ele vai quebrar e mostrar que está errado.
    if (!regex.test(email)) {
        document.getElementById('wrong_email').style.display = 'block';
        return false;
    }

    return true;
}

// Função para validar data de nascimento
function validarDataNascimento(data) {

    //Regex para verificar se os digitos são números e se são válidos.
    //Se o regex for testado (.test) e não estiver certo a data de nascimento, ele vai quebrar e mostrar que está errado.
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(data)) {
        document.getElementById("wrong_borndate").style.display = 'block';
        return false;
    }

    var partesData = data.split('-');
    var ano = parseInt(partesData[0]);
    var mes = parseInt(partesData[1]);
    var dia = parseInt(partesData[2]);

    if (isNaN(ano) || isNaN(mes) || isNaN(dia)) {
        document.getElementById("wrong_borndate").style.display = 'block';
        return false;
    }

    if (ano < 1900 || ano > new Date().getFullYear() || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        document.getElementById("wrong_borndate").style.display = 'block';
        return false;
    }


    return true;
}

// Função para validar telefone 
function validarTelefone(telefone) {

    // Remove caracteres não numéricos
    telefone = telefone.replace(/\D/g, '');

    // Verifique o comprimento do número de telefone
    if (telefone.length < 10 || telefone.length > 11) {
        document.getElementById("wrong_cellphone").style.display = 'block';
        return false;
    }

    // Verifique se o telefone começa com o dígito 9 (para números de celular)
    if (telefone.length === 11 && telefone.charAt(2) !== '9') {
        document.getElementById("wrong_cellphone").style.display = 'block';
        return false;
    }

    // Outras regras de validação podem ser adicionadas, como verificar o código de área, etc.
    return true;
}

// Função para validar senha 
function validarSenha(password, repeatPassword) {

    //regex abaixo para checar:
    /*
        Se a senha possui mínimo 8 dígitos.
        Se a senha possui letras maiúsculas e minúsculas.
        Se a senha possui caracteres especiais: e.g !@#$%;
        Se a senha possui números.
    */


    var regex = /^(?=.*? [A - Z])(?=.*? [a - z])(?=.*? [0 - 9])(?=.*? [# ? !@$ %^&* -]).{ 8, }$/;
    if (!regex.test(password)) {
        alert('A senha não atende aos critérios.\n\n\nA senha precisa ter no mínimo 8 dígitos.\nPrecisa conter algum caracter especial: !@#$%\nPrecisa conter pelo menos uma letra maiúscula e minúscula.\nPrecisa conter números.')
        document.getElementById('wrong_password').style.display = 'block';
        return false;
    }

    if (password !== repeatPassword) {
        alert('Senhas precisam ser iguais!')
        return false;
    }

    return true;
}

function validarCadastro() {

    var name = document.getElementById("name_input").value;
    var email = document.getElementById("email_input").value;
    var cellphone = document.getElementById("cellphone_input").value;
    var born = document.getElementById("born_input").value;
    var cpf = document.getElementById("cpf_input").value;
    var password = document.getElementById("password_input").value;
    var repeatPassword = document.getElementById("repeat_password_input").value;
    var informacoes_reais = document.getElementById("informacoes_reais").checked;
    var termos_de_uso = document.getElementById("termos_de_uso").checked;

    // Objeto para armazenar as mensagens de erro
    var errors = {};

    // Limpar mensagens de erro antes de revalidar
    document.getElementById("wrong_email").style.display = "none";
    document.getElementById("wrong_cellphone").style.display = "none";
    document.getElementById("wrong_borndate").style.display = "none";
    document.getElementById("wrong_cpf").style.display = "none";
    document.getElementById("wrong_password").style.display = "none";

    // Realize as validações se estão todos os campos preenchidos.
    if (name === "" || email === "" || cellphone === "" || born === "" || cpf === "" || password === "" || repeatPassword === "" || !lerolero) {
        alert("Por favor, preencha todos os campos e aceite as declarações.");
        return false;
    }
    // Realize as validações de cada um para estar no seu devido lugar.
    if (name === "") {
        errors.name = "Por favor, preencha o nome.";
    }

    if (email === "" || !validarEmail(email)) {
        errors.email = "Email inválido ou vazio.";
    }

    if (cellphone === "" || !validarTelefone(cellphone)) {
        errors.cellphone = "Por favor, preencha o telefone.";
    }

    if (born === "" || !validarDataNascimento(born)) {
        errors.born = "Data de nascimento inválida ou vazia.";
    }

    if (cpf === "" || !validarCPF(cpf)) {
        errors.cpf = "CPF inválido ou vazio.";
    }

    if (password === "" || repeatPassword === "" || !validarSenha(password, repeatPassword)) {

        errors.password = "Senhas não coincidem ou estão vazias.";
    }

    if (!informacoes_reais && !termos_de_uso || !termos_de_uso || !informacoes_reais) {
        alert('Aceite os Termos de Uso e confirme que as informações acima são reais.')
        errors.lerolero = "Você deve aceitar as declarações.";
    }

    // Se houver erros no errors = {}, vai retornar e não vai validar o formulário.
    if (Object.keys(errors).length > 0) {
        return false;
    }

    // Se todas as validações passarem, o formulário será enviado
    return alert('Usuário cadastrado com sucesso!');
}
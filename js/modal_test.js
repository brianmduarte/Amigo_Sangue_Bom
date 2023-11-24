
// ---------------------- Área do Modal ----------------------//
const openModalButton = document.querySelector("#login_signup");
const closeModalButton = document.querySelector("#cancel_signup");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});
// ---------------------- Área de Máscaras ----------------------//

// Máscara de CPF
$('#cpf_input').mask('000.000.000-00', { reverse: true });

// Máscara de celular
$('#cellphone_input').mask('(00) 0 0000-0000');

// Máscara de Data de nascimento
$('#born_input').mask('00/00/0000');


// ---------------------- Área de Validações ---------------------- //
(() => {
    const form = document.querySelector('[data-form]')
    const progressBar = document.querySelector('[data-password-progressbar]')
    const fields = {}
    const passwords = {}
    const state = { passwordStrength: 0 }

    const showMessageError = (field, message) => {
        const { element, errorElement } = field
        element.classList.add('error')
        errorElement.style.display = 'block'
        errorElement.textContent = message
    }
    const hideMessageError = (field) => {
        const { element, errorElement } = field
        element.classList.remove('error')
        errorElement.style.display = 'none'
        errorElement.textContent = ''
    }
    const validateRequiredFields = () => {
        let isInValid = false
        for (const fieldKey in fields) {
            const field = fields[fieldKey]
            const { element, errorElement, isRequired } = field
            if ((!element.value || (fieldKey === 'termos' && !element.checked)) && isRequired) {
                isInValid = true
                showMessageError(field, 'Este campo é obrigatório!')
            }
        }
        return isInValid
    }
    const onInputPasswordKeyup = (event) => {
        const { value } = event.target
        const lowerCasePattern = new RegExp(/[a-z]/)
        const upperCasePattern = new RegExp(/[A-Z]/)
        const numberPattern = new RegExp(/[0-9]/)
        const specialCaracherPattern = new RegExp(/[!@#$%\^&*~)\[\]{}?\.(+=\._-]/)
        state.passwordStrength = 0
        if (value.match(lowerCasePattern) && value.match(upperCasePattern)) {
            state.passwordStrength += 23
            passwords['lowerUpperCase'].classList.add('checked')
        } else {
            passwords['lowerUpperCase'].classList.remove('checked')
        }
        if (value.match(numberPattern)) {
            state.passwordStrength += 23
            passwords['number'].classList.add('checked')
        } else {
            passwords['number'].classList.remove('checked')
        }
        if (value.match(specialCaracherPattern)) {
            state.passwordStrength += 23
            passwords['specialCharacter'].classList.add('checked')
        } else {
            passwords['specialCharacter'].classList.remove('checked')
        }
        if (value.length >= 8) {
            state.passwordStrength += 23
            passwords['minCharacter'].classList.add('checked')
        } else {
            passwords['minCharacter'].classList.remove('checked')
        }


        progressBar.style.width = `${state.passwordStrength}%`
        progressBar.dataset.percentage = state.passwordStrength
    }


    const onInputFocus = (event) => {
        const field = fields[event.target.name]
        hideMessageError(field)
    }
    const onFormSubmit = (event) => {
        event.preventDefault()
        if (validateRequiredFields()) return
        
    }


    const setListeners = () => {
        form.addEventListener('submit', onFormSubmit)
        for (const fieldKey in fields) {
            const { element } = fields[fieldKey]
            element.addEventListener('focus', onInputFocus)
            if (fieldKey === 'password') element.addEventListener('keyup', onInputPasswordKeyup)
        }

    }

    const setPasswordItemsElements = () => {
        const passwordItemsElements = document.querySelectorAll('[data-password-item]')
        for (const passwordItem of passwordItemsElements) {
            const passwordName = passwordItem.dataset['passwordItem']
            passwords[passwordName] = passwordItem
        }

    }
    const setFieldElements = () => {
        const inputElements = document.querySelectorAll('[data-input]')
        for (const input of inputElements) {
            const inputName = input.getAttribute('name')
            fields[inputName] = {
                element: input,
                errorElement: input.parentElement.querySelector('[data-error-message]'),
                isRequired: input.hasAttribute('required')
            }
            input.removeAttribute('required')
        }

    }
    const init = () => {
        setFieldElements()
        setPasswordItemsElements()
        setListeners()
    }
    init()
})()
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
    // Regex para verificar se os digitos são números e se são válidos.
    var regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(data)) {
        document.getElementById("wrong_borndate").style.display = 'block';
        return false;
    }

    var partesData = data.split('/');
    var dia = parseInt(partesData[0]);
    var mes = parseInt(partesData[1]);
    var ano = parseInt(partesData[2]);

    if (isNaN(ano) || isNaN(mes) || isNaN(dia)) {
        document.getElementById("wrong_borndate").style.display = 'block';
        return false;
    }

    // Adaptei a verificação do ano e do mês
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
function validarSenha(password) {
    //regex abaixo para checar:
    /*
        Se a senha possui mínimo 8 dígitos.
        Se a senha possui letras maiúsculas e minúsculas.
        Se a senha possui caracteres especiais: e.g !@#$%;
        Se a senha possui números.
    */


    var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()-]).{8,}$/;
    if (!regex.test(password)) {
        alert('A senha não atende aos critérios.\n\n\nA senha precisa ter no mínimo 8 dígitos.\nPrecisa conter algum caracter especial: !@#$%\nPrecisa conter pelo menos uma letra maiúscula e minúscula.\nPrecisa conter números.')
        //document.getElementById('wrong_password').style.display = 'block';
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
    //var repeatPassword = document.getElementById("repeat_password_input").value;
    var informacoes_reais = document.getElementById("informacoes_reais").checked;
    var termos_de_uso = document.getElementById("termos_de_uso").checked;
    // Objeto para armazenar as mensagens de erro
    var errors = {};
    // Limpar mensagens de erro antes de revalidar
    document.getElementById("wrong_email").style.display = "none";
    document.getElementById("wrong_cellphone").style.display = "none";
    document.getElementById("wrong_borndate").style.display = "none";
    document.getElementById("wrong_cpf").style.display = "none";
    //document.getElementById("wrong_password").style.display = "none";
    // Realize as validações se estão todos os campos preenchidos.
    if (name === "" || email === "" || cellphone === "" || born === "" || cpf === "" || password === "") {
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
    if (password === "" || !validarSenha(password)) {
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

    /*
           lembrando que localStorage é na máquina local, 
           então cada pessoa terá um user diferente por conta de não podermos usar banco de dados.
       */
    var formData = {
        name: name,
        email: email,
        cellphone: cellphone,
        password: password,
        informacoes_reais: informacoes_reais,
    };

    try {
        // Verifica se o Local Storage está disponível no navegador
        if (typeof localStorage !== 'undefined') {
            // Recupera dados existentes (se houver)
            var dadosExistentes = localStorage.getItem('dados');
            var dados = dadosExistentes ? JSON.parse(dadosExistentes) : { formDataList: [] };

            // Adiciona uma array no objeto formData aos dados
            dados.formDataList.push(formData);

            // Salva os dados atualizados no Local Storage
            localStorage.setItem('dados', JSON.stringify(dados));
            console.log('Dados foram salvos no Local Storage com sucesso.'); // apenas para testar se está salvando.
        } else {
            console.error('Local Storage não é suportado neste navegador.'); // para caso dê erro no localStorage
        }
    } catch (error) {
        console.error('Erro ao salvar dados no Local Storage:', error); // avisa o erro por não conseguir salvar no localStorage
    }

    alert('Usuário cadastrado com sucesso!');
}


// só criar uma div contendo o id "dados-container" para funcionar certinho.
// Função para exibir os dados na tela
function exibirDadosSalvos() {
    try {
        // Verifica se o Local Storage está disponível no navegador
        if (typeof localStorage !== 'undefined') {
            // Recupera dados existentes (se houver)
            var dadosExistentes = localStorage.getItem('dados');
            var dados = dadosExistentes ? JSON.parse(dadosExistentes) : { formDataList: [] };

            // Referência de onde colocar as informações
            var container = document.getElementById('dados-container');

            // Limpa o conteúdo atual
            container.innerHTML = '';

            // Percorre a lista de formulários e adiciona os dados ao container
            dados.formDataList.forEach(function (formData, index) {
                var div = document.createElement('div');
                div.innerHTML = `<p><strong>Formulário ${index + 1}</strong></p>
                                <p>Name: ${formData.name}</p>
                                <p>Email: ${formData.email}</p>
                                <p>Cellphone: ${formData.cellphone}</p>
                                <p>Password: ${formData.password}</p>
                                <p>Informações reais: ${formData.informacoes_reais}</p>`;
                container.appendChild(div);
            });

            console.log('Dados foram exibidos na tela com sucesso.');
        } else {
            console.error('Local Storage não é suportado neste navegador.');
        }
    } catch (error) {
        console.error('Erro ao exibir dados na tela:', error);
    }
}

//exibirDadosSalvos();
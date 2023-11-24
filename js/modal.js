

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


// ---------------------- Área do Modal de Validação ----------------------//

const openValidation = document.querySelector("#validation_button");
const modalValidation = document.querySelector("#modal__");
const fadeValidation = document.querySelector("#fade__");

const toggleModalValidation = () => {
    modalValidation.classList.toggle("hide__");
    fadeValidation.classList.toggle("hide__");
};

[openValidation, fadeValidation].forEach((el) => {
    el.addEventListener("click", () => toggleModalValidation());
});



// ---------------------- Área de Máscaras ----------------------//

// Máscara de CPF
    $('#cpf_input').mask('000.000.000-00', {reverse: true});

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
    const state = { passwordStrength: 0}
    
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
            if((!element.value || (fieldKey === 'termos' && !element.checked)) && isRequired) {
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




        if(value.match(lowerCasePattern) && value.match(upperCasePattern)) {
            state.passwordStrength += 23

            passwords['lowerUpperCase'].classList.add('checked')
        } else {
            passwords['lowerUpperCase'].classList.remove('checked')
        }

        if(value.match(numberPattern)) {
            state.passwordStrength += 23
            passwords['number'].classList.add('checked')
        } else {
            passwords['number'].classList.remove('checked')
        }

        if(value.match(specialCaracherPattern)) {
            state.passwordStrength += 23
            passwords['specialCharacter'].classList.add('checked')
        } else {
            passwords['specialCharacter'].classList.remove('checked')
        }

        if(value.length >= 8) {
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
        if(validateRequiredFields ()) return
        alert('Cadastro realizado com sucesso!')
    }

    
     
    const setListeners = () => {
        form.addEventListener('submit', onFormSubmit)
        for (const fieldKey in fields) {
            const { element }= fields[fieldKey]
            element.addEventListener('focus', onInputFocus)
            if(fieldKey === 'password') element.addEventListener('keyup', onInputPasswordKeyup)
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
        setPasswordItemsElements ()
        setListeners()
    }

    init()

}) ()



















'use strict';

(() => {
    const passwordEye = document.querySelector('[data-password-eye]')
    const inputPassword = document.querySelector('[name="password"]')
    const state = { showPassword: false }

    const onPasswordEyeClick = (event) => {
        passwordEye.classList.toggle('slash')
        if(state.showPassword) {
            inputPassword.setAttribute('type', 'password')
            state.showPassword = false
        } else {
            inputPassword.setAttribute('type', 'text')
            state.showPassword = true
        }
    }

    const setListeners = () => {
        passwordEye.addEventListener('click', onPasswordEyeClick)
    }

    const init = () => {
        setListeners ()
    }

    init ()

}) ()
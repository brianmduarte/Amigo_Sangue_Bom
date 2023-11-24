function validarRequisitos() {
    // Verifica se todos os grupos de radio buttons foram respondidos
    var todosRespondidos = true;

    // Verifica cada grupo de radio buttons individualmente
    for (let i = 1; i <= 8; i++) {
        var grupo = document.querySelectorAll('input[name="requisitos' + i + '"]:checked');

        // Se nenhum botão estiver marcado, defina todosRespondidos como falso
        if (grupo.length === 0) {
            todosRespondidos = false;
            break; // Não há necessidade de verificar os outros grupos se um não foi respondido
        }
    }

    // Verifica se os campos de idade e peso estão preenchidos
    var idadePreenchida = document.querySelector('input[name="idade"]').value.trim() !== '';
    var pesoPreenchido = document.querySelector('input[name="peso"]').value.trim() !== '';

    // Se todos os grupos foram respondidos e os campos de idade e peso estão preenchidos, continua a validação
    if (todosRespondidos && idadePreenchida && pesoPreenchido) {
        var algumSim = false;

        // Verifica cada grupo individualmente para "Sim"
        for (let i = 1; i <= 8; i++) {
            var grupo = document.querySelector('input[name="requisitos' + i + '"]:checked');

            // Se algum botão estiver marcado como "Sim", define algumSim como true
            if (grupo && grupo.value === "0") {
                algumSim = true;
                break; // Não há necessidade de verificar os outros grupos se um foi marcado como "Sim"
            }
        }

        // Se algum grupo foi marcado como "Sim", exibe o alert correspondente
        if (algumSim) {
            alert("Infelizmente um dos requisitos não foi atendido, encontre uma unidade hospitalar para maiores informações.");
        } else {
            // Se nenhum grupo foi marcado como "Sim", exibe o alert de parabéns
            alert("Parabéns, você cumpriu todos os requisitos para doar sangue.");
        }
    } else {
        // Se algum grupo não foi respondido ou os campos de idade e peso não foram preenchidos, exibe o alert correspondente
        alert("Responda todas as perguntas e preencha os campos de idade e peso antes de validar!");
    }
}
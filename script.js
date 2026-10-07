const formulario = document.querySelector("#contato-form");
const campoNome = document.querySelector("#nome");
const campoMensagem = document.querySelector("#mensagem");
const contadorMensagem = document.querySelector("#contador-mensagem");
const statusFormulario = document.querySelector("#form-status");

const LIMITE_MENSAGEM = 500;

function atualizarContador() {
    const quantidade = campoMensagem.value.length;
    contadorMensagem.textContent = `${quantidade} / ${LIMITE_MENSAGEM} caracteres`;
}

function exibirStatus(mensagem, tipo) {
    statusFormulario.textContent = mensagem;
    statusFormulario.className = `form-status ${tipo}`;
}

function marcarCampo(campo, invalido) {
    campo.classList.toggle("campo-invalido", invalido);
    campo.setAttribute("aria-invalid", String(invalido));
}

function validarFormulario() {
    const nome = campoNome.value.trim();
    const mensagem = campoMensagem.value.trim();
    const nomeInvalido = nome.length < 2;
    const mensagemInvalida = mensagem.length < 10;

    marcarCampo(campoNome, nomeInvalido);
    marcarCampo(campoMensagem, mensagemInvalida);

    if (nomeInvalido) {
        exibirStatus("Digite um nome com pelo menos 2 caracteres.", "erro");
        campoNome.focus();
        return false;
    }

    if (mensagemInvalida) {
        exibirStatus("A mensagem precisa ter pelo menos 10 caracteres.", "erro");
        campoMensagem.focus();
        return false;
    }

    return true;
}

function salvarMensagem() {
    const novaMensagem = {
        nome: campoNome.value.trim(),
        mensagem: campoMensagem.value.trim(),
        criadaEm: new Date().toISOString()
    };

    try {
        const mensagensSalvas = JSON.parse(localStorage.getItem("mensagensPortfolio")) || [];
        mensagensSalvas.push(novaMensagem);
        localStorage.setItem("mensagensPortfolio", JSON.stringify(mensagensSalvas.slice(-20)));
        return true;
    } catch (erro) {
        console.error("Não foi possível salvar a mensagem:", erro);
        return false;
    }
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    if (!salvarMensagem()) {
        exibirStatus("Não foi possível registrar a mensagem neste navegador.", "erro");
        return;
    }

    formulario.reset();
    atualizarContador();
    marcarCampo(campoNome, false);
    marcarCampo(campoMensagem, false);
    exibirStatus("Mensagem registrada com sucesso neste navegador!", "sucesso");
});

[campoNome, campoMensagem].forEach((campo) => {
    campo.addEventListener("input", () => {
        marcarCampo(campo, false);

        if (statusFormulario.textContent) {
            exibirStatus("", "");
        }
    });
});

campoMensagem.addEventListener("input", atualizarContador);
atualizarContador();

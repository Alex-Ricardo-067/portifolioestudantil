const botaoTema = document.querySelector("#botao-tema");

botaoTema.addEventListener("click", alterarTema);

function alterarTema() {
    document.body.classList.toggle("tema-claro");
}
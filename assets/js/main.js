class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector(".formulario");
    this.validar = document.querySelectorAll(".validar");
    this.eventos();
    this.senhaDigitada;
  }

  eventos(e) {
    this.formulario.addEventListener("submit", (e) => {
      this.hadleSubmit(e);
    });
  }

  hadleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
  }

  camposSaoValidos() {
    let valid = true;
    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let campo of this.validar) {
      let labelText = campo.previousElementSibling.textContent;

      //==============Valida CAMPOS VAZIOS=============================
      if (!campo.value) {
        this.criaErro(campo, `Campo "${labelText}" não pode estar em branco.`);
        valid = false;
      }     
      
      //==============VALIDA CPF======================================
      if (campo.classList.contains("cpf")) {
        if (campo.value) {
          this.validaCPF(campo);
        }
      }

      //=============VALIDA CARACTERES LETRAS E/OU NÚMEROS=============
      if (campo.classList.contains("usuario")) {        
        if ((campo.value.length > 0) && this.validaNumeroCaracteresUsuario(campo)  ) {
          this.criaErro(
            campo,
            `Nome de usuário tem que conter entre 3 e 12 caracteres`
          );
        }               

        if ((campo.value.length > 0) && !this.eLetraOuNumero(campo.value) ){
          this.criaErro(
            campo,
            `Nome de usuário só pode conter letras e/ou números`
          );
        }
      }
      //=============VALIDA NÚMEROS DE CARACTERES DO CAMPO SENHA =============

      if (campo.classList.contains("senha")) {
        this.senhaDigitada = campo.value;
        if ((campo.value.length > 0) && (campo.value.length < 6 || campo.value.length > 12)) {
          this.criaErro(campo, `Senha deve conter entre 6 e 12 caracteres`);
        }
      }
      //=================VALIDA CAMPO REPETIR SENHA =============
      if (campo.classList.contains("repetir-senha")) {
        if (this.senhaDigitada !== campo.value) {
          this.criaErro(campo, `Senhas não conferem`);
        }
      }
    }
  }

  //=============Métodos =============
  eLetraOuNumero(campoUsuario) {
    return /^[a-zA-Z0-9]+$/.test(campoUsuario);
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.validar()) {
      this.criaErro(campo, "CPF inválido!");
    }
  }

  validaNumeroCaracteresUsuario(campo) {
    if (campo.value.length < 3 || campo.value.length > 12){
      return true;
    }
  }
 
  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}
const valida = new ValidaFormulario();

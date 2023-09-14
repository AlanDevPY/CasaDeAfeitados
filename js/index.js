import { addclientes, addAgendamiento } from "/js/firebase.js";

let btnAgendar = document.getElementById("btnAgendar");

btnAgendar.addEventListener("click", (e) => {
    e.preventDefault()


    let nombre = document.getElementById("inputNombre").value;
    let apellido = document.getElementById("inputApellido").value;
    let telefono = document.getElementById("inputTelefono").value;
    let hora = document.getElementById("inputHora").value;
    let servicios = []

    // Obtén una lista de todos los elementos checkbox
    const checkboxes = document.querySelectorAll('.form-check-input');

    // Recorre todos los elementos c    heckbox
    checkboxes.forEach(checkbox => {
        // Verifica si el checkbox está marcado
        if (checkbox.checked) {
            servicios.unshift(checkbox.id)

        } else {
            // El checkbox no está marcado
        }
    });
    addAgendamiento(nombre, apellido, telefono, hora, servicios);
    addclientes(nombre, apellido, telefono);




});
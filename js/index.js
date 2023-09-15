import { addclientes, addAgendamiento, getDatos, borrarTurno } from "/js/firebase.js";

let btnAgendar = document.getElementById("btnAgendar");

btnAgendar.addEventListener("click", (e) => {
    e.preventDefault()


    let nombre = document.getElementById("inputNombre").value;
    let apellido = document.getElementById("inputApellido").value;
    let telefono = document.getElementById("inputTelefono").value;
    let hora = document.getElementById("inputHora").value;
    let servicios = []
    let totalServicios = 0;

    // Obtén una lista de todos los elementos checkbox
    const checkboxes = document.querySelectorAll('.form-check-input');

    // Recorre todos los elementos c    heckbox
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          let valor = parseFloat(checkbox.getAttribute('data-valor'));
          servicios.unshift(checkbox.id)
            totalServicios += valor
        }
      });
      
      console.log(totalServicios);

    if (!(nombre === "" || telefono === "" || apellido === "")) {
        // addclientes(nombre, apellido, telefono);
        addAgendamiento(nombre, apellido, telefono, hora,servicios,totalServicios);
        console.log("Datos Agregados");
        document.getElementById("inputNombre").value = "";
        document.getElementById("inputApellido").value = "";
        document.getElementById("inputTelefono").value = "";
        document.getElementById("inputHora").value = "";
        var toast = new bootstrap.Toast(document.getElementById("liveToast"));
        toast.show();

    } else {
        console.log("No puede agregar datos");
        var toast = new bootstrap.Toast(document.getElementById("errorToast"));
        toast.show();

    }
});

window.addEventListener("DOMContentLoaded", async () => {
    let cardTurnos = document.getElementById("cardTurnos")

    getDatos((querySnapshot) => {
        let html = "";
        const turnos = [];

        querySnapshot.forEach((doc) => {
            const turno = doc.data(); // Obtener los datos de la tarea
            turnos.push({ ...turno, id: doc.id }); // Agregar cada tarea al arreglo 'tasks' con su ID
        });


        turnos.forEach((turno) => {
            html += `
            <div class="card" style="width: 18rem">
            <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${turno.time}</h6>
            <h5 class="card-title">${turno.nombre}  ${turno.apellido}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${turno.servicios}</h6>
            <h6 class="card-subtitle mb-2 text-muted"> Total de Servicio : ${turno.totalServicios.toFixed(3)}</h6>
            <h6 class="card-subtitle mb-2 text-muted"> Numero de Telefono ${turno.telefono}</h6>
            <h6 class="card-subtitle mb-2"> Turno Agendado para las : ${turno.hora}</h6>
            <button class="btn btn-success">Terminado</button>
            <button data-id="${turno.id}" class="btn btn-danger delete">Eliminar</button>
            </div>
          </div>
                 `;
        });
        cardTurnos.innerHTML = html

        const btnDelet = cardTurnos.querySelectorAll(".delete");
    
        btnDelet.forEach((btn) => {
            btn.addEventListener("click", (event) => {
              // Llamar a la función deletTask con el ID de la tarea asociado al botón
              borrarTurno(event.target.dataset.id);
            });
          });
    });
});


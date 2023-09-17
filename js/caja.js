import { getDatosCaja, eliminarColeccion } from "/js/firebase.js";

window.addEventListener("DOMContentLoaded", async () => {
    let tbody = document.getElementById("tbody")
    let totalCaja = document.getElementById("totalCaja")


    getDatosCaja((querySnapshot) => {
        let tr = ""
        const turnos = []
        let sumaTotalServicios = 0

        querySnapshot.forEach((doc) => {
            const turno = doc.data(); // Obtener los datos de la tarea
            turnos.push({ ...turno, id: doc.id }); // Agregar cada tarea al arreglo 'tasks' con su ID
        });

        turnos.sort((a, b) => b.hora.localeCompare(a.hora));

        let index = 1
        turnos.forEach((turno) => {
            tr += `
            <tr>
            <th scope="row"> ${index}</th>
            <td>${turno.nombre} ${turno.apellido}</td>
            <td>${turno.hora}</td>
            <td>${turno.servicios}</td>
            <td>${turno.totalServicios.toFixed(3)}</td>
        </tr>
                 `;
                 sumaTotalServicios += turno.totalServicios;
                 index++
                });
                
        tbody.innerHTML = tr

        totalCaja.textContent = sumaTotalServicios.toFixed(3);

    })
});

let cerrarCaja = document.getElementById("cerrarCaja")

cerrarCaja.addEventListener("click", () => {
    eliminarColeccion("Caja")
})



import { getDatosCaja, deleteCaja } from "/js/firebase.js";

window.addEventListener("DOMContentLoaded", async () => {
    let tbody = document.getElementById("tbody")

    getDatosCaja((querySnapshot) => {
        let tr = ""
        const turnos = []

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
                index++
        });

      tbody.innerHTML = tr



    })
});

let cerrarCaja = document.getElementById("cerrarCaja")

cerrarCaja.addEventListener("click",() => {
    deleteCaja()
})
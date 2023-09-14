
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl5-wKr_UEQ_DmpnAF66QQMNng2ytKdZ4",
  authDomain: "casadeafeitados-46fd3.firebaseapp.com",
  projectId: "casadeafeitados-46fd3",
  storageBucket: "casadeafeitados-46fd3.appspot.com",
  messagingSenderId: "174258593812",
  appId: "1:174258593812:web:000dafc793595b4e08c701"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


//   Funcion para agregar clientes a la base de datos de firestore
export const addclientes = (nombre, apellido, telefono) => {
  try {
    addDoc(collection(db, "clientes"), {
      nombre,
      apellido,
      telefono,
    });
  } catch (error) {
    console.log("No fue posible agregar los datos" + error);
  }
}
export const addAgendamiento = (nombre, apellido, telefono, hora, servicios) => {
  try {
    addDoc(collection(db, "Turnos"), {
      nombre,
      apellido,
      telefono,
      hora,
      servicios
    });
  } catch (error) {
    console.log("No fue posible agregar los datos" + error);
  }
}

// Funcion para obteer datos
export const getDatos = (callback) => onSnapshot(collection(db,'Turnos'),callback)
export const borrarTurno = (id) => deleteDoc(doc(db,'Turnos',id));
firebase.initializeApp({
    apiKey: "AIzaSyBJsVmVrDsJ5GznsEWPAAWZa_TKqHGykFo",
    authDomain: "seccioncomentarios.firebaseapp.com",
    projectId: "seccioncomentarios"
});

//inicializo una instancia en Firestore

var db = firebase.firestore();

//     funcion para capturar datos y guardarlos

function comment() {
    const currentComment = document.getElementById("inputComment").value;


    //agrego a la colleccion de firebase 
    db.collection("comentarios").add({
            comentario: currentComment,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("inputComment").value = "";
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    //aca llamo al lugar donde imprimo
    const comentario = document.getElementById("post");


    db.collection("comentarios").onSnapshot((querySnapshot) => {
        comentario.innerHTML = ""
        querySnapshot.forEach((doc) => {
            // console.log(doc.data().comentario);

            comentario.innerHTML += `<div id= "comentarioPosteado"><p> ${doc.data().comentario}</p> 
    <button onclick ="borrar('${doc.id}')">Eliminar</button></div>`
        });
    });

}

function borrar(id) {
    db.collection("comentarios").doc(id).delete().then(() => {
        //console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
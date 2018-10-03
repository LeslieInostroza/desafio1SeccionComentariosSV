function inputComment() {
  const comment = comentarios.value;
  if (comment === '') {
    alert('Mensaje vacío');
  } else {
    const newMessageKey = firebase.database().ref().child('seccionComentarios').push().key;
    firebase.database().ref(`seccionComentarios/${newMessageKey}`).set({
      text: comment,
   
    });
    // Limpiar el textarea
    document.getElementById('comentarios').value = '';    
  }
}

// Buscar mensajes desde data
firebase.database().ref('seccionComentarios').on('child_added', (newMessage)=> {  
  newMessage.val().text; 
  drawComment.innerHTML = `<div>
  ${newMessage.val().text}<i class="fas fa-trash" data-id="${newMessage.key}" onclick="deleteComment(event)"></i>Eliminar</div>`+ drawComment.innerHTML;
});

//preguntar si se quiere eliminar publicacion
const deleteComment = (event) => {
  event.stopPropagation();
  let confirmar = confirm('¿desea eliminar el post?');
  if (confirmar === true) {
    const idComment = event.target.getAttribute('data-id');
    firebase.database().ref('seccionComentarios').child(idComment).remove();
  } else { };
};

// Carrito
// Declaración de arreglo para el contenido del carrito
let cart = [];
let oldCart = JSON.stringify(localStorage.getItem(`cart`));

// Ahora se almacenará lo que se agregue y se registre en el LocalStorage
if (oldCart) {
    cart = oldCart; 
}

// Mostrar Carrito
// showCart(`cart`);
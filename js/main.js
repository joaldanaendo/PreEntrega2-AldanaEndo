// Información referente a los productos

// Contenedor de productos
let contenedor = document.getElementById("contenedor-productos");

// Declaración de arreglo para recibir productos en el carrito
let carritoReceptor = [];

// Recupera los datos del carrito desde localStorage cuando la página se carga
let carritoAlmacenado = localStorage.getItem("carrito");
if (carritoAlmacenado) {
  carritoReceptor = JSON.parse(carritoAlmacenado);
}

// Arreglo de objetos con las características de los productos
const productos = [
    { productoId: "1", productoNombre: "Remera", productoImagen:"./assets/img/products/id1.jpg", productoColor: "negro", productoCosto: 13500},
    { productoId: "2", productoNombre: "Campera", productoImagen:"./assets/img/products/id2.jpg" ,productoColor: "negro", productoCosto: 65000},
    { productoId: "3", productoNombre: "Short", productoImagen:"./assets/img/products/id3.jpg" ,productoColor: "negro", productoCosto: 20000},
    { productoId: "4", productoNombre: "Gorro", productoImagen:"./assets/img/products/id4.jpg" ,productoColor: "negro", productoCosto: 7500},
    { productoId: "5", productoNombre: "Pantalón", productoImagen:"./assets/img/products/id5.jpg" ,productoColor: "blanco", productoCosto: 45000},
    { productoId: "6", productoNombre: "Lentes ", productoImagen:"./assets/img/products/id6.jpg" ,productoColor: "negro", productoCosto: 10000},
    { productoId: "7", productoNombre: "Buzo", productoImagen:"./assets/img/products/id7.jpg" ,productoColor: "perla", productoCosto: 33000},
    { productoId: "8", productoNombre: "Jean", productoImagen:"./assets/img/products/id8.jpg" ,productoColor: "azul", productoCosto: 85000},
    { productoId: "9", productoNombre: "Campera", productoImagen:"./assets/img/products/id9.jpg" ,productoColor: "beige", productoCosto: 65000},
    { productoId: "10", productoNombre: "Pantuflas", productoImagen:"./assets/img/products/id10.jpg" ,productoColor: "celeste", productoCosto: 25000},
    { productoId: "11", productoNombre: "Gorro", productoImagen:"./assets/img/products/id11.jpg" ,productoColor: "beige", productoCosto: 7500},
    { productoId: "12", productoNombre: "Bolsa", productoImagen:"./assets/img/products/id12.jpg" ,productoColor: "beige", productoCosto: 2500},
];

// Método para agregar la información a un div del HTML
productos.forEach((item) => {
  let productoDeCarrito = document.createElement("div");
  productoDeCarrito.className = "productoDeCarrito";
  productoDeCarrito.innerHTML = `
    <h2>${item.productoNombre}</h2>
    <img src= ${item.productoImagen} class= imgProduct alt= ${item.productoNombre} style="width: auto; height:15rem">
    <h5>Color: ${item.productoColor}</h5>
    <b>$${item.productoCosto}</b>
    <button type="button" class = "btnAddProduct" value = ${item.productoId} >Agregar al carrito</button>
  `;
  contenedor.append(productoDeCarrito);
});

// Función que se le asigna al botón "addProduct"
let botonAgregarAlCarrito = document.getElementsByClassName("btnAddProduct");
for (let i = 0; i < botonAgregarAlCarrito.length; i++) {
  botonAgregarAlCarrito[i].addEventListener("click", (e) => {
let productoIdEnCarrito = productos.filter(ele => ele.productoId == e.target.value);
let identificadorId = uuid.v1();
carritoReceptor.push({...productoIdEnCarrito[0], identifier:identificadorId});
appendCart({...productoIdEnCarrito[0], identifier:identificadorId});
pagoTotal(productoIdEnCarrito[0].productoCosto);

// Actualización localStorage
localStorage.setItem("carrito", JSON.stringify(carritoReceptor));
})}

// Declaración e inicialización de variable que brindará el total
let total=0;

// Función para agregar items al carrito
const appendCart = (item) => {
// Contenedor de carrito
  let contenedorCarrito = document.getElementById("contenedor-carrito");
  let productoIdEnCarritoMini = document.createElement("div");
  productoIdEnCarritoMini.className = "productoIdEnCarritoMini";
  productoIdEnCarritoMini.id = item.identifier;
  productoIdEnCarritoMini.innerHTML = `
  <div class="card " style="max-width: 100%;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${item.productoImagen} class="img-fluid rounded-start imgProduct" alt=${item.productoNombre} >
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <h5 class="card-title">${item.productoNombre}</h5>
        <p class="card-text">$${item.productoCosto}.00</p>
        <div id=${item.identifier}></div>
      </div>
    </div>
  </div>
</div>
`
// Contenedor visual
  contenedorCarrito.append(productoIdEnCarritoMini);
  let botonBorrar = document.createElement("button");
  botonBorrar.id = "myButtonDelete";
  botonBorrar.className = "myButtonDeleteClass";
  botonBorrar.textContent = "Borrar";
  botonBorrar.addEventListener("click", () => {
    let borrarItem = carritoReceptor.filter(ele => ele.identifier !== item.identifier);
    carritoReceptor = borrarItem;

// Actualiza localStorage
localStorage.setItem("carrito", JSON.stringify(carritoReceptor));

  let getProduct = document.getElementById(item.identifier);
  getProduct.remove();
  pagoTotal(item.productoCosto*-1);
  })
  let contenedorBotonBorrar = document.getElementById(`${item.identifier}`);
  contenedorBotonBorrar.appendChild(botonBorrar);
}

window.addEventListener("load", () => {
  if(carritoReceptor.length > 0){
    carritoReceptor.forEach((item) => {
    appendCart(item);
    pagoTotal(item.productoCosto);
    })}
})

// Llamado a función que oculatará el botón hasta que se agreguen productos
ocultarBtnFinalizar();

// Función para cálculo total
function pagoTotal(precio){
   
    total = total + precio;
    let totalAgregado = document.getElementById("total");
    totalAgregado.textContent = `Cantidad: ${carritoReceptor.length} - Total a pagar: $${total}`;
    // Condición para mostrar el botón finalizar solo si hay productos en el carrito
    if(carritoReceptor.length > 0){
      mostrarBtnFinalizar();
    } else {
      ocultarBtnFinalizar();
    }
  }
  
// Método para indicar qué mostrar con el botón "Finalizar compra"
  let btnFinalizar = document.getElementById("btnFinalizar");
  btnFinalizar.addEventListener("click", () => {
    Swal.fire({
      title: 'Gracias por comprar Tranca',
      text: `N° orden: ${Math.floor(Math.random() * 5000)} - Tu cuenta es de $${total}`,
      imageUrl: './assets/img/tranca/tranca_final.jpg',
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Tranca perrita',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Finalizar',
      denyButtonText: `Regresar`,
    }).then((result) => {
      result.isConfirmed ? window.location.reload() : result.isDenied;
    })
// Eliminación de localStorage al finalizar la compra
    localStorage.clear();
  });

// Validación para carga de localStorage de usuario o solicitar el ingreso
let usuario = localStorage.getItem("usuario");
usuario && mostrarUsuario(usuario)

// Función para solicitar el inicio de la sesión
function mostrarUsuario(usuario) {
  let infoUsuario = document.getElementById("infoUsuario");
  infoUsuario.textContent = `¡Qué gusto verte nuevamente, ${usuario}!`;

  // Condición para mostrar el botón login o no en función a la existencia de usuario en el localStorage
  (localStorage.getItem("usuario") !== null) ? ocultarbtnInicioSesion() : mostrarbtnInicioSesion();
  }


// Botón de inicio de sesión
let btnInicioSesion = document.getElementById("btnInicioSesion");
btnInicioSesion.addEventListener("click", () => {
  Swal.fire({
    title: 'Inicie sesión',
    input: 'text',
    inputPlaceholder: 'Ingrese su usuario',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Iniciar Sesión',
    cancelButtonText: 'Continuar sin sesión',
    preConfirm: (usuario) => {
      if (usuario) {
        // Guarda el nombre de usuario en el localStorage del usuario
        localStorage.setItem("usuario", usuario);
        mostrarUsuario(usuario);

// Valida la aparación del botón en función al localStorage
        btnInicioSesion.style.display = 'none';
      }
    }
  });
});

// Funciones para mostrar u ocultar el botón "Finalizar compra"
function ocultarBtnFinalizar(){
  document.getElementById("btnFinalizar").style.display = `none`;
}

function mostrarBtnFinalizar(){
  document.getElementById("btnFinalizar").style.display = "block";
}

// Funciones para mostrar u ocultar el botón "Login/Iniciar Sesión"
function ocultarbtnInicioSesion(){
  document.getElementById("btnInicioSesion").style.display = `none`;
}

function mostrarbtnInicioSesion(){
  document.getElementById("btnInicioSesion").style.display = "block";
}

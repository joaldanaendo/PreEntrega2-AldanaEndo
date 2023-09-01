// Información referente a los productos

// Contenedor de productos
let contenedor = document.getElementById("contenedor-productos");

// Declaración de arreglo para recibir productos en el carrito
let cart = [];

// Recupera los datos del carrito desde localStorage cuando la página se carga
let storedCart = localStorage.getItem("carrito");
if (storedCart) {
  cart = JSON.parse(storedCart);
}

// Arreglo de objetos con las características de los productos
const productos = [
    { productId: "1", productName: "Remera", productImage:"../assets/img/products/id1.jpg", productColor: "Ropa - Tranca", productCost: 13500},
    { productId: "2", productName: "Campera", productImage:"../assets/img/products/id2.jpg" ,productColor: "negro", productCost: 65000},
    { productId: "3", productName: "Short", productImage:"../assets/img/products/id3.jpg" ,productColor: "negro", productCost: 20000},
    { productId: "4", productName: "Gorro", productImage:"../assets/img/products/id4.jpg" ,productColor: "negro", productCost: 7500},
    { productId: "5", productName: "Pantalón", productImage:"../assets/img/products/id5.jpg" ,productColor: "blanco", productCost: 45000},
    { productId: "6", productName: "Lentes ", productImage:"../assets/img/products/id6.jpg" ,productColor: "negro", productCost: 10000},
    { productId: "7", productName: "Buzo", productImage:"../assets/img/products/id7.jpg" ,productColor: "perla", productCost: 33000},
    { productId: "8", productName: "Jean", productImage:"../assets/img/products/id8.jpg" ,productColor: "azul", productCost: 85000},
    { productId: "9", productName: "Campera", productImage:"../assets/img/products/id9.jpg" ,productColor: "beige", productCost: 65000},
];

// Método para agregar la información a un div del HTML
productos.forEach((item) => {
  let productCard = document.createElement("div");
  productCard.className = "productCard";
  productCard.innerHTML = `
    <h2>${item.productName}</h2>
    <img src= ${item.productImage} class= imgProduct alt= ${item.productName} style="width: auto; height:15rem">
    <h5>Color: ${item.productColor}</h5>
    <b>$${item.productCost}</b>
    <button type="button" class = "btnAddProduct" value = ${item.productId} >Agregar al carrito</button>
  `;
  contenedor.append(productCard);
});

// Función que se le asigna al botón "addProduct"
let botonAddProduct = document.getElementsByClassName("btnAddProduct");
for (let i = 0; i < botonAddProduct.length; i++) {
botonAddProduct[i].addEventListener("click", (e) => {
let productIdintoCart = productos.filter(ele => ele.productId == e.target.value);
let identifierId = uuid.v1();
cart.push({...productIdintoCart[0], identifier:identifierId});
appendCart({...productIdintoCart[0], identifier:identifierId});
pagoTotal(productIdintoCart[0].productCost);

// Actualización localStorage
localStorage.setItem("carrito", JSON.stringify(cart));
})}

// Declaración e inicialización de variable que brindará el total
let total=0;

// Función para agregar items al carrito
const appendCart = (item) => {
// Contenedor de carrito
let contenedorCart = document.getElementById("contenedor-carrito");
  let productIdintoCartMini = document.createElement("div");
  productIdintoCartMini.className = "productIdintoCartMini";
  productIdintoCartMini.id = item.identifier;
  productIdintoCartMini.innerHTML = `
  <div class="card " style="max-width: 100%;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${item.productImage} class="img-fluid rounded-start imgProduct" alt=${item.productName} >
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <h5 class="card-title">${item.productName}</h5>
        <p class="card-text">$${item.productCost}.00</p>
        <div id=${item.identifier}></div>
      </div>
    </div>
  </div>
</div>
`
// Contenedor visual
  contenedorCart.append(productIdintoCartMini);
  let button = document.createElement("button");
  button.id = "myButtonDelete";
  button.className = "myButtonDeleteClass";
  button.textContent = "Borrar";
  button.addEventListener("click", () => {
    let deleteItem = cart.filter(ele => ele.identifier !== item.identifier);
  cart = deleteItem;

// Actualiza localStorage
localStorage.setItem("carrito", JSON.stringify(cart));

  let getProduct = document.getElementById(item.identifier);
  getProduct.remove();
  pagoTotal(item.productCost*-1);
  })
  let contenedorButtonDelete = document.getElementById(`${item.identifier}`);
  contenedorButtonDelete.appendChild(button);
}

// Llamado a función que oculatará el botón hasta que se agreguen productos
hideBtnFinalizar();

// Función para cálculo total
function pagoTotal(precio){
    total = total + precio;
    let totalContent = document.getElementById("total");
    totalContent.textContent = total;

    // Condición para mostrar el botón finalizar solo si hay productos en el carrito
    if(cart.length > 0){
      showBtnFinalizar();
    } else {
      hideBtnFinalizar();
    }
  }
  
// Método para indicar qué mostrar con el botón "Finalizar compra"
  let btnFinalizar = document.getElementById("btnFinalizar");
  btnFinalizar.addEventListener("click", () => {
    Swal.fire({
      title: 'Gracias por comprar Tranca',
      text: `Tu cuenta es de $${total}`,
      imageUrl: '../assets/img/tranca/tranca_final.jpg',
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Tranca perrita',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Finalizar',
      denyButtonText: `Regresar`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.isDenied) {
      // Se deja sin acciones para que regrese a la ventana para continuar con la compra
      }
    })
// Eliminación de localStorage al finalizar la compra
    localStorage.clear();
  });

// Validación para carga de localStorage de usuario o solicitar el ingreso
let usuario = localStorage.getItem("usuario");
if (usuario) {
  mostrarUsuario(usuario);
}

// Función para solicitar el inicio de la sesión
function mostrarUsuario(usuario) {
  let userInfo = document.getElementById("userInfo");
  userInfo.textContent = `¡Qué gusto verte nuevamente, ${usuario}!`;

  // Condición para mostrar el botón login o no en función a la existencia de usuario en el localStorage
  if (localStorage.getItem("usuario") !== null){
    hideBtnLogin();
  }else {
    showBtnLogin();
  }}

// Botón de inicio de sesión
let btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", () => {
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
        btnLogin.style.display = 'none';
      }
    }
  });
});

// Funciones para mostrar u ocultar el botón "Finalizar compra"
function hideBtnFinalizar(){
  document.getElementById("btnFinalizar").style.display = `none`;
}
function showBtnFinalizar(){
  document.getElementById("btnFinalizar").style.display = "block";
}

// Funciones para mostrar u ocultar el botón "Login/Iniciar Sesión"
function hideBtnLogin(){
  document.getElementById("btnLogin").style.display = `none`;
}
function showBtnLogin(){
  document.getElementById("btnLogin").style.display = "block";
}
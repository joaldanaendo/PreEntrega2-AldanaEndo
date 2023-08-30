// Información referente a los productos

// Contenedor de productos
let contenedor = document.getElementById("contenedor-productos");

// Declaración de arreglo para recibir productos en el carrito
let cart = [];

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
// Información interna
// <h5>Código: ${item.productId}</h5>
// Método para agregar a "productCard"

  contenedor.append(productCard);
});

// Eventos para botones
let botonOferta = document.getElementById("btnOferta");
botonOferta.onclick = () =>{
  alert(`¡OFERTA 1!`);  // Alerta al dar click en el botón oferta
}

// Función que se le asigna al botón "addProduct"
let botonAddProduct = document.getElementsByClassName("btnAddProduct");
for (let i = 0; i < botonAddProduct.length; i++) {
botonAddProduct[i].addEventListener("click", (e) => {
let productIdintoCart = productos.filter(ele => ele.productId == e.target.value);
let identifierId = uuid.v1();
cart.push({...productIdintoCart[0], identifier:identifierId});
appendCart({...productIdintoCart[0], identifier:identifierId});
pagoTotal(productIdintoCart[0].productCost);
console.log(cart);
})}

// Declaración e inicialización de variable que brindará el total
let total=0;

// Función para agregar items al carrito
const appendCart = (item) => {
  console.log(item);
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
// Contenedor 
  contenedorCart.append(productIdintoCartMini);
  let button = document.createElement("button");
  button.id = "myButtonDelete";
  button.className = "myButtonDeleteClass";
  button.textContent = "Borrar";
  button.addEventListener("click", () => {
    let deleteItem = cart.filter(ele => ele.identifier !== item.identifier);
  cart = deleteItem;
  let getProduct = document.getElementById(item.identifier);
  getProduct.remove();
  pagoTotal(item.productCost*-1);
  console.log(cart); 
  })
  let contenedorButtonDelete = document.getElementById(`${item.identifier}`);
  contenedorButtonDelete.appendChild(button);
}

// Función para cálculo total
function pagoTotal(precio){
    total = total + precio;
    let totalContent = document.getElementById("total");
    totalContent.textContent = total;
  }


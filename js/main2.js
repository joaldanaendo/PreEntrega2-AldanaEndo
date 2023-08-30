// Información referente a los productos

// Contenedor de productos
let contenedor = document.getElementById("contenedor-productos");

// Declaración de arreglo para recibir productos en el carrito
let cart = [];

// Arreglo de objetos con las características de los productos
const productos = [
    { productId: "1", productName: "Remera negra", productImage:"../assets/img/products/id1.jpg", productColor: "Ropa - Tranca", productCost: 200},
    { productId: "2", productName: "Casaca", productImage:"../assets/img/products/id2.jpg" ,productColor: "negro", productCost: 100},
    { productId: "3", productName: "Short", productImage:"../assets/img/products/id3.jpg" ,productColor: "negro", productCost: 150},
    { productId: "4", productName: "Gorro", productImage:"../assets/img/products/id4.jpg" ,productColor: "negro", productCost: 250},
    { productId: "5", productName: "Pantalón", productImage:"../assets/img/products/id5.jpg" ,productColor: "blanco", productCost: 45},
    { productId: "6", productName: "Lentes de sol", productImage:"../assets/img/products/id6.jpg" ,productColor: "negro", productCost: 90},
    { productId: "7", productName: "Polera", productImage:"../assets/img/products/id7.jpg" ,productColor: "perla", productCost: 120},
    { productId: "8", productName: "Jean", productImage:"../assets/img/products/id8.jpg" ,productColor: "azul", productCost: 50},
    { productId: "9", productName: "Casaca", productImage:"../assets/img/products/id9.jpg" ,productColor: "beige", productCost: 100},
];

// Método para agregar la información a un div del HTML
productos.forEach((item) => {
  let productCard = document.createElement("div");
  productCard.className = "productCard";
  productCard.innerHTML = `
    <h2>${item.productName}</h2>
    <p>Código: ${item.productId}</p>
    <img src= ${item.productImage} alt= ${item.productName} style="width: auto; height:15rem">
    <p>Color: ${item.productColor}</p>
    <b>$${item.productCost}</b>
    <button type="button" class = "btnAddProduct" value = ${item.productId} >Agregar al carrito</button>
  `;

  contenedor.append(productCard);
});

// Eventos para botones
let botonOferta = document.getElementById("btnOferta");
botonOferta.onclick = () =>{
  alert(`¡OFERTA 1!`);  // Alerta al dar click en el botón oferta
}

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

let total=0;

const appendCart = (item) => {
  console.log(item);
// Contenedor de carrito
let contenedorCart = document.getElementById("contenedor-carrito");

  let productIdintoCartMini = document.createElement("div");
  productIdintoCartMini.className = "productIdintoCartMini";
  productIdintoCartMini.id = item.identifier;
  productIdintoCartMini.innerHTML = `
  <div class="card mb-3" style="max-width: 100%;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${item.productImage} class="img-fluid rounded-start" alt=${item.productName} >
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${item.productName}</h5>
        <p class="card-text">$${item.productCost}.00</p>
        <div id=${item.identifier}></div>
      </div>
    </div>
  </div>
</div>
`
  contenedorCart.append(productIdintoCartMini);
  let button = document.createElement("button");
  button.id = "myButtonDelete";
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

function pagoTotal(precio){
    total = total + precio;
    let totalContent = document.getElementById("total");
    totalContent.textContent = total;
  }

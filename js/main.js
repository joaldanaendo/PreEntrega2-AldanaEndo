// Se declara una variable que va a contener un arreglo con los objetos que se traeran desde la data
const productList = [];

// Creación de clase constructora para la estructura de los objetos del arreglo "productList"
class Products {
    constructor(productId, productName, productType, productCost) {
        this.productId = productId;
        this.productName = productName;
        this.productType = productType;
        this.productCost = productCost;
    }

    // Método que agrega a "productList" /
    addProduct() {
        productList.push({
            productId: `${this.productId}`,
            productName: `${this.productName}`,
            productType: `${this.productType}`,
            productCost: `${this.productCost}`,
        })
    }
}

// Arreglo que contendrá la información de la data
const data = [
    { productId: "1", productName: "Remera", productType: "Ropa - Tranca", productCost: 200 },
    { productId: "2", productName: "Casaca", productType: "Ropa - Tranca", productCost: 100 },
    { productId: "3", productName: "Pantalón", productType: "Ropa - Tranca", productCost: 150 },
    { productId: "4", productName: "Short", productType: "Ropa - Tranca", productCost: 250 },
    { productId: "5", productName: "Gorro", productType: "Accesorios - Act4u", productCost: 45 },
    { productId: "6", productName: "Lentes de sol", productType: "Accesorios - Act4u", productCost: 90 },
    { productId: "7", productName: "Mochila", productType: "Accesorios - Act4u", productCost: 120 },
    { productId: "8", productName: "Audífonos", productType: "Tecnología - Now", productCost: 50 },
    { productId: "9", productName: "Parlante", productType: "Tecnología - Now", productCost: 100 },
];

// Método que recorrerá la data y llama al método ".addProduct()" para agregarlos a "productList"
data.forEach((ele) => {
    const register = new Products(ele.productId, ele.productName, ele.productType, ele.productCost);
    register.addProduct();

})

// Declaración de una constante que almacerá los resultados de la búsqueda para luego sumar los costos (productCost)
const cart = [];

// Inicio de interacción entre el usuario y la web
let username = prompt("Ingrese su usuario");

//  Validación de ingreso de usuario
while (username == "") {
    username = prompt("Verifique su usuario");
}

// Solicitud de código de producto
let id = prompt(`
Ingrese el código del producto (1-9) que agregará al carrito

Para terminar, escriba 0
`
);

// Validación de código de producto
while (id != 0) {
    // Declarar la variable que filtrará la data para encontrar coincidencias con el id del producto
    let filterProduct = productList.filter(ele => ele.productId === id);

    // Validación de ingreso de id diferente de vacío
    if (filterProduct.length > 0) {
        // Método para agregar los producto filtrados a la constante "cart"
        cart.push(filterProduct[0]);

        // Información a mostrar
        let info =
            `
    Información del producto consultado:

    Código: ${filterProduct[0].productId}
    Producto: ${filterProduct[0].productName}
    Categoría: ${filterProduct[0].productType}
    Costo: $${filterProduct[0].productCost}
    
    ¡Suerte!
    `;
        alert(info);
    } else {
        alert(`El producto en consulta no se encuentra en la lista de productos`);
    }

    id = prompt(`
Ingrese el código del producto (1-9) que agregará al carrito

Para terminar, escriba 0
`
    );
}

// Declaración de la variable que almacenará el costo de los productos
let total = 0;

// Método que recorrerá los productos agregados a "cart" y acumulará el "total"
cart.forEach((ele) => {
    total = total + Number(ele.productCost);
})

// Condición para aplicar un descuento a través de una operación aritmética
if (total >= 500) {
    alert(`¡Felicitaciones! Ahora solo paga $${total * 0.75} con el descuento de 25%`);

} else {
    alert(`¡Gracias! El costo total es de $${total}`);
}

// Mensaje de cierre de interacción
alert(`Gracias, ${username} ¡Vuelve pronto (=*.*=) !`);


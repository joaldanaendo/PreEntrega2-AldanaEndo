//** Se declara una variable que va a contener un arreglo con los objetos que se traeran desde la data */
const list = [];

//* Creación de clase constructora para la estructura de los objetos del arreglo "list" */
class Juegos {
    constructor(gameId, name, type, cost) {
        this.gameId = gameId;
        this.name = name;
        this.type = type;
        this.cost = cost;
    }

    //* Método que agrega a "list" */
    addGame() {
        list.push({
            gameId: `${this.gameId}`,
            name: `${this.name}`,
            type: `${this.type}`,
            cost: `${this.cost}`,
        })
    }
}

//* Arreglo que contendrá la información de la data */
const data = [
    { gameId: "G291", name: "5 Hand American Blackjack", type: "blackjack", cost: 1 },
    { gameId: "G320", name: "The Great Wall", type: "keno", cost: 1 },
    { gameId: "G284", name: "Bonus Poker", type: "poker", cost: 1 },
    { gameId: "G327", name: "Aces and Faces", type: "poker", cost: 1 },
    { gameId: "G128", name: "Arctic Wolf", type: "slot", cost: 50 },
    { gameId: "G135", name: "Circus Carnival", type: "slot", cost: 40 },
    { gameId: "G136", name: "Barbarian Riches", type: "slot", cost: 75 },
    { gameId: "G171", name: "Princess Of The Deep", type: "slot", cost: 88 },
    { gameId: "G176", name: "Living The Dream Classic", type: "slot", cost: 1 },
];

//* Método que recorrerá la data y llama al método ".addGame()" para agregarlos a "list" */
data.forEach((ele) => {
    const register = new Juegos(ele.gameId, ele.name, ele.type, ele.cost);
    register.addGame();

})

//* Declaración de una constante que almacerá los resultados de la búsqueda para luego sumar los costos (cost) */
const cart = [];

//* Inicio de interacción entre el usuario y la web */
let cliente = prompt("Ingrese su usuario");

//*  Validación de ingreso de usuario */
while (cliente == "") {
    cliente = prompt("Verifique su usuario");
}

//* Solicitud de código de producto */
let id = prompt(`Ingrese el código de juego a consultar`);

//* Validación de código de producto */
while (id != "X") {
    //* Declarar la variable que filtrará la data para encontrar coincidencias con el id del producto */
    let filterGame = list.filter(ele => ele.gameId === id);

    //* Validación de ingreso de id diferente de vacío */
    if (filterGame.length > 0) {
        //* Método para agregar los producto filtrados a la constante "cart" */
        cart.push(filterGame[0]);

        //* Información a mostrar */
        let info =
            `
    Información del juego consultado:

    GameID: ${filterGame[0].gameId}
    Name: ${filterGame[0].name}
    Category: ${filterGame[0].type}
    Cost: ${filterGame[0].cost}
    
    ¡Suerte!
    `;
        alert(info);
    } else {
        alert(`El juego en consulta no se encuentra en la lista`);
    }

    id = prompt(`Ingrese el código de juego a consultar`);
}

//* Declaración de la variable que almacenará el costo de los productos */
let total = 0;

//* Método que recorrerá los productos agregados a "cart" y acumulará el "total" */
cart.forEach((ele) => {
    total = total + Number(ele.cost);
})

//* Condición para aplicar un descuento a través de una operación aritmética */
if (total > 200) {
    alert(`¡Felicitaciones! Ahora solo paga $${total * 0.75} con el descuento de 25%`);

} else {
    alert(`¡Gracias! El costo total es de $${total}`);
}

//* Mensaje de cierre de interacción */ 
alert(`Gracias, ${cliente} ¡Vuelve pronto (=*.*=) !`);


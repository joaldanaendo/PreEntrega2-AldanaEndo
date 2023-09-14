# PreEntrega3-AldanaEndo

Repositorio para la entrega de trabajos del curso de JavaScript

# Concepto

- Tienda de ropa casual donde se ofrecen productos exclusivos.

# Proceso

1. El usuario ingresa a la página y tiene una opción para iniciar la sesión o se identifique
2. Selecciona los productos que desea comprar.
3. Para agregarlos, hace clic en el botón "Agregar al carrito" que se muestra al lado de cada producto.
4. Al lado derecho o superior (dependiendo del tamaño de la pantalla) se agregarán los productos seleccionados.
5. En la parte superior del carrito se mostrará el total.
6. Al finalizar la selección, se podrá hacer clic en el botón "Finalizar compra"
7. Se procede a pagar y finaliza la experiencia de usuario.

- El localStorage del usuario se almacena para mostrar y no volver a solicitar el ususario.
- El localStorage del carrito permite mostrar los productos pese a actualizar la web.

# Recursos adicionales

- bootstrap
  ** Link: https://getbootstrap.com/docs/5.1/getting-started/introduction/
  ** Version: v5.1
  \*\* Uso: estilado de componentes

- uuid
  ** Link: https://www.npmjs.com/package/uuid?activeTab=readme
  ** Version: v9.0.0
  \*\* Uso: agregar un identificador a los productos del carrito y así, cuando si se eliminan productos iguales, no eliminar los productos con las mismas propiedades y valores.

* sweetalert2
  ** Link: https://sweetalert2.github.io/#examples
  ** Version: v11.7.27
  \*\* Uso: estilado de "alertas"

# Desarrollo

- En la web, el usuario puede iniciar sesión para identificarse, esto es opcional, puesto que también se presenta la opción para continuar sin sesión.
- Esta sesión se guardará en el localStorage, cerrando la sesión solo al finalizar la compra.
- Se muestra la página de la tienda con 12 productos que se ingresan a través de la creación de un archivo .json, cuya información se cargará de manera asíncrona con uso de async/await como sustitución de .then en más de una oportunidad.
- Se agrega el elemto botón por medio de un elemento identificado con la clase .btnAddProduct y se le asigna la posibilidad de poder filtrar, con un clic llamado con un addEventListener y de identificar los productos, así sean la misma prenda, con un identicador agregado con la librería "uuid", de este modo, si se elimina un producto X y existiese más productos iguales, el total siga considerando los productos que quedan realmente en el carrito.
- Con appendCart se agrega internamente al contenedor del carrito y se le asigna una tarjeta agregada con bootstrap.
- Se crea un elemento button por cada producto agregado al carrito, de este modo, se podrán eliminar los productos. Estos elementos mantienen la identificación con uuid.
- Se calcula el total, considerando las posibles eliminaciones de los productos.
- Muestra el total.
- Se agrega un botón para finalizar la compra y mostrar un mensaje de compra exitosa.

# Indicaciones finales

- No usar prompt, alert ni console.log
- Uso de operadores ternarios
- Manejo de promesas con fetch (asincronía)
- Carga de datos desde API o archivo local .json

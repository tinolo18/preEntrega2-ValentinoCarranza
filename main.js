const productos = [{
    id: "Conjunto de Mates",
    titulo:"Conjunto de Mates",
    imagen:"./img/conjunto mate.jpeg",
    categoria:{
        nombre:"Mates",
        id:"Mates"
     },
    precio:50000
},
{
    id:"Mate Imperial",
    titulo:"Mate Imperial",
    imagen:"./img/mate imperial.png",
    categoria:{
        nombre:"Mates",
        id:"Mates"
    },
    precio:30000
},
{
    id:"Mate Camionero",
    titulo:"Mate Camionero",
    imagen:"./img/mate camionero.jpeg",
    categoria:{
        nombre:"Mates",
        id:"Mates"
    },
    precio:27000
},{
    id:"Calabaza Pulida",
    titulo:"Calabaza Pulida",
    imagen:"./img/mate casco calabaza pulida.jpg",
    categoria:{
        nombre:"Mates",
        id:"Mates"
    },
    precio:25000
},{
    id:"Bombilla acero inoxi",
    titulo:"Bombilla acero inoxi",
    imagen:"./img/bombilla acero inox.jpeg",
    categoria:{
        nombre:"Bombillas",
        id:"Bombillas"
    },
    precio:10000
},{
    id:"Bombilla pico de loro",
    titulo:"Bombilla pico de loro",
    imagen:"./img/bombilla pico de loro.jpeg",
    categoria:{
        nombre:"Bobillas",
        id:"Bombillas"
    },
    precio:20000
},{
    id:"Bombilla copa",
    titulo:"Bombilla copa",
    imagen:"./img/bombilla copa estrella.jpeg",
    categoria:{
        nombre:"Bombillas",
        id:"Bombillas"
    },
    precio:25000
},{
    id:"Bombilla Stanley",
    titulo:"Bombilla Stanley",
    imagen:"./img/bombilla stanley.jpeg",
    categoria:{
        nombre:"Bombillas",
        id:"Bombillas"
    },
    precio:25000
}
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");



function cargarProductos(productosElegidos) {
    
    
    contenedorProductos.innerHTML = "";



    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
        `;

        contenedorProductos.append(div);
    
    })
    actualizarBotonesAgregar();

}

cargarProductos(productos);


botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos"){

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)


            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)

            cargarProductos(productosBoton)

        }else{
            tituloPrincipal.innerHTML = "Todos los productos"

            cargarProductos(productos)
        }

    })
});

function actualizarBotonesAgregar() {

    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });


}


let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")



if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();

}else{
    productosEnCarrito = [];
}



function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado  = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;

    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerHTML = nuevoNumerito

}









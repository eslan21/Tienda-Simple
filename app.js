const arrayProductor = [
    {
        nombre: 'Harina Juana la Cubana regegrergerg',
        precio: 1.5,
        id:1,
        imagen: 'https://i.postimg.cc/Fz211wM3/harina-pan.jpg'
    },
    {
        nombre: 'Pasta',
        precio: 1.2,
        id:2,
        imagen: 'https://i.postimg.cc/Fz211wM3/harina-pan.jpg'
    },   
     {
        nombre: 'Azucar',
        precio: 1,
        id:3,
        imagen: 'https://i.postimg.cc/Fz211wM3/harina-pan.jpg'
    },   
     {
        nombre: 'Arroz',
        precio: 1.3,
        id:4,
        imagen: 'https://i.postimg.cc/Fz211wM3/harina-pan.jpg'
    },
    {
        nombre: 'Mantequilla',
        precio: 0.90,
        id:5,
        imagen: 'https://i.postimg.cc/Fz211wM3/harina-pan.jpg'
    },
    {
        nombre: 'Mayoneza',
        precio: 1.5,
        id:1,
        imagen: 'https://i.postimg.cc/Fz211wM3/harina-pan.jpg'
    },
]

let arrCarrito = [];

let abcDario = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0
]


//------Selectores


//Contenedor de productos
const mainProductos = document.querySelector('#main');
//Boton Carrito
const botonCarrito = document.querySelector('#showOptions');
//Opciones
const opciones = document.querySelectorAll('.opciones');
//Cesta carrito
const mostrarOcultarCesta = document.querySelector('#logoCarrito');
// p donde salen lso numeros
const numeroCarrito = document.querySelector('#numeroDeProductos');
//Boton compra
const botonWhatsApp = document.querySelector('#botonWhatsApp');
//Boton para Eliminar Modal
const modalDelete = document.querySelector('#boton-modal');
//Modal-container
const modalContainer = document.querySelector('#modal-container');
const modal = document.querySelector('#modal');
//Mostrar total 
const total = document.querySelector('#total')
const divPrecioTotal = document.querySelector('#precioTotal')
//Precio del dolar
const mostrarDolar = document.querySelector('#mostrarDolar')

//------Eventos  


mainProductos.addEventListener('click',contadorResta);
mainProductos.addEventListener('click', contadorSuma);
mainProductos.addEventListener('click', datosProducto);
botonCarrito.addEventListener('click', mostrarOpciones);
mostrarOcultarCesta.addEventListener('click', mostrarCesta);
mainProductos.addEventListener('click', eliminarDelCarrito);
//botonWhatsApp.addEventListener('click', realizarCompra )
mostrarDolar.addEventListener('click', mostrarPrecioDolar)


//Variables Globales

let precioDolar = 5;





//----------------------------------------FUNCIONES

//Mostrar precio del dolar
function mostrarPrecioDolar(){
    const pMensaje = document.createElement('p');
    pMensaje.classList = 'mensaje-error'
    pMensaje.id = 'mensajeError'
    pMensaje.innerText = `${precioDolar} Bs al dia de hoy.`
    document.querySelector('body').appendChild(pMensaje)

    setTimeout(()=>{
        document.querySelector('#mensajeError').remove()
    },2000)
}

//Generar numero aleatorio

function random(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}



function idAleatorio(arry){
    let codigo = '';
    for(let i = 0; i < 6; i++){
        codigo+=`${abcDario[random(0,abcDario.length)]}`
        if(i === 5){
            let busqueda = arry.some(element=>element.id == codigo);
            if(busqueda === true){
                i = 0;
                codigo = '';
            } else {
                
                return codigo;
            }
        }
    };
};

//contados


function contadorResta (e){
    e.preventDefault();
    if(e.target.classList.contains('link-resta')){
        if(e.target.parentElement.querySelector('div').innerHTML>0 ){
       e.target.parentElement.querySelector('div').innerHTML =`${Number(e.target.parentElement.querySelector('div').innerHTML) - 1} `
        } else {
            return
        }
    }
}
function contadorSuma (e){
    e.preventDefault();
    if(e.target.classList.contains('link-suma')){
        
       e.target.parentElement.querySelector('div').innerHTML =`${Number(e.target.parentElement.querySelector('div').innerHTML)  + 1} `
        
    }
}

//Datos Productos

function datosProducto(e){
    e.preventDefault();
    let datos;

    if(e.target.classList.contains('take-data')){
        datos = {
            cantidad : Number(e.target.parentElement.parentElement.querySelector('.contador div').innerHTML),
            imagen : e.target.parentElement.parentElement.parentElement.querySelector('.imgProducto img').src,
            precio : Number(e.target.parentElement.parentElement.parentElement.querySelector('.precioProducto div').children[1].innerHTML),
            nombre : e.target.parentElement.parentElement.parentElement.querySelector('.nombreProducto').innerHTML,
            id: idAleatorio(arrCarrito)
        }
        //Comprobando si elemento existe en carrito
        let comprobacion = arrCarrito.some(arr => arr.nombre===datos.nombre)
        if(comprobacion){ 
            return mensajeError('Este elemento ya existe en el carrito');
        }
        //-------------------------------------------------------------
        agregarProductoCarrito(datos);
        arrCarrito.push(datos);
        contadorProducto(1)
        calculoPrecio()
    }

}

//Calculo de Precio Acumilado
function calculoPrecio(){
    precioTotal = 0;
    divPrecioTotal.innerHTML = '';
    arrCarrito.forEach((arr)=>{
        precioTotal= precioTotal + arr.precio*arr.cantidad
    })
    divPrecioTotal.innerHTML = `$${precioTotal.toFixed(2)} o ${(precioTotal*precioDolar).toFixed(2)}Bs`
}

//Agregar productor a carrito

function agregarProductoCarrito(datos){
   
   
    const divData = document.createElement('div');
    divData.setAttribute('data-id', `${datos.id}`)
    divData.className = 'addElement';
   
    let addData = `
        <div class="nombreProductoCar"> 
                <p>${datos.nombre}</p>
        </div>
        <div>          
                    <img src="${datos.imagen}">
        </div>
        <div class="cantidadPrecio">
            <div class="block_1">
                <p>Cantidad</p>
                <p>Precio</p>
            </div>
            <div class="block_2">
                    <p> ${datos.cantidad}</p>
                    <div>
                        <p>$${(datos.precio*datos.cantidad).toFixed(2)}</p>
                       <p> Bs${(datos.precio*datos.cantidad*precioDolar).toFixed(2)}</p>
                    </div>
            </div>
        </div>
        <p class="eliminar">
        Eliminar
        </p>
        
    `
    divData.innerHTML = addData;
    document.querySelector('#canastaCarrito').appendChild(divData)
}

// Numero de productos en carrto

function contadorProducto(numConSigno){
       numeroCarrito.innerHTML = Number(numeroCarrito.innerHTML) + Number(numConSigno)
        if(numeroCarrito.innerHTML==0){
            numeroCarrito.style = "visibility: hidden";
        }else {
            numeroCarrito.style = "visibility: visible";

        }
}


//Eliminar del carrito
function eliminarDelCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('eliminar')){
       
       let id = e.target.parentElement.getAttribute('data-id')
       arrCarrito.forEach((producto, index) => {
            if(id == producto.id){
                arrCarrito.splice(index,1)
                e.target.parentElement.remove()
                contadorProducto(-1)
                calculoPrecio()
            }
            
        })
    }
}

//Mostrar y ocultar opciones

function mostrarOpciones(){
    const ocultar = Array.from(opciones);
    ocultar.forEach(opcion=>{
        
       opcion.classList[1] === 'opciones'  ? opcion.classList.replace('opciones', 'hideOff')  : opcion.classList.replace('hideOff', 'opciones' );
    })
}

//Mostrar cesta

function mostrarCesta(e){
   e.preventDefault
    canastaCarrito.classList.toggle('hide')
    botonWhatsApp.classList.toggle('hide')
    total.classList.toggle('hide')
    total.classList.toggle('flexCenter')

}



//--------Precio $----------

//render productos
arrayProductor.forEach((producto)=>{
    
    const divProcto = document.createElement('div')
    divProcto.classList = 'contenedorProducto';
    divProcto.setAttribute('data-id', `${producto.id}`)
    divProcto.innerHTML= `
    
        <div class="nombreProducto">${producto.nombre} </div>
        <div class="imgProducto"><img src="${producto.imagen}"> </div>
        <div class="precioProducto ">
            <div>
                <p>$</p>
                <p>${producto.precio}</p> 
            </div>
            <div>
                <p>Bs</p>
                ${producto.precio*precioDolar}
            </div>
        </div>
        <div class="contador-agregar"> 
            <div class="flexCenter contador"  >
                <a href="#"  class="link-resta " >-</a>
                <div>${1}</div>
                <a href="#" class="link-suma " >+</a>
            </div>
            <div class="flexCenter agregar ">
                <a class="take-data">Agregar</a>
            </div>
        </div>
    `;
    mainProductos.appendChild(divProcto)
})

//Mensaje Error 
function mensajeError(mensaje){
    const pMensaje = document.createElement('p');
    pMensaje.classList = 'mensaje-error'
    pMensaje.id = 'mensajeError'
    pMensaje.innerText = mensaje
    document.querySelector('body').appendChild(pMensaje)

    setTimeout(()=>{
        document.querySelector('#mensajeError').remove()
    },2000)

}
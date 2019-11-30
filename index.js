var local = {
    vendedoras: ['Ada', 'Grace', 'Hedy', 'Sheryl'],

    ventas: [
        // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
        { id: 1, fecha: new Date(2019, 1, 4), nombreVendedora: 'Grace', sucursal: 'Centro', componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1500'] },
        { id: 2, fecha: new Date(2019, 0, 1), nombreVendedora: 'Ada', sucursal: 'Centro', componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1500'] },
        { id: 3, fecha: new Date(2019, 0, 2), nombreVendedora: 'Grace', sucursal: 'Caballito', componentes: ['Monitor ASC 543', 'Motherboard MZI'] },
        { id: 4, fecha: new Date(2019, 0, 10), nombreVendedora: 'Ada', sucursal: 'Centro', componentes: ['Monitor ASC 543', 'Motherboard ASUS 1200'] },
        { id: 5, fecha: new Date(2019, 0, 12), nombreVendedora: 'Grace', sucursal: 'Caballito', componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1200'] }
    ],

    precios: [
        { componente: 'Monitor GPRS 3000', precio: 200 },
        { componente: 'Motherboard ASUS 1500', precio: 120 },
        { componente: 'Monitor ASC 543', precio: 250 },
        { componente: 'Motherboard ASUS 1200', precio: 100 },
        { componente: 'Motherboard MZI', precio: 30 },
        { componente: 'HDD Toyiva', precio: 90 },
        { componente: 'HDD Wezter Dishital', precio: 75 },
        { componente: 'RAM Quinston', precio: 110 },
        { componente: 'RAM Quinston Fury', precio: 230 }
    ],

    sucursales: ['Centro', 'Caballito']
};

let idCard = 0;

function crearVentaHTML(venta) {
    const ventaHTML = `
 <li class="venta listaa" id="card-${++idCard}">
     <div class="fecha">${venta.fecha.getDate()}/${venta.fecha.getMonth() + 1}/${venta.fecha.getFullYear()}</div>
     <div class="sucursal">${venta.sucursal}</div>
     <div class="vendedora">${venta.nombreVendedora}</div>
     <div class="componentes">${venta.componentes}</div>
     <div>$${precioMaquina(venta.componentes)}</div>
     <div> <button class="trash" onclick="eliminarCard('card-${idCard}')">X</button></div>
 </li>
`;
    return ventaHTML;
}

const eliminarCard = (id) => {
    document.getElementById(id).remove();
}




// Primer función

const obtenerPrecioComponente = nombreComponente => {
    //funcion para buscar el precio de cada pieza
    let precio = 0;



    local.precios.forEach(function(comp) {
        if (comp.componente === nombreComponente) {
            precio = comp.precio;
        }
    });

    return precio;
};

const precioMaquina = componentes => {
    //funcion que suma los precios de las piezas
    let total = 0;
    componentes.forEach(function(partes) {
        total += obtenerPrecioComponente(partes);
    });

    return total;
};

console.log(precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1200']));

/* cantidadVentasComponente(componente): recibe un componente y 
devuelve la cantidad de veces que fue vendido,´
 o sea que formó parte de una máquina que se vendió. 
 La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas. */

const cantidadVentasComponente = componente => {
    let total = 0;
    local.ventas.forEach(function(venta) {
        venta.componentes.forEach(function(compVenta) {  
           return compVenta === componente ? total++ : total
        });
    });
    return total;
};

const cantidadVentasComponente2 = componente => {
    return local.ventas
    .map(v => v.componentes)
    .flat()
    .reduce((total,c)=> c === componente ? ++total : total, 0);
}



console.log(cantidadVentasComponente('Monitor GPRS 3000'));

const ventasHTML = local.ventas.map(crearVentaHTML);
const ul = document.getElementById('ventas');
ul.innerHTML = ventasHTML.join('');


const vendedoraDelMes = (mes, anio) => {

    let maxImporte = 0;
    let maxNombreVendedora = ' ';


    //recorro el listado de vendedoras
    local.vendedoras.forEach(function(vendedoraF){
        const vendedora = vendedoraF;
        let totalVendidoVendedora = 0;
        //cuanto vendio cada una
        //filtro las ventas por cada vendedora
        const ventasPorVendedoras = local.ventas.filter(venta =>{
             return venta.nombreVendedora === vendedora
             && venta.fecha.getFullYear() === anio
             && venta.fecha.getMonth() +1 === mes
        });

        //ventas por vendodora

        ventasPorVendedoras.forEach(function(ventaJ){
            const venta = ventaJ;
            //total de ventas por vendedoras
            const importe = precioMaquina(venta.componentes);
            totalVendidoVendedora += importe;
        });

        if (totalVendidoVendedora > maxImporte){
            maxImporte = totalVendidoVendedora;
            maxNombreVendedora = vendedora;
        }//termina elforEach de vendedoras
    })

    return document.querySelector('.vendedoraTop').innerHTML = 'Vendedora que mas ingreso genero: <strong>' + maxNombreVendedora + '</strong>';
}

console.log(vendedoraDelMes(2, 2019));


function ventasMes(mes,anio){
    let totalVenta = 0;

    local.ventas.forEach(function(ventaF){
        let venta = ventaF;

        if(venta.fecha.getFullYear()=== anio && venta.fecha.getMonth() +1 === mes){
            totalVenta += precioMaquina(venta.componentes);
        }
        
       });

       return totalVenta;
    
}

console.log( ventasMes(1, 2019) );



function ventasVendedora(nombre){
      let totalVendidoVendedora = 0;
        local.ventas.filter(venta =>{
            if(nombre === venta.nombreVendedora){
                totalVendidoVendedora += precioMaquina(venta.componentes);

                } 
          });
    return totalVendidoVendedora;
}

console.log(ventasVendedora('Grace'));


function ventasSucursal(sucursalF){
    let totalVentasSucursal = 0;
    
      local.ventas.filter(venta =>{
        let sucursall = sucursalF;
          if(sucursalF === venta.sucursal){
              totalVentasSucursal += precioMaquina(venta.componentes);
              
              }
              document.querySelector('.kaka-sucursal').innerHTML = sucursall;
              document.querySelector('.total').innerHTML = totalVentasSucursal;
        });

        
  return totalVentasSucursal;
}

console.log(ventasSucursal('Centro')); 


function huboVentas(mes,anio){
    let ventas = 0;

   local.ventas.forEach(function(ventaF){
        let venta = ventaF;

        if(venta.fecha.getFullYear()=== anio && venta.fecha.getMonth() +1 === mes){
            ventas = 1;
        } 
        
       });

    if ( ventas > 0){
        return true;

    } else{
        return false;
    }
   
    
}

console.log( huboVentas(3, 2019) ); 



function componenteMasVendido(){

    let cantCompVendidos = [];
    let componentes = [];
    let componentesV = [];
    let maxCant = 0;
    let maxNombre = ' ';
   
    //recorre los componentes de precios
    local.precios.forEach(function(compF){
        let comp = compF.componente;
        return componentes.push(comp);
    });
    //recorre las ventas
    local.ventas.forEach(function(ventaF){
        let venta = ventaF;
        venta.componentes.forEach(function(compV){
            let componenteV = compV;
            return componentesV.push(componenteV);
        });
    });

    //recorre el array de los componentes
    
    componentes.forEach(function(componenteF){
        let componenteVendido = 0; //compara los componentes vendidos si estan el el array
        let componente = componenteF;
        //creo un nuevo objeto
        let miNuevoComp = new Object();
        componentesV.forEach(function(compCf){
            //comparo las propiedades del objeto
            if (componente === compCf){
                componenteVendido++;
               
             };
             miNuevoComp.cantidadCompVend = componenteVendido,
             miNuevoComp.nombreComp = componente;
             
        //pusheo al array vacio los objetos con sus proiedades
        }); cantCompVendidos.push(miNuevoComp);
        
    });
    //busco el mas vendido en el array con los objetos con un contador
    cantCompVendidos.forEach(function(cantCVF){
        if (cantCVF.cantidadCompVend > maxCant){
            maxCant = cantCVF.cantidadCompVend;
            maxNombre = cantCVF.nombreComp;
        }
    });//retorna el nombre del mas vendido
    return document.querySelector('.fav').innerHTML = 'Producto estrella:  <strong>'+ maxNombre + '</strong>';
}

console.log(componenteMasVendido());

const sucursalDelMes = (mes, anio) => {
    let maxImporte = 0;
    let maxNombreSucursal = '';
    // recorrer listado de vendedoras
    local.ventas.forEach(venta => {
        const sucursal = venta.sucursal;
        let totalVendido = 0;
        const ventasFiltradas = local.ventas.filter(venta => {
            return venta.sucursal === sucursal && venta.fecha.getFullYear() === anio && venta.fecha.getMonth() + 1 === mes;
        });
        ventasFiltradas.forEach(ventaF => {
            const venta = ventaF;
            const importe = precioMaquina(venta.componentes);
            totalVendido += importe;
        });
        if (totalVendido > maxImporte) {
            maxImporte = totalVendido;
            maxNombreSucursal = sucursal;
        }
    });
    return maxNombreSucursal;
};

console.log( sucursalDelMes(1, 2019) ); // "Centro"

const abrirModalNuevaVenta = () => {
    document.querySelector('#modal-nueva-venta').classList.add('active');
}

document.querySelector('.btn-agregar-ventas').onclick = abrirModalNuevaVenta;


const cerrarModal = () => {
    document.querySelector('#modal-nueva-venta').classList.remove('active');
}

document.querySelector('.cancel-modal-close').onclick = cerrarModal;


const agregarVenta= () => {
    let valorVendedora = document.querySelector('#vendedora').value
    let valorSucursal = document.querySelector('#sucursal').value
    let valorComponentes =     Array.from( document.querySelector('#componentes').selectedOptions).map(option => option.value)

    let hoy = new Date();
    let total = precioMaquina(valorComponentes);

    const ventaHTML = `
 <li class="venta listaa" id="card-${++idCard}">
    <div class="fecha">${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}</div>
     <div class="sucursal">${valorSucursal}</div>
     <div class="vendedora">${valorVendedora}</div>
     <div class="componentes">${valorComponentes}</div>
     <div class="total">$${total}</div>  
     <div> <button class="trash" onclick="eliminarCard('card-${idCard}')">X</button></div>
 </li>
`;


const ul = document.getElementById('ventas');
ul.innerHTML += ventaHTML;
}


document.querySelector('.agregar-modal-agregar').onclick = agregarVenta;






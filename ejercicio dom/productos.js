var products = [
    {
        id: 1,
        name: 'Dolor est.',
        description: 'Amet stet sanctus amet eos eirmod amet. Et amet ipsum.',
        imageUrl: 'https://picsum.photos/200/300?random=1',
        price: 799
    },
    {
        id: 2,
        name: 'Sit.',
        description: 'Ipsum ipsum no et ut ipsum sed diam tempor. Duo.',
        imageUrl: 'https://picsum.photos/200/300?random=2',
        price: 349
    },
    {
        id: 3,
        name: 'Lorem invidunt.',
        description: 'Kasd lorem rebum nonumy tempor sanctus invidunt. Amet et tempor.',
        imageUrl: 'https://picsum.photos/200/300?random=3',
        price: 1499
    },
    {
        id: 4,
        name: 'Erat est clita.',
        description: 'Invidunt sit eirmod at kasd et. Dolore lorem sadipscing voluptua.',
        imageUrl: 'https://picsum.photos/200/300?random=4',
        price: 999
    },
    {
        id: 5,
        name: 'Sed.',
        description: 'Dolor takimata diam sed vero lorem sit no et lorem.',
        imageUrl: 'https://picsum.photos/200/300?random=5',
        price: 599
    },
    {
        id: 6,
        name: 'Sanctus dolores.',
        description: 'Sed clita labore invidunt sanctus duo aliquyam elitr sit dolores,.',
        imageUrl: 'https://picsum.photos/200/300?random=6',
        price: 499
    }
];
/* const crearCard = () => {
    const productLists = document.querySelector('.products');
    products.forEach(producto => {
        const productHTML = `
        <div class="products">
    <div class="product">
        <div class="product-image">
          <img src="${producto.imageUrl}" alt="${producto.imageUrl}">
        </div>
        <div class="product-name"><span>Product:</span> ${producto.name}</div>
        <div class="product-description"><span>Description:</span> ${producto.description}
        </div>
        <div class="product-price"><span>Price:</span> ${producto.price}</div>
        <div class="product-add-to-cart">
          <a href="#0" class="button see-more">More Details</a>
          <a href="#0" class="button add-to-cart" data-id=${producto.id}>Add to Cart</a>
        </div>
      </div>
      </div>
    `;
        productLists.innerHTML += productHTML;
    });
};
crearCard(); */
/* const mostrarProductos = () => {
    const productsList = document.querySelector('.products');
    const productsHTML = products.map(product => {
        return `
      <div class="product">
        <div class="product-image">
          <img src="${product.imageUrl}" alt="${product.name}">
        </div>
        <div class="product-name"><span>Product:</span> ${product.name}</div>
        <div class="product-description"><span>Description:</span> ${product.description}</div>
        <div class="product-price"><span>Price:</span> $${product.price}</div>
        <div class="product-add-to-cart">
          <a href="#0" class="button see-more">More Details</a>
          <a href="#0" class="button add-to-cart" data-id=${product.id}>Add to Cart</a>
        </div>
      </div>
    `;
    });
    productsList.innerHTML += productsHTML.join('');
};
mostrarProductos(); */



let cantProductosV =[];

const emptyCard = () =>{
  document.querySelector('.shopping-cart-list').innerText = '';
  cantProductosV =[];
  total = 0;

  document
  .querySelector('.product-quantity')
  .innerText = cantProductosV.length;
  document.querySelector('.total-price').innerText = total;

}

document.querySelector('.empty-cart-btn').onclick = emptyCard;

const borrar = function(id){
  document.getElementById(`product-${id}`).remove();

  let productoAEliminar;
    
  products.forEach(product => {
    if (product.id === id) {
      productoAEliminar = product;
  }   
  }); 



  for (let i = 0; i < cantProductosV.length; i++){
      if( cantProductosV[i] === id){
        total -= productoAEliminar.price;
        cantProductosV.splice(i,1);
        i--;

        
      }
    }

    
  document
  .querySelector('.product-quantity')
  .innerText = cantProductosV.length;
  document.querySelector('.total-price').innerText = total;
  
  }



let total = 0;

function addToCart(id) {
    let productoAAgregar;
    
    products.forEach(product => {
      if (product.id === id) {
        productoAAgregar = product;
    }   
    }); 

    cantProductosV.push(productoAAgregar.id)

     

    let cantProductos = cantProductosV.reduce((total,p)=> 
            p === productoAAgregar.id ? ++total : total, 0);

    

    if (cantProductos === 1){
      const cartHTML = `<li id="product-${productoAAgregar.id}">${productoAAgregar.name} - $${productoAAgregar.price} - Cantidad: ${cantProductos}  <button onclick="borrar(${productoAAgregar.id})">x</button> </li>`;
      document.querySelector('.shopping-cart-list').innerHTML += cartHTML;
    } else{
      document.getElementById(`product-${productoAAgregar.id}`).innerHTML = `${productoAAgregar.name} - $${productoAAgregar.price * cantProductos} - Cantidad: ${cantProductos}  <button onclick="borrar(${productoAAgregar.id})">x</button>`
    }

    let productosTotales = cantProductosV.length;
    document.querySelector('.product-quantity').innerText = productosTotales;
    

    total += productoAAgregar.price;
    document.querySelector('.total-price').innerText = total;

    
  
    

  

}


const crearProductoHTML = product => {
    return `
      <div class="product">
        <div class="product-image">
          <img src="${product.imageUrl}" alt="${product.name}">
        </div>
        <div class="product-name"><span>Product:</span> ${product.name}</div>
        <div class="product-description"><span>Description:</span> ${product.description}</div>
        <div class="product-price"><span>Price:</span> ${product.price}</div>
        <div class="product-add-to-cart">
          <a href="#0" class="button see-more">More Details</a>
          <a href="#0" class="button add-to-cart" onclick="addToCart(${product.id})">Add to Cart</a>
        </div>
      </div>
    `;
};
const mostrarProductos = () => {
 
    const productsList = document.querySelector('.products');
    const productsHTML = products.reduce((list, product) => {
        return list + crearProductoHTML(product);
    }, ''); // fin reduce
    productsList.innerHTML += productsHTML;
};
mostrarProductos();

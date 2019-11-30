let total = 0;
 let totalIncome = 0;
 let totalExpenses = 0;
 let id = 0;
const crearCard = product => {

    let descripcionIngresada = document.querySelector('.add__description').value;
    let valorIngresado = document.querySelector('.add__value').value;
    let tipo = document.querySelector('.add__type').value;
    
   
   
    if (tipo === 'inc'){
        let cardHTML =  `
        <div id="card-${++id}" class="item clearfix">
            <div class="item__description">${descripcionIngresada}</div>
                <div class="right clearfix">
                    <div class="item__value">+${valorIngresado}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn" onclick="eliminarCard('card-${id}', ${valorIngresado}, '+')"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `;
        document.querySelector('.income__list').innerHTML += cardHTML; 
        total += parseInt(valorIngresado);
        document.querySelector('.budget__value').innerHTML = total;
        
        totalIncome+=parseInt(valorIngresado);
        document.querySelector('.budget__income--value').innerHTML = totalIncome;
      } else{
        const cardHTML =  `
        <div id="card-${++id}" class="item clearfix">
            <div class="item__description">${descripcionIngresada}</div>
                <div class="right clearfix">
                    <div class="item__value">-${valorIngresado}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn" onclick="eliminarCard('card-${id}', ${valorIngresado}, '-')"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `;
        document.querySelector('.expenses__list').innerHTML +=  cardHTML;

        total -= parseInt(valorIngresado);
        document.querySelector('.budget__value').innerHTML = total;

        totalExpenses-=parseInt(valorIngresado);
        document.querySelector('.budget__expenses--value').innerHTML = totalExpenses;
        
        
      }



};


  

let botonAgregar = (document.querySelector('.add__btn').onclick= crearCard);
 
 const eliminarCard = (id, valor, type) => {
     document.getElementById(id).remove();
    
     
     if(type === '+'){
        document.querySelector('.budget__value').innerHTML =  total-=valor;
        document.querySelector('.budget__income--value').innerHTML = totalIncome-=valor;
        
     }else if (type === '-'){
        document.querySelector('.budget__value').innerHTML =  total+=valor;
        document.querySelector('.budget__expenses--value').innerHTML = totalExpenses+=valor;
     }


 }
 

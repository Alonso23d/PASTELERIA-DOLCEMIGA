const inputQuantity = document.querySelector('.input-quantity')
const btnIncrement = document.querySelector('#increment')
const btnDecrement = document.querySelector('#decrement')

let valueByDefault = parseInt(inputQuantity.value)

//funciones click

btnIncrement.addEventListener('click', ()=> {
    //por defecto es 1
    // 1 = 1 + 1
    //2 = 2 + 1
    valueByDefault += 1
    inputQuantity.value = valueByDefault
})

btnDecrement.addEventListener('click', ()=> {
    //condicional
    if(valueByDefault ===1){
        return
    }
    //por defecto es 1
    // 1 = 1 + 1
    //2 = 2 + 1
    valueByDefault -=1
    inputQuantity.value = valueByDefault
})

//toggle
//constantes Toggle titles
const toggleDescription = document.querySelector('.title-description')

//constantes Contenido texto
const contentDescription = document.querySelector('.text-description')

//funciones toggle
toggleDescription.addEventListener('click', ()=> {
    contentDescription.classList.toggle('hidden');
});
import { Todo } from '../classes';

import { todoList } from '../index';

// Referencias en HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltors     = document.querySelector('.filters');
const anchorFiltros  = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo; // lo pone dentro del objeto

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}


//Eventos
//keyup cuando la persona presiona una tecla, ese el el evento al que esta atento
//event que tecla presiono el usuario

txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode == 13 && txtInput.value.length > 0){

        console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );

        txtInput.value = '';
    }

});


divTodoList.addEventListener('click', (event) => {

    // console.log('click');
    // console.log( event.target );

    const nombreElemento    = event.target.localName; // input , label, button
    const todoElemento      = event.target.parentElement.parentElement; // va al padre hasta el LI
    const todoId            = todoElemento.getAttribute('data-id'); 


    // console.log( todoElemento);
    // console.log( todoId);

    if( nombreElemento.includes('input') ){ // click en check

        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); // clase del elemento mas alto padre
        
    }else if( nombreElemento.includes('button')  ){ // hay que borrar todo

        todoList.eliminarTodo( todoId ); // elimina del array
        divTodoList.removeChild( todoElemento ); // elimina el html
    }

    // console.log(todoList);

});


btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados(); // borra los completados del array

    for ( let i =  divTodoList.children.length-1 ; i >= 0; i-- ) {
        
        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){

            divTodoList.removeChild(elemento);

        }
        
    }
});

ulFiltors.addEventListener('click', (event) =>{

    const filtro = event.target.text;

    if ( !filtro ) { return; } // undefined o vacio entonces le hace return

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');
    
    for( const elemento of divTodoList.children ){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        console.log(completado);

        switch ( filtro ) {

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
                
            break;
    
        }

    }

});

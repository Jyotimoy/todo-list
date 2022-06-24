//selectors

const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filteroption = document.querySelector(".filter-todo")

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todobutton.addEventListener('click', addTodo);
todolist.addEventListener(`click`, remove);
filteroption.addEventListener('click', filtertodo);



//functions
function addTodo(event) {
    //prevent form from subbmitting
    event.preventDefault();
    //Todo div

    const todoDiv = document.createElement(`div`);
    todoDiv.classList.add(`todo`);

    //create Li
    const newTodo = document.createElement(`li`);
    newTodo.innerText = todoinput.value;
    newTodo.classList.add(`todo-item`);
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTORAGE

    saveLocalTodos(todoinput.value)

    //  CHECK MARK BUTTON

    const completedButton = document.createElement(`button`);
    completedButton.classList.add(`complete-btn`);
    completedButton.innerHTML = `<i class = "fas fa-check"></i>`;
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BUTTON

    const trashbutton = document.createElement(`button`);
    trashbutton.classList.add(`trash-btn`);
    trashbutton.innerHTML = `<i class = "fas fa-trash"></i>`;
    todoDiv.appendChild(trashbutton);

    //APPEND TO LIST

    todolist.appendChild(todoDiv);

    // Clear todo input value
    todoinput.value = "";
}
function remove(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();

        });

    }
    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filtertodo(e) {
    const todos = todolist.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}




// LOCAL STORAGE
function saveLocalTodos(todo) {
    //check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    // console.log("hello")
    //check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));

    }
        todos.push(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
}
    

function getTodos(){
    
      //check
      let todos;
      if (localStorage.getItem('todos') === null) {
          todos = [];
      }
      else {
          todos = JSON.parse(localStorage.getItem('todos'));
  
      }
      todos.forEach(function(todo){
        //Todo div

    const todoDiv = document.createElement(`div`);
    todoDiv.classList.add(`todo`);

    //create Li
    const newTodo = document.createElement(`li`);
    newTodo.innerText = todo;
    newTodo.classList.add(`todo-item`);
    todoDiv.appendChild(newTodo);
    

    //  CHECK MARK BUTTON

    const completedButton = document.createElement(`button`);
    completedButton.classList.add(`complete-btn`);
    completedButton.innerHTML = `<i class = "fas fa-check"></i>`;
    todoDiv.appendChild(completedButton);

    //CHECK TRASH BUTTON

    const trashbutton = document.createElement(`button`);
    trashbutton.classList.add(`trash-btn`);
    trashbutton.innerHTML = `<i class = "fas fa-trash"></i>`;
    todoDiv.appendChild(trashbutton);

    //APPEND TO LIST

    todolist.appendChild(todoDiv);
      });
}

//delete from local storage 
function removeLocalTodos(todo){
    let todos;
      if (localStorage.getItem('todos') === null) {
          todos = [];
      }
      else {
          todos = JSON.parse(localStorage.getItem('todos'));
  
      }
      const todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex),1);
      localStorage.setItem("todos", JSON.stringify(todos));
}

// 20/06/22 12:53am
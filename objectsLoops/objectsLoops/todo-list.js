const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  // Loop over every toDo object and append it to "todoListHTML"
  // Show the objects inside the class "js-todo-list"
  // Loop over evey delete button and add an eventListener that deletes the toDo and rerender the Tasks
  for (const index in todoList) {
    const todoObject = todoList[index];
    const { name, dueDate } = todoObject;

    const html = `
      <div class="todo-grid">
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button" data-index="${index}">Delete</button>
      </div>
    `;
    todoListHTML += html;

  }
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.delete-todo-button')
    .forEach((deleteButton) => {
      deleteButton.addEventListener('click', (event) => {
        const index = event.target.dataset.index;

        todoList.splice(index, 1);

        renderTodoList();
      });
    });


}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"
  todoList.push({
    name,
    dueDate
  });


  inputElement.value = '';

  renderTodoList();
}
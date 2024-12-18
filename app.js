

//Add a new task.
const addTaskInput = document.querySelector('.add-tasks-section__input');
const addButton = document.querySelector('.bt-add');
const incompleteTaskHolder = document.querySelector('.incomplete-tasks__list');
const completedTasksHolder = document.querySelector('.complete-tasks__list');

//New task list item
function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.classList = 'tasks-list__item';

  label.innerText = taskString;
  label.className = 'item__label';

  checkBox.type = 'checkbox';
  checkBox.classList = 'item__checkbox';

  editInput.type = 'text';
  editInput.className = 'item__input';

  editButton.innerText = 'Edit';
  editButton.className = 'bt bt-edit';

  deleteButton.className = 'bt bt-delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.setAttribute('alt', 'delete');
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

//Add task.
function addTask() {
  //Create a new list item with the text from the #new-task:
  if (!addTaskInput.value) return;

  const listItem = createNewTaskElement(addTaskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  addTaskInput.value = '';
}

//Edit an existing task.
function editTask() {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.item__input');
  const label = listItem.querySelector('.item__label');
  const editBtn = listItem.querySelector('.bt-edit');
  const containsClass = listItem.classList.contains('edit-mode');

  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('edit-mode');
};


//Delete task.
function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
function taskCompleted() {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark task as incomplete.
function taskIncomplete() {
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//Controls addTask function.
addButton.addEventListener('click', addTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector('.item__checkbox');
  const editButton = taskListItem.querySelector('.bt-edit');
  const deleteButton = taskListItem.querySelector('.bt-delete');

  //Bind controls.
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

//bind events to list items chldren(tasksInCompleted)
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//bind events to list items chldren(tasksCompleted)
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// TODO: Issues with usability don't get seen until they are in front of a human tester.
// TODO: prevent creation of empty tasks.
// TODO: Change edit to save when you are in edit mode.


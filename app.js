

//Add a new task.
var taskInput=document.querySelector(".add-tasks-section__input");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.querySelector(".incomplete-tasks__list");
var completedTasksHolder=document.querySelector(".complete-tasks__list");

//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

    listItem.classList='tasks-list__item';

    label.innerText=taskString;
    label.className='item__label';

    checkBox.type="checkbox";
    checkBox.classList='item__checkbox';

    editInput.type="text";
    editInput.className="item__input";

    editButton.innerText="Edit"; 
    editButton.className="bt bt-edit";

    deleteButton.className="bt bt-delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.setAttribute('alt','delete');
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

//Add task.
var addTask=function(){
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

//Edit an existing task.
var editTask=function(){
    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.item__input');
    var label=listItem.querySelector(".item__label");
    var editBtn=listItem.querySelector(".bt-edit");
    var containsClass=listItem.classList.contains("edit-mode");

    //If class of the parent is .editmode
    if(containsClass){
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted=function(){
    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

//Mark task as incomplete.
var taskIncomplete=function(){
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
}

//Controls addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    //select ListItems children
    var checkBox=taskListItem.querySelector(".item__checkbox");
    var editButton=taskListItem.querySelector(".bt-edit");
    var deleteButton=taskListItem.querySelector(".bt-delete");

    //Bind controls.
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

    //bind events to list items chldren(tasksInCompleted)
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

    //bind events to list items chldren(tasksCompleted)
for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// TODO: Issues with usability don't get seen until they are in front of a human tester.
// TODO: prevent creation of empty tasks.
// TODO: Change edit to save when you are in edit mode.


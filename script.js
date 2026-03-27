const taskinput =document.getElementById('task-input');
const addTaskBtn =document.getElementById('add-task-btn');
const tasklist = document.getElementById('task-list');
//para crear un nuevo elemneto 
function createTaskElement(taskText){
    const taskitem =document.createElement('li');

    taskitem.className='task-item';//agregar clase
    taskitem.textContent = taskText;//establecer el texto de la tarea
    //agregar elemento de eliminar tarea

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Eliminar';

    deleteBtn.addEventListener('click',() => {
        taskitem.remove();
        saveTasks();
    })
      
    taskitem.appendChild(deleteBtn)
    tasklist.appendChild(taskitem);//agregar la terea a la lista
    saveTasks();
}
addTaskBtn.addEventListener('click',()=>{  
    const taskText =taskinput.value.trim();//obtener el texto en el input // elimina los espacios al inicio y al final
    if(taskText === '')return; //Si el texto está vacío, la función se detiene y no hace nada. Evita crear tareas vacías

    createTaskElement(taskText)//crear un nuevo elemento de tarea con el texto
    taskinput.value='';//Limpia el input dejándolo vacío.
    taskinput.focus();//Devuelve el cursor al input automáticamente para que puedas escribir la siguiente tarea sin hacer clic.

   })
function saveTasks(){
    const taskitems = document.querySelectorAll('.task-item');
    const tasks = [];

    taskitems.forEach(item => {
        const text = item.textContent.replace('Eliminar', '').trim();
        tasks.push(text);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks);

        tasksArray.forEach(task => {
            createTaskElement(task);
        });
    }
}
loadTasks();



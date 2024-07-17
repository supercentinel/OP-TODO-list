import { Project } from './proyect.js';
import { Task } from './task.js';

console.log(Project);
console.log(Task);

export const Projects = (function () {
  let projects = [];

  projects.push(new Project('Restore PSP'));
  projects[0].addTask(new Task(1, 'Buy new battery', 'Dead battery',
    '2024-07-13T23:37:12UTC', '2024-07-20T23:37:12UTC', false));
  projects[0].addTask( new Task(2, 'Replace dpad',
    'The dpad doesn\'t work. needs a replacement',
    '', '', false));


  projects.push(new Project('Build PC'));
  projects[1].addTask(new Task(1, 'Buy CPU', '', '', '', false));

  //Creating the main div
  let projectsDiv = document.createElement('div');
  projectsDiv.classList.add('projects');

  //adding a title
  let h1 = document.createElement('h1');
  h1.textContent = 'Projects';
  projectsDiv.appendChild(h1);

  //creating a select element
  let select = document.createElement('select');
  select.id = 'projectsDivselect';
  select.name = 'projects';

  //adding options to the select element
  let refreshSelect = function () {
    select.innerHTML = '';


    projects.forEach((project, index) => {
      console.log(project);
      let option = document.createElement('option');
      option.value = index;
      option.textContent = project.name;
      select.appendChild(option);
    });
  }

  //Event listener for changing tasks
  select.addEventListener('change', (e) => {
    let index = e.target.value;
    let project = projects[index];
    tasksDiv.innerHTML = '';
    addTasks(project);
    console.log(project);
  });

  projectsDiv.appendChild(select);

  let addDiv = document.createElement('div');
  addDiv.id = 'addDiv';
  addDiv.classList.add('adButtons');

  let newProjectName = document.createElement('input');
  newProjectName.id = 'newProjectName';
  newProjectName.type = 'text';
  newProjectName.placeholder = 'Project Name';

  addDiv.appendChild(newProjectName);
  let addBtn = document.createElement('button');
  addBtn.textContent = 'Add';
  addBtn.addEventListener('click', () => {
    let newProject = new Project(newProjectName.value);
    projects.push(newProject);
    newProjectName.value = '';
    refreshSelect();
  });


  addBtn.classList.add('add');

  let delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('delete');

  addDiv.appendChild(addBtn);
  addDiv.appendChild(delBtn);

  projectsDiv.appendChild(addDiv);


  //creating the div for the tasks
  let tasksDiv = document.createElement('div');
  tasksDiv.classList.add('tasks');

  let newTaskFormDiv = document.createElement('form');
  newTaskFormDiv.classList.add('newTaskFormDiv');

  let newTaskForm = document.createElement('form');
  newTaskForm.classList.add('newTaskForm');

  let formTitle = document.createElement('h2');
  formTitle.id = 'formTitle';
  formTitle.textContent = 'Add New Task';
  newTaskForm.appendChild(formTitle);


  let newTaskNameLabel = document.createElement('label');
  newTaskNameLabel.id = 'newTaskNameLabel';
  newTaskNameLabel.textContent = 'Task Name:';
  newTaskNameLabel.htmlFor = 'newTaskName';
  newTaskForm.appendChild(newTaskNameLabel);

  let newTaskName = document.createElement('input');
  newTaskName.id = 'newTaskName';
  newTaskName.type = 'text';
  newTaskName.name = 'name';
  newTaskName.placeholder = 'Task Name';
  newTaskForm.appendChild(newTaskName);

  let newTaskDescriptionLabel = document.createElement('label');
  newTaskDescriptionLabel.id = 'newTaskDescriptionLabel';
  newTaskDescriptionLabel.textContent = 'Task Description:';
  newTaskDescriptionLabel.htmlFor = 'newTaskDescription';
  newTaskForm.appendChild(newTaskDescriptionLabel);

  let newTaskDescription = document.createElement('textarea');
  newTaskDescription.id = 'newTaskDescription';
  newTaskDescription.name = 'desc';
  newTaskDescription.placeholder = 'Task Description';
  newTaskForm.appendChild(newTaskDescription);

  let newTaskDueDateLabel = document.createElement('label');
  newTaskDueDateLabel.id = 'newTaskDueDateLabel';
  newTaskDueDateLabel.textContent = 'Due Date:';
  newTaskDueDateLabel.htmlFor = 'newTaskDueDate';
  newTaskForm.appendChild(newTaskDueDateLabel);

  let newTaskDueDate = document.createElement('input');
  newTaskDueDate.id = 'newTaskDueDate';
  newTaskDueDate.type = 'date';
  newTaskDueDate.name = 'due';
  newTaskDueDate.placeholder = 'Task Description';
  newTaskForm.appendChild(newTaskDueDate);

  let newTaskAddButton = document.createElement('button');
  newTaskAddButton.id = 'newTaskAddButton';
  newTaskAddButton.textContent = 'Add Task';
  newTaskAddButton.type = 'submit';
  newTaskForm.appendChild(newTaskAddButton);
  newTaskAddButton.addEventListener('click', (e) => {
    e.preventDefault();
    let index = select.value;
    let project = projects[index];
    let task = new Task(project.tasks.length + 1, newTaskName.value,
      newTaskDescription.value, new Date().toUTCString(),
      newTaskDueDate.value, false);
    project.addTask(task);
    tasksDiv.innerHTML = '';
    addTasks(project);
    newTaskName.value = '';
    newTaskDescription.value = '';
    newTaskDueDate.value = '';
  });


  //adding the tasks to the tasks div
  let addTasks = function (project) {
    project.tasks.forEach((task) => {
      let taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      let taskID = document.createElement('p');
      taskID.textContent = task.id;
      taskDiv.appendChild(taskID);

      let taskName = document.createElement('p');
      taskName.textContent = task.name;
      taskDiv.appendChild(taskName);

      let taskDescription = document.createElement('p');
      taskDescription.textContent = task.description;
      taskDiv.appendChild(taskDescription);

      let taskAdded = document.createElement('p');
      taskAdded.textContent = task.added;
      taskDiv.appendChild(taskAdded);

      let taskDue = document.createElement('p');
      taskDue.textContent = task.due;
      taskDiv.appendChild(taskDue);

      let taskDone = document.createElement('input');
      taskDone.type = 'checkbox';
      taskDone.checked = task.done;
      taskDone.addEventListener('change', (e) => {
        console.log(e.target.checked);
        task.setDone(e.target.checked);
      });

      taskDiv.appendChild(taskDone);

      tasksDiv.appendChild(taskDiv);
    });
    projectsDiv.appendChild(newTaskFormDiv);
  }
  newTaskFormDiv.appendChild(newTaskForm);

  refreshSelect();
  addTasks(projects[0]);

  projectsDiv.appendChild(tasksDiv);
  projectsDiv.appendChild(newTaskFormDiv);

  return projectsDiv;
})();


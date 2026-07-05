import { number_of_itemsElement, task_itemsElement } from "./elements";
import { initListener } from "./listeners";

export const saveToDB = (key, data) => {
  localStorage.setItem(key, [JSON.stringify(data)]);
};

export const fetchFromDB = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const toggleThemeDark = () => {
  let isDarkTheme = "";
  if (fetchFromDB("isDark")) isDarkTheme = false;
  else isDarkTheme = true;
  saveToDB("isDark", isDarkTheme);
};

export const renderTasks = () => {
  let tasksData = fetchFromDB("tasks");
  if (!tasksData) return;
  let dataItems = "";
  let counter = 0;
  tasksData.forEach((element) => {
    counter++;
    dataItems += `
     <li class="task_item ${element.isCompleted ? " task_item_checked" : ""}">
              <div class="data_task_item">
                <button class="task_button">
                  <img src="images/icon-check.svg" alt="" class="form_icon" />
                </button>
                <p class="data_task">${element.data}</p>
              </div>

              <div class="delete_task_icon">
                <img src="images/icon-cross.svg" alt="" />
              </div>
            </li>
    `;
  });

  task_itemsElement.innerHTML = dataItems;
  number_of_itemsElement.textContent = counter;
  initListener();
};

export const addTask = (value) => {
  if (!value.length) {
    alert("Add a new task");
    return;
  }
  let itemData = {
    data: value,
    isCompleted: false,
  };
  let tasksData = fetchFromDB("tasks");
  tasksData.push(itemData);
  saveToDB("tasks", tasksData);
  renderTasks();
};

export const completedTask = (e, index) => {
  let data = fetchFromDB("tasks");
  data[index].isCompleted = !data[index].isCompleted;
  saveToDB("tasks", data);
  renderTasks();
};

export const initTaskListiner = () => {
  initListener();
  renderTasks();
};

export const deleteTask = (e, index) => {
  let data = fetchFromDB("tasks");
  data.splice(index, 1);
  saveToDB("tasks", data);
  renderTasks();
};

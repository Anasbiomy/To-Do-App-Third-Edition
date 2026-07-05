import {
  bodyElement,
  clear_completed_Items,
  delete_task_icon,
  form_buttonElement,
  form_inputElement,
  show_Active_Items,
  show_allElement,
  show_completed_Items,
  stateElements,
  task_buttonElement,
  task_itemsElement,
  toggle_switchElement,
} from "./elements";
import {
  addTask,
  completedTask,
  deleteTask,
  fetchFromDB,
  renderTasks,
  saveToDB,
  toggleThemeDark,
} from "./utils";

export const togglelistener = () => {
  toggle_switchElement.addEventListener("click", () => {
    bodyElement.classList.toggle("dark-theme");
    toggleThemeDark();
  });
  if (fetchFromDB("isDark")) {
    bodyElement.classList.add("dark-theme");
  } else {
    bodyElement.classList.remove("dark-theme");
  }
};

export const addNewTask = () => {
  let data = fetchFromDB("tasks");
  form_buttonElement.addEventListener("click", (e) => {
    e.preventDefault();
    let newData = form_inputElement.value;
    form_inputElement.value = "";
    addTask(newData);
  });
  renderTasks();
};

export let initListener = () => {
  task_buttonElement().forEach((Element, index) => {
    Element.addEventListener("click", () => {
      completedTask(Element, index);
    });
  });
  delete_task_icon().forEach((item, index) => {
    item.addEventListener("click", () => {
      let confirmMessage = confirm("Are you sure you want to delet this task");
      if (!confirmMessage) return;

      deleteTask(item, index);
      renderTasks();
    });
  });

  let ShowAll = fetchFromDB("ShowAll");
  let ShowActive = fetchFromDB("ShowActive");
  let ShowCompleted = fetchFromDB("ShowCompleted");

  show_allElement.addEventListener("click", () => {
    if (ShowAll.length < 1 || !ShowAll) {
      ShowAll = true;
      ShowCompleted = false;
      ShowActive = false;
    } else {
      return;
    }
    saveToDB("ShowActive", ShowActive);
    saveToDB("ShowCompleted", ShowCompleted);
    saveToDB("ShowAll", ShowAll);
    renderTasksStasus();
  });

  show_Active_Items.addEventListener("click", () => {
    if (ShowActive.length < 1 || !ShowActive) {
      ShowActive = true;
      ShowCompleted = false;
      ShowAll = false;
    } else {
      return;
    }
    saveToDB("ShowActive", ShowActive);
    saveToDB("ShowAll", ShowAll);
    saveToDB("ShowCompleted", ShowCompleted);

    // if (ShowActive === true) {
    //   task_itemsElement.classList.remove("task_items_Completed");
    //   task_itemsElement.classList.add("task_items_Active");
    // }
    renderTasksStasus();
  });
  show_completed_Items.addEventListener("click", () => {
    if (ShowCompleted.length < 1 || !ShowCompleted) {
      ShowActive = false;
      ShowCompleted = true;
      ShowAll = false;
    } else {
      return;
    }
    saveToDB("ShowActive", ShowActive);
    saveToDB("ShowAll", ShowAll);

    saveToDB("ShowCompleted", ShowCompleted); // if (data === true) {
    //   task_itemsElement.classList.add("task_items_Completed");
    //   task_itemsElement.classList.remove("task_items_Active");
    // }
    renderTasksStasus();
  });
};

// export const tasksStates = () => {};

export const ClearCompleted = () => {
  clear_completed_Items.addEventListener("click", () => {
    let data = fetchFromDB("tasks");
    let confirmMessage = confirm(
      "Are you sure you want to delet All Completed tasks",
    );
    if (!confirmMessage) return;

    let activeTasks = data.filter((item) => !item.isCompleted);
    if (activeTasks.length === data.length)
      alert("there is no completed tasks");
    // 2. Save the updated list back to your DB
    // (Replace 'saveToDB' with whatever function you use to save)
    saveToDB("tasks", activeTasks);

    renderTasks();
  });
};

export const renderTasksStasus = () => {
  let ShowAll = fetchFromDB("ShowAll");
  let ShowActive = fetchFromDB("ShowActive");
  let ShowCompleted = fetchFromDB("ShowCompleted");

  if (ShowActive && !ShowCompleted) {
    task_itemsElement.classList.remove("task_items_Completed");
    task_itemsElement.classList.add("task_items_Active");
  } else if (!ShowActive && ShowCompleted) {
    task_itemsElement.classList.add("task_items_Completed");
    task_itemsElement.classList.remove("task_items_Active");
  } else if (ShowAll) {
    task_itemsElement.classList.remove("task_items_Completed");
    task_itemsElement.classList.remove("task_items_Active");
  }
};

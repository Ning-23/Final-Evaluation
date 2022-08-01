// API calls
const BASE_URL =  'http://localhost:3000';
const tasksPath = 'todos';

const getTasks = () => {
    const tasksEndPoint = [BASE_URL, tasksPath].join('/');
    return fetch(tasksEndPoint).then((response) => {
        return response.json();
    });
};

// CONST
const DomSelectors = {
    root: "#root",
    taskPage: {
        searchBarClass: 'searchBar', 
        containerClass: 'container', 
        tasksClass: 'tasks',
        searchInputClass: 'searchBar__input', 
        searchSubmitClass: 'searchBar__submit',
    },
    task: {
        containerClass:'task', 
        body: 'task__body', 
        bodyText:'task__body-text',
        editBtn:'task__edit-btn',
        delBtn:'task__del-btn',
    },
};


// STATE
let tasks = [];

// VIEW RENDER
const render = (tmp, element) => {
    element.innerHTML = tmp;
};

const renderTaskPage = () => {
    const root = document.querySelector(DomSelectors.root);
    const tmp = generateTaskPageTmp(DomSelectors.taskPage);
    render(tmp, root);
};

const renderTasks = (tasks, element) => {
    const tmp = tasks
        .map((task) => generateTaskTmp(task, DomSelectors.task))
        .join('');
    render(tmp,element);
};

// class="${}"
// Template
const generateTaskPageTmp = ({searchBarClass, containerClass, tasksClass, searchInputClass, searchSubmitClass}) => {
    return `<section class= "${containerClass}">
                <form class="${searchBarClass}">
                    <input class="${searchInputClass}" type="text">
                    <button class="${searchSubmitClass}">Submit</button>
                </form>
                <div class="${tasksClass}"></div>
            </section>`;
};

const  generateTaskTmp = (task, 
    {containerClass, body, bodyText,editBtn,delBtn}
) => {
    return `
    <section class= "${containerClass}">
        <div class="${body}">
            <p class="${bodyText}">${task.title}</p>
        </div>
        <div class="${editBtn}">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" 
            data-testid="EditIcon" aria-label="fontSize small">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 
                0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
                </path>
            </svg>
        </div>
        <div class="${delBtn}">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z">
                </path>
            </svg>
        <div>
    </section>
    ` ;
};

// INIT
const init = () => {
    // render the tasks page
    renderTaskPage();
    const tasksElement = document.querySelector(
        `.${DomSelectors.taskPage.tasksClass}`
    );

    getTasks().then( (data) => {
        renderTasks(data, tasksElement)
    });

};

init();


let globalTaskData = [];
taskContents = document.getElementById("taskcontents");

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("ImageUrl").value,
        title: document.getElementById("TaskTitle").value,
        type: document.getElementById("TaskType").value,
        description: document.getElementById("TaskDescription").value
    };


    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();

}

const generateTaskCard = ({ id, url, title, type, description }) => {
    return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-info" name=${id} onclick="update(this)">
                        <i class="fas fa-pencil-alt" name=${id} onclick="update(this)"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                        <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)" ></i>
                    </button>
                </div>
            </div>
            <img src="${url}" class="card-img-top" alt="image" />
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <span class="badge bg-primary">${type}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary float-end">OPEN TASK</button>
            </div>
        </div>
    </div>`)
}

const saveToLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({ tasks: globalTaskData }));
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));
    if (localStorageCopy) {
        globalTaskData = localStorageCopy["tasks"];
    }
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));

    })

}

const deleteTask = (e) => {
    // console.log(e);
    const targetID = e.getAttribute("name"); //it extract id of that perticular card
    console.log(targetID);
    globalTaskData = globalTaskData.filter((cardData) => cardData.id !== targetID);
    //it remove tha data where id equals to targetId and rest other will show
    console.log(globalTaskData);
    saveToLocalStorage();
    window.location.reload();
}

const update = (e) => {
    const targetID = e.getAttribute("name");
    console.log(targetID);
    saveToLocalStorage();
    window.location.reload();
}
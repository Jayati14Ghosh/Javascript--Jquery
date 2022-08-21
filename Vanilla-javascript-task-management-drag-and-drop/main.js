let todobtn = document.getElementById("todobtn");
let progressbtn = document.getElementById("progressbtn");
let donebtn = document.getElementById("donebtn");
let textArea = document.getElementsByTagName("textarea")[0];
let error = document.getElementById("error");
let todoColumn = document.getElementsByClassName("to-do")[0];
let inProgressColumn = document.getElementsByClassName("in-progress")[0];
let doneColumn =  document.getElementsByClassName("done")[0];
let cards = document.querySelectorAll(".card");
let taskList =  document.querySelectorAll(".single-list");

todobtn.addEventListener("click",()=>{
  newTaskAdd(todoColumn);
});
progressbtn.addEventListener("click",()=>{
  newTaskAdd(inProgressColumn);
});
donebtn.addEventListener("click",()=>{
  newTaskAdd(doneColumn);
});

function newTaskAdd(e){
  if(textArea.value!=""){
    error.innerHTML = "";

    let textVal = textArea.value;
    let newTask = document.createElement("div");
        newTask.setAttribute("class","card");
        newTask.setAttribute("draggable","true");
        newTask.innerHTML = `<textarea class="edit-textarea"></textarea>
                               <div class="card-main-text">${textVal}</div>
                               <div class="card-btn-group">
                                 <button type="button" class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                                 <button type="button" class="save-btn"><i class="fa-solid fa-check"></i></button>
                                 <button type="button" class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                               </div>`;

        e.appendChild(newTask);

        textArea.value="";
        listdragover(e);
        registerEventOnCard(newTask);
        cardEditEvent(newTask);
        cardDeleteEvent(newTask);
  }
  else{
    error.innerHTML = "Hey!!! Nothing to add!!!"
  }
}


cards.forEach((card) => {
  registerEventOnCard(card);
  cardEditEvent(card);
  cardDeleteEvent(card);
});

function cardEditEvent(card){
  let cardBtnGroup = card.children[2];
  let editBtn = cardBtnGroup.children[0];
  let saveBtn = cardBtnGroup.children[1];
  let editTextarea = card.children[0];
  let cardMainText = card.children[1];
  editBtn.addEventListener("click", ()=>{
    editTextarea.classList.add("d-block");
    editTextarea.value = `${cardMainText.innerHTML}`;
    cardMainText.classList.add("d-none");
    editBtn.classList.add("d-none");
    saveBtn.classList.add("d-inline-block");
    card.setAttribute("draggable", "false");
  });
  cardEditCloseEvent(card);
}

function cardEditCloseEvent(card){
  let editTextarea = card.children[0];
  let cardBtnGroup = card.children[2];
  let cardMainText = card.children[1];
  let saveBtn = cardBtnGroup.children[1];
  let editBtn = cardBtnGroup.children[0];
  saveBtn.addEventListener("click", ()=>{
   cardMainText.innerHTML = editTextarea.value;
   cardMainText.classList.remove("d-none");
   editTextarea.classList.remove("d-block");
   editBtn.classList.remove("d-none");
   saveBtn.classList.remove("d-inline-block");
   card.setAttribute("draggable", "true");
  });
}

function cardDeleteEvent(card){
    let cardBtnGroup = card.children[2];
    let deleteBtn = cardBtnGroup.children[2];
    deleteBtn.addEventListener("click", function(){
      card.remove();
    })
}

function registerEventOnCard(card){
  card.addEventListener("dragstart", (e)=>{
    card.classList.add("dragging");
  });
  card.addEventListener("dragend", (e)=>{
    card.classList.remove("dragging");
  });
}

taskList.forEach((singleList) => {
  listdragover(singleList);
});
function listdragover(singleList){
  singleList.addEventListener("dragover", (e)=>{
    e.preventDefault();
    let draggingCard = document.querySelector(".dragging");
    let cardAfterDragging = getDraggingCard(singleList, e.clientY);
    if(cardAfterDragging){
      cardAfterDragging.parentNode.insertBefore(draggingCard, cardAfterDragging)
    }
    else{
      singleList.appendChild(draggingCard);
    }
  });
}

function getDraggingCard(singleList, cardYvalue){
  let listCards = [...singleList.querySelectorAll(".card:not(.dragging)")];
  return listCards.reduce((closestCard, nextCard)=>{
    let nextCardRect = nextCard.getBoundingClientRect();
    let offset = cardYvalue - nextCardRect.top - nextCardRect.height;
    if(offset < 0 && offset > closestCard.offset){
      return {offset, element: nextCard}
    }
    else{
      return closestCard;
    }
  },
  {
    offset: Number.NEGATIVE_INFINITY
  }).element;
}

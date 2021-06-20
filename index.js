var textBox = document.getElementById("text-box");
textBox.placeholder = "Enter Text Here";

var form = document.getElementById("form-one");
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

var unList = document.getElementById("todoList");
var addBut = document.getElementById("addButton");
var mainDiv = document.getElementById("list");

var contextMenuDiv = document.getElementById("cm");
var editCM = document.createElement("p");
editCM.className = "cmItems";
editCM.innerHTML = "Edit";
var seperationDiv = document.createElement("div");
seperationDiv.style.backgroundColor = "black";
seperationDiv.style.height = "1px";
var deleteCM = document.createElement("p");
deleteCM.innerHTML = "Delete";
deleteCM.className = "cmItems";
contextMenuDiv.append(editCM);
contextMenuDiv.append(seperationDiv);
contextMenuDiv.append(deleteCM);

addEventListener("click", function () {
  contextMenuDiv.style.display = "none";
});

addBut.addEventListener("click", function (e) {
  if (textBox.value != "") {
    var divListItem = document.createElement("div");
    divListItem.className = "listItem";

    var divItemDate = document.createElement("div");
    var itemHolder = document.createElement("h3");
    var dateHolder = document.createElement("p");

    var divIcons = document.createElement("div");
    var editIcon = document.createElement("i");
    editIcon.className = "far fa-edit";
    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    var checkIcon = document.createElement("i");
    checkIcon.className = "fas fa-check";
    checkIcon.style.display = "none";

    divIcons.prepend(checkIcon);
    divIcons.append(editIcon);
    divIcons.append(deleteIcon);

    itemHolder.innerHTML = textBox.value;
    dateHolder.innerHTML = new Date().toUTCString();

    divItemDate.append(itemHolder);
    divItemDate.append(dateHolder);

    divListItem.append(divItemDate);
    divListItem.append(divIcons);

    mainDiv.prepend(divListItem);
    textBox.value = "";
    deleteIcon.addEventListener("click", function () {
      divListItem.remove();
    });

    editIcon.addEventListener("click", function () {
      editCM.style.pointerEvents = "none";
      deleteCM.style.pointerEvents = "none";
      deleteIcon.style.pointerEvents = "none";
      checkIcon.style.display = "unset";
      editIcon.style.display = "none";
      var tempItemHolder = itemHolder.innerHTML;
      var tempItem = document.createElement("input");
      tempItem.className = "tempInput";
      tempItem.value = tempItemHolder;
      itemHolder.replaceWith(tempItem);

      checkIcon.addEventListener("click", function () {
        var valTemp = tempItem.value;
        tempItem.remove();
        itemHolder.remove();
        itemHolder = document.createElement("h3");
        itemHolder.innerHTML = valTemp;
        divItemDate.prepend(itemHolder);
        dateHolder.innerHTML = new Date().toUTCString();
        checkIcon.style.display = "none";
        editIcon.style.display = "unset";
        editCM.style.pointerEvents = "auto";
        deleteIcon.style.pointerEvents = "auto";
        deleteCM.style.pointerEvents = "auto";
      });
    });

    divListItem.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      contextMenuDiv.style.left = e.layerX + "px";
      contextMenuDiv.style.top = e.layerY + "px";
      contextMenuDiv.style.display = "unset";
      var count = 1;
      editCM.addEventListener("click", function (e) {
        if (count == 1) {
          editCM.style.pointerEvents = "none";
          deleteCM.style.pointerEvents = "none";
          deleteIcon.style.pointerEvents = "none";
          checkIcon.style.display = "unset";
          editIcon.style.display = "none";
          var tempItemHolder = itemHolder.innerHTML;
          var tempItem = document.createElement("input");
          tempItem.className = "tempInput";
          tempItem.value = tempItemHolder;
          itemHolder.replaceWith(tempItem);

          checkIcon.addEventListener("click", function () {
            var valTemp = tempItem.value;
            tempItem.remove();
            itemHolder.remove();
            itemHolder = document.createElement("h3");
            itemHolder.innerHTML = valTemp;
            divItemDate.prepend(itemHolder);
            dateHolder.innerHTML = new Date().toUTCString();
            checkIcon.style.display = "none";
            editIcon.style.display = "unset";
            editCM.style.pointerEvents = "auto";
            deleteCM.style.pointerEvents = "auto";
            deleteIcon.style.pointerEvents = "auto";
          });
        }
        count++;
      });
      deleteCM.addEventListener("click", function () {
        if (count == 1) {
          divListItem.remove();
        }
        count++;
      });
    });
  }
});

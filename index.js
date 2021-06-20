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

if (localStorage.getItem("toDoListData") != undefined) {
  var tdl = JSON.parse(localStorage.getItem("toDoListData"));
  console.log(tdl);
  for (var i = 0; i < tdl.length; i++) {
    addItem(tdl[i].message, tdl[i].date);
  }
}

addBut.addEventListener("click", function (e) {
  if (textBox.value != "") {
    var valTextBox = textBox.value;
    var dateCur = new Date().toUTCString();
    var objArr =
      localStorage.getItem("toDoListData") == undefined
        ? []
        : JSON.parse(localStorage.getItem("toDoListData"));
    objArr.push({
      message: valTextBox,
      date: dateCur,
    });
    localStorage.setItem("toDoListData", JSON.stringify(objArr));
    console.log(localStorage.getItem("toDoListData"));
    addItem(valTextBox, dateCur);
  }
});

/// FUNCTION TO ADD ITEM ///
function addItem(textVal, dateVal) {
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

  itemHolder.innerHTML = textVal;
  dateHolder.innerHTML = dateVal;

  divItemDate.append(itemHolder);
  divItemDate.append(dateHolder);

  divListItem.append(divItemDate);
  divListItem.append(divIcons);

  mainDiv.prepend(divListItem);
  textBox.value = "";

  deleteIcon.addEventListener("click", function () {
    divListItem.remove();
    var mesVal = itemHolder.innerHTML;
    var tdld = JSON.parse(localStorage.getItem("toDoListData"));
    for (var i = 0; i < tdld.length; i++) {
      if (tdld[i].message == mesVal) {
        tdld.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("toDoListData", JSON.stringify(tdld));
  });

  editIcon.addEventListener("click", function () {
    var mesVal = itemHolder.innerHTML;
    var tdld = JSON.parse(localStorage.getItem("toDoListData"));
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
      for (var i = 0; i < tdld.length; i++) {
        if (tdld[i].message == mesVal) {
          tdld[i].message = valTemp;
          tdld[i].date = new Date().toUTCString();
          break;
        }
      }
      localStorage.setItem("toDoListData", JSON.stringify(tdld));
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
        var mesVal = itemHolder.innerHTML;
        var tdld = JSON.parse(localStorage.getItem("toDoListData"));
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
          for (var i = 0; i < tdld.length; i++) {
            if (tdld[i].message == mesVal) {
              tdld[i].message = valTemp;
              tdld[i].date = new Date().toUTCString();
              break;
            }
          }
          localStorage.setItem("toDoListData", JSON.stringify(tdld));
        });
      }
      count++;
    });
    deleteCM.addEventListener("click", function () {
      if (count == 1) {
        divListItem.remove();
        var mesVal = itemHolder.innerHTML;
        var tdld = JSON.parse(localStorage.getItem("toDoListData"));
        for (var i = 0; i < tdld.length; i++) {
          if (tdld[i].message == mesVal) {
            tdld.splice(i, 1);
            break;
          }
        }
        localStorage.setItem("toDoListData", JSON.stringify(tdld));
      }
      count++;
    });
  });
}

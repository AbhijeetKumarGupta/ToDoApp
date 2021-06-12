var textBox = document.getElementById("text-box");
textBox.placeholder = "Enter Text Here";

var form = document.getElementById("form-one");
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

var unList = document.getElementById("todoList");
var addBut = document.getElementById("addButton");
var mainDiv = document.getElementById("list");

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
    checkIcon.style.visibility = "hidden";

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
      checkIcon.style.visibility = "visible";
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
        checkIcon.style.visibility = "hidden";
        dateHolder.innerHTML = new Date().toUTCString();
      });
    });
  }
});

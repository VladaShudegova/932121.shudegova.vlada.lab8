var template = document.querySelector('template');
var list = document.getElementById("list");
var showSaved = document.getElementById("showSaved");

var addButton = document.getElementById("addButton");
var saveButton = document.getElementById("saveButton");

function removeListItem(e) {
    e.target.closest('.list-item').remove();
}

function pushListItem() {
    let clone = template.content.cloneNode(true);
    let removeItemButton = clone.querySelector('.remove-item');
    let upButton = clone.querySelector('.up');
    let downButton = clone.querySelector('.down');
    removeItemButton && removeItemButton.addEventListener("click", removeListItem, {once: true});
    upButton && upButton.addEventListener("click", moveListItem(true));
    downButton && downButton.addEventListener("click", moveListItem(false));
    list.appendChild(clone);
}

function moveListItem(moveUp = false) {
    return function (e) {
        let currentListItem = e.target.closest('.list-item');

        let i = Array.prototype.indexOf.call(list.children, currentListItem);

        if(moveUp) {
            if(i > 0)
                list.children[i - 1].insertAdjacentElement('beforebegin', currentListItem);
            return;
        }

        if(i < list.children.length - 1) {
            list.children[i + 1].insertAdjacentElement('afterend', currentListItem);
        }
    }
}

function saveList() {
    let data = {};
    let childs = list.children;
    let replacer = [];
    for(let i = 0, size = childs.length; i < size; i++) {
        data[childs[i].children[0].value] = childs[i].children[1].value;
        replacer.push(childs[i].children[0].value);
    }
    showSaved.innerHTML = JSON.stringify(data, replacer, 2);
}

if("content" in document.createElement("template")) {

}

addButton.addEventListener("click", pushListItem);
saveButton.addEventListener("click", saveList);
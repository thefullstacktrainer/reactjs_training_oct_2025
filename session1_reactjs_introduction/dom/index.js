
const list = document.getElementById("list");
console.log(list)

const button = document.getElementById("add");
console.log(button)

function addItem() {
    const item = document.createElement("li");
    item.innerHTML = `Item ${index} <button id='delete${index}'>Remove</button>`;
    list.appendChild(item);
    index++;
    const deleteBtn = document.getElementById("delete");
    console.log(deleteBtn)

    deleteBtn.addEventListener("click",deleteItem);
    function deleteItem() {
        console.log("Delete Item")
        item.remove()
    }
}
let index = 1;
button.addEventListener("click",addItem);


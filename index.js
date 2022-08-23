//have a row selector later. Need it deselected at page start
var selectedRow = null;

//An alert that will show after doing an action 
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000)

}

//Function to reset the input fields so you can clear them out after each add/edit
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#playerFaction").value = "";
    document.querySelector("#armySubfaction").value = "";
    document.querySelector("#pointCost").value = "";
    document.querySelector("#primaryDetachment").value = "";
    document.querySelector("#remainingCP").value = "";
    
} 
    
//Add new army data from form
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    // const fullName = `${firstName} ${lastName}`;
    //had to remove that, wasn't able to split the name back upduring editing
    const playerFaction = document.querySelector("#playerFaction").value;
    const armySubfaction = document.querySelector("#armySubfaction").value;
    const pointCost = document.querySelector("#pointCost").value;
    const primaryDetachment = document.querySelector("#primaryDetachment").value;
    const remainingCP = document.querySelector("#remainingCP").value;

    //validate a "complete" army
    if (firstName == "" || lastName == "" || playerFaction == "" || 
    armySubfaction == "" || pointCost == "" || primaryDetachment == "" 
    || remainingCP == ""){
        showAlert("Please fill in all fields", "danger");
    } 
    // else if (pointCost == NaN || remainingCP == NaN){
    //     showAlert("Please enter number values in Point Cost and Remaining Command Point form entries", "danger");
    // }
    // wasn't working, wasn't sure how to implement that. Changed it to require numbers in the html
    else {
        if (selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${playerFaction}</td>
                <td>${armySubfaction}</td>
                <td>${pointCost}</td>
                <td>${primaryDetachment}</td>
                <td>${remainingCP}</td>
                <td>
                <a href="#" class="btn btn-warning edit">Edit</a>
                <a href="#" class="btn btn-danger delete">Delete</a>
                `;
                list.appendChild(row);
                selectedRow = null;
                showAlert("Student Added", "success");
        }
        else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = playerFaction;
            selectedRow.children[3].textContent = armySubfaction;
            selectedRow.children[4].textContent = pointCost;
            selectedRow.children[5].textContent = primaryDetachment;
            selectedRow.children[6].textContent = remainingCP;
            selectedRow = null; 
            showAlert("Student Info Edited", "info");
        }

        clearFields();//reset everything
    }
});

//edit armies using the edit button on the page
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#playerFaction").value = selectedRow.children[2].textContent;
        document.querySelector("#armySubfaction").value = selectedRow.children[3].textContent;
        document.querySelector("#pointCost").value = selectedRow.children[4].textContent;
        document.querySelector("#primaryDetachment").value = selectedRow.children[5].textContent;
        document.querySelector("#remainingCP").value = selectedRow.children[6].textContent;

    }
})


// Easy delete button, deletes from the parent's parent
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
}

});
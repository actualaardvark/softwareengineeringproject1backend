// Score for tracking energy level
var beginningscore;
// Unused event listener code
// window.addEventListener("DOMContentLoaded", () => loadEdit(), false);
// Get cards and update html content
async function getCardJSON(){
    const response = await fetch(window.location.href + "api/getcards", {method: "POST"}); 
    return await response.json();
}
function constructCard(id, title, difficulty, description, locked){
    var taskcarddiv = document.createElement("div");
    taskcarddiv.setAttribute("id", id);
    taskcarddiv.setAttribute("class", "taskcard");

    var buttoncontainerdiv = document.createElement("div");
    buttoncontainerdiv.setAttribute("class", "buttoncontainer");

    var editbutton = document.createElement("button");
    editbutton.setAttribute("class", "taskcardbutton");
    editbutton.setAttribute("id", "editbutton");
    editbutton.setAttribute("onclick", "javascript: editCard(this)")
    editbutton.innerText = "Edit"
    
    var clearbutton = document.createElement("button");
    clearbutton.setAttribute("class", "taskcardbutton");
    clearbutton.setAttribute("onclick", "javascript: removeCard(this)");
    clearbutton.innerText = "Clear";

    var blurcontainerdiv = document.createElement("div");
    blurcontainerdiv.setAttribute("class", "blurcontainer");

    var taskcarddifficultydiv = document.createElement("div");
    taskcarddifficultydiv.setAttribute("class", "taskcardcontent taskcarddifficulty");
    taskcarddifficultydiv.innerText = difficulty;
    
    var taskcardtitlediv = document.createElement("h1");
    taskcardtitlediv.setAttribute("class", "taskcardcontent taskcardtitle");
    taskcardtitlediv.innerText = title;
    
    var taskcarddescriptiondiv = document.createElement("p");
    taskcarddescriptiondiv.setAttribute("class", "taskcardcontent taskcarddescription");
    taskcarddescriptiondiv.innerText = description;
    
    blurcontainerdiv.appendChild(taskcarddifficultydiv);
    blurcontainerdiv.appendChild(taskcardtitlediv);
    blurcontainerdiv.appendChild(taskcarddescriptiondiv);
    buttoncontainerdiv.appendChild(editbutton);
    buttoncontainerdiv.appendChild(clearbutton);
    taskcarddiv.appendChild(buttoncontainerdiv);
    taskcarddiv.appendChild(blurcontainerdiv);
    if (locked == false){
        return taskcarddiv.outerHTML;
    } else {
        taskcarddiv.setAttribute("class", "blurlock taskcard");
        taskcarddiv.setAttribute("onclick", "javascript: unlockCard(this)");
        // lock svg element
        var locktext = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" stroke-width="1.5" viewBox="0 0 24 24" color="#FFF"><path stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M16 12h1.4a.6.6 0 0 1 .6.6v6.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6v-6.8a.6.6 0 0 1 .6-.6H8m8 0V8c0-1.333-.8-4-4-4S8 6.667 8 8v4m8 0H8"></path></svg>'
        taskcarddiv.innerHTML = locktext + taskcarddiv.innerHTML;
        return taskcarddiv.outerHTML;
    }
}
function getCards(){
    getCardJSON().then(result => {
    var data = result;
    carddata = [];
    var priorityindex = 0;
    console.log(data["cards"][priorityindex]);
    for (let i = 0; i < data["cards"].length; i++) {
        if (data["cards"][priorityindex]["difficulty:"] < data["cards"][i]["difficulty:"] && data["cards"][i]["difficulty:"] <= beginningscore){
            priorityindex = i;
        }
        carddata.push(data["cards"][i])
    }
    var documentbody = ""
    var lockedbody = ""
    for (let i = 0; i < carddata.length; i++) {
        if (i != priorityindex){
            console.log(carddata[i]["difficulty:"])
            if (carddata[i]["difficulty:"] <= beginningscore){
                documentbody += constructCard(carddata[i]["id"], carddata[i]["title"], carddata[i]["difficulty:"], carddata[i]["description"], false);
            } else {
                lockedbody += constructCard(carddata[i]["id"], carddata[i]["title"], carddata[i]["difficulty:"], carddata[i]["description"], true);
            }
        } else {
            // Priority (Most difficult unlocked) Card Placement
            document.getElementById('priority').innerHTML = '<h1 class="priorityheader">Priority:</h1>' + constructCard(carddata[i]["id"], carddata[i]["title"], carddata[i]["difficulty:"], carddata[i]["description"], false);;
        }
    }
    // Shows startup and completed message if nothing in the card queue
    document.getElementById('body').innerHTML = documentbody += lockedbody;
    var x = typeof data["cards"][priorityindex];
    if(document.getElementById('body').innerHTML  == '' && x == "undefined"){
        document.getElementById("priority").style.display = "none";
        document.getElementById("donemessage").style.display = "flex";
    } else {
        document.getElementById("priority").style.display = "flex";
        document.getElementById("donemessage").style.display = "none";
    }
    })}
// Allows for editing energy level with modal button
function saveEnergy(){
    beginningscore = document.getElementById("spoonsinput").value;
    document.getElementById("difficulty").innerText = beginningscore;
    document.getElementById("energymodal").style.display = "none";
    getCards();
    document.getElementById("spoonsinput").value = 5;
}
function showEnergy(){
    document.getElementById("energymodal").style.display = "block";
}

// Sends request to delete card and plays CSS remove animation
async function removeCard(element){
    var removeCardTarget = await fetch(window.location.href + "api/removecard", {
        method: "POST",
        body: JSON.stringify({
            id: element.parentElement.parentElement.id
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    var fadeTarget = document.getElementById(element.parentElement.parentElement.id);
    fadeTarget.style.animation="zoom forwards 0.5s ease-out 1";
    setTimeout(()=>{getCards()}, 500);
    // showEnergy()
}
// Executes on page load
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("errorslider").classList.toggle("slide-up");
    document.getElementById("priority").style.display = "none";
    document.getElementById("errorslider").style.display = "flex";
});
// Hides the modal
var hideModal = function(){
    document.getElementById("modalsave").setAttribute( "onClick", "javascript: saveCard();" );
    document.getElementById('modal').style.display = "none";
    document.getElementById("difficultyinput").value = "";
    document.getElementById("descriptioninput").value = "";
    document.getElementById("titleinput").value = ""
};
// Hides the modal if clicked outside of while open
window.onclick = function(event) {
    if (event.target == modal) {
      hideModal();
    }
}
// Creates a card and edits modal onclick function to make a new card instead of edit existing one
var createCard = function(){
    document.getElementById("modalsave").setAttribute( "onClick", "javascript: saveCard();" );
    document.getElementById('modal').style.display = "block";
}
// What I said before, but more of it
async function saveCard(){
    // const response = await fetch(window.location.href + "api/getid", {method: "POST"});
    // var data = await response.json();
    // var id = data["id"];
    var output = await fetch(window.location.href + "api/makecard", {
        method: "POST",
        body: JSON.stringify({
            title: document.getElementById("titleinput").value,
            description: document.getElementById("descriptioninput").value,
            difficulty: document.getElementById("difficultyinput").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    var outputjson = await output.json();
    getCards();
    hideModal();
    // Custom error prompt handling
    if (outputjson["error"] == "keyschemavalidationerror"){
        document.getElementById("errortitle").innerText = "Key Schema Error";
        document.getElementById("errordescription").innerText = "Make sure you filled in all of the form fields. If this issues persists, contact the developer.";
        document.getElementById("errorslider").style.display = "flex";
        document.getElementById("errorslider").classList.toggle("slide-down");
        setTimeout(()=>{document.getElementById("errorslider").classList.toggle("slide-down");}, 4000);
    }
    if (outputjson["error"] == "idlengtherror"){
        document.getElementById("errortitle").innerText = "ID Length Error";
        document.getElementById("errordescription").innerText = "The programmer made an error. If you are seeing this, message them online for a fix.";
        document.getElementById("errorslider").style.display = "flex";
        document.getElementById("errorslider").classList.toggle("slide-down");
        setTimeout(()=>{document.getElementById("errorslider").classList.toggle("slide-down");}, 4000);
    }
    if (outputjson["error"] == "difficultyvalueerror"){
        document.getElementById("errortitle").innerText = "Invalid Difficulty";
        document.getElementById("errordescription").innerText = "Make sure your selected difficulty is between 1 and 10";
        document.getElementById("errorslider").style.display = "flex";
        document.getElementById("errorslider").classList.toggle("slide-down");
        setTimeout(()=>{document.getElementById("errorslider").classList.toggle("slide-down");}, 4000);
    }
    if (outputjson["error"] == "invalididerror"){
        document.getElementById("errortitle").innerText = "ID Validation Error";
        document.getElementById("errordescription").innerText = "The programmer made an error. If you are seeing this, message them online for a fix.";
        document.getElementById("errorslider").style.display = "flex";
        document.getElementById("errorslider").classList.toggle("slide-down");
        setTimeout(()=>{document.getElementById("errorslider").classList.toggle("slide-down");}, 4000);
    }
}
// Edit card by replacing onclick from create card modal dialogue
function editCard(element){
    document.getElementById("modalsave").setAttribute( "onClick", "javascript: saveEdit();" );
    var id = element.parentElement.parentElement.id;

    document.getElementById("idattach").innerText = id;
    document.getElementById("titleinput").value = element.parentElement.parentElement.childNodes[1].childNodes[1].innerText;
    document.getElementById("difficultyinput").value = element.parentElement.parentElement.childNodes[1].childNodes[0].innerText;
    document.getElementById("descriptioninput").value = element.parentElement.parentElement.childNodes[1].childNodes[2].innerText;
    document.getElementById("modal").style.display = "flex";
}
// writes the edit to the html + database
async function saveEdit(){
    id = document.getElementById("idattach").innerText
    console.log(id);
    var output = await fetch(window.location.href + "api/editcard", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            title: document.getElementById("titleinput").value,
            description: document.getElementById("descriptioninput").value,
            difficulty: document.getElementById("difficultyinput").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    var outputjson = await output.json();
    getCards();
    hideModal();
    // error handling
    if (outputjson["error"] == "keyschemavalidationerror"){
        document.getElementById("errortitle").innerText = "Key Schema Error";
        document.getElementById("errordescription").innerText = "Make sure you filled in all of the form fields. If this issues persists, contact the developer.";
        document.getElementById("errorslider").style.display = "flex";
        document.getElementById("errorslider").classList.toggle("slide-down");
        setTimeout(()=>{document.getElementById("errorslider").classList.toggle("slide-down");}, 4000);
    }
    if (outputjson["error"] == "idlengtherror"){
        document.getElementById("errortitle").innerText = "ID Length Error";
        document.getElementById("errordescription").innerText = "The programmer made an error. If you are seeing this, message them online for a fix.";
        document.getElementById("errorslider").style.display = "flex";
        document.getElementById("errorslider").classList.toggle("slide-down");
        setTimeout(()=>{document.getElementById("errorslider").classList.toggle("slide-down");}, 4000);
    }
    if (outputjson["error"] == "difficultyvalueerror"){
        document.getElementById("errortitle").innerText = "Invalid Difficulty";
        document.getElementById("errordescription").innerText = "Make sure your selected difficulty is between 1 and 10";
        document.getElementById("errorslider").style.display = "flex";
        document.getElementById("errorslider").classList.toggle("slide-down");
        setTimeout(()=>{document.getElementById("errorslider").classList.toggle("slide-down");}, 4000);
    }
    if (outputjson["error"] == "invalididerror"){
        document.getElementById("errortitle").innerText = "ID Validation Error";
        document.getElementById("errordescription").innerText = "The programmer made an error. If you are seeing this, message them online for a fix.";
        document.getElementById("errorslider").style.display = "flex";
        document.getElementById("errorslider").classList.toggle("slide-down");
        setTimeout(()=>{document.getElementById("errorslider").classList.toggle("slide-down");}, 4000);
    }
}
var unlockCard = function(element){
    document.getElementById("warningmodal").style.display = "flex";
    document.getElementById("warningidattach").innerText = element.id;
}
// Allows for unlocking cards that are too difficult
var unlockCardById = function(id){
    id = id.childNodes[1].innerText;
    document.getElementById(id).classList.toggle("blurlock");
    document.getElementById(id).setAttribute( "onClick", "" );
    document.getElementById(id).childNodes[0].remove();
    document.getElementById(id).childNodes[0].remove();
    document.getElementById('warningmodal').style.display = "none";
}
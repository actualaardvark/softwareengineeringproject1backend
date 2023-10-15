var beginningscore = 20;

async function getCards(){
    const response = await fetch("http://127.0.0.1:5000/api/getcards", {method: "POST"});
    var data = await response.json();
    console.log(data);
    carddata = [];
    var priorityindex = 0;
    for (let i = 0; i < data["cards"].length; i++) {
        if (data["cards"][priorityindex]["difficulty"] < data["cards"][i]["difficulty"]){
            console.log(i, data["cards"][i]["difficulty"])
            priorityindex = i;
        }
        carddata.push(data["cards"][i])
    }
    var documentbody = ""
    for (let i = 0; i < carddata.length; i++) {
        if (i != priorityindex){
            documentbody += '<div class="taskcard" id="' + carddata[i]["id"] + '"><div class = "buttoncontainer"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button></div><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ carddata[i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + carddata[i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + carddata[i]["description"] + '</p></div></div>';
        } else {
            console.log(priorityindex);
            console.log(i);
            priorityelement = '<div class="taskcard" id="' + carddata[i]["id"] + '"><div class = "buttoncontainer"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button></div><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ carddata[i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + carddata[i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + carddata[i]["description"] + '</p></div></div>'
            document.getElementById('priority').innerHTML = '<h1 class="priorityheader">Priority:</h1><div class="taskcard" id="' + carddata[i]["id"] + '"><div class = "buttoncontainer"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button></div><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ carddata[i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + carddata[i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + carddata[i]["description"] + '</p></div></div>';
        }
    }
    document.getElementById('body').innerHTML = documentbody;
    console.log(document.getElementById('priority').innerHTML);
    var x = typeof data["cards"][priorityindex];
    console.log(x);
    console.log(documentbody == '' && x == "undefined");
    if(documentbody == '' && x == "undefined"){
        console.log("Empty Doc")
        document.getElementById("priority").style.display = "none";
        document.getElementById("donemessage").style.display = "flex";
    } else {
        document.getElementById("priority").style.display = "flex";
        document.getElementById("donemessage").style.display = "none";
    }
}

async function removeCard(element){
    console.log(element.parentElement.parentElement.id)
    var removeCardTarget = await fetch("http://127.0.0.1:5000/api/removecard", {
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
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("priority").style.display = "none";
    getCards();
});

var hideModal = function(){
    console.log("Modal Hidden");
    document.getElementById('modal').style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
      hideModal();
    }
} 

var createCard = function(){
    console.log("Launching Modal");
    document.getElementById('modal').style.display = "block";
}

async function saveCard(){
    const response = await fetch("http://127.0.0.1:5000/api/getid", {method: "POST"});
    var data = await response.json();
    var id = data["id"];
    var output = await fetch("http://127.0.0.1:5000/api/makecard", {
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
    document.getElementById("priority").style.display = "block";
    console.log(output);
    getCards();
    hideModal();
    // var data = await response.json();
    // console.log(data);
    // carddata = [];
    // var priorityindex = 0;
    // for (let i = 0; i < data["cards"].length; i++) {
    //     if (priorityindex < data["cards"][i]["difficulty"]){
    //         console.log(i, data["cards"][i]["difficulty"])
    //         priorityindex = i;
    //     }
    //     carddata.push(data["cards"][i])
    // }
    // var documentbody = ""
    // for (let i = 0; i < carddata.length; i++) {
    //     if (i != priorityindex){
    //         documentbody += '<div class="taskcard" id="' + carddata[i]["id"] + '"><div class = "buttoncontainer"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button></div><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ carddata[i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + carddata[i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + carddata[i]["description"] + '</p></div></div>';
    //     } else {
    //         console.log(priorityindex);
    //         console.log(i);
    //         document.getElementById('priority').innerHTML = '<h1 class="priorityheader">Tasks:</h1><div class="taskcard" id="' + carddata[i]["id"] + '"><div class = "buttoncontainer"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button></div><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ carddata[i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + carddata[i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + carddata[i]["description"] + '</p></div></div>';
    //     }
    // }
    // document.getElementById('body').innerHTML = documentbody
}
var beginningscore = 20;

async function getCards(){
    document.getElementById('body').innerHTML = ""
    const response = await fetch("http://127.0.0.1:5000/api/getcards", {method: "POST"});
    var data = await response.json();
    console.log(data);
    carddata = [];
    var priorityindex = 0;
    for (let i = 0; i < data["cards"].length; i++) {
        if (priorityindex < data["cards"][i]["difficulty"]){
            console.log(i, data["cards"][i]["difficulty"])
            priorityindex = i;
        }
        carddata.push(data["cards"][i])
        //document.getElementById('body').innerHTML += '<div class="taskcard" id="' + data["cards"][i]["id"] + '"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ data["cards"][i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + data["cards"][i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + data["cards"][i]["description"] + '</p></div></div>';
    }
    for (let i = 0; i < carddata.length; i++) {
        // console.log(carddata)
        if (i != priorityindex){
            document.getElementById('body').innerHTML += '<div class="taskcard" id="' + carddata[i]["id"] + '"><div class = "buttoncontainer"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button></div><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ carddata[i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + carddata[i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + carddata[i]["description"] + '</p></div></div>';
        } else {
            console.log(priorityindex);
            console.log(i);
            document.getElementById('priority').innerHTML = '<div class="taskcard" id="' + carddata[i]["id"] + '"><div class = "buttoncontainer"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button></div><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ carddata[i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + carddata[i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + carddata[i]["description"] + '</p></div></div>';
        }
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
}

document.addEventListener("DOMContentLoaded", function(){
    getCards();
});
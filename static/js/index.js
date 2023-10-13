async function getCards(){
    document.getElementById('body').innerHTML = ""
    const response = await fetch("http://127.0.0.1:5000/api/getcards", {method: "POST"});
    var data = await response.json();
    console.log(data);
    carddata = []
    for (let i = 0; i < data["cards"].length; i++) {
        console.log(data["cards"][i])
        carddata += data["cards"][i]
        //document.getElementById('body').innerHTML += '<div class="taskcard" id="' + data["cards"][i]["id"] + '"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ data["cards"][i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + data["cards"][i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + data["cards"][i]["description"] + '</p></div></div>';
    }
    console.log(carddata)
    for (let i = 0; i < carddata.length; i++) {
        document.getElementById('body').innerHTML += '<div class="taskcard" id="' + data["cards"][i]["id"] + '"><button class="taskcardeditbutton taskcardbutton" id="editButton">Edit</button><button class="taskcardclearbutton taskcardbutton" onclick="removeCard(this)">Clear</button><div class="blurcontainer"><div class="taskcarddifficulty taskcardcontent">'+ data["cards"][i]["difficulty"] +'</div><h1 class="taskcardtitle taskcardcontent">' + data["cards"][i]["title"] + '</h1><p class="taskcarddescription taskcardcontent">' + data["cards"][i]["description"] + '</p></div></div>';
    }
}

async function removeCard(element){
    console.log(element.parentElement.id)
    var removeCardTarget = await fetch("http://127.0.0.1:5000/api/removecard", {
        method: "POST",
        body: JSON.stringify({
            id: element.parentElement.id
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    console.log(removeCardTarget)
    getCards()
}

document.addEventListener("DOMContentLoaded", function(){
    getCards();
});
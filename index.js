var removeCard = function(element){
    
    parentCard = document.getElementById(element.parentElement.id)

    var removeCardTarget = fetch("http://127.0.0.1:5000/api/removecard", {
        method: "POST",
        body: JSON.stringify({
            cardid: element.parentElement.id
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
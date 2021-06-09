window.addEventListener('load', function () {
    pagination(1)
});
window.addEventListener('load', function () {
    createHouses(1)
});
const arr = new Object
pagination = (number) => {
    const div = document.getElementById("pagination")
    div.innerHTML = ""
    for (j = 0; j <= 4; j++) {
        const paginationElement = document.createElement("button")
        paginationElement.innerText = number
        if (j == 0) {
            paginationElement.onclick = function () {
                if (parseInt(this.innerText) <= 1) {
                    pagination(1)
                }
                else {
                    pagination(parseInt(this.innerText) - 1)
                }
                createHouses(this.innerText)
            }
        }
        if (j > 0) {
            paginationElement.onclick = function () {
                if (parseInt(this.innerText) >= 41) {
                    pagination(41)
                }
                else {
                    pagination(parseInt(this.innerText))
                }
                createHouses(this.innerText)
            }
        }
        div.appendChild(paginationElement)
        number += 1
    }
}
createHouses = async (pageNumber) => {
    const div = document.getElementById("HousesDisplay")
    div.innerHTML = ""
    const characterDisplay = document.getElementById("characterDisplay")
    characterDisplay.innerHTML = ""
    await fetch('https://www.anapioficeandfire.com/api/houses?page=' + pageNumber + '&pageSize=10')
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < data.length; i++) {
                const houseDisplay = document.createElement("p");
                houseDisplay.innerText = "" + data[i].name + ""
                houseDisplay.onclick = createCharacters
                houseDisplay.id = i
                div.appendChild(houseDisplay)
            }
            arr.h = (data)
        })
        .catch((error) => {
            document.body.innerHTML = '<h3>Sorry. An error has occured, connection with API impossible!</h3>'
        });
}
function createCharacters() {
    const character = arr.h[this.id].swornMembers
    characterDisplay.innerHTML = ""
    if (character.length == 0) {
        const houseDisplay = document.createElement("p");
        houseDisplay.innerText = "This House is Empty"
        characterDisplay.appendChild(houseDisplay)
    }
    else
        for (i = 0; i < character.length; i++) {
            const houseDisplay = document.createElement("p");
            fetch(character[i])
                .then(response => response.json())
                .then(char => {
                    houseDisplay.innerText = "" + char.name + ""
                    characterDisplay.appendChild(houseDisplay)
                })
                .catch((error) => {
                    document.body.innerHTML = '<h3>Sorry. An error has occured, connection with API impossible!</h3>'
                });
        }
}


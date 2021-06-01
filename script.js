window.onload = function(){createSelect()};
const arr = new Object
function createSelect(){
    const select = document.createElement("select")
    select.onchange = createHouses
    select.id = "select"
    document.body.appendChild(select)
        for(j=1;j<=9;j++){
            let option = document.createElement("option")
            option.value = j
            option.innerText = j
            select.appendChild(option)
        }
        createHouses()
}
function createHouses(){
const div = document.getElementById("HousesDisplay")
div.innerHTML = ""
const CD = document.getElementById("CD")
CD.innerHTML = ""
 fetch('https://www.anapioficeandfire.com/api/houses?page='+document.getElementById("select").value+'&pageSize=50')
    .then(response => response.json())
    .then(data => {
        for(i=0;i<data.length;i++){
        let hd = document.createElement("a");
        hd.innerText = ""+data[i].name+""
        hd.onclick = createCharacters
        hd.id = i
        div.appendChild(hd)
        let br = document.createElement("br")
        div.appendChild(br)
    }
    arr.h = (data)
    })}
function createCharacters(){
 let character = arr.h[this.id].swornMembers
 CD.innerHTML = ""
 if(character.length == 0){
    let hd = document.createElement("a");
    hd.innerText = "This House is Empty"
    CD.appendChild(hd)
 }
 else
 for(i=0;i<character.length;i++){
    let hd = document.createElement("a");
    fetch(character[i])
    .then(response => response.json())
    .then(char => {
        hd.innerText = ""+char.name+""
        CD.appendChild(hd)
        let br = document.createElement("br")
        CD.appendChild(br)
    })}
    
 }

        
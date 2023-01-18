//put this code in a factory/function ------------------------------------------------------------->
const formContainer = document.querySelector(".form-container")
const formBtn = document.querySelector("#form-btn")
const playerOne = document.querySelector(".player-one")
const playerTwo = document.querySelector(".player-two")

window.addEventListener("load", (event) => {
    console.log("hello")
    formContainer.classList.remove("hide")
  });

  formBtn.addEventListener("click",(e)=>{
e.preventDefault()
    playerOne.innerText = document.querySelector("#player-one").value
    playerTwo.innerText = document.querySelector("#player-two").value   
    formContainer.remove()
})
//--------------------------------------------------------------------------------------------->
//player factory function
const createPlayer = (marker)=>{//change to be like book example
    this.marker = marker;
    this.name = name
    const getMarker =()=>{
        return marker;
    };
  
    return {getMarker}
}
//gameboard object
const gameBoard = (() =>{
    const restartButton =document.querySelector(".restart")
    const newGameBtns =document.querySelectorAll(".new-game")
    let boxes = Array.from(document.getElementsByClassName("square"))
    let spaces = Array(9).fill(null)
    const X_TEXT = "X" //will change to be the player markerstored in current player
    const O_TEXT = "O"
    let current = X_TEXT
    let round = 0
    boxes.forEach(box =>box.addEventListener("click",boxClicked))
    //boxes.forEach(box =>box.addEventListener("click",boxClicked))
   const enableButtons = () =>{
    boxes.forEach((element)=>(element.disabled=false))
   }
    function boxClicked(e){
        console.log("box clicked")
        if(current==X_TEXT){
            e.target.innerText = X_TEXT
            current = O_TEXT
            e.target.disabled = true
            console.log("display x then o next")
        }else{
            e.target.innerText = O_TEXT
            current = X_TEXT
            e.target.disabled = true
            console.log("display o then x next")
        }
        round +=1
        if(round==9){
            gameController.drawFunction()
        }
        gameController.winChecker()
        
    }
    //restart function
    restartButton.addEventListener("click",()=>{
        console.log("restart")
        boxes.forEach(box=>{
            box.innerHTML = ""
           enableButtons()
           current= X_TEXT
        })
        
    })
    //new game
    Array.from(newGameBtns).forEach(
        (element)=>{
            element.addEventListener("click",function(){
                location.reload()
            })
        }
    )
   
return{
    boxes
}
})()
const gameController = (()=>{
const winnerText = document.querySelector(".winner-text") //shd read actual name
const popup = document.querySelector(".popup")
const container = document.querySelector(".container")
//create players---------->maybe return them?
//const playerX  = Player("X")
//const playerO = Player("O")
//let round = 1 //can add isover to test 
let winningCombo = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
]

const winChecker = ()=>{ //return winchecker to be called wih each click
    for (let i of winningCombo){
        let [element1,element2,element3] = [
            gameBoard.boxes[i[0]].innerText,
            gameBoard.boxes[i[1]].innerText,
            gameBoard.boxes[i[2]].innerText,
        ]
        //check if are empty
        if(element1 !=""&&(element2!="")&&(element3 !="")){
            if(element1==element2 && element2==element3){
                winFunction(element1) //can return element 1 then use it in winfunction under Updatedisplay
            }
        }

    }
}
const winFunction = (letter) =>{
    console.log("doing winfunc")
    popup.classList.remove("hide")
    container.remove()
if(letter=="X"){
    winnerText.innerHTML = "X WINS"
}else{
    winnerText.innerHTML = "O WINS"
}
}
const drawFunction = ()=>{
    console.log("doing drawfunc")
    popup.classList.remove("hide")
    container.remove()
    winnerText.innerHTML = "ITS A DRAW"
}
return {winChecker,drawFunction}
})()
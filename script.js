const flashcards = [

{q:"What is HTML?",a:"HyperText Markup Language"},

{q:"What does CSS stand for?",a:"Cascading Style Sheets"},

{q:"Capital of Japan?",a:"Tokyo"},

{q:"2 + 2 ?",a:"4"},

{q:"Largest planet in our solar system?",a:"Jupiter"},

{q:"Which planet is called Red Planet?",a:"Mars"},

{q:"HTTP status code for Not Found?",a:"404"},

{q:"JavaScript method to add element in array?",a:"push()"},

{q:"Square root of 81?",a:"9"},

{q:"CSS property for outer spacing?",a:"margin"}

];

let index = 0;
let score = 0;

const card = document.getElementById("card");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

const scoreEl = document.getElementById("score");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");

const showBtn = document.getElementById("show-btn");
const correctBtn = document.getElementById("correct-btn");
const wrongBtn = document.getElementById("wrong-btn");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");


// 🔀 Shuffle questions every time page loads
function shuffleCards(array){

for(let i = array.length - 1; i > 0; i--){

let j = Math.floor(Math.random() * (i + 1));

[array[i], array[j]] = [array[j], array[i]];

}

}


// Load card
function loadCard(){

card.classList.remove("flipped");

question.textContent = flashcards[index].q;

answer.textContent = flashcards[index].a;

progress.textContent = `${index + 1} / ${flashcards.length}`;

progressFill.style.width = ((index + 1) / flashcards.length * 100) + "%";

updateButtons();

}


// Update navigation buttons
function updateButtons(){

prevBtn.disabled = index === 0;

nextBtn.disabled = index === flashcards.length - 1;

}


// Show answer
showBtn.onclick = () => {

card.classList.add("flipped");

};


// Correct answer
correctBtn.onclick = () => {

score++;

scoreEl.textContent = score;

nextCard();

};


// Wrong answer
wrongBtn.onclick = () => {

nextCard();

};


// Next card
function nextCard(){

if(index < flashcards.length - 1){

index++;

loadCard();

}
else{

alert("Quiz Finished! Your Score: " + score + "/" + flashcards.length);

location.reload();

}

}


// Previous card
prevBtn.onclick = () => {

if(index > 0){

index--;

loadCard();

}

};


// Next button
nextBtn.onclick = nextCard;


// Keyboard controls
document.addEventListener("keydown",(e)=>{

if(e.key === "ArrowRight") nextCard();

if(e.key === "ArrowLeft") prevBtn.click();

if(e.key === " "){

e.preventDefault();

card.classList.toggle("flipped");

}

});


// Mobile swipe
let startX = 0;

card.addEventListener("touchstart",(e)=>{

startX = e.touches[0].clientX;

});

card.addEventListener("touchend",(e)=>{

let endX = e.changedTouches[0].clientX;

let diff = startX - endX;

if(Math.abs(diff) > 50){

if(diff > 0) nextCard();
else prevBtn.click();

}

});


// Initialize
shuffleCards(flashcards);

loadCard();
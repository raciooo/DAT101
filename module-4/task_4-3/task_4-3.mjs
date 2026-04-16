"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];


//--- Part 1 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const calculations = document.getElementById("txtTask1Output");
const calculateButton = document.getElementById("cmbTask1Calculate");

function calcCircumference() {
  const width = document.getElementById("txtRectWidth").value
  const height = document.getElementById("txtRectHeight").value

  return width*2+height*2;
}

function calcArea() {
  const width = document.getElementById("txtRectWidth").value
  const height = document.getElementById("txtRectHeight").value

  return width*height;
}

calculateButton.onclick = () => {
  calculations.innerText = `Circumference = ${calcCircumference()}, Area = ${calcArea()}`
}

//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
const wordsArray = []; 
const wordInput = document.getElementById("txtTask2Word")
const wordCounter = document.getElementById("txtTask2Output")
const wordsOutput = document.getElementById("words-added")
wordInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    wordsArray.push(wordInput.value)
    wordInput.value = "";
    wordCounter.innerText = `Number of words = ${wordsArray.length}`

    wordsOutput.innerText = `Words: ${wordsArray.join(", ")}`
  }
})

//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("cmbTask3CheckAnswer").addEventListener("click", () => {

    const checkboxes = document.querySelectorAll('input[name="chkTask3"]');

    const correctAnswers = [true, true, true, false, false];

    let score = 0;

    checkboxes.forEach((cb, index) => {
      if (cb.checked === correctAnswers[index]) {
        score++;
      }
    });

    document.getElementById("txtTask3Output").textContent =
      `${score} out of ${checkboxes.length} correct.`;

  });

});



//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const container = document.getElementById("divTask4Cars");

CarTypes.forEach((car) => {
  const label = document.createElement("label");

  const input = document.createElement("input");
  input.type = "radio";
  input.name = "carType";
  input.value = car.value;

  input.addEventListener("change", () => {
    document.getElementById("txtTask4Output").textContent =
      `You selected: ${car.caption}`;
  });

  label.appendChild(input);
  label.append(` ${car.caption}`);

  container.appendChild(label);
  container.appendChild(document.createElement("br"));
});

//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const AnimalElement = document.getElementById("selectTask5Animals");
const output = document.getElementById("txtTask5Output");

AnimalElement.addEventListener("change", () => {
  const selectedText = AnimalElement.options[AnimalElement.selectedIndex].text;

  output.textContent = `You selected: ${selectedText}`;
});
//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const girlsElement = document.getElementById("selectTask6Girls")
for (let i = 0; i < GirlsNames.length; i++) {
  const element = document.createElement("option")
  element.value = i+1
  if (i+1 === 1) {
    element.selected = "selected"
  }
  element.innerText = GirlsNames[i]
  girlsElement.appendChild(element);
}

const task6Output = document.getElementById("txtTask6Output")
girlsElement.addEventListener("change", () => {
  const selectedText = girlsElement.options[girlsElement.selectedIndex].text;

  task6Output.textContent = `You selected ${selectedText}`
})

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/


// Add movieGenres
const selectMovieGenre = document.getElementById("selectMovieGenre") // select element
for (let i = 0; i < MovieGenre.length; i++) {
  const element = document.createElement("option")
  element.value = i+1
  element.innerText = MovieGenre[i];
  selectMovieGenre.appendChild(element)
}

function grabGenre() {
  return selectMovieGenre.options[selectMovieGenre.selectedIndex].text;
}

function grabTitle() {
  // todo
}

function grabDirectior() {
  // todo
} 
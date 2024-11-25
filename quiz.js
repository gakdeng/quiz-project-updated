//Build a simple quiz project that will prompt the user with questions, takes their input, checks their answers, annd provides feedback on whether the answers are correct or not. You will also calculate the user's score based on the correct answers and display the final score at the end of the quiz

// Array of quiz questions
const quizQuestions = [
    {
        question: "Which of the following is the correct way to declare a variable in JavaScript?",
        options: [
            "A) var myVariable = 10;",
            "B) variable myVariable = 10;",
            "C) declare myVariable = 10;",
            "D) let = myVariable 10;"
        ],
        correctAnswer: 0 // A) var myVariable = 10;
    },
    {
        question: "Which data type is NOT a valid primitive data type in JavaScript?",
        options: [
            "A) string",
            "B) integer",
            "C) boolean",
            "D) number"
        ],
        correctAnswer: 1 // B) integer
    },
    {
        question: "What will console.log(3 + 2 + '7') output?",
        options: [
            "A) 327",
            "B) 57",
            "C) 12",
            "D) NaN"
        ],
        correctAnswer: 1 // B) 57
    },
    {
        question: "Which of the following statements will correctly check if x is equal to 5 and is a number?",
        options: [
            "A) if (x = 5)",
            "B) if (x == 5 && typeof x === 'number')",
            "C) if (x === 5 || typeof x === 'number')",
            "D) if (x == '5')"
        ],
        correctAnswer: 1 // B) if (x == 5 && typeof x === 'number')
    },
    {
        question: "How do you define a function named myFunction in JavaScript?",
        options: [
            "A) function: myFunction()",
            "B) function myFunction() {}",
            "C) define function myFunction()",
            "D) create function myFunction()"
        ],
        correctAnswer: 1 // B) function myFunction() {}
    },
    {
        question: "Which loop will execute the code block at least once, regardless of the condition?",
        options: [
            "A) for loop",
            "B) while loop",
            "C) do...while loop",
            "D) for...in loop"
        ],
        correctAnswer: 2 // C) do...while loop
    },
    {
        question: "How can you add a new item to the end of an array called fruits?",
        options: [
            "A) fruits.add('apple')",
            "B) fruits[fruits.length] = 'apple'",
            "C) fruits.push('apple')",
            "D) fruits.insert('apple')"
        ],
        correctAnswer: 2 // C) fruits.push('apple')
    },
    {
        question: "What is the correct syntax to access the name property of the following object: let person = { name: 'John', age: 25 }?",
        options: [
            "A) person['name']",
            "B) person.name",
            "C) person(name)",
            "D) Both A and B"
        ],
        correctAnswer: 3 // D) Both A and B
    }];
   


let currentQuestionIndex = 0;// to track the current question
 


// access the div element and store it in a variable
let questionsContainer = document.getElementById('questions');
questionsContainer.innerHTML = '' ;// To clear existing content


let listElement = document.createElement('ol'); // creating a list to the arrays

let submitBtn = document.getElementById('btn');
submitBtn.addEventListener('click', checkAnswers);


quizQuestions.forEach((quizQuestion, index) => {
    let listItem = document.createElement('li');
    listItem.textContent = quizQuestion.question; // places  <li> the question text 
    
    let optionsDiv = document.createElement('div'); // Create div to hold options for the current question
    
//iterating thru choices in each quiestion, identify the option and its position(index inditifiys each position uniquely)
    quizQuestion.options.forEach((option, optionIndex) => {
        let optionLabel = document.createElement('label');
        let optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = `question-${index}`; // groups options by question using the name attribute meaning all the checkboxes for a single question will share the same name
        optionInput.value = optionIndex; // to set checkbox's value or identify the selected option
        
        // Append the checkbox and text to label
        optionLabel.appendChild(optionInput);// the bockboxes and its options are set into the label element
        optionLabel.appendChild(document.createTextNode(option));// creates the options next to the checkbox

        // Append the label to options div
        optionsDiv.appendChild(optionLabel);
        optionsDiv.appendChild(document.createElement('br')); // line break after each option to ensure the checkboxes appear on new lines
    });

    // Append the options div to the list item
    listItem.appendChild(optionsDiv); //appends the options to the listItem which contains the questions

    // Append the list item to the ol (ordered list) 
    listElement.appendChild(listItem); // the questions together with their optins are appended onto the ol for numbering
});
questionsContainer.appendChild(listElement); // append everything onto the main container for rendering onto the browser


//checking for the answer
function checkAnswers() {
    let correctScore = 0;

    quizQuestions.forEach((quizQuestion, index) => {
        // Get the selected input for the current question
        let options = document.querySelectorAll(`input[name="question-${index}"]`);
        let userInput = document.querySelector(`input[name="question-${index}"]:checked`);

        //
        options.forEach(option =>{
            const label = option.parentNode; //label conataining the input
            label.style.color = 'initial' // resets color before marking

            if(Number(option.value) === quizQuestion.correctAnswer){
                label.style.color = 'green';
            }
            if(userInput && Number(userInput.value) !== quizQuestion.correctAnswer && option === userInput){
                label.style.color = 'red';
            }
        })
        
        // Check if the selected answer is correct
        if (userInput && userInput.value === quizQuestion.correctAnswer) {
            correctScore++;
        }
    });

    // Provide feedback to the user
    let feedbackDiv = document.getElementById('feedbackContainer');
    feedbackDiv.textContent = `You got ${correctScore} out of ${quizQuestions.length} correct!`;
    questionsContainer.appendChild(feedbackDiv)
    
}

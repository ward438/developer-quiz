const SECONDS = 100;
const WRONG = "Incorrect Answer, please try again";
const QUESTIONS = [{
        id: "question1",
        question: "What is JQuery?",
        questionHTML: null,
        options: [
            "A method of specialized styling.",
            "A JavaScript library.",
            "A unique &lt;div&gt; tag."
        ],
        answer: 1,
        display: true
    },
    {
        id: "question2",
        question: "Which one of these is a JavaScript package manager?",
        questionHTML: null,
        options: [
            "Node.js",
            "TypeScript",
            "npm"

        ],

        answer: 2,
        display: false
    },
    {
        id: "question3",
        question: "Which tool can you use to ensure code quality?",
        questionHTML: null,
        options: [
            "Angular",
            "jQuery",
            "RequireJS",
            "ESLint"
        ],

        answer: 3,
        display: false
    }
]
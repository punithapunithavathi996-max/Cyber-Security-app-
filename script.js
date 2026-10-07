// ==============================
// PAGE NAVIGATION
// ==============================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// PASSWORD STRENGTH
// ==============================

function checkPassword() {

    const password =
        document.getElementById("passwordInput").value;

    const bar =
        document.getElementById("strengthBar");

    const text =
        document.getElementById("strengthText");


    if (password.length === 0) {

        bar.style.width = "0%";

        text.textContent = "Enter a password";

        return;
    }


    let score = 0;


    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    if (score <= 2) {

        bar.style.width = "30%";

        text.textContent = "Weak";

    }

    else if (score <= 4) {

        bar.style.width = "65%";

        text.textContent = "Medium";

    }

    else {

        bar.style.width = "100%";

        text.textContent = "Strong";
    }
}


// ==============================
// QUIZ
// ==============================

const questions = [

    {
        question:
            "Which is a good password practice?",

        answers: [
            "Use the same password everywhere",
            "Use a strong and unique password",
            "Share your password",
            "Use your name as password"
        ],

        correct: 1
    },


    {
        question:
            "What is phishing?",

        answers: [
            "A computer game",
            "A method of tricking users",
            "A browser",
            "A software update"
        ],

        correct: 1
    },


    {
        question:
            "What should you do with a suspicious link?",

        answers: [
            "Click immediately",
            "Share it",
            "Verify it before opening",
            "Enter your password"
        ],

        correct: 2
    },


    {
        question:
            "What does 2FA mean?",

        answers: [
            "Two-Factor Authentication",
            "Two File Access",
            "Fast File Application",
            "Internet Security Tool"
        ],

        correct: 0
    },


    {
        question:
            "Which one is malware?",

        answers: [
            "Ransomware",
            "Keyboard",
            "Monitor",
            "Web browser"
        ],

        correct: 0
    }

];


let currentQuestion = 0;

let score = 0;

let selected = false;


function loadQuestion() {

    const q = questions[currentQuestion];


    document.getElementById("question").textContent =
        q.question;


    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    document.getElementById("score").textContent =
        `Score: ${score}`;


    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    selected = false;


    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent = answer;


        button.onclick = function () {

            if (selected) {
                return;
            }

            selected = true;

            if (index === q.correct) {

                button.classList.add("selected");

                score++;

            } else {

                button.classList.add("selected");
            }

            document.getElementById("score").textContent =
                `Score: ${score}`;
        };


        answers.appendChild(button);

    });
}


function nextQuestion() {

    if (!selected) {

        alert("Please select an answer.");

        return;
    }


    currentQuestion++;


    if (currentQuestion >= questions.length) {

        document.getElementById("question").textContent =
            `🎉 Quiz Completed! Your score is ${score}/${questions.length}`;

        document.getElementById("answers").innerHTML = "";

        document.querySelector(".quiz-box .main-btn").textContent =
            "Restart Quiz";

        document.querySelector(".quiz-box .main-btn").onclick =
            restartQuiz;

        return;
    }


    loadQuestion();
}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    selected = false;

    document.querySelector(".quiz-box .main-btn").textContent =
        "Next →";

    document.querySelector(".quiz-box .main-btn").onclick =
        nextQuestion;

    loadQuestion();
}


// Start quiz
loadQuestion();
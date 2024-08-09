

function checkAnswer1() {
    var answer = document.getElementById('answer1').value.toLowerCase();
    let correct_answer = 'london'
    if (answer == correct_answer) { // Correct answer for the first question
        alert("Well, bloody done! You've sorted the first one - 4 more to go!")
        document.getElementById('question1').classList.remove('visible');
        document.getElementById('question2').classList.add('visible');

    } else {
        alert("Don’t have me believing you’re a Hersheys operative! Fancy a bit of fish and chips, perhaps?");
    }
}

function checkAnswer2() {
    var answer = document.getElementById('question2_choices').value;
    let correct_answer = 'answer3'
    if (answer == correct_answer) { // Correct answer for the second question
        alert('Correct! Questionnaire completed.');
        document.getElementById('question2').classList.remove('visible');
        document.getElementById('question3').classList.add('visible');
    } else {
        alert('Wrong answer. Try again.');
    }
}

function checkAnswer3() {
    var answer = document.getElementById('answer3').value.toLowerCase();
    let correct_answer = 'kroger'
    if (answer == correct_answer) { // Correct answer for the second question
        alert('Correct! Questionnaire completed.');
        document.getElementById('question3').classList.remove('visible');
        document.getElementById('question4').classList.add('visible');
        setTimeout(function () {
            document.getElementById('alan_taco').style.display = 'block';
        }, 5000);


    } else {
        alert('Wrong answer. Try again.');
    }
}

function checkAnswer4() {
    var answer = document.getElementById('answer4').value.toLowerCase();
    let correct_answer = 'alan'
    if (answer == correct_answer) { // Correct answer for the second question
        alert('Correct! Questionnaire completed.');
    } else {
        alert('Wrong answer. Try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('question1').classList.add('visible');
});


function checkAnswer1() {
    var answer = document.getElementById('answer1').value.toLowerCase();
    if (answer == 'london') { // Correct answer for the first question
        alert("Well, bloody done! You've sorted the first one - two more to go!")
        document.getElementById('question1').classList.remove('visible');
        document.getElementById('question2').classList.add('visible');

    } else {
        alert("Don’t have me believing you’re a Hersheys operative! Fancy a bit of fish and chips, perhaps?");
    }
}

function checkAnswer2() {
    var answer = document.getElementById('question2_choices').value;
    console.log(answer)
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
    var answer = document.getElementById('question2_choices').value;
    console.log(answer)
    let correct_answer = 'answer3'
    if (answer == correct_answer) { // Correct answer for the second question
        alert('Correct! Questionnaire completed.');
    } else {
        alert('Wrong answer. Try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('question1').classList.add('visible');
});
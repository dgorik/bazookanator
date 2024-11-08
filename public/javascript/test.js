function checkAnswer1() {
    var answer = document.getElementById('answer1').value.toLowerCase();
    var requestType = "question1"
    fetch('/quizCheck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputData: answer, requestType: requestType }),
    }).then(response => response.json())
        .then(data => {
            if (data) {
                alert("Well, bloody done! You've sorted the first one - 4 more to go!")
                document.getElementById('question1').classList.remove('visible');
                document.getElementById('question2').classList.add('visible');
            }
            else {
                alert("Don’t have me believing you’re a Hersheys operative! Fancy a bit of fish and chips, perhaps?");
            }
        })
}

function checkAnswer2() {
    var answer = document.getElementById('question2_choices').value;
    var requestType = "question2"
    fetch('/quizCheck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputData: answer, requestType: requestType }),
    }).then(response => response.json())
        .then(data => {
            if (data) {
                alert("Top marks, old bean! Just three more and you're done!")
                document.getElementById('question2').classList.remove('visible');
                document.getElementById('question3').classList.add('visible');
            }
            else {
                alert('Wrong answer. Try again.');
            }
        })

}

function checkAnswer3() {
    var answer = document.getElementById('answer3').value.toLowerCase();
    var requestType = "question3"
    if (answer == correct_answer) { // Correct answer for the second question
        alert("Splendid! Only two to go, keep your pecker up!");
        document.getElementById('question3').classList.remove('visible');
        document.getElementById('question4').classList.add('visible');
        setTimeout(function () {
            document.getElementById('alan_taco').style.display = 'block';
        }, 4000);


    } else {
        alert('Wrong answer. Try again.');
    }
}

function checkAnswer4() {
    var answer = document.getElementById('answer4').value.toLowerCase();
    var requestType = "question4"
    if (answer == correct_answer) { // Correct answer for the second question
        alert("Blimey! Just one to go and it's tea time!");
        document.getElementById('question4').classList.remove('visible');
        document.getElementById('question5').classList.add('visible');
        setTimeout(function () {
            document.getElementById('harry_lick').style.display = 'block';
        }, 4000);
    } else {
        alert('Wrong answer. Try again.');
    }
}

function checkAnswer5() {
    var answer = document.getElementById('answer5').value.toLowerCase();
    var requestType = "question5"
    if (answer == correct_answer) { // Correct answer for the second question
        alert("Jolly good! All questions done and dusted! Get ready to be redirected")
        setTimeout(function () {
            window.location.href = '/signup';
        }, 3000);
    } else {
        alert('Wrong answer. Try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('question1').classList.add('visible');
});
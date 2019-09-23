var card = $('#quiz-area');

var questions = [
  {
    question:
      'In which of these years did the Yankees win five World Series in a row?',
    answers: ['1925-1929', '1959-1963', '1936-1940', '1949-1953'],
    correctAnswer: '1949-1953'
  },
  {
    question:
      'On January 3, 1920, the Yankees purchased the contract of Babe Ruth from what MLB team?',
    answers: [
      'New York Giants',
      'Boston Red Sox',
      'Philidelphia Athletics',
      'Detroit Tigers'
    ],
    correctAnswer: 'Boston Red Sox'
  },
  {
    question: 'Which of the following players was NOT a Yankees Captain?',
    answers: [
      'Derek Jeter',
      'Willie Randolph',
      'Don Mattingly',
      'Joe DiMaggio'
    ],
    correctAnswer: 'Joe DiMaggio'
  },
  {
    question: 'Which of the following Yankees played in the most World Series?',
    answers: ['Babe Ruth', 'Bill Dickey', 'Don Mattingly', 'Yogi Berra'],
    correctAnswer: 'Yogi Berra'
  },
  {
    question: 'What Yankee pitcher threw a perfect game in 1999?',
    answers: [
      'Roger Clemens',
      'David Cone',
      'Andy Pettitte',
      'Orlando Hernandez'
    ],
    correctAnswer: 'David Cone'
  },
  {
    question: 'Who hit the first home run at the current Yankee Stadium?',
    answers: [
      'Alex Rodriguez',
      'Derek Jeter',
      'Jorge Posada',
      'Hideki Mastsui'
    ],
    correctAnswer: 'Jorge Posada'
  },
  {
    question: 'Who was the longest tenured Yankee captain?',
    answers: ['Derek Jeter', 'Lou Gehrig', 'Don Mattingly', 'Babe Ruth'],
    correctAnswer: 'Derek Jeter'
  },
  {
    question:
      'Whose errant throw did Jeter save on the Flip Play in the 2001 division series?',
    answers: [
      'David Justice',
      'Shane Spencer',
      'Gerald Williams',
      'Paul ONeill'
    ],
    correctAnswer: 'Shane Spencer'
  }
];

var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $('#counter-number').html(game.counter);
    if (game.counter === 0) {
      console.log('TIME UP');
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $('#sub-wrapper').prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $('#start').remove();

    for (var i = 0; i < questions.length; i++) {
      card.append('<h2>' + questions[i].question + '</h2>');
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append(
          "<div class='form-check'><input class='form-check-input position-static' type='radio' name='question-" +
            i +
            "' value='" +
            questions[i].answers[j] +
            "''>" +
            questions[i].answers[j]
        );
      }
    }

    card.append(
      "<button type='button' class='btn btn-primary' id='done'>Done</button>"
    );
  },

  done: function() {
    var inputs = card.children('input:checked');
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $('#sub-wrapper h2').remove();

    card.html('<h2>All Done!</h2>');
    card.append('<h3>Correct Answers: ' + this.correct + '</h3>');
    card.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
  }
};

$(document).on('click', '#start', function() {
  game.start();
});

$(document).on('click', '#done', function() {
  game.done();
});

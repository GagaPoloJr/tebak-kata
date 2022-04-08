let hostname = window.location.hostname;

if (hostname === "127.0.0.1") {
  hostname = "/tebak.html";
} else {
  hostname = "/tebak.html";
}

const startGame = $("#start_game");
const countdown = $("#countdown");

const displayWord = $("#current_word");

const next = $("#next");
const correct = $("#correct");
let keepRunning = true;
var words = ["haikal", "nisa", "PWD", "ayam bakar", "timun mas", "legenda", "apa lagi ya"];
const wordsContainer = [];

const setElementHeight = function () {
  const height = $(window).height();
  $(".main__content").css("min-height", height);
};

const soundCorrect = function () {
  let correctSound = new Audio();
  correctSound.src = "../assets/correct.mp3";
  correctSound.play();
};

const readOutLoud = function (message) {
  var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
  speech.text = message;
  speech.volume = 1;
  speech.rate = 2;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
};

const reset = function () {
  window.location.reload();
};

let max = 20;
var timeVar = "";
var starter = 0;

const doCount = function () {
  const ticker = new Audio();
  ticker.src = "../assets/click.mp3";
  if (max != starter) {
    countdown.text(max.toString());
    ticker.play();
    if (max <= 10) {
      readOutLoud(max);
    }
    max--;
  } else {
    ticker.pause();
    $("#your_high").show();
    $(".content__word").hide();
  }
};

function timer() {
  if(window.keepRunning){
    timeVar = setInterval(doCount, 1000);
    return timeVar;
  }
  
}

// remove item when it shows to website
const removeItemOnce = function (arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const getRandomWords = function (array, current) {
  let randomWord = array[Math.floor(Math.random() * array.length)];
  displayWord.html(randomWord);
  tempData = displayWord.html(randomWord);
  tempData = tempData[0].innerHTML;

  current = removeItemOnce(array, tempData);

  if (current.length === 0) {
    window.keepRunning = false;
    displayWord.html("habis ges");
  }

  return current;
};

$(":button").on("click", function () {
  if (this.id == "next") {
    correct.show();
    getRandomWords(words, wordsContainer);
  } else if (this.id == "correct") {
    var score = parseInt(document.getElementById("score").innerHTML);
    score++;
    document.getElementById("score").innerHTML = score;
    soundCorrect();
    correct.hide();
  } else if (this.id == "reset") {
    reset();
  }
});

startGame.on("click", function () {
  window.location.href = hostname;
});

$(window).on("load", function () {
  timer();
  getRandomWords(words, wordsContainer);
});

$(window)
  .on("resize", function () {
    setElementHeight();
  })
  .resize();

let der;

function setup() {
  noCanvas();
  console.log("in standby mode, click mouse to start system!");
}

function mousePressed(){
  speechSetup();
}

function speechSetup(){
  let speech = new p5.Speech();
  let speechRec = new p5.SpeechRec('en-US', gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);

  let bot = new RiveScript();

  bot.loadFile("brain.rive").then(brainReady).catch(brainError);

  function brainReady() {
    console.log('Chatbot ready!');
    bot.sortReplies();
  }
  function brainError() {
    console.log('Chatbot error!')
  }
  //let button = select('#submit');
  let user_input = select('#user_input');
  let output = select('#output');

  //button.mousePressed(chat);

  function gotSpeech() {
    if (speechRec.resultValue) {
      let input = speechRec.resultString;
      console.log(input);
      //user_input.value(input);
      bot.reply("local-user", input).then(function(reply) {
        speech.speak(reply);
        // output.html(reply);
        console.log(reply);

      });
    }
  }


  //function chat() {
  //let input = user_input.value();

  //}
}

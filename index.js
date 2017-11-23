"use strict";

var Alexa = require("alexa-sdk");

var handlers = {
  'LaunchRequest': function() {
    this.response.speak("Welcome to the binary encoder. Ask me to convert a word to binary.").listen("Please ask me to convert a word.");
    this.emit(':responseReady');
  },

  'EncodeIntent': function () {
    var word = this.event.request.intent.slots.word.value;
    var binary = "";
    for (var i = 0; i < word.length; i++) {
        var characterBinary = word[i].charCodeAt(0).toString(2);
        characterBinary = ((8 - characterBinary.length) * "0") + characterBinary;
        binary += characterBinary + "...";
    }
    this.response.speak(word + " converted to binary is ..." + binary);
    this.emit(':responseReady');
  },
  
  'AMAZON.HelpIntent': function() {
    this.response.speak("You can ask me to convert a word to binary by saying convert followed by your word.").listen("Please ask me to convert a word.");
    this.emit(':responseReady');  
  },
  
  'AMAZON.StopIntent': function() {
    this.response.speak("Goodbye");
    this.emit('reponseReady');
  }
}

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
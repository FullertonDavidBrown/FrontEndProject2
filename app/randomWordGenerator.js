(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RandomWordGenerator(key) {
    if (!key) {
      throw new Error("No Wordnik API key supplied.");
    }

    this.apiKey = url;
	this.baseUrl = "https://api.wordnik.com/v4/words.json/randomWord?";
	this.urlEnd = "&maxCorpusCount=-1&minDictionaryCount=0&maxDictionaryCount=-1&minLength=1&maxLength=-1&api_key=";
  }

  RandomWordGenerator.prototype.randomWord = function (part, cb) {
	url = this.baseUrl + "&includePartOfSpeech=" + part + this.urlEnd + this.apiKey;
    $.get(url, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  App.RandomWordGenerator = RandomWordGenerator;
  window.App = App;

})(window);
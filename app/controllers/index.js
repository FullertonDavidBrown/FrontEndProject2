import Controller from '@ember/controller';
import Wordnik from 'npm:wordnik';

var projects = {
  share: [
    'photos', 'links', 'gifs', 'reviews', 'stories', 'questions', 'tweets',
    'contacts', 'favorites', 'decisions', 'poems', 'location',
  ],
  of: ['food', 'family', 'pets', 'celebrities', 'books', 'music', 'movies',
    'other people', 'yourself', 'travel', 'jokes', 'businesses', 'aliens'
  ],
  with: ['classmates', 'professors', 'friends', 'strangers', 'potential mates',
    'communities of interest', 'editors', 'the public', 'pet owners',
    'myself', 'your significant other', 'parents', 'family', 'politicians',
    'government', 'co-workers', 'frenemies', 'stores', 'your mechanic',
    'your doctor', 'your lawyer', 'your banker',
  ],
  by: ['commenting', 'voting', 'upvoting or downvoting', 'liking', 'buying',
    'editing', 'bargaining', 'contacting', 'viewing', 'rating',
    'sharing on social media', 'organizing', 'publicizing', 'publishing',
    'retracting', 'polling', 'reviewing', 'defacing', 'forwarding'
  ],
  reason: ['fame', 'money', 'snark', 'mockery', 'karma points', 'attention',
    'enjoy', 'laugh', 'motivate', 'vent', 'promote', 'create community',
    'influence perception', 'develop brand', 'express anger',
    'be creative', 'blind following', 'self-involvement', 'coordinate',
    'alleviate boredom', 'create knowledge', 'share expertise',
  ]
};

export default Controller.extend({

  actions: {
    generateProject() {
      var wn = new Wordnik({
          api_key: 'a659446027b16f24960073f46c1c4e9c4333f7c699a757cb3'
      });

      var rShare; var rOf; var rWith; var rBy; var rReason;

      wn.randomWord({
        useCanonical: true,
        includeSuggestions: true,
        hasDictionaryDef: true,
        includePartOfSpeech: 'noun'
      }, function(error, word, headers, statusCode) {
        rShare = word.word;
        console.log(rShare);

        wn.randomWord({
          useCanonical: true,
          includeSuggestions: true,
          hasDictionaryDef: true,
          includePartOfSpeech: 'noun'
        }, function(error, word, headers, statusCode) {
          rOf = word.word;
          console.log(rOf);

          wn.randomWord({
            useCanonical: true,
            includeSuggestions: true,
            hasDictionaryDef: true,
            includePartOfSpeech: 'noun'
          }, function(error, word, headers, statusCode) {
            rWith = word.word;
            console.log(rWith);

            wn.randomWord({useCanonical: true,
              includeSuggestions: true,
              hasDictionaryDef: true,
              includePartOfSpeech: 'verb'
            }, function(error, word, headers, statusCode) {
              rBy = word.word;
              console.log(rBy);

              wn.randomWord({
                useCanonical: true,
                includeSuggestions: true,
                hasDictionaryDef: true,
                includePartOfSpeech: 'noun'
              }, function(error, word, headers, statusCode) {
                rReason = word.word;
                console.log(rReason);
                console.log(''+rShare+' '+rOf+' '+rWith+' '+rBy+' '+rReason+'');

                var newProject = this.store.createRecord('project', {
                  share: rShare,
                  of: rOf,
                  with: rWith,
                  by: rBy,
                  reason: rReason,
                  popularity: 1
                });

                newProject.save();
              }.bind(this));
            }.bind(this));
          }.bind(this));
        }.bind(this));
      }.bind(this));

    }
  }
});

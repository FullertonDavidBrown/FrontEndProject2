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

      // Random word example. Change include part of speech to change what type of words are returned.
      wn.randomWord({
          useCanonical: true,
          includeSuggestions: true,
          hasDictionaryDef: true,
          includePartOfSpeech: 'verb'
      }, function(error, word, headers, statusCode) {
        // On success, error will be null.
        // On error, word will be null.
        console.log('randomword fn');
        console.log(error, word, headers, statusCode);
        console.log(word);
      });

      var rShare = projects.share[Math.floor(Math.random() * projects.share.length)];
      console.log('Share:');
      console.log(rShare);

      var rOf = projects.of[Math.floor(Math.random() * projects.of.length)];
      console.log('Of:');
      console.log( rOf );

      var rWith = projects.with[Math.floor(Math.random() * projects.with.length)];
      console.log('With:');
      console.log(rWith);

      var rBy = projects.by[Math.floor(Math.random() * projects.by.length)];
      console.log('By:');
      console.log(rBy);

      var rReason = projects.reason[Math.floor(Math.random() * projects.reason.length)];
      console.log('Reason:');
      console.log(rReason);

      var newProject = this.store.createRecord('project', {
        share: rShare,
        of: rOf,
        with: rWith,
        by: rBy,
        reason: rReason,
        popularity: 1
      });
      newProject.save();

    }
  }
});

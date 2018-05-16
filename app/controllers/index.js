import Controller from '@ember/controller';
import Wordnik from 'npm:wordnik';

// Keepign these here for now. We may utilzie them later.
//var projects = {
//  share: [
//    'photos', 'links', 'gifs', 'reviews', 'stories', 'questions', 'tweets',
//    'contacts', 'favorites', 'decisions', 'poems', 'location',
//  ],
//  of: ['food', 'family', 'pets', 'celebrities', 'books', 'music', 'movies', 'other people', 'yourself', 'travel', 'jokes', 'businesses', 'aliens' ],
//  with: ['classmates', 'professors', 'friends', 'strangers', 'potential mates',
//    'communities of interest', 'editors', 'the public', 'pet owners',
//    'myself', 'your significant other', 'parents', 'family', 'politicians',
//    'government', 'co-workers', 'frenemies', 'stores', 'your mechanic',
//    'your doctor', 'your lawyer', 'your banker',
//  ],
//  by: ['commenting', 'voting', 'upvoting or downvoting', 'liking', 'buying',
//    'editing', 'bargaining', 'contacting', 'viewing', 'rating',
//    'sharing on social media', 'organizing', 'publicizing', 'publishing',
//    'retracting', 'polling', 'reviewing', 'defacing', 'forwarding'
//  ],
//  reason: ['fame', 'money', 'snark', 'mockery', 'karma points', 'attention',
//    'enjoy', 'laugh', 'motivate', 'vent', 'promote', 'create community',
//    'influence perception', 'develop brand', 'express anger',
//    'be creative', 'blind following', 'self-involvement', 'coordinate',
//    'alleviate boredom', 'create knowledge', 'share expertise',
//  ]
//};
//
export default Controller.extend({
  isShowingModal: false,
  isDisabled: false,
  result_id: "",
  actions: {
    closeModal: function(){this.toggleProperty('isShowingModal');},
    toggleDisable: function() { this.toggleProperty('isDisabled'); console.log("disable")},
    generateProject() {
      var wn = new Wordnik({
          api_key: 'a659446027b16f24960073f46c1c4e9c4333f7c699a757cb3'
      });

      // how many projects to generated. Can change this to a form input value or something.
      var n_projects = 10

      // Create new result object.
      var newResult = this.store.createRecord('result');
      newResult.set('timestamp', new Date());
      newResult.save();

      // Update word list to change what words are generated. word 1 is noun, word 2 is noun, etc.
      var word_type_list = ['noun', 'noun', 'noun', 'verb', 'noun'];

      // Keep a list of promises. Each promise will be generating a project
      var promises = [];

      // Generate n number of projects
      for (var i = 0; i < n_projects; i++) {
        promises.push(new Promise(function(resolve, reject){

          // Time to get edgey, keep a list of our inner promises - Each promise generates a single word.
          var inner_promises = [];
          for (var j = 0; j < 5; j++) {
            inner_promises.push(
              new Promise(function(resolve, reject){

                // Get a random word from wordnik
                wn.randomWord(
                  {
                    // We can probably enhance these query parameters to get better results
                    useCanonical: true,
                    includeSuggestions: true,
                    hasDictionaryDef: true,
                    maxDictionaryCount: 1,
                    excludePartOfSpeech: 'adjective',
                    includePartOfSpeech: word_type_list[j]
                  },
                  function(error, word, headers, statusCode) {
                    // Fullfil our promise. Reject if error, or resolve promise.
                    if(error) {
                      reject(error)
                    } else {
                      resolve(word.word);
                    }
                  })
                })
            );
          }

          // Wait for all our inner promises to complete.
          Promise.all(inner_promises).then(function(values) {
            // all success - values is a list of resolved promise return values from inner promises
            console.log("in all promise: No errors!");
            console.log(values);

            // Create new project
            var newProject = this.store.createRecord('project', {
              results: newResult,
              share: values[0],
              of: values[1],
              with: values[2],
              by: values[3],
              reason: values[4],
              popularity: 1
            });

            // Save it and associate it with the result
            newProject.save().then(function(){newResult.save();});

            // Result object  has a list of projects. Add this project to it
            newResult.get('projects').addObject(newProject);
            newResult.save();
            console.log("SAVED A PROJECT!!!!\n\n");
                  // alert with generated project

            // Resolve this project promise.
            resolve(newProject);

          }.bind(this), function(error) {

            // inner_promises had an error. Reject this project promise with reason.
            reject(error);

          }.bind(this));  // end promise.all(inner_promises)
        }.bind(this)));
      }

      // Promise all for all 10 project promises
      Promise.all(promises).then(function(values) {
        // All promises have completed.
        // The projects have been saved
        // the result has been saved
        //
        // ----Alternatively:
        //  We can generate all the projects, return them here (we already do this, they're in values),
        //  and then create the result object to attach them to. Then save the projects and the result all at once.

        console.log('All promises done');
        console.log('the value printed below should be a list of project objects. They all have been saved.');
        console.log(values);
        console.log(newResult.get('id'));
        this.set('result_id', newResult.get('id'));
        console.log(this.get('result_id'));
        this.transitionToRoute('result', newResult);
        this.toggleProperty('isDisabled');
      }.bind(this), function(err) {
        // error occurred, at least one project creation failed.
        // we can chose to either keep the result with missing projects or throw it out all together.
        console.log('eerrrrrors!\n\n\n');
        console.log(err);
      });
    }//END-OF:: generateProject
  }
});

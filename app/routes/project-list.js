import Route from '@ember/routing/route';

export default Route.extend({
  model() {
      return ["Random Idea Generator", "Cubic Schemes", "Backwards compatible everything", "Number 4", "anime club"]
  }
});

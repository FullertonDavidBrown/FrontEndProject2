import DS from 'ember-data';

export default DS.Model.extend({
  keyword: DS.attr('string'),
  type: DS.attr('string')
});

import DS from 'ember-data';

export default DS.Model.extend({
  projects: DS.hasMany('project', {async: true, inverse: null}),
  timestamp: DS.attr('date', {defaultValue: Date()})
});

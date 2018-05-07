import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  share: DS.attr('string'),
  of: DS.attr('string'),
  with: DS.attr('string'),
  by: DS.attr('string'),
  reason: DS.attr('string'),
  popularity: DS.attr('number')
  completeName: computed('share', 'of', 'with', 'by', 'reason', function() {
    return `${this.get('share')} ${this.get('of')} ${this.get('with')} ${this.get('by')} ${this.get('reason')}`;
  })
});

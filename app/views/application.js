/**
 * Created by dimitri on 19.05.15.
 */
import Ember from 'ember';

export default Ember.View.extend(Ember.ViewTargetActionSupport, {
  tagName: 'core-header-panel',
  attributeBindings: ['flex'],
  flex: true,

  keyUp: function() {
    console.log('button pressed');
    this.triggerAction({action: 'incResult'});
  }
});

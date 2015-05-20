/**
 * Created by dimitri on 19.05.15.
 */
import Ember from 'ember';

export default Ember.View.extend(Ember.ViewTargetActionSupport, {
  tagName: 'core-header-panel',
  attributeBindings: ['flex'],
  flex: true,

  didInsertElement: function() {
    console.log(this);
    console.log(this.$.resetInk);
    console.log(this.$().resetInk);

    this.updateResultInk();
  },

  keyUp: function() {
    console.log('button pressed');
    this.triggerAction({action: 'incResult'});
  },

  updateResultInk: function() {
    var rect = this.$()[0].getBoundingClientRect();
    var keyRect = document.getElementById('=').getBoundingClientRect();
    var s  = document.querySelector('#resultInk').style;
    var t = keyRect.top - rect.top + keyRect.height / 2;
    s.top = -t + 'px';
    s.left = -t * 2 + (keyRect.left - rect.left + keyRect.width / 2) + 'px';
    s.width = s.height = 4 * t + 'px';
  }
});

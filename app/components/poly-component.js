/**
 * Created by Dmytro Mospanenko on 4/10/15.
 */
import Ember from 'ember';

export default Ember.Component.extend({
  onEventBindings: '',
  publishedPropertyBindings: '',
  attributeProperties: '',
  eventListeners: [],
  _elementBind: null,

  onAttributePropertyBindingsUpdate: function() {
    //console.log(this.get('attributeProperties'));
    this.set('attributeBindings', this.get('attributeProperties').split(' '));
  }.observes('attributeProperties').on('init'),

  createEventListener: function(polymerEventName) {
    var self = this;

    console.log('createEventListener: ' + polymerEventName);

    return function() {
      var args = [polymerEventName, self].concat(Array.prototype.slice.call(arguments));

      self.sendAction.apply(self, args);
    };
  },

  setupEventListener: function(polymerEventName, actionName) {
    var element   = this.$()[0];
    console.log('setupEventListener: ' + polymerEventName + ' ' + actionName);
    if (element) {
      var eventListeners   = this.get('eventListeners'),
        newEventListener = this.createEventListener(polymerEventName);

      console.log('polymerEventName: ' + polymerEventName);

      this.set(polymerEventName, actionName);
      element.addEventListener(polymerEventName, newEventListener);
      eventListeners.addObject({
        name: polymerEventName + ':' + actionName,
        listener: newEventListener
      });
    }
  },

  addEventListener: function(nameTarget) {
    var split  = nameTarget.split(':'),
      name   = split[0],
      target = split[1];
    console.log('addEventListener: ' + nameTarget + '('+ name + ", "+ target + ')');
    this.setupEventListener(name, target);
  },

  setEventListeners: function() {
    if(this.get('onEventBindings').length > 0) {
      var events = this.get('onEventBindings').split(' '),
        self = this;
      //console.log('setEventListeners');
      events.forEach(function (event) {
        console.log('setEventListeners: ' + event);
        self.addEventListener(event);
      });
    }
  },

  setPublishedPropertyBindings: function() {
    var propertyBindings = this.get('publishedPropertyBindings').split(' '),
      element          = this.$()[0],
      self             = this;

    if (element && propertyBindings) {
      propertyBindings.forEach(function(propertyBinding) {
        var split             = propertyBinding.split(':'),
          componentProperty = split[0],
          publishedProperty = split[1];

        element[publishedProperty] = self.get(componentProperty);
      });
    }
  },

  didInsertElement: function() {
    this.setPublishedPropertyBindings();
    this.setEventListeners();
  }
});

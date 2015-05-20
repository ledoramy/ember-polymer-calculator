/**
 * Created by dimitri on 19.05.15.
 */
import Ember from 'ember';

export default Ember.Controller.extend({

  outputExpression: '',
  outputResult: '',
  outputError: '',

  standardKeys: [
    ['7', '4', '1', '.'],
    ['8', '5', '2', '0'],
    ['9', '6', '3', '='],
    ['DEL', '+', '-', '\u00F7', '\u00D7', 'C'],
  ],

  errorMsgs: ['error...', 'umm...', ':-('],

  init: function() {
    console.log();
  },

  actions: {
    buttonTapped: function(eventedComponent) {
      console.log('handle action button tapped');

      var inkElement = document.querySelector('#resultInk');

      if(this.get('outputResult').length !== 0 || this.get('outputError').length !== 0) {
        console.log('reset');
        this.resetAll();
        inkElement.className = '';
      }

      var expression = this.get('outputExpression');
      switch(eventedComponent.get('label')) {
        case 'C':
              this.resetAll();
              inkElement.className = '';
              break;
        case 'DEL':
              console.log('DEL');
              expression = expression.slice(0, -1);
              if(expression.length === 0) {
                this.resetAll();
              }
              this.set('outputExpression', expression);
              break;
        case '=':
          expression = expression.replace(/\u00D7/g, '*').replace(/\u00F7/g, '/');
          var result;
          try {
            result = eval(expression);
            this.set('outputResult', result);
          } catch (x) {
            result = '?';
          }

          if(result === '?') {
            var error = this.errorMsgs[Math.floor(Math.random() * this.errorMsgs.length)];
            this.resetAll();
            this.set('outputError', error);
          }


          if(this.outputResult) {
            inkElement.classList.add('spill');
          }

          if(this.outputError){
            inkElement.classList.add('spill');
            inkElement.classList.add('error');
          }
          break;
        default :
              expression += eventedComponent.get('label');
              this.set('outputExpression', expression);
      }
    }
  },

  resetAll: function() {
    this.set('outputExpression', '');
    this.set('outputResult', '');
    this.set('outputError', '');
  }
});

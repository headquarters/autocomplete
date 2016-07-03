module.exports = function () {
  this.Given(/^I am on the site$/, function (callback) {
    this.visit('http://127.0.0.1:8080/', callback);
  });

  this.When(/^I visit the landing page$/, function (callback) {
    callback(null);
  });

  this.Then(/^I should see the "([^"]*)" text box$/, function (label, callback) {
    this.browser.assert.elements('.comment-label', 1);
    this.browser.assert.text('.comment-label', label);
    callback();
  });

  this.Given(/^I am on the landing page$/, function (callback) {
    this.visit('http://127.0.0.1:8080/', callback);
  });  

  this.When(/^I type at least two characters into the comment box$/, function (callback) {
    var event = this.browser.window.document.createEvent('HTMLEvents');
    var target = this.browser.window.document.querySelector('.comment-textarea');
    
    this.browser.fill('.comment-textarea', 'Pa'); // does not fire 'keyUp' event
    this.browser.assert.hasFocus('.comment-textarea');
    
    dispatchKeyUp(80, target); // 'P'
    dispatchKeyUp(65, target); // 'a'

    function dispatchKeyUp (char, target) {
      event.initEvent('keyup', true, true);
      event.which = char;
      target && target.dispatchEvent(event);
    }    

    callback();
  });  

  this.Then(/^I should see a list of suggested user's names that match$/, function (callback) {
    this.browser.assert.elements('.autocomplete-names', 1);
    callback();
  });

  this.Then(/^the list should not be more than (\d+) in length$/, function (length, callback) {
    this.browser.assert.elements('.autocomplete-names--name', { atMost: length });
    callback();
  });           
}

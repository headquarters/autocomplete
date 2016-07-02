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
}

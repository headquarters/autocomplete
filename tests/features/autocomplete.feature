Feature: Autocomplete
  As a commenter
  I want to easily link to other users' names
  So that I can converse with them

  Scenario: Autocomplete form
    Given I am on the site
    When I visit the landing page
    Then I should see the "Comment" text box
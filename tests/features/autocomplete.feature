Feature: Autocomplete
  As a commenter
  I want to easily link to other users' names
  So that I can converse with them

  Scenario: Comment form exists
    Given I am on the site
    When I visit the landing page
    Then I should see the "Comment" text box

  Scenario: Comment form suggests user's names
    Given I am on the landing page
    When I type at least two characters into the comment box
    Then I should see a list of suggested user's names that match
    And the list should not be more than 5 in length
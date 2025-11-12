Feature: Login Functionality

  As a user of the SauceDemo site
  I want to log in with valid and invalid credentials
  So that I can verify login behavior for each user type

  @happy_path
  Scenario: Successful login with standard_user
    Given I open the SauceDemo login page
    When I login with "standard_user" and "secret_sauce"
    Then I should be redirected to the products page

  @negative
  Scenario: Locked out user should not login
    Given I open the SauceDemo login page
    When I login with "locked_out_user" and "secret_sauce"
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."

  @heuristic
  Scenario: Problem user login with potential UI inconsistencies
    Given I open the SauceDemo login page
    When I login with "problem_user" and "secret_sauce"
    Then I should be redirected to the products page
    And I should detect potential UI inconsistencies heuristically
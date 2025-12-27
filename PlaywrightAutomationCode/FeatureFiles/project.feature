
Feature: To verify the OrangeHRM End-To-End Testing

Background: The home page should open before all scenarios
Given I launch The OrangeHRM page

@methods
Scenario: I verify the log in Credintials of OrangeHRM
Then I Valid date the web elements in log in Page
And I give input data to input fields

@methods
Scenario: I verify the forgot password in Credintials of OrangeHRM

Then I Valid date the web elements in forgot pasword Page

@method
Scenario: I verify the Home Page fileds of OrangeHRM

Then I valid the home page admin option
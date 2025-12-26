import {Then, Given} from '@cucumber/cucumber'
import { LoginPage } from '../Pages/LoginPage'
import { pageFixture } from '../Hooks/page'
import {loginCredentials } from "../Files/TestData.json"
import { setDefaultTimeout } from '@cucumber/cucumber'

// setDefaultTimeout(4 * 1000)

let logInPage : LoginPage

Given("I Valid date the web elements in log in Page", async function(){
    
        logInPage = new LoginPage(pageFixture.page)
        await logInPage.navigatedToTheLoginPage()
        // logInPage.toValidateWebElementsWithAssertions()
})
Then("I give input data to input fields", async function(){
            logInPage = new LoginPage(pageFixture.page)
            await logInPage.userNameInput(loginCredentials.userName)
            await logInPage.userPasswordInput(loginCredentials.password)
            await logInPage.clickLoginButton()
            
})


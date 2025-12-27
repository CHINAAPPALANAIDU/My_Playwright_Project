import {Then, Given} from '@cucumber/cucumber'
import { LoginPage } from '../Pages/LoginPage'
import { pageFixture } from '../Hooks/page'
import {loginCredentials } from "../Files/TestData.json"
import { setDefaultTimeout } from '@cucumber/cucumber'
import { ForgotPassword } from '../Pages/ForgotPassword'


let logInPage : LoginPage

let forgotPassword : ForgotPassword

Given("I launch The OrangeHRM page", async() =>{

        logInPage = new LoginPage(pageFixture.page)
        await logInPage.navigatedToTheLoginPage()
})

Then("I Valid date the web elements in log in Page", async function(){
    
        // logInPage = new LoginPage(pageFixture.page)
        await logInPage.toValidateWebElementsWithAssertions()
})
Then("I give input data to input fields", async function(){
        //     logInPage = new LoginPage(pageFixture.page)
            await logInPage.userNameInput(loginCredentials.userName)
            await logInPage.userPasswordInput(loginCredentials.password)
            await logInPage.clickLoginButton()
        

})

// forgot Password
Then("I Valid date the web elements in forgot pasword Page", async() =>{

        // logInPage = new LoginPage(pageFixture.page)
        await logInPage.navigatedToTheLoginPage()
        await logInPage.toValidateWebElementsWithAssertions()

        forgotPassword =new ForgotPassword(pageFixture.page)
        
        await forgotPassword.clickForgotPass()
        await forgotPassword.validateForgotWebElements()
        await forgotPassword.enterTheUsername(loginCredentials.reUserName)
        await forgotPassword.cancelTherequest()
        
})

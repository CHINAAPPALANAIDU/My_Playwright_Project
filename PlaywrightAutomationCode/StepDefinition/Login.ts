import {Then, Given} from '@cucumber/cucumber'
import { LoginPage } from '../Pages/LoginPage'
import { pageFixture } from '../Hooks/page'
import {loginCredentials } from "../Files/TestData.json"
import { setDefaultTimeout } from '@cucumber/cucumber'
import { ForgotPassword } from '../Pages/ForgotPassword'
import { HomePage } from '../Pages/HomePage'

setDefaultTimeout(60*1000)

let logInPage : LoginPage
let homePage : HomePage
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


// Home Page
Then("I valid the home page admin option", async () =>{


        await logInPage.navigatedToTheLoginPage()
        await logInPage.toValidateWebElementsWithAssertions()
        await logInPage.userNameInput(loginCredentials.userName)
        await logInPage.userPasswordInput(loginCredentials.password)
        await logInPage.clickLoginButton()

        homePage = new HomePage(pageFixture.page)
        await homePage.clickOnTheAdmin()
        await homePage.validateTheAdminPage()
        await homePage.interUsername(loginCredentials.userName)
        await homePage.selectUserRole()
        await homePage.selectEmpName()
        await homePage.selectStatus()
        await homePage.clickOnEditUser()
        await homePage.changeEmpName()
        
});
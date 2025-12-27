import { Page, expect } from "@playwright/test"
import { pageFixture } from "../Hooks/page"


export class LoginPage{
        
        private readonly page : Page

        constructor(page : Page)
        {
            this.page = page
        }
       private Elements ={
        orangeHrmImageAltText : "company-branding",
        orangeHrmUsenamePlaceholder : "Username",
        orangeHrmPassowordPlaceholder: "Password",
        orangeHrmLoginButtonGetByRole : " Login ",
        orangeHrmForgetGetByText : "//*[text()='Forgot your password? ']",
        orangeHrmHomeSidebar : ".oxd-main-menu-item"
       }
       async navigatedToTheLoginPage()
       {
            await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            await expect(pageFixture.page).toHaveTitle("OrangeHRM")
       }
       async toValidateWebElementsWithAssertions()
       { 
            await expect(await pageFixture.page.getByAltText(this.Elements.orangeHrmImageAltText)).toBeVisible()
            await expect(await pageFixture.page.getByPlaceholder(this.Elements.orangeHrmUsenamePlaceholder)).toBeVisible()
        await expect(await pageFixture.page.getByPlaceholder(this.Elements.orangeHrmPassowordPlaceholder)).toBeEditable()
        await expect(await pageFixture.page.getByRole("button", {name: this.Elements.orangeHrmLoginButtonGetByRole})).toContainText("Login")
        await expect(await pageFixture.page.locator(this.Elements.orangeHrmForgetGetByText)).toBeTruthy()
       }
      async userNameInput(username : string)
      {
            await pageFixture.page.getByPlaceholder(this.Elements.orangeHrmUsenamePlaceholder).fill(username)
      }
      async userPasswordInput( password : string)
      {
            await pageFixture.page.getByPlaceholder(this.Elements.orangeHrmPassowordPlaceholder).fill(password)
      }
      async clickLoginButton()
      {
            await pageFixture.page.getByRole("button", {name: this.Elements.orangeHrmLoginButtonGetByRole}).click()
            // await pageFixture.page.waitForTimeout(3000)
      }
      async clickOnAdmin()
      {
            await pageFixture.page.locator(this.Elements.orangeHrmHomeSidebar).filter({hasText: "Admin"}).click()
      }
}
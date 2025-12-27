import { pageFixture } from "../Hooks/page";
import { expect,Page  } from "@playwright/test";

export class ForgotPassword{
     
        private readonly page : Page
        constructor(page : Page)
        {
                this.page = page
        }

        private Elements = {
            orangeHrmForgetGetByText : "//*[text() = 'Forgot your password? ']",
            orangePageOfText : ".orangehrm-forgot-password-title",
            orangeForgotUserName : "Username",
            orangeForgotCancelButton : "Cancel",
            orangeForgotResetPassword : "Reset Password"
        }
        async validateForgotWebElements(){
            await expect(await pageFixture.page.getByPlaceholder(this.Elements.orangeForgotUserName)).toBeEditable()
            await expect(await pageFixture.page.getByRole("button", {name: this.Elements.orangeForgotCancelButton})).toBeEnabled()
            await expect(await pageFixture.page.getByRole('button', {name: this.Elements.orangeForgotResetPassword})).toBeVisible()
        }
        async clickForgotPass()
        {
            await pageFixture.page.locator(this.Elements.orangeHrmForgetGetByText).click()
        }
        async enterTheUsername(userName: string)
        {
            await pageFixture.page.getByPlaceholder(this.Elements.orangeForgotUserName).fill(userName)
        }
        async cancelTherequest()
        {
            await pageFixture.page.getByRole("button", {name: this.Elements.orangeForgotCancelButton}).click()
        }
        async resetThePassword()
        {
            await pageFixture.page.getByRole("button", {name: this.Elements.orangeForgotResetPassword}).click()
        }
}
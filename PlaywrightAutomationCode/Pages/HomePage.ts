import { Page, expect } from "@playwright/test";
import { pageFixture } from "../Hooks/page";


export class HomePage{

    private readonly page : Page
    constructor(page : Page)
    {
        this.page = page
    }

    private Elements = {

        orangeHrmHomeSidebar : ".oxd-main-menu-item",
        orangeHrmSearchInput : "Search",
        orangeHrmAdminption  : "Admin",
        orageHrmUserName : "Username",
        orangeHrmLabelDetails : ".oxd-label",
        orageHrmSelectOption : "-- Select --",
        orageHrmEmpNamePlaceHolder : "Type for hints...",
        orageHrmSearch : "Search ",
        orangeHrmRecordFound : ".oxd-table-card",
        orangeHrmUserToTrash : "i.bi-trash",
        orangeHrmUserToEdit : "i.oxd-icon.bi-pencil-fill",
        orangeHrmUserToChange : "Peter Mac Anderson",
        orangeHrmSavedetails : " Save ",
        orangeHrmUserInput : ".oxd-input",
        orangeHrmStatus : 'Enabled',
        orangeHrmEmpName : 'Suresh  Patil'
    }
    
    async validateTheAdminPage()
    {
        // await pageFixture.page.waitForURL('**/dashboard/index', {timeout: 3000});
        await expect(await pageFixture.page.locator(this.Elements.orangeHrmHomeSidebar)).toHaveCount(12)
        await expect(await pageFixture.page.getByRole("link", {name: this.Elements.orangeHrmAdminption})).toBeEnabled()
        await expect(await pageFixture.page.locator(this.Elements.orangeHrmLabelDetails)).toHaveCount(4)
        await expect(await pageFixture.page.getByText(this.Elements.orageHrmSelectOption)).toHaveCount(2)
        await expect(await pageFixture.page.getByPlaceholder(this.Elements.orageHrmEmpNamePlaceHolder)).toBeEditable()
        await expect(await pageFixture.page.getByRole("button", {name: this.Elements.orageHrmSearch})).toBeVisible()
        await expect(await pageFixture.page.locator(this.Elements.orangeHrmRecordFound).getByText(this.Elements.orangeHrmAdminption).first()).toBeVisible()
        await expect(await pageFixture.page.locator(this.Elements.orangeHrmRecordFound).filter({hasText : this.Elements.orangeHrmAdminption}).first().getByRole("button").locator(this.Elements.orangeHrmUserToTrash)).toBeVisible()
        await expect(await pageFixture.page.locator(this.Elements.orangeHrmRecordFound).filter({hasText : this.Elements.orangeHrmAdminption}).first().getByRole("button").locator(this.Elements.orangeHrmUserToEdit)).toBeVisible()
    }
    async clickOnTheAdmin()
    {
        // await pageFixture.page.getByPlaceholder(this.Elements.orangeHrmSearchInput).pressSequentially("admin")
        await pageFixture.page.getByRole('link', { name: 'Admin' }).click();
    }
    async interUsername(userName:string)
    {
        await pageFixture.page.locator(this.Elements.orangeHrmUserInput).last().fill(userName)
    }
    async selectUserRole()
    {
        await pageFixture.page.getByText(this.Elements.orageHrmSelectOption).first().click()
        await pageFixture.page.getByRole('option', {name: this.Elements.orangeHrmAdminption}).click()
    }
    async selectEmpName()
    {
        await pageFixture.page.getByPlaceholder(this.Elements.orageHrmEmpNamePlaceHolder).pressSequentially("sh")
        // await pageFixture.page.getByPlaceholder(this.Elements.orageHrmEmpNamePlaceHolder).press('ArrowDown')
        await pageFixture.page.getByRole('option', {name:this.Elements.orangeHrmEmpName}).click()
    }
    async selectStatus()
    {
        await pageFixture.page.getByText(this.Elements.orageHrmSelectOption).last().click()
        await pageFixture.page.getByRole('option', {name:this.Elements.orangeHrmStatus}).click()
    }
    async clickOnEditUser()
    {
        await pageFixture.page.locator(this.Elements.orangeHrmRecordFound).filter({hasText : this.Elements.orangeHrmAdminption}).first().getByRole("button").locator(this.Elements.orangeHrmUserToEdit).click()
        await pageFixture.page.waitForTimeout(2000)
    }
    async changeEmpName()
    {
        await pageFixture.page.getByPlaceholder(this.Elements.orageHrmEmpNamePlaceHolder).fill(this.Elements.orangeHrmUserToChange)
    }
    async saveAdminName()
    {
        await pageFixture.page.getByRole('button', {name: this.Elements.orangeHrmSavedetails}).click()
    }
}
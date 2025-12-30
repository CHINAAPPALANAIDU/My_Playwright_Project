import { Page, expect } from "@playwright/test";
import { pageFixture } from "../Hooks/page";


export class HomePage{

     empNewName! : string;

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
        orageHrmCancel : " Cancel ",
        orangeHrmRecordFound : ".oxd-table-card",
        orangeHrmUserToTrash : "i.bi-trash",
        orangeHrmUserToEdit : "i.oxd-icon.bi-pencil-fill",
        orangeHrmUserToChange : "Peter Mac Anderson",
        orangeHrmSavedetails : " Save ",
        orangeHrmUserInput : ".oxd-input",
        orangeHrmStatus : 'Enabled',
        orangeHrmEmpName : 'Suresh  Patil'
    }
        private JobElements ={
           orangeHrmJobOption : "Job ",
           orangeHrmJobTitle : "Job Titles",
           orangeHrmJobPayGrades : "Pay Grades",
           orangeHrmJobEmpStatus : "Employment Status",
           orangeHrmJobCateg : "Job Categories",
           orangeHrmJobWorkShift : "Work Shifts",
           orangeHrmJobPayRecords : ".oxd-table-card"
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
        const empName = await pageFixture.page.locator(".oxd-userdropdown-name").innerText()
        await pageFixture.page.getByPlaceholder(this.Elements.orageHrmEmpNamePlaceHolder).pressSequentially(empName)
        await pageFixture.page.getByPlaceholder(this.Elements.orageHrmEmpNamePlaceHolder).press('ArrowDown')
        // await pageFixture.page.getByRole('option', {name:this.Elements.orangeHrmEmpName}).click()
        const options = await pageFixture.page.getByRole('option')
        await options.first().click()
    }
    async selectStatus()
    {
        await pageFixture.page.getByText(this.Elements.orageHrmSelectOption).last().click()
        await pageFixture.page.getByRole('option', {name:this.Elements.orangeHrmStatus}).click()
    }
    async searchFilter()
    {
        await pageFixture.page.getByRole('button',{name:" Search "}).click()
    }
    async clickOnEditUser()
    {
        this.empNewName = await pageFixture.page.locator(this.Elements.orangeHrmRecordFound).nth(1).locator(".oxd-table-cell").nth(1).innerText()
        await pageFixture.page.locator(this.Elements.orangeHrmRecordFound).filter({hasText : this.Elements.orangeHrmAdminption}).first().getByRole("button").locator(this.Elements.orangeHrmUserToEdit).click()
        await pageFixture.page.waitForTimeout(2000)
    }
    async changeEmpName()
    {
       
        await pageFixture.page.getByPlaceholder(this.Elements.orageHrmEmpNamePlaceHolder).fill(this.empNewName)
        // await pageFixture.page.getByPlaceholder(this.Elements.orageHrmEmpNamePlaceHolder).press("ArrowDown")
        const noRows = await pageFixture.page.getByText("No Records Found").innerText()
        if(noRows == "No Records Found")
        {
            await pageFixture.page.getByText("No Records Found").click()
        }
        const invalid = await pageFixture.page.getByText("Invalid").innerText()
        if(invalid == "Invalid")
        {
            await pageFixture.page.getByRole("button", {name: this.Elements.orageHrmCancel}).click()
        }
    }
    async saveAdminName()
    {
        await pageFixture.page.getByRole('button', {name: this.Elements.orangeHrmSavedetails}).click()
    }
    async jobDetails()
    {
        await pageFixture.page.getByRole("list").getByText(" Job ").click()
        await pageFixture.page.getByRole("menuitem", {name: this.JobElements.orangeHrmJobPayGrades}).click()
        const noOfRecors = await pageFixture.page.locator(this.JobElements.orangeHrmJobPayRecords).count()
        console.log(noOfRecors)
        await pageFixture.page.getByRole("button", {name: " Add "}).click()
        await pageFixture.page.locator(".oxd-input").last().fill("record last")
        await pageFixture.page.getByRole("button", {name: " Save "}).click()
        await pageFixture.page.getByRole("button", {name: " Add "}).click()
        await pageFixture.page.locator(".oxd-select-text").click()
        const options = await pageFixture.page.getByRole("option")
        await options.getByText("EUR - Euro").click()
        await pageFixture.page.locator(".oxd-input").nth(2).fill("10000")
        await pageFixture.page.locator(".oxd-input").nth(3).fill("15000")
        await pageFixture.page.getByRole("button", {name: " Save "}).last().click()
        await pageFixture.page.getByRole("list").getByText(" Job ").click()
        await pageFixture.page.getByRole("menuitem", {name: this.JobElements.orangeHrmJobPayGrades}).click()
        await pageFixture.page.locator(".oxd-table-row", { hasText: "record last" }).locator("label").click()
        await pageFixture.page.getByRole("button", {name: " Delete Selected "}).click()
        await pageFixture.page.getByRole("button",{ name: " Yes, Delete "}).click()
    }
}   
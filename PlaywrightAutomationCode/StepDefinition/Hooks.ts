import {BeforeAll, Before, After, Status, AfterAll, Then, Given} from '@cucumber/cucumber'
import {Browser, chromium, Page, BrowserContext} from '@playwright/test'
import { pageFixture } from '../Hooks/page'

let browser: Browser, page: Page
let context : BrowserContext
BeforeAll(async () =>{
      
    browser = await chromium.launch({
           headless : false,
           args: ['--start-maximized']
    })
})
Before(async () =>{
      
    context = await browser.newContext({viewport: null})
    page = await context.newPage()
    pageFixture.page = page
})
After(async function({pickle,result}){

     if(result?.status == Status.FAILED)
     {
        const img = await page.screenshot({path:`./test-results/ScreenShotInFaild/${pickle.name}.png`})
        await this.attach(img, 'image/png')
        
        const videoPath = await page.video()?.path()
        if(videoPath){
        await this.attach(videoPath, 'video/webm')
        }
     }
     else if(result?.status == Status.PASSED){
         const img = await page.screenshot({path:`./test-results/ScreenshotInPass/${pickle.name}.png`})
         await this.attach(img, 'image/png')

         const videoPath = await page.video()?.path()
         if(videoPath)
         {
            await this.attach(videoPath, 'video/webm')
         }
     }

})
AfterAll(async () =>{
   await page.close()
   await browser.close()
})	
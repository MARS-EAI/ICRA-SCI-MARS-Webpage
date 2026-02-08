const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport for high-quality output
    await page.setViewport({
        width: 840,
        height: 1400,
        deviceScaleFactor: 2  // 2x for high DPI
    });
    
    // Load the poster HTML
    const posterPath = path.join(__dirname, 'poster.html');
    await page.goto(`file://${posterPath}`, {
        waitUntil: 'networkidle0'
    });
    
    // Wait a bit for fonts to load
    await new Promise(r => setTimeout(r, 1000));
    
    // Get the poster element
    const posterElement = await page.$('.poster');
    
    // Screenshot the poster element
    await posterElement.screenshot({
        path: 'poster.png',
        type: 'png',
        omitBackground: false
    });
    
    console.log('✅ Poster saved as poster.png');
    
    await browser.close();
})();

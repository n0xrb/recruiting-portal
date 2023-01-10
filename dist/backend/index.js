function doGet() {
    return HtmlService.createTemplateFromFile('index.html')
        .evaluate()
        .setTitle('Portal Altas WD.')
        .setFaviconUrl('https://www.pwc.com/etc.clientlibs/pwc/clientlibs/css_common/resources/image/favicon.ico')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function createToken() {
    const token = Utilities.getUuid().split('-')[4].toLocaleUpperCase();
    return token;
}

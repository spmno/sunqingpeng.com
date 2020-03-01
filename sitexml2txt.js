var fs = require('fs');                                                 
var parser = require('fast-xml-parser');

var xmlData = fs.readFileSync('./public/sitemap.xml');
var txtFile = fs.openSync('./public/site.txt', 'w');

var  dataObj = parser.parse(xmlData.toString());

for (urlInfo of dataObj.urlset.url) {
    console.log(urlInfo.loc);
    fs.writeFileSync(txtFile, urlInfo.loc+'\n');
}

fs.closeSync(txtFile);


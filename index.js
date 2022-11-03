const crypto = require('crypto')
const fs = require('fs'); 
const csv = require('csv-parser');
const json2csv = require('json2csv').parse;

var dataArray = [];
var fileName = ''
var filePath = ""
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question(`What is the filename?`, name => {
    fileName = name;
    generateHash(fileName)
    console.log(`Hi ${fileName}!`);
    readline.close();
  });
  

function generateHash(fileName){ fs.createReadStream(`./${fileName}.csv`)
.pipe(csv())
.on('data', function(data){
    try {
        

        
        const JSONfile = 
            {
                "format": "CHIP-0007",
                "name": `${data.Filename}`,
                "description": `${data.Description}`,
                "minting_tool": `${fileName}`,
                "sensitive_content": false,
                "series_number": `${data.SeriesNumber}`,
                "series_total": 40,
                "attributes": [
                    {
                        "type": "gender",
                        "value": `${data.Gender}`
                    },
                ],  
                "collection": {
                    "name": "Zuri NFT Tickets for Free",
                    "id": `${data.UUID}`,
                    "attributes": [
                        {
                            "type": "description",
                            "value": ``
                        },
                       
                    ]
                },
                
            }
            const hash = crypto.createHash('sha256')
            const Hex =  hash.update(JSON.stringify(JSONfile)).digest('hex');
            console.log(Hex)

            data.HASH = Hex;
            dataArray.push(data)
    }
    catch(err) {
        console.log(err)
    }
})
.on('end',function(){
    
    var result = json2csv({ data: dataArray, fields: Object.keys(dataArray[0]) });
    fs.writeFileSync(fileName + '(2)', result)
});  
}

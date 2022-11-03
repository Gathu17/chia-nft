const crypto = require('crypto')
const fs = require('fs'); 
const csv = require('csv-parser');
const json2csv = require('json2csv').parse;

var dataArray = []
fs.createReadStream('./Team Clutch.csv')
.pipe(csv())
.on('data', function(data){
    try {
        console.log("Name is: "+ data.Filename);
        console.log("Age is: "+data.UUID);

        //perform the operation
        const JSONfile = 
            {
                "format": "CHIP-0007",
                "name": `${data.Filename}`,
                "description": `${data.Description}`,
                "minting_tool": "Team Clutch",
                "sensitive_content": false,
                "series_number": `${data.Serial_Number}`,
                "series_total": 40,
                "attributes": [
                    {
                        "type": "gender",
                        "value": `${data.Gender}`
                    },
                ],  
                "collection": {
                    "name": `${data.Filename}`,
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
    //some final operation
    var result = json2csv({ data: dataArray, fields: Object.keys(dataArray[0]) });
    fs.writeFileSync("Team X", result);
});  


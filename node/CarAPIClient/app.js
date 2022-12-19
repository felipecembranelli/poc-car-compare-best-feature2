const carApi = require('./carApi')

function CompareByAvailability(values) {

	let result = true;
	let baseCarValue = values.shift();

	//console.log("basecarvalue:"+ baseCarValue);

	// dummy rule (implement rule to validate the best in this feature)
	if ((baseCarValue=="Not Available") && (values.includes("Standard"))) return false;
	if ((baseCarValue=="Not Available") && (values.includes("Optional"))) return false;
	if ((baseCarValue=="Optional") && (values.includes("Standard"))) return false;
	if ((baseCarValue=="Standard") && (values.includes("Standard"))) return false;

	return result;

}

const asyncApiCall = async () => {
    const response = await carApi.httpGetCars()

    let carSpecs = response.data;

    const bestFeatures = [];

    for (let index = 0; index < 50; index++) {

        const featureValues = [];

        carSpecs.forEach(function(table) {
            var featureValue = table['feature' + index];

            featureValues.push(featureValue);
            
        });

        // apply logic to determine the best
        if (CompareByAvailability(featureValues)) {
            bestFeatures.push('feature' + index);
        }
    }
    
    return bestFeatures;
    
}


var http = require('http');
const { readSync } = require('fs');

var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    console.log('calling...')
    let bestFeatures;
    let ret = asyncApiCall().then(function(result) { 
        bestFeatures = result;
        console.log(bestFeatures);
        res.end(JSON.stringify({bestFeatures}));
    });

});
app.listen(3002);



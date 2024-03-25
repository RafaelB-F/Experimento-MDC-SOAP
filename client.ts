const soap = require('soap');

const url = 'http://localhost:8000/calculator.asmx?wsdl';

const largura = 1920;
const altura = 1080;

soap.createClient(url, function(err:any, client:any) {
    if (err) throw err;

    console.log(client)
    client.CalculateMDC({ intA: largura, intB: altura }, function(err:any, result:any) {
        if (err) throw err;

        const mdc = result.CalculateMDCResult;
        const aspectRatio = `${largura / mdc}:${altura / mdc}`;

        console.log(`MDC: ${mdc}`);
        console.log(`Aspect Ratio: ${aspectRatio}`);
    });
});

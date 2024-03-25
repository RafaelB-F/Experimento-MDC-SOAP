import express from "express";
import path from "path";
const soap = require("soap");
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);
const port = 8000;

const service = {
  CalculatorService: {
    CalculatorSoap: {
        CalculateMDC: function (args: {intA:number, intB:number}) {
            const { intA, intB } = args;
            return { CalculateMDCResult: gcd(intA, intB) };
        },
    },
  },
};

const gcd = (a:number, b:number):number => {
    if (!b) return a;
    return gcd(b, a % b);
};


const xml = fs.readFileSync(
  path.resolve(__dirname, "calculator.asmx.xml"),
  "utf8"
);

app.listen(port, function () {
  soap.listen(app, "/calculator.asmx", service, xml, () =>
    console.log(`Servidor SOAP rodando na porta ${port}`)
  );
});

console.log(`Servidor Express rodando na porta ${port}`);

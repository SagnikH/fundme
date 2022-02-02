const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const FundingPath = path.resolve(
	__dirname,
	"Contracts",
	"Funding.sol"
);
const source = fs.readFileSync(FundingPath, "utf-8");

const input = {
	language: "Solidity",
	sources: {
		"Funding.sol": {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
};

const compiledData = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(compiledData.contracts);
const data = compiledData.contracts;

fs.ensureDirSync(buildPath);

for (let [key, value] of Object.entries(data)) {
	for (let [key1, value1] of Object.entries(value)) {
		fs.outputJsonSync(path.resolve(buildPath, key1 + ".json"), value1);
	}
}


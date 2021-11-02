"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const yargs_1 = (0, tslib_1.__importDefault)(require("yargs"));
const figlet_1 = (0, tslib_1.__importDefault)(require("figlet"));
const helpers_1 = require("./helpers");
const main = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { argv } = yargs_1.default
        .option('url', {
        alias: 'u',
        description: 'The url to benchmark',
        type: 'string',
    })
        .option('concurrent', {
        alias: 'c',
        description: 'How many requests per second are made',
        type: 'number',
    })
        .option('requests', {
        alias: 'r',
        description: 'How many requests should be made',
        type: 'number',
    })
        .help()
        .alias('help', 'h');
    if (typeof argv.url === 'string') {
        const concurrentRequests = argv.concurrent || 20;
        const requests = argv.requests || 100;
        (0, figlet_1.default)('ANDREAS - HTTP Benchmark Tool', (err, data) => { console.log(data); });
        let i = 1;
        let finished = false;
        const interval = setInterval(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
            if (i < requests) {
                axios_1.default.get(argv.url);
                if ((0, helpers_1.numberIs50)(i) || requests < 50) {
                    console.log(`${i} Requests finished`);
                }
                i += 1;
            }
            else {
                if (!finished) {
                    finished = true;
                    yield axios_1.default.get(argv.url);
                    console.log(`${i} Requests finished`);
                    console.log('Benchmark finished');
                    (0, figlet_1.default)('Es ist Obst im Haus!', (err, data) => { console.log(data); });
                    (0, helpers_1.stopInterval)(interval);
                }
            }
        }), 1000 / concurrentRequests);
    }
    else {
        console.log('You have to specify a url with --url and requests with -r (-h for help)');
    }
});
main();

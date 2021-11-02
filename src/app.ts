import axios from 'axios';
import yargs from 'yargs';
import figlet from 'figlet';

// eslint-disable-next-line import/no-unresolved
import { stopInterval, numberIs50 } from './helpers';

const main = async () => {
    const { argv }: Record<string, any> = yargs
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

        figlet('ANDREAS - HTTP Benchmark Tool', (err, data) => { console.log(data); });

        let i = 1;
        let finished = false;
        const interval = setInterval(async () => {
            if (i < requests) {
                axios.get(argv.url);

                if (numberIs50(i) || requests < 50) {
                    console.log(`${i} Requests finished`);
                }

                i += 1;
            } else {
                // eslint-disable-next-line no-lonely-if
                if (!finished) {
                    finished = true;
                    await axios.get(argv.url);
                    console.log(`${i} Requests finished`);

                    console.log('Benchmark finished');
                    figlet('Es ist Obst im Haus!', (err, data) => { console.log(data); });
                    stopInterval(interval);
                }
            }
        }, 1000 / concurrentRequests);
    } else {
        console.log('You have to specify a url with --url (-h for help)');
    }
};

main();
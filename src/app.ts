import axios from 'axios';
import yargs from 'yargs';

const stopInterval = (interval: any) => {
    clearInterval(interval);
    setTimeout(() => {}, 100);
};

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
        .help()
        .alias('help', 'h');

    if (typeof argv.url === 'string') {
        const concurrentRequests = argv.concurrent || 20;

        let i = 1;
        let finished = false;
        const interval = setInterval(async () => {
            if (i < 5000) {
                axios.get(argv.url);
                console.log(`${i} Requests finished`);
                i += 1;
            } else {
                // eslint-disable-next-line no-lonely-if
                if (!finished) {
                    finished = true;
                    await axios.get(argv.url);
                    console.log(`${i} Requests finished`);

                    console.log('Benchmark finished');
                    stopInterval(interval);
                }
            }
        }, 1000 / concurrentRequests);
    } else {
        console.log('You have to specify a url with --url (-h for help)');
    }
};

main();
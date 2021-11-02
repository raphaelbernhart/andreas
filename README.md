# Andreas HTTP Benchmarking
A minimalistic NodeJS HTTP Benachmarking Tool.

## Installation
#### Install Dependencies
```
npm install
```

#### Run the App
```
node ./dist/app.js -u https://example.com -c 50 -r 500
```

#### Arguments
| Argument         | Description         | Required |
|------------------|---------------------|----------|
| -u, --url        | URL of the site     | yes      |
| -c, --concurrent | Requests per second | no (20)  |
| -r, --requests   | Request             | yes      |
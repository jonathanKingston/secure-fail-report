# [secure.fail](https://secure.fail) report

## What is this?

It's mostly a hacky bit of script that will evolve, at the moment it is nothingness if you install it basically all your hardware belong to me. (Thanks for the Bitcoins and CDN server)

## What is it really

A hacky bit of JSON output after parsing the hostname of stdin

```
secure-crawl-json example.com
```

The result will be something like:
```
{
  "host": "bbc.com",
  "https": {
    "statusCode": 200,
    "responseTime": 1439772567482,
    "HTTPSResolve": false,
    "CSP": false,
    "PKP": false,
    "STS": false,
    "XSSProtection": false,
    "frameProtection": false,
    "noSniff": false
  },
  "http": {
    "statusCode": 200,
    "responseTime": 1439772567828,
    "HTTPSResolve": false,
    "CSP": false,
    "PKP": false,
    "STS": false,
    "XSSProtection": false,
    "frameProtection": false,
    "noSniff": false
  }
}
```



## Thanks

[Inspired by the great work here](https://scotthelme.co.uk/how-widely-used-are-security-based-http-response-headers/)

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
{ host: 'example.com',
  https: 
   { statusCode: 200,
     responseTime: 1439343290223,
     HTTPSResolve: true,
     hasCSP: false,
     hasNoSniff: false,
     hasPKP: false,
     hasSTS: false,
     hasFrameProtection: false,
     hasXSSProtection: false },
  http: 
   { statusCode: 200,
     responseTime: 1439343290448,
     HTTPSResolve: false,
     hasCSP: false,
     hasNoSniff: false,
     hasPKP: false,
     hasSTS: false,
     hasFrameProtection: false,
     hasXSSProtection: false } }
```



## Thanks

[Inspired by the great work here](https://scotthelme.co.uk/how-widely-used-are-security-based-http-response-headers/)

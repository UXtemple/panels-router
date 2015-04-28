# panels router

_Teleport all the things :)._

`PanelsRouter` is in charge of understanding `panels` URIs which are the base of our logic.
It implements `Flux` through `Marty`.

## API

### ActionCreators

- `#navigate(uri)`: go to a URI

### Constants

- `ROUTER_NAVIGATE`

### history

- `#history`: `pushstate` and `onpopstate` handler

### Parser

- `#parse(uri)`: parses a panels URI

### Store

- `#keys`: the list of panels' keys that represent the application
- `#uri`: the application's URI

## Install deps

1. Get `iojs`. [Guide](https://gist.github.com/dariocravero/8db219777b277c29fc06).
2. Install the deps `npm install && npm install -g babel-node`.

## Examples

See `playground/playground.js`.

Run it with `npm start`.

## worker-ised parser

`parser-worker` can work as both a synchronous task or as a web worker.
For the time being we've chosen to have it synchronous.

```
import Immutable from 'immutable'
import createWorker from 'webworkify'
import worker from './parser-worker'

const TRAILING_SLASH_REGEX = /\/$/

export default class Parser {
  constructor(uri) {
    this.parsed = Immutable.Map()
    // this.worker = createWorker(worker)
    this.parser = worker()
  }

  parse(uri) {
    // Make sure we always have a trailing slash on the URI
    uri = TRAILING_SLASH_REGEX.test(uri) ? uri : `${uri}/`

    if (this.parsed.has(uri)) {
      return this.parsed.get(uri)
    } else {
       let parseKeys = (event) => {
         let keys = Immutable.List(event.data)
         this.parsed = this.parsed.set(uri, keys)
         this.worker.removeEventListener(parseKeys)
         ActionCreators.receiveKeys(keys)
       }

       this.worker.addEventListener('message', parseKeys)
       this.worker.postMessage(uri)
     }
  }
}
```

License MIT

Darío Javier Cravero <dario@uxtemple.com>
Tom Parandyk <tom@uxtemple.com>

(c) 2015 UXtemple Limited <hi@uxtemple.com>

https://usepanels.com
https://UXtemple.com

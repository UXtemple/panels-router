# panels router

_Teleport all the things :)._

`PanelsRouter` is in charge of understanding `panels` URIs which are the base of our logic.

## API

### Actions
- `#navigate(uri)`: go to a URI

### history
- `#history`: `pushstate` and `popstate` handler

### Parser
- `#parse(uri)`: parses a panels URI

### Store
- `#panels`: the list of panels' keys that represent the application
- `#uri`: the application's URI

## Install deps

1. Get `iojs`. [Guide](https://gist.github.com/dariocravero/8db219777b277c29fc06).
2. Install the deps `npm install`.

## Examples

See `playground/playground.es6`.

Run it with `npm start`.



License MIT

Darío Javier Cravero <dario@uxtemple.com>
Tom Parandyk <tom@uxtemple.com>

(c) 2015 UXtemple Limited <hi@uxtemple.com>

https://usepanels.com
https://UXtemple.com

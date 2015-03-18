import ActionCreators from './action-creators'
import Immutable from 'immutable'
import parser from './parser-worker'

const TRAILING_SLASH_REGEX = /\/$/

export default class Parser {
  constructor() {
    this.parsed = Immutable.Map()
    this.parser = parser()
  }

  parse(uri) {
    // Make sure we always have a trailing slash on the URI
    uri = TRAILING_SLASH_REGEX.test(uri) ? uri : `${uri}/`

    let keys = this.parsed.get(uri)
    if (!keys) {
      keys = Immutable.fromJS(this.parser(uri))
      this.parsed = this.parsed.set(uri, keys)
    }

    return keys
  }
}

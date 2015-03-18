import Constants from './constants'
import Immutable from 'immutable'
import Marty from 'marty'
import Parser from './parser'

class RouterStore extends Marty.Store {
  constructor(options) {
    super(options)
    this.handlers = {
      navigate: Constants.ROUTER_NAVIGATE
    }
    this.parser = new Parser()
    this.state = Immutable.fromJS({
      keys: [],
      uri: ''
    })
  }

  get keys() {
    return this.state.get('keys')
  }

  get uri() {
    return this.state.get('uri')
  }

  navigate(toUri) {
    this.state = this.state.merge({
      uri: toUri,
      keys: this.parser.parse(toUri)
    })
  }
}

export default Marty.register(RouterStore)

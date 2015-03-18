import Constants from './constants'
import Marty from 'marty'

class RouterActionCreators extends Marty.ActionCreators {
  navigate(uri) {
    this.dispatch(Constants.ROUTER_NAVIGATE, uri)
  }
}

export default Marty.register(RouterActionCreators)

import * as PanelsRouter from '../'
window.PanelsRouter = PanelsRouter

console.log('Welcome to panels-router playground.')
console.log('https://github.com/UXtemple/panels-router')
console.log('PanelsRouter module', PanelsRouter)

import Marty from 'marty'
import React from 'react'

window.Marty = Marty
window.React = React

let style = {
  input: {
    border: '1px solid #f2f2f2',
    borderRadius: 10,
    margin: '0 20px',
    padding: '10px 20px'
  },
  label: {
    cursor: 'pointer',
    margin: '20px 0 10px 40px',
    fontSize: 20,
    fontWeight: 300
  },
  link: {
    marginTop: 10
  }
}

class View extends React.Component {
  navigateTo(event) {
    event.preventDefault()
    PanelsRouter.ActionCreators.navigate(event.target.href)
  }

  render() {
    let keysView = this.props.keys.map((key, i) => {
      return (
        <li key={i} style={style.link}>
          <a href={key} onClick={this.navigateTo.bind(this)}>{key}</a>
        </li>
      )
    })

    return (
      <div>
        <div>
          <label htmlFor='uri' style={style.label}>URI to parse</label>
          <input id='uri' ref='uri' value={this.props.uri} placeholder='original URI'
            onChange={() => PanelsRouter.ActionCreators.navigate(React.findDOMNode(this.refs.uri).value)} style={style.input} />
        </div>
        <ol>{keysView}</ol>
      </div>
    )
  }
}
View.propTypes = {
  keys: React.PropTypes.object.isRequired,
  uri: React.PropTypes.string.isRequired
}
View.defaultProps = {
  keys: {},
  uri: ''
}

let ViewContainer = Marty.createContainer(View, {
  listenTo: PanelsRouter.Store,
  fetch: {
    keys() { return PanelsRouter.Store.keys },
    uri() { return PanelsRouter.Store.uri }
  }
})

PanelsRouter.history()
PanelsRouter.ActionCreators.navigate(location.href)

React.render(<ViewContainer />, document.getElementById('playground-container'))

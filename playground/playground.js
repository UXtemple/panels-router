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

class View extends Marty.Component {
  constructor(props, context) {
    super(props, context)
    this.listenTo = PanelsRouter.Store
  }

  getState() {
    return {
      keys: PanelsRouter.Store.keys,
      uri: PanelsRouter.Store.uri
    }
  }

  navigateTo(event) {
    event.preventDefault()
    PanelsRouter.ActionCreators.navigate(event.target.href)
  }

  render() {
    let keysView = this.state.keys.map((key, i) => {
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
          <input id='uri' ref='uri' value={this.state.uri} placeholder='original URI'
            onChange={() => PanelsRouter.ActionCreators.navigate(this.refs.uri.getDOMNode().value)} style={style.input} />
        </div>
        <ol>{keysView}</ol>
      </div>
    )
  }
}

PanelsRouter.history()
PanelsRouter.ActionCreators.navigate(location.href)

React.render(<View />, document.getElementById('playground-container'))

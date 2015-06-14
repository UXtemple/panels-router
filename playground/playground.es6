import * as PanelsRouter from '../index';
import { Flux } from 'flummox';
import { FluxComponent } from 'flummox/addons/react';
import React, { Component, PropTypes } from 'react';

class View extends Component {
  render() {
    const { navigate } = this.props;
    const panels = this.props.panels.map((key, i) =>
      <li key={i} style={style.link}>
        <a href={key.uri} onClick={event => event.preventDefault() && navigate(key.uri)}>{key.uri}</a>
      </li>
    );

    return (
      <div>
        <div>
          <label htmlFor='uri' style={style.label}>URI to parse</label>
          <input id='uri' ref='uri' value={this.props.uri} placeholder='original URI'
            onChange={() => navigate(React.findDOMNode(this.refs.uri).value)} style={style.input} />
        </div>
        <ol>{panels}</ol>
      </div>
    )
  }

  static propTypes = {
    panels: PropTypes.arrayOf(PropTypes.shape({
      context: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired
    })),
    uri: PropTypes.string
  }
  static defaultProps = {
    panels: [],
    uri: ''
  }
}

const style = {
  input: {
    border: '1px solid #f2f2f2',
    borderRadius: 10,
    margin: '0 20px',
    outline: 0,
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

class ViewContainer extends FluxComponent {
  render() {
    return <FluxComponent
      actions={{router: ({navigate}) => ({navigate})}}
      stores={{router: ['panels', 'uri']}}><View /></FluxComponent>;
  }
}

class FluxApp extends Flux {
  constructor() {
    super();

    this.createActions('router', PanelsRouter.Actions);
    this.createStore('router', PanelsRouter.Store, this);

    this.history = PanelsRouter.history(this);
  }
}

const flux = new FluxApp();
flux.getActions('router').navigate(location.href);

React.render(
  <FluxComponent flux={flux}>
    <ViewContainer />
  </FluxComponent>,
  document.getElementById('playground-container')
);

window.Playground = {
  flux,
  PanelsRouter
};

console.log('Welcome to panels-router playground.');
console.log('https://github.com/UXtemple/panels-router');
console.log('Playground module', Playground);

import * as PanelsRouter from '../index';
import * as Flummox from 'flummox';
import FluxComponent from 'flummox/component';
import React from 'react';

window.Playground = {
  Flummox,
  FluxComponent,
  PanelsRouter
};

console.log('Welcome to panels-router playground.');
console.log('https://github.com/UXtemple/panels-router');
console.log('Playground module', Playground);
class View extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.flux.getActions('router').navigate;
  }

  render() {
    let keysView = this.props.keys.map((key, i) => {
      return (
        <li key={i} style={style.link}>
          <a href={key} onClick={event => event.preventDefault() && this.navigate(event.target.href)}>{key}</a>
        </li>
      );
    });

    return (
      <div>
        <div>
          <label htmlFor='uri' style={style.label}>URI to parse</label>
          <input id='uri' ref='uri' value={this.props.uri} placeholder='original URI'
            onChange={() => this.navigate(React.findDOMNode(this.refs.uri).value)} style={style.input} />
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

const style = {
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

class ViewContainer extends FluxComponent {
  get stores() {
    return {
      router: store => ({
        keys: store.keys,
        uri: store.uri
      })
    };
  }

  render() {
    return <FluxComponent connectToStores={this.stores}><View /></FluxComponent>;
  }
}

class FluxApp extends Flummox.Flux {
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

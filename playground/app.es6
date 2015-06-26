import { Actions, getters, history, reducer as router } from '../index';
import { createRedux } from 'redux';
import { connect, provide } from 'redux/react';
import React, { Component, PropTypes } from 'react';

export const redux = createRedux({router});

const historyUnsubscribe = history(redux, uri => redux.dispatch(Actions.navigate(uri)));

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
};

class Router {
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
    navigate: PropTypes.func.isRequired,
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

@connect(({router}) => ({
  panels: getters.panels(router),
  uri: router.uri
}))
class RouterContainer extends Component {
  render() {
    const { dispatch, panels, uri } = this.props;

    return <Router uri={uri} panels={panels} navigate={uri => dispatch(Actions.navigate(uri))} />
  }
}

@provide(redux)
export class App {
  render() {
    return <RouterContainer />;
  }
}

redux.dispatch(Actions.navigate(location.href))

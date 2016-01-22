import React, { Component } from 'react';
import EditorsContainer from './editorsContainer';

function contextChanged(currentContext, newContext) {
  if (currentContext === null && newContext !== null) return true;
  return currentContext.type !== newContext.type || currentContext.name !== newContext.name;
}

export class IDE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPageId !== nextProps.currentPageId ||
        contextChanged(this.props.context, nextProps.context)) {
        //  debugger;
      this.setState({
        counter: ++this.state.counter
      });
      let context = {...nextProps.context};
      if (!context.name) {
        context.name = nextProps.currentPageId;
      }
      this.props.switchContext(context);
    }
  }

  render() {
    return (
      <div>
        <div>switch count: <span>{this.state.counter}</span></div>
        <div>page id: <span>{this.props.currentPageId}</span></div>
        <div>context: <span>{JSON.stringify(this.props.context)}</span></div>
        <EditorsContainer/>
      </div>
    );
  }
}

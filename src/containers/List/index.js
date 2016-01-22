import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {IDE} from './ide.js';

/* actions */
import * as actionCreators from 'actions/mainActions';

@connect(
  state => ({}),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null,
      currentPageId: null,
      counter: 0
    };
  }

  onPageClick(page) {
    this.setState({
      context: { type: 'page' },
      currentPageId: page.name
    });
  }

  onFileClick(file) {
    this.setState({
      context: file
    });
  }

  onRender() {
    this.setState({
      counter: ++this.state.counter
    });
  }

  render() {
    const pages = [
      {
        type: 'page',
        name: 'page1'
      },
      {
        type: 'page',
        name: 'page2'
      }
    ];
    const files = [
      {
        type: 'file',
        name: 'file1.js'
      },
      {
        type: 'file',
        name: 'file2.js'
      }
    ];
    return (
      <section className="parent">
        <div className="left-bar">
          <button onClick={this.onRender.bind(this)}>redundent render {this.state.counter}</button>
          <h3>pages</h3>
          <ul>
            {pages.map(page => <li key={page.name} onClick={this.onPageClick.bind(this, page)}>{page.name}</li>)}
          </ul>
          <h3>files</h3>
          <ul>
            {files.map(file => <li key={file.name} onClick={this.onFileClick.bind(this, file)}>{file.name}</li>)}
          </ul>
        </div>
        <div className="right-bar">
          <IDE switchContext={this.props.switchContext} currentPageId={this.state.currentPageId} context={this.state.context}></IDE>
        </div>
      </section>
    );
  }
}

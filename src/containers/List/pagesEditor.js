import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions */
import * as actionCreators from 'actions/mainActions';

@connect(
  state => state.pages,
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export default class PagesEditor extends Component {
  constructor(props) {
    super(props);
  }

  onPageTabClick() {
    this.props.switchContext({type: 'page', name: this.props.currentPageId});
  }

  onSiteTabClick() {
    this.props.switchContext({type: 'page', name: 'site'});
  }

  getStyle(tabName) {
    return this.props.currentTab === tabName ?
      {color: 'blue'} : {color: 'black'};
  }

  onChange(event) {
    this.props.updatePageContent(this.props.fileName, event.target.value);
  }

  getActiveFile() {
    if (this.props.currentTab === 'site') {
      return this.props.pages['site'];
    } else {
      return this.props.pages[this.props.fileName];
    }
  }

  getContent() {
    const file = this.getActiveFile();

    if (!file) {
      return null;
    }

    return file.content;
  }

  render() {
    return (
      <div>
        <div>
          <button style={this.getStyle('page')} onClick={this.onPageTabClick.bind(this)}>JS</button>
          <button style={this.getStyle('site')} onClick={this.onSiteTabClick.bind(this)}>site.js</button>
        </div>
        <textarea value={this.getContent()} onChange={this.onChange.bind(this)}></textarea>
      </div>
    );
  }
}

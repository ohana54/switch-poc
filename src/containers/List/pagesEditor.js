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
    const page = this.props.pages[this.props.fileName];
    this.props.updatePageContent(page, event.target.value);
  }

  getContent() {
    if (this.props.currentTab === 'site') {
      return this.props.pages['site'].content;
    } else {
      return this.props.pages[this.props.fileName].content;
    }
  }

  render() {
    const page = this.props.pages[this.props.fileName];
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

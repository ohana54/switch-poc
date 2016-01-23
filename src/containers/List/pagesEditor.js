import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions */
import * as actionCreators from 'actions/mainActions';

@connect(
  state => ({
    page: state.pages.page,
    site: state.pages.site,
    currentTab: state.pages.currentTab
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export default class PagesEditor extends Component {
  constructor(props) {
    super(props);
  }

  onPageTabClick() {
    this.props.switchContext({type: 'page', name: this.props.page.name});
  }

  onSiteTabClick() {
    this.props.switchContext({type: 'page', name: 'site'});
  }

  getStyle(tabName) {
    return this.props.currentTab === tabName ?
      {color: 'blue'} : {color: 'black'};
  }

  onChange(event) {
    this.props.updatePageContent(this.props.currentTab, event.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <button style={this.getStyle('page')} onClick={this.onPageTabClick.bind(this)}>{this.props.page.name}</button>
          <button style={this.getStyle('site')} onClick={this.onSiteTabClick.bind(this)}>site.js</button>
        </div>
        {this.props.currentTab === 'site' ? <textarea value={this.props.site.content} onChange={this.onChange.bind(this)}></textarea>
      : <textarea value={this.props.page.content} onChange={this.onChange.bind(this)}></textarea>}
      </div>
    );
  }
}

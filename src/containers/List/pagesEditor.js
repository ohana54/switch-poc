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

  componentDidMount() {
    this.intervalToken = setInterval(() => {
      this.props.save({type: 'page', name: this.props.fileName});
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalToken);
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

  getContent() {
    const file = this.props.pages[this.props.fileName];

    if (!file) {
      return '';
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

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PagesEditor from './pagesEditor.js';
import FilesEditor from './filesEditor.js';

/* actions */
import * as actionCreators from 'actions/mainActions';

@connect(
  state => ({ context: state.context}),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export default class EditorsContainer extends Component {
  constructor(props) {
    super(props);
  }

  getContent() {
    if (!this.props.context) {
      return null;
    }

    return (
      <div>
        <div>current editor: {this.props.context.type}</div>
        {this.props.context.type === 'page' ? <PagesEditor fileName={this.props.context.name} currentPageId={this.props.currentPageId}></PagesEditor> : null}
        {this.props.context.type === 'file' ? <FilesEditor fileName={this.props.context.name}></FilesEditor> : null}
        {this.props.context.type === 'db' ? <div>db editor</div> : null}
      </div>
    );
  }

  render() {
    return (
      <div style={{marginTop: '10px'}}>
        {this.getContent()}
      </div>
    );
  }
}

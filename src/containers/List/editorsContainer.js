import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PagesEditor from './pagesEditor.js';
import FilesEditor from './filesEditor.js';

/* actions */
import * as actionCreators from 'actions/mainActions';

@connect(
  state => ({ visibleEditor: state.visibleEditor, context: state.context}),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export default class EditorsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{marginTop: '10px'}}>
        current editor: {this.props.visibleEditor}
        {this.props.visibleEditor === 'page' ? <PagesEditor fileName={this.props.context.name} currentPageId={this.props.currentPageId}></PagesEditor> : null}
        {this.props.visibleEditor === 'file' ? <FilesEditor fileName={this.props.context.name}></FilesEditor> : null}
        {this.props.visibleEditor === 'db' ? <div>db editor</div> : null}
      </div>
    );
  }
}

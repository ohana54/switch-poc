import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PagesEditor from './pagesEditor.js';
import FilesEditor from './filesEditor.js';

/* actions */
import * as actionCreators from 'actions/mainActions';

@connect(
  state => ({ visibleEditor: state.visibleEditor }),
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
        {this.props.visibleEditor === 'page' ? <PagesEditor></PagesEditor> : null}
        {this.props.visibleEditor === 'file' ? <FilesEditor></FilesEditor> : null}
        {this.props.visibleEditor === 'db' ? <div>db editor</div> : null}
      </div>
    );
  }
}

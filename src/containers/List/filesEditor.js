import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions */
import * as actionCreators from 'actions/mainActions';

@connect(
  state => state.files,
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export default class FilesEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>name: {this.props.file.name}</div>
        <textarea value={this.props.file.content}></textarea>
      </div>
    );
  }
}

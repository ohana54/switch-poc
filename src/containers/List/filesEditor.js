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

  onChange(event) {
    this.props.updateFileContent(event.target.value);
  }

  render() {
    return (
      <div>
        <div>name: {this.props.file.name}</div>
        <textarea value={this.props.file.content} onChange={this.onChange.bind(this)}></textarea>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* actions */
import * as actionCreators from 'actions/mainActions';

@connect(
  state => ({ files: state.files }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export default class FilesEditor extends Component {
  constructor(props) {
    super(props);
  }

  onChange(event) {
    this.props.updateFileContent(this.props.fileName, event.target.value);
  }

  render() {
    const file = this.props.files[this.props.fileName];
    return (
      <div>
        <div>name: {file.name}</div>
        <textarea value={file.content} onChange={this.onChange.bind(this)}></textarea>
      </div>
    );
  }
}

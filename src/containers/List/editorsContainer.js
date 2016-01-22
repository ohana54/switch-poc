import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {IDE} from './ide.js';

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
      <div>
        editors
        {this.props.visibleEditor === 'page' ? <div>pages editor</div> : null}
        {this.props.visibleEditor === 'file' ? <div>file editor</div> : null}
        {this.props.visibleEditor === 'db' ? <div>db editor</div> : null}
      </div>
    );
  }
}

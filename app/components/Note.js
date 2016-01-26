import React from 'react';
import {div, input} from './tags';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }
  render() {
    if (this.state.editing) {
      return this.renderEdit();
    }
    return this.renderNote();
  }
  renderEdit() {
    return input({
      type: "text",
      autoFocus:true,
      placeholder: this.props.task,
      onBlur: this.finishEdit.bind(this),
      onKeyPress: this.checkEnter.bind(this)});
  }
  renderNote() {
    return div(
      {onClick: this.edit.bind(this)},
      this.props.task);
  }
  edit() {
    this.setState({
      editing: true
    });
  }
  finishEdit(e) {
    if (this.props.onEdit) {
      this.props.onEdit(e.target.value);
    }
    this.setState({editing: false});
  }
  checkEnter(e) {
    if (e.key == 'Enter') {
      this.finishEdit(e);
    }
  }
}

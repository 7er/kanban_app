import React from 'react';
import h from 'react-hyperscript'
const { button, input, div, ul, li, span, h1 } = require('hyperscript-helpers')(h);

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
      ref: (input) => input ? input.selectionEnd = this.props.task.length : null,
      autoFocus:true,
      defaultValue: this.props.task,
      onBlur: this.finishEdit.bind(this),
      onKeyPress: this.checkEnter.bind(this)});
  }
  renderNote() {
    return div(
      {onClick: this.edit.bind(this)},
      [
        span({className: 'task'}, this.props.task),
        this.props.onDelete ? this.renderDelete() : null
      ]);
  }
  renderDelete() {
    return button({className: "delete-note", onClick: this.props.onDelete}, "x");
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

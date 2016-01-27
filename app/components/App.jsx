import React from 'react';
import uuid from 'node-uuid';
import Note from './Note';

import h from 'react-hyperscript'
const { div, ul, li, span, h1 } = require('hyperscript-helpers')(h);
//const {Note} = require('hyperscript-helpers')(note);

const Notes = ({notes, onEdit, onDelete}) => {
  return ul({className: "notes"}, notes.map((note) => {
    return li(
      {className: "note", key: note.id},
      h(
        Note,
        {
          task: note.task, 
          onEdit: onEdit.bind(null, note.id),
          onDelete: onDelete.bind(null, note.id)
        },
        []));
  }));
};



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack',
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ]
    }
  }
  render() {
    return (
        <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes
      notes={this.state.notes}
      onEdit={this.editNote}
      onDelete={this.deleteNote} />
        </div>
    );
  }

  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== id)
    });
  };
  
  addNote = () => {    
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  };
  editNote = (id, task) => {
    const notes = this.state.notes.map((note) => {
      if (note.id === id && task) {
        note.task = task;
      }
      return note;
    });
    this.setState({notes});
  };
}

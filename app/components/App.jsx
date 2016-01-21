import React from 'react';
import uuid from 'node-uuid';
//import Note from './Note.jsx';

var App = React.createClass({
  getInitialState: function() {
    return {
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
  },
  render: function() {
    return (
        <div>
        <button onClick={this.addNote}>+</button>
        <ul>{this.state.notes.map((note) =>
                       <li key={note.id}>{note.task}</li>
                      )}</ul>
        </div>);
  },
  
  addNote: function() {
    
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }
});

export default App;

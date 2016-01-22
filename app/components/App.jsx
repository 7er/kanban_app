import React from 'react';
import uuid from 'node-uuid';
import Note from './Note';


var Notes = ({notes, onEdit}) => {
  return (
      <ul>{notes.map((note) =>
                     <li key={note.id}>
                     <Note task={note.task} onEdit={onEdit.bind(null, note.id)}/>
                     </li>
                    )}
    </ul>);
}



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
        <button onClick={this.addNote}>+</button>
        <Notes notes={this.state.notes} onEdit={this.editNote} />
        </div>
    );
  }
  
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

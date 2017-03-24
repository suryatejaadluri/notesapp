const fs=require('fs');
const _=require('lodash');
const yargs=require('yargs');
var notes=require('./notes.js');
const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

if(command==='list')
    {
      var allNotes=notes.getAllnotes();
      console.log(`Printing ${allNotes.length} note(s).`);
      allNotes.forEach((note) => notes.logNote(note));
    }
else if(command==='add')
    {
     var note=notes.addNote(argv.title,argv.body);
        if(note){
        console.log('note succesufully added');
        notes.logNote(note);
        }
        else{
          console.log('Duplicate title found not adding the note')
        }
    }
else if(command==='remove')
    {
        var noteRemoved=notes.removeNote(argv.title);
        var message= noteRemoved ? "Note was Succesfully Removed":"Note not found";
        console.log(message);
        
    }else if(command==='read')
        {
     var note= notes.getNote(argv.title);
     if (note) {
     console.log('Note found');
     notes.logNote(note);
  } else {
    console.log('Note not found');
  }
        }
    
else{
    console.log('unrecognized command');
}
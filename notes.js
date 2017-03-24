var fs=require('fs');
var fetchNotes=()=>
{
      try
    {
    var notesstring=fs.readFileSync('notes-data.json');
    return JSON.parse(notesstring);
    }
    catch(e)
        {
           return []; 
        } 
}
var saveNotes=(notes)=>
{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote=(title,body)=>
{
    var notes=fetchNotes();
    var note={
        title,
        body};
    var duplicateNotes=notes.filter((note)=> note.title===title)
    if(duplicateNotes.length===0)
        {
      notes.push(note);
      saveNotes(notes);      
      return note;};
};
    
var getAllnotes=()=>
{
return fetchNotes();
};

var removeNote=(title)=>
{
      var notes=fetchNotes();
      var newArray=notes.filter((note)=>{return note.title!=title;});
      saveNotes(newArray);
      return notes.length!==newArray.length;
}; 

var getNote=(title)=>
{
    var notes=fetchNotes();
    var newArray=notes.filter((note)=>{return note.title===title;});    
    return newArray[0];
};

var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};


module.exports={
    addNote,getAllnotes,removeNote,getNote,logNote
};
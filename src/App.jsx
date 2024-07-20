import { useEffect, useState } from 'react'
import './index.css'
import ChangeTheme from './ChangeTheme'
import ContextProvider from './ContextProvider'


function App() {
  const [value, setValue] = useState('')
  const [notes, setNotes] = useState([])

  const onClickAddNotes = () => {
    if (value.trim() !== '') {
      setNotes(prev => {
        let myNotesCurrent = [...prev, value]
        localStorage.setItem('notes', JSON.stringify(myNotesCurrent))
        return myNotesCurrent
      })
      setValue('')
    }
  }



  // при обновлении с local storage получаем наши заметки, которые оставили перед обновлением страницы

  useEffect(() => {
    let getCurrentValue = localStorage.getItem('notes')
    if (getCurrentValue) {
      setNotes(JSON.parse(getCurrentValue))
    }
  }, [])



  const onChangeInput = (event) => {
    setValue(event.target.value)
  }



  const onEditNote = (i) => {
    let text = prompt('Change your note')

    setNotes(prev => {
      let myNotesCurrent = prev.map((prev, index) => {
        if (index === i) {
          return text
        } else {
          return prev
        }
      })
        localStorage.setItem('notes', JSON.stringify(myNotesCurrent))
        return myNotesCurrent
    })
  }

  const removeNote = (i) => {
    setNotes(prev => {
      let myNotesCurrent = prev.filter((_, index) => index !== i)
      localStorage.setItem('notes', JSON.stringify(myNotesCurrent))
      return myNotesCurrent
    })
  }




  return (
    <ContextProvider>
      <section className='App-section'>
      <ChangeTheme/>
      <h2 className='title'>My Notes</h2>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <input value={value} onChange={onChangeInput} className='enter-notes' type="text" placeholder='Enter notes...'/>
        <button onClick={onClickAddNotes} className='add-notes__btn'>Add Your Notes</button>
      </div>

      {notes.map((note, i) => (
        <div key={i} className="card">
          <p style={{color: 'black'}}>{note}</p>
          <div className='btn-container'>
          <button onClick={() => onEditNote(i)} className='edit-text__btn'>
              <svg width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
          </button>
          <button onClick={() => removeNote(i)} className='remove-text__btn'>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
          </button>
          </div>
        </div>
      ))}
    </section>
    </ContextProvider>
  )
}

export default App

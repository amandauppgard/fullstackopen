import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return(
      <div>
        filter shown with <input
          value = {value}
          onChange = {onChange}
        />
      </div>
  )
}

const PersonForm = ({onSubmit, nameValue, onNameChange,  numberValue, onNumberChange}) => {
  return(
    <div>
      <form onSubmit={onSubmit}>
          <div>
            name: <input 
              value = {nameValue}
              onChange = {onNameChange}
            />
          </div>
          <div>
      number: <input
        value = {numberValue}
        onChange = {onNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
      </form>
    </div>
  )
}

const Persons = ({filteredPersons}) => {
  return (
    <div>
      <ul>
        {filteredPersons().map(person => 
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  })

  const checkIfPersonExists = () => {
    if(persons.some(e => e.name === newName)){
      return true;
    }

    return false;
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = checkIfPersonExists()

    if(personExists == true) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    
    
  }

  const filteredPersons = () => {
    return persons.filter((e) =>
    e.name.toLowerCase().includes(filter.toLowerCase()));
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilterChange} value = {filter} />
      <h2>Add new person</h2>
      <PersonForm 
        onSubmit={addPerson} nameValue={newName} onNameChange={handleNameChange} 
        numberValue={newNumber} onNumberChange = {handleNumberChange}  
        />
      <h2>Numbers</h2>
      <Persons filteredPersons = {filteredPersons} />
    </div>
  )
}

export default App
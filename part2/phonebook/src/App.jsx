import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
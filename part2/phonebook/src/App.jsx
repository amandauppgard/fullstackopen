import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({filteredPersons, deletePerson}) => {
  return (
    <div>
      <ul>
        {filteredPersons().map(person => 
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
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
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const checkIfPersonExists = () => {
    if(persons.some(e => e.name === newName)){
      return true;
    }

    return false;
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = checkIfPersonExists()

    if(personExists === true) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        let person = persons.find((p) => p.name === newName);
        person.number = newNumber
        personService
        .updateNumber(person.id, person)
        .then(returnedPerson => {
          const updatedPersons = persons.filter((p) => p.id !== person.id)
          setPersons(updatedPersons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
  
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id)
    console.log(person)

    if(window.confirm(`Delete ${person.name}?`)){
      personService
      .deleteObject(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
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
      <Persons filteredPersons = {filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
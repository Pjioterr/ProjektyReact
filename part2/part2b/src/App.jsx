import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  // Początkowe dane (Zadanie 2.9)
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  // Stany dla formularza i wyszukiwarki
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Obsługa dodawania nowej osoby (Zadania 2.6, 2.7, 2.8)
  const addPerson = (event) => {
    event.preventDefault()
    
    // Sprawdzenie czy imię już istnieje (Zadanie 2.7)
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1 // Uproszczone generowanie ID
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  // Funkcje obsługujące zmiany w polach tekstowych
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  // Logika filtrowania (Zadanie 2.9)
  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      
      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
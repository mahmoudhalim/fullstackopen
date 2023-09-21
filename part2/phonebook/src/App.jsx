import { useState } from "react";
const Filter = (props) => {
  return (
    <>
      filter shown with:
      <input onChange={props.search} />
    </>
  );
};

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <div>
          name: <input onChange={props.handleInputName} />
        </div>
        <div>
          number: <input onChange={props.handleInputNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = ({persons}) => {
  return (
    <>
      <ul>
        {persons.map((p) => (
          <li key={p.name}>
            {p.name} {p.number}
          </li>
        ))}
      </ul>
    </>
  );
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Danny Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.every((p) => p.name != newPerson.name)) {
      console.log(newPerson);
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };
  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchWord)
  );
  const handleInputName = (event) => setNewName(event.target.value);
  const handleInputNumber = (event) => setNewNumber(event.target.value);
  const handleSearch = (event) =>
    setSearchWord(event.target.value.toLowerCase());
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleInputName={handleInputName}
        handleInputNumber={handleInputNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  );
};

export default App;

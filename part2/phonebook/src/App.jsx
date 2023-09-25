import { useEffect, useState } from "react";
import axios from "axios";
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
          number: <input onChange={props.handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = ({ persons }) => {
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
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;

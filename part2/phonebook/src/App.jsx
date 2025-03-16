import { useEffect, useState } from "react";
import server from "./services/person";
const Notification = ({ message, className }) => {
  if (message === "") {
    return null;
  }

  return <div className={className}>{message}</div>;
};
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

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      <ul>
        {persons.map((p) => (
          <li key={p.name}>
            {p.name} {p.number}{" "}
            <button onClick={() => deletePerson(p.id)}>delete</button>
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
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(true);
  useEffect(() => {
    server.getAll().then((p) => setPersons(p));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setNotificationMessage(`${newPerson.name} was added`);
    setIsSuccessful(true)
    setTimeout(() => 
      setNotificationMessage("")
    , 5000);
    if (persons.every((p) => p.name != newPerson.name)) {
      console.log(newPerson);
      // setPersons(persons.concat(newPerson));
      server.addPerson(newPerson).then((p) => setPersons(persons.concat(p)));
    } else {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name == newPerson.name);
        const changedPerson = { ...person, number: newPerson.number };
        server
          .updatePerson(changedPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((p) =>
                p.id == returnedPerson.id ? returnedPerson : p
              )
            )
          );
      }
    }
  };
  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchWord)
  );
  const deletePerson = (id) => {
    const deletedPerson = persons.find((p) => p.id == id);
    if (confirm(`Delete ${deletedPerson.name} ?`)) {
      setPersons(persons.filter((p) => p.id != id));
      server.deletePerson(id).catch(() => {
        setNotificationMessage(`${deletedPerson.name} was already removed`);
        setIsSuccessful(false);
        setTimeout(() => setNotificationMessage("")
        , 5000);
      });
    }
  };
  const handleInputName = (event) => setNewName(event.target.value);
  const handleInputNumber = (event) => setNewNumber(event.target.value);
  const handleSearch = (event) =>
    setSearchWord(event.target.value.toLowerCase());
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} className={isSuccessful? "success": "error"} />
      <Filter search={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleInputName={handleInputName}
        handleInputNumber={handleInputNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

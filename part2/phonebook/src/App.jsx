import { useEffect, useState } from "react";
import server from "./services/person";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { Filter } from "./components/Filter";
import { Notification } from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
  });
  useEffect(() => {
    server.getAll().then((p) => setPersons(p));
  }, []);

  const notify = (message, isError) => {
    setNotificationMessage({
      message,
      isError,
    });
    setTimeout(() => setNotificationMessage({ message: "" }), 5000);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    notify(`${newPerson.name} was added`, false);
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
        notify(`${deletedPerson.name} was already removed`, true);
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
      <Notification message={notificationMessage.message} isError={notificationMessage.isError} />
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

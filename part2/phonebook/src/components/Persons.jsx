export const Persons = ({ persons, deletePerson }) => {
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

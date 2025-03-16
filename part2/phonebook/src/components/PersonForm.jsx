export const PersonForm = (props) => {
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

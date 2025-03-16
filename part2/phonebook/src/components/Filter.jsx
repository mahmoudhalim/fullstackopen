export const Filter = (props) => {
  return (
    <>
      filter shown with:
      <input onChange={props.search} />
    </>
  );
};

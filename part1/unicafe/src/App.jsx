import { useState } from "react";

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );
};
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td> <td>{value}</td>
    </tr>
  );
};
const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad;
  if (all == 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(props.good - props.bad) / all} />
        <StatisticLine
          text="positive"
          value={(props.good / all) * 100 + " %"}
        />
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)}></Button>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}></Button>
      <Button text="bad" onClick={() => setBad(bad + 1)}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

import { Header, Content, Total } from "../App";

 
const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((s, part) => s + part.exercises, 0)} />
  </div>
);

export default Course;

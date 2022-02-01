import './App.css';
import student from './students.json'
import propType from 'prop-types';
import { useState } from 'react';


const StudentRow = ({ student, onSelect }) => (
  <tr>
    <td>{student.Name}</td>
    <td>{student.Gender}</td>
    <td>{student.Class}</td>
    <td>
      <button
        onClick={() => onSelect(student)}
      >Select</button>
    </td>
  </tr>
);

StudentRow.propType = {
  student: propType.shape({
    Name: propType.string,
    Gender: propType.string,
  }),
  onSelect: propType.func,
};

const StudentInfo = ({ Name, Gender, Class }) => (
  <div>
    <h1>{Name}</h1>
  </div>
)

function App() {

  const [filter, setFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Student Info Search</h1>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <div
        style={{ 
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gap: "1rem"
         }}
      >
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {student
              .filter(student => student.Name.toLowerCase().includes(filter.toLowerCase()))
              .slice(0, 10)
              .map(student => (
                <StudentRow student={student} key={student.ID} onSelect={(student) => setSelectedStudent(student)} />
              ))}
          </tbody>
        </table>
      {selectedStudent && <StudentInfo {...selectedStudent} />}
      </div>
    </div>
  );
}

export default App;

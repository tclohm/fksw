import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [number, setNumber] = useState(0);

  const getYear = (string) => {
    return new Date(Date.now()).getFullYear() - new Date(string).getFullYear()
  }

  const getGender = (number) => {
    switch (number) {
      case 0:
        return 'Male'
      case 1:
        return 'Female'
      default:
        return 'Other'
    }
  }

  useEffect(() => {
    function fetchData() {
      fetch('http://localhost:8000/').then(response => {
        if (response.ok) return response.json()
      }).then(json => {
        setData(json.data)
      })
    }
    if (Array.isArray(data) && data.length == 0) {
      fetchData();
    }
  }, [data])

  return (
    <div className="App">
      <header className="App-header">
       { data.length === 0 ?
          <p> :( </p>
        :
        <div>
          <p>{data[number].name}</p>
          <p>{getGender(data[number].gender)}</p>
          <p>{data[number].distance_miles} miles away</p>
          <p>{getYear(data[number].birth_date)} years old</p>
        </div>
       }
      </header>
    </div>
  );
}

export default App;

import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [number, setNumber] = useState(-1);
  const [imageNumber, setImageNumber] = useState("00");
  const [imageUrl, setImageUrl] = useState("NA");

  const getYear = (string) => {
    return new Date(Date.now()).getFullYear() - new Date(string).getFullYear()
  }

  const getGender = (number) => {
    switch (number) {
      case 0:
        return 'M'
      case 1:
        return 'F'
      default:
        return 'O'
    }
  }

  const getImage = (number) => {
    fetch(`http://localhost:8000/image/${number}`).then(res => {
      if (res.ok) setImageUrl(res.url)
    })
  }

  useEffect(() => {
    function fetchData() {
      fetch('http://localhost:8000/').then(response => {
        if (response.ok) return response.json()
      }).then(json => {
        setData(json.data)
        setNumber(0)
      })
    }
    if (Array.isArray(data) && data.length === 0) {
      fetchData();
    }
  }, [data])

  useEffect(() => {
    getImage(imageNumber)
  }, [number])

  return (
    <div className="App">
      <header className="App-header">
       { data.length === 0 ?
          <p> :( </p>
        :
        <div className="relative border-t border-l border-r rounded-t">
          <img src={imageUrl} alt="foobar" className="h-64 w-64" />
          <div className="absolute w-64 h-12 bg-black border-b border-l border-r rounded-b">
            <p className="absolute text-sm font-semibold left-2 bottom-6">{data[number].name}</p>
            <p className="absolute text-sm font-semibold right-2 bottom-6">{getGender(data[number].gender)}</p>
            <p className="absolute text-sm font-semibold right-2 bottom-0">{data[number].distance_miles} miles away</p>
            <p className="absolute text-sm font-semibold left-2 bottom-0">{getYear(data[number].birth_date)} years old</p>
          </div>
        </div>
       }
       <div className="relative -bottom-12">
       <button className="border rounded h-12 w-24 m-2 text-xl font-bold bg-green-400 hover:bg-green-600">yes</button>
       <button className="border rounded h-12 w-24 m-2 text-xl font-bold bg-red-400 hover:bg-red-600">no</button>
       </div>
      </header>
    </div>
  );
}

export default App;

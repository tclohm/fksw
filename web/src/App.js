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

  const update = (number) => {
    const n = Number(number)
    if (n < 10) {
      setImageNumber("0" + String(n + 1))
    } else {
      setImageNumber(String(n + 1))
    }
    setNumber(number + 1)
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
  }, [number, imageNumber])

  return (
    <div className="App">
      <header className="App-header">
       <div className="absolute right-4 top-4 flex items-center">
         <p className="font-bold text-2xl mr-4">{number}</p>
         <img className="h-8 w-8 rounded" src="coin.gif" />
       </div>
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
       <button 
       onClick={() => update(number)} 
       className="border rounded h-12 w-24 m-2 text-xl font-bold bg-green-400 hover:bg-green-600">yes</button>
       <button 
       onClick={() => update(number)}
       className="border rounded h-12 w-24 m-2 text-xl font-bold bg-red-400 hover:bg-red-600">no</button>
       </div>
      </header>
      <span class="absolute bottom-10 right-3 flex h-3 w-3 z-10">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
      <button className="absolute bottom-4 right-4 text-red-400 rounded border h-8 w-8 flex justify-center items-center hover:bg-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
         <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export default App;

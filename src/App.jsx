import { useState, useEffect } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

function App() {
  let [turn, setTurn] = useState("into");
  let [value, setValue] = useState(['', '', '', '', '', '', '', '', '']);
  let [status, setstatus] = useState('');
  let [ansArr, setAnsArr] = useState([]);

  function updateValue(index) {
    if (value[index] == '' && status == '') {
      setValue((prevValue) => {
        let arr = prevValue.toSpliced(index, 1, (turn == "into") ? faX : faCircle);
        return arr;
      })
      setTurn((prevTurn) => (prevTurn == "into") ? "circle" : "into")
      // findWinner();
    }
  }

  let possibleWays = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  useEffect(() => {
    for (let i = 0; i < possibleWays.length; i++) {
      let tempArr = possibleWays[i];

      if (value[tempArr[0]] && value[tempArr[0]].iconName == value[tempArr[1]].iconName && value[tempArr[1]].iconName == value[tempArr[2]].iconName) {
        setstatus(value[tempArr[0]].iconName == "x" ? "X" : "O");
        setAnsArr(tempArr);

        return;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (value[i] == '')
        return;
    }
    setstatus("Draw")
  }, [value])

  let bgColor = "#EBD3F8";
  if (status == "x") {
    bgColor = "#7A1CAC"
  }
  else {
    bgColor = "#4E31AA"
  }

  return (
    <div className='App'>
      <h1 className='header'>Tic Tac Toe</h1>
      <div className='board'>
        {
          value.map((ele, index) => {
            return <button className='button' key={index} onClick={() => updateValue(index)}>{(ele) && <FontAwesomeIcon icon={ele} color={(ansArr.includes(index)) ? "green" : ele.iconName == 'x' ? "#7A1CAC" : "#4E31AA"} className='icon' />}</button>
          })
        }
      </div>
      {status && <p className='Winner' style={{ backgroundColor: bgColor }}>{status == "Draw" ? "Match Draw" : status + " is a Winner"}</p>}
    </div>
  )
}

export default App
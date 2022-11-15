import React, { useState, useEffect } from 'react'

const positionsWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]

export const Game = () => {
  const [positionsSave, setPositionsSave] = useState(Array(9).fill(null))
  const [player1, setPlayer1] = useState([])
  const [player2, setPlayer2] = useState([])
  const [win, setWin] = useState('')
  const [turn, setTurn] = useState('1')

  const winPlayer = () => {
    let winP1, winP2
    positionsWin.some((item) => {
      winP1 = item.every((element, indice, arreglo) => {
        return player1.includes(element)
      })

      winP2 = item.every((element, indice, arreglo) => {
        return player2.includes(element)
      })

      return winP1 || winP2
    })
    console.log(winP1, winP2, '===')
    if (winP1) {
      setWin('p1 win')
    } else if (winP2) {
      setWin('p2 win')
    }
  }
  useEffect(() => {
    winPlayer()
  }, [player1, player2, positionsSave])

  return (
    <div style={{ padding: '2% 20%' }}>
      <div
        style={{
          width: '100%',
          height: '80vh',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {positionsSave.map((item, index) => {
          return (
            <button
              style={{
                width: '30%',
                height: '80px',
                background: `${
                  item == 'P1' ? 'red' : item == 'P2' ? 'green' : 'transparent'
                }`,
              }}
              key={index}
              onClick={() => {
                if (turn == '1') {
                  let newArray1 = [...player1]
                  newArray1.push(index)
                  setPlayer1(newArray1)
                  positionsSave[index] = 'P1'
                  setTurn('2')
                } else {
                  let newArray2 = [...player2]
                  newArray2.push(index)
                  setPlayer2(newArray2)
                  positionsSave[index] = 'P2'
                  setTurn('1')
                }
              }}
            >
              {item == 'P1' ? 'X' : item == 'P2' ? 'O' : ''}
            </button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button
          onClick={() => {
            setPositionsSave(Array(9).fill(null))
            setPlayer1([])
            setPlayer2([])
            setTurn('1')
            setWin('')
          }}
        >
          Reset
        </button>
        <span>{win}</span>
      </div>
    </div>
  )
}

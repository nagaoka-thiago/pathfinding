import './Grid.css'
import Cell from './Cell.js'
import React, { useState, useEffect } from 'react'

const breadth = require('../algoritmos/breadth.js')

const S_X = 10
const S_Y = 10
const F_X = 17
const F_Y = 10

let START_X = S_X
let START_Y = S_Y

let FINISH_X = F_X
let FINISH_Y = F_Y

function Grid({ rows, cols }) {
    const [grid, setGrid] = useState([])
    let [path, setPath] = useState([])
    let [current, setCurrent] = useState([])
    let [algorithm, setAlgorithm] = useState('')
    let id = null

    const executar = () => {
        console.log(algorithm)
        /*breadth.load(START_X, START_Y)
        id = setInterval(() => {
            let [t, c, p] = breadth.breadth_step(grid, setGrid, FINISH_X, FINISH_Y)
            setCurrent(current = c)
            if(t){
                setPath(path = p)
                clearInterval(id)
                id = null
            }
        }, 5);*/
    }

    const limpar = () => {
        estadoInicial()
        if(id !== null) clearInterval(id)
    }

    const estadoInicial = () => {
        START_X = S_X
        START_Y = S_Y

        FINISH_X = F_X
        FINISH_Y = F_Y

        const newM = []
        for(let i = 0; i < rows; i++) {
            const newL = []
            for(let j = 0; j < cols; j++) {
                if(i === START_Y && j === START_X)
                    newL.push('S')
                else if(i === FINISH_Y && j === FINISH_X)
                    newL.push('F')
                else newL.push('.')
            }
            newM.push(newL)
        }
        setGrid(newM)
    }
    
    useEffect(() => {
        estadoInicial()
    }, [])

    return (
        <div>
            <div className="header">
                <select defaultValue={algorithm} onChange ={e => setAlgorithm(e.target.value)} className="algorithmSelector">
                    <option value="">Selecione um algoritmo para executar</option>
                    <option value="breadth">Breadth First Search</option>
                    <option value="depth">Depth First Search</option>
                    <option value="greedy">Greedy Search</option>
                    <option value="astar">A*</option>
                </select>
                <button onClick={ executar }>Executar</button>
                <button onClick={ limpar }>Limpar</button>
            </div>
            <div className="grid">
                {
                    grid.map((linhas, idx) => {
                        return <div className="grid-linha" key={idx}>
                                    {
                                        linhas.map((_, jdx) => {
                                            return <Cell key={idx + rows * jdx  }
                                                        eStart={idx === START_Y && jdx === START_X}
                                                        eFinish={idx === FINISH_Y && jdx === FINISH_X}
                                                        eVisited={ breadth.isVisited(grid, jdx, idx) }
                                                        ePath={ breadth.isPath(path, jdx, idx) }
                                                        eCurrent={current[0] === jdx && current[1] === idx}
                                                    />
                                        })
                                    }
                            </div>
                    })
                }
            </div>
        </div>
    )
}

export default Grid

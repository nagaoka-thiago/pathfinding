import './Grid.css'
import Cell from './Cell.js'
import React, { useState, useEffect } from 'react'

const { load, breadth_step, isVisited } = require('../algoritmos/breadth.js')

const S_X = 10
const S_Y = 10
const F_X = 16
const F_Y = 10

let START_X = S_X
let START_Y = S_Y

let FINISH_X = F_X
let FINISH_Y = F_Y

function Grid({ rows, cols }) {
    const [grid, setGrid] = useState([])
    let [visitados, setVisitados] = useState([])
    let [path, setPath] = useState([])

    const executar = () => {
        load(START_X, START_Y)
        const id = setInterval(() => {
            let [t, v, p] = breadth_step(grid, FINISH_X, FINISH_Y)
            setVisitados(visitados = v)
            setPath(path = p)
            console.log(visitados)
            if(t) clearInterval(id)
        }, 1000);
    }

    const limpar = () => {
        estadoInicial()
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
    }, [visitados])

    return (
        <div>
            <div className="header">
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
                                                        eVisited={ isVisited(visitados, jdx, idx) }
                                                        ePath={ false }
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

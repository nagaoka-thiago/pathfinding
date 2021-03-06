import './Grid.css'
import Cell from './Cell.js'
import React, { useState, useEffect } from 'react'

const breadth = require('../algoritmos/breadth.js')
const depth = require('../algoritmos/depth.js')
const greedy = require('../algoritmos/greedy.js')
const astar = require('../algoritmos/astar.js')

const S_X = 10
const S_Y = 10
const F_X = 30
const F_Y = 15

let START_X = S_X
let START_Y = S_Y

let FINISH_X = F_X
let FINISH_Y = F_Y

function Grid({ rows, cols }) {
    let [grid, setGrid] = useState([[]])
    let [path, setPath] = useState([[]])
    let [current, setCurrent] = useState([])
    let [algorithm, setAlgorithm] = useState('')
    let [intervalId, setIntervalId] = useState(0)
    let [executando, setExecutando] = useState(false)

    const executar = () => {
        if(algorithm === 'breadth') {
            setExecutando(true)
            breadth.load(START_X, START_Y)
            setIntervalId(intervalId = setInterval(() => {
            let [t, c, p] = breadth.breadth_step(grid, setGrid, FINISH_X, FINISH_Y)
                setCurrent(current = c)
                if(t){
                    setPath(path = p)
                    clearInterval(intervalId)
                    setExecutando(false)
                }
            }, 5))
        }
        else if(algorithm === 'depth') {
            setExecutando(true)
            depth.load(START_X, START_Y)
            setIntervalId(intervalId = setInterval(() => {
            let [t, c, p] = depth.depth_step(grid, setGrid, FINISH_X, FINISH_Y)
                setCurrent(current = c)
                if(t){
                    setPath(path = p)
                    clearInterval(intervalId)
                    setExecutando(false)
                }
            }, 5))
        }
        else if(algorithm === 'greedy') {
            setExecutando(true)
            greedy.load(START_X, START_Y)
            setIntervalId(intervalId = setInterval(() => {
            let [t, c, p] = greedy.greedy_step(grid, setGrid, FINISH_X, FINISH_Y)
                setCurrent(current = c)
                if(t){
                    setPath(path = p)
                    clearInterval(intervalId)
                    setExecutando(false)
                }
            }, 5))
        }
        else if(algorithm === 'astar') {
            setExecutando(true)
            astar.load(START_X, START_Y)
            setIntervalId(intervalId = setInterval(() => {
            let [t, c, p] = astar.astar_step(grid, setGrid, FINISH_X, FINISH_Y)
                setCurrent(current = c)
                if(t){
                    setPath(path = p)
                    clearInterval(intervalId)
                    setExecutando(false)
                }
            }, 5))
        }
    }

    const limpar = () => {
        estadoInicial()
        clearInterval(intervalId)
    }

    const eVisitado = (jdx, idx) => {
        if(algorithm === 'breadth') return breadth.isVisited(grid, jdx, idx)
        else if(algorithm === 'depth') return depth.isVisited(grid, jdx, idx)
        else if(algorithm === 'greedy') return greedy.isVisited(grid, jdx, idx)
        else if(algorithm === 'astar') return astar.isVisited(grid, jdx, idx)
        return false
    }

    const ePath = (jdx, idx) => {
        if(algorithm === 'breadth') return breadth.isPath(path, jdx, idx)
        else if(algorithm === 'depth') return depth.isPath(path, jdx, idx)
        else if(algorithm === 'greedy') return greedy.isPath(path, jdx, idx)
        else if(algorithm === 'astar') return astar.isPath(path, jdx, idx)
        return false
    }

    const estadoInicial = () => {
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
        setCurrent([])
        setPath([[]])
        setExecutando(false)
    }

    const changeStartX = (e) => {
        if(!executando) {
            let ng = grid.slice()
            ng[START_Y][START_X] = '.'
            START_X = parseInt(e.target.value)
            ng[START_Y][START_X] = 'S'
            setGrid(ng)
        }
    }
    const changeStartY = (e) => {
        if(!executando) {
            let ng = grid.slice()
            ng[START_Y][START_X] = '.'
            START_Y = parseInt(e.target.value)
            ng[START_Y][START_X] = 'S'
            setGrid(ng)
        }
    }
    const changeFinishX = (e) => {
        if(!executando) {
            let ng = grid.slice()
            ng[FINISH_Y][FINISH_X] = '.'
            FINISH_X = parseInt(e.target.value)
            ng[FINISH_Y][FINISH_X] = 'F'
            setGrid(ng)
        }
    }
    const changeFinishY = (e) => {
        if(!executando) {
            let ng = grid.slice()
            ng[FINISH_Y][FINISH_X] = '.'
            FINISH_Y = parseInt(e.target.value)
            ng[FINISH_Y][FINISH_X] = 'F'
            setGrid(ng)
        }
    }

    const makeWall = (x, y) => {
        if(!executando) {
            let ng = grid.slice()
            if(ng[y][x] === '.') ng[y][x] = '#'
            else if(ng[y][x] === '#') ng[y][x] = '.'
            setGrid(ng)
        }
    }
    
    useEffect(() => {
        estadoInicial()
    }, [])

    return (
        <div>
            <div className="header">
                <select defaultValue={algorithm} onChange ={e => setAlgorithm(e.target.value)} id="algorithmSelector">
                    <option value="">Selecione um algoritmo para executar</option>
                    <option value="breadth">Breadth First Search</option>
                    <option value="depth">Depth First Search</option>
                    <option value="greedy">Greedy Search</option>
                    <option value="astar">A*</option>
                </select>
                <button onClick={ executar }>Executar</button>
                <button onClick={ limpar }>Limpar</button>
            </div>
            <div className="subtitle-container">
                <div className="subtitle-item">
                    <div className="subtitle-item-color start"></div>
                    <div className="subtitle-item-title">N?? come??o</div>
                </div>
                <div className="subtitle-item">
                    <div className="subtitle-item-color finish"></div>
                    <div className="subtitle-item-title">N?? fim</div>
                </div>
                <div className="subtitle-item">
                    <div className="subtitle-item-color visited"></div>
                    <div className="subtitle-item-title">N?? visitado</div>
                </div>
                <div className="subtitle-item">
                    <div className="subtitle-item-color path"></div>
                    <div className="subtitle-item-title">N?? caminho</div>
                </div>
                <div className="subtitle-item">
                    <div className="subtitle-item-color current"></div>
                    <div className="subtitle-item-title">N?? atual</div>
                </div>
                <div className="subtitle-item">
                    <div className="subtitle-item-color wall"></div>
                    <div className="subtitle-item-title">N?? muro</div>
                </div>
            </div>
            <div className="inputs-container">
                <div className="input-container">
                    <p>Defina o ponto inicial: 
                    (<input type="number" min={0} max={cols} defaultValue={S_X} onChange={changeStartX} />,
                    <input type="number" min={0} max={rows} defaultValue={S_Y} onChange={changeStartY} />)</p>
                </div>
                <div className="input-container">
                    <p>Defina o ponto final: 
                        (<input type="number" min={0} max={cols} defaultValue={F_X} onChange={changeFinishX} />,
                        <input type="number" min={0} max={rows} defaultValue={F_Y} onChange={changeFinishY} />)</p>
                </div>
            </div>
            <div className="grid">
                {
                    grid.map((linhas, idx) => {
                        return <div className="grid-linha" key={idx}>
                                    {
                                        linhas.map((_, jdx) => {
                                            return <div onClick={() => makeWall(jdx, idx)}>
                                                        <Cell key={idx + rows * jdx  }
                                                            eStart={idx === START_Y && jdx === START_X}
                                                            eFinish={idx === FINISH_Y && jdx === FINISH_X}
                                                            eVisited={ eVisitado(jdx, idx) }
                                                            ePath={ ePath(jdx, idx) }
                                                            eCurrent={current && current.length === 2 && current[0] === jdx && current[1] === idx}
                                                            eWall={ grid[idx][jdx] === '#' }
                                                        />
                                                    </div>
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

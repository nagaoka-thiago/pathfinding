import './Grid.css'
import Cell from './Cell.js'
import React, { useState, useEffect } from 'react'

function Grid({ rows, cols }) {
    const [grid, setGrid] = useState([])
    
    useEffect(() => {
        const newM = []
        for(let i = 0; i < rows; i++) {
            const newL = []
            for(let j = 0; j < cols; j++) {
                newL.push('.')
            }
            newM.push(newL)
        }
        setGrid(newM)
    }, [])

    return (
        <div className="grid">
            {
                grid.map((linhas, idx) => {
                    return <div className="grid-linha" key={idx}>
                                {
                                    linhas.map((_, jdx) => {
                                        return <Cell key={idx + rows * jdx  }/>
                                    })
                                }
                           </div>
                })
            }
        </div>
    )
}

export default Grid

import './Cell.css'
import React from 'react'

function Cell({ eStart, eFinish, eVisited, ePath, eCurrent, grid, setGrid, x, y }) {
    const makeWall = (e) => {
        if(grid[y][x] === '.') grid[y][x] = '#'
        else if(grid[y][x] === '#') grid[y][x] = '.'
        setGrid(grid)
    }
    return (
        <div className={'cell' + (eStart ? ' start' :
                                  eFinish ? ' finish' :
                                  eCurrent ? ' current' :
                                  ePath ? ' path' :
                                  eVisited ? ' visited' :
                                  grid[y][x] === '#' ? ' wall' :
                                  "")}
            onClick={makeWall}>
        </div>
    )
}

export default Cell

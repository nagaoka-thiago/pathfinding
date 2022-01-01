import './Cell.css'
import React from 'react'

function Cell({ eStart, eFinish, eVisited, ePath, eCurrent, eWall, grid, setGrid, x, y }) {
    const makeWall = () => {
        if(grid[y][x] === '.') grid[y][x] = '#'
        else if(grid[y][x] === '#') grid[y][x] = '.'
        setGrid(grid)
    }
    return (
        <div className={"cell" + (eStart ? " start" :
                                  eFinish ? " finish" :
                                  eWall ? " wall" :
                                  eCurrent ? " current" :
                                  ePath ? " path" :
                                  eVisited ? " visited" :
                                  "")}
            onClick={makeWall}>
        </div>
    )
}

export default Cell

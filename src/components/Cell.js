import './Cell.css'
import React from 'react'

function Cell({ eStart, eFinish, eVisited, ePath }) {
    return (
        <div className={"cell" + (eStart ? " start" :
                                  eFinish ? " finish" :
                                  eVisited ? " visited" :
                                  ePath ? " path" :
                                  "")}>
        </div>
    )
}

export default Cell

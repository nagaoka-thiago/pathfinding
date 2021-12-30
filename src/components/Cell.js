import './Cell.css'
import React from 'react'

function Cell({ eStart, eFinish, eVisited, ePath, eCurrent }) {
    return (
        <div className={"cell" + (eStart ? " start" :
                                  eFinish ? " finish" :
                                  eCurrent ? " current" :
                                  ePath ? " path" :
                                  eVisited ? " visited" :
                                  "")}>
        </div>
    )
}

export default Cell

import './Cell.css'
import React from 'react'

function Cell({ eStart, eFinish, eVisited, ePath, eCurrent, eWall }) {
    return (
        <div className={'cell' + (eStart ? ' start' :
                                  eFinish ? ' finish' :
                                  eCurrent ? ' current' :
                                  ePath ? ' path' :
                                  eVisited ? ' visited' :
                                  eWall ? ' wall' :
                                  '')
                        }>
        </div>
    )
}

export default Cell

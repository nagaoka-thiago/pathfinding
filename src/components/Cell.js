import './Cell.css'
import React, { useState, useEffect } from 'react'

function Cell({ eStart, eFinish, eVisited, ePath, eCurrent, eWall }) {

    const [classe, setClasse] = useState('cell')
    useEffect(() => {
        setClasse((eStart ? 'cell start' :
                            eFinish ? 'cell finish' :
                            eCurrent ? 'cell current' :
                            ePath ? 'cell path' :
                            eVisited ? 'cell visited' :
                            eWall ? 'cell wall' :
                            'cell'))
    }, [eStart, eFinish, eVisited, ePath, eCurrent, eWall])

    return (
        <div className={ classe }>
        </div>
    )
}

export default Cell

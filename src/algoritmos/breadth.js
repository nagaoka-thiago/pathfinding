const isVisited = (grid, x, y) => {
    return grid[y][x] === 'V'
}

const isQueued = (queue, x, y) => {
    for(let i = 0; i < queue.length; i++) {
        if(queue[i][0] === x && queue[i][1] === y) return true
    }
    return false
}

const isPath = (path, x, y) => {
    for(let i = 0; i < path.length; i++) {
        if(path[i][0] === x && path[i][1] === y) return true
    }
    return false
}

let queue = []
let path = new Map()
let cx = 0
let cy = 0

const load = (start_x, start_y) => {
    queue = []
    path = new Map()

    cx = start_x
    cy = start_y

    queue.push([start_x, start_y])
}

const construct_path = (finish_x, finish_y, path) => {
    if(finish_x === cx && finish_y === cy) return [[cx, cy]]
    for(const [key, value] of path) {
        if(value[0] === finish_x && value[1] === finish_y) {
            return [[finish_x, finish_y]].concat(construct_path(key[0], key[1], path))
        }
    }
    return []
}

const breadth_step = (grid, setGrid, finish_x, finish_y) => {
    const x_v = [0, 0, -1, 1]
    const y_v = [-1, 1, 0, 0]
    
    if(queue.length > 0) {
        const [current_x, current_y] = queue.shift()
        if(current_x === finish_x && current_y === finish_y) return [true, [current_x, current_y], construct_path(finish_x, finish_y, path)]
        
        grid[current_y][current_x] = 'V'
        setGrid(grid)
        
        for(let i = 0; i < 4; i++) {
            const new_x = current_x + x_v[i]
            const new_y = current_y + y_v[i]

            if(new_x < 0 || new_x >= grid[current_y].length) continue
            if(new_y < 0 || new_y >= grid.length) continue
            if(grid[new_y][new_x] === '#') continue
            if(isVisited(grid, new_x, new_y)) continue
            if(isQueued(queue, new_x, new_y)) continue

            path.set([current_x, current_y], [new_x, new_y])

            queue.push([new_x, new_y])
        }
        return [false, [current_x, current_y], []]
    }
    return []
}

export { load, breadth_step, isVisited, isPath }
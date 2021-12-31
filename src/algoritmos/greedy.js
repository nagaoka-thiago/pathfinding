const isVisited = (grid, x, y) => {
    return grid[y][x] === 'V'
}

const isPath = (path, x, y) => {
    for(let i = 0; i < path.length; i++) {
        if(path[i][0] === x && path[i][1] === y) return true
    }
    return false
}

let queue = []
let path = []

const load = (start_x, start_y) => {
    queue = []
    path = []

    queue.push([start_x, start_y])
}

const dist = (vx, vy, fx, fy) => {
    return Math.abs(vx - fx) + Math.abs(vy - fy)
}

const choose = (fx, fy) => {
    queue.sort((a, b) => Math.abs(dist(a[0], a[1], fx, fy) - dist(b[0], b[1], fx, fy)))
    return queue.shift()
}

const greedy_step = (grid, setGrid, finish_x, finish_y) => {
    const x_v = [0, 0, -1, 1]
    const y_v = [-1, 1, 0, 0]
    
    if(queue.length > 0) {
        const [current_x, current_y] = choose(finish_x, finish_y)
        if(current_x === finish_x && current_y === finish_y) return [true, [current_x, current_y], path]
        
        setGrid(grid)
        path.push([current_x, current_y])
        
        for(let i = 0; i < 4; i++) {
            const new_x = current_x + x_v[i]
            const new_y = current_y + y_v[i]

            if(new_x < 0 || new_x >= grid[current_y].length) continue
            if(new_y < 0 || new_y >= grid.length) continue
            if(grid[new_y][new_x] === '#') continue
            if(isVisited(grid, new_x, new_y)) continue

            grid[new_y][new_x] = 'V'

            queue.push([new_x, new_y])
        }
        return [false, [current_x, current_y], []]
    }
    return []
}

export { load, greedy_step, isVisited, isPath }
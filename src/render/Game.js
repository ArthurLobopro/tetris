import { figures } from "./Figures.js"
import "./Controllers.js"
import viewGameOver from "./Screens/GameOver.js"
import { renderAll } from "./View.js"
import { Audios } from "./Audio.js"
import viewInit from "./Screens/Init.js"
import { mainKeyDown, mainKeyPress } from "./Controllers.js"
import { gameData, saveLastPontuation, saveRecords, userPreferences } from "./Data.js"
import viewPause from "./Screens/Pause.js"

const gameCanvas = document.getElementById('game')
const nextCanvas = document.getElementById('next')
const pontosSpan = document.getElementById('pontos')
const lastPointsDiv = document.getElementById('last-pontuation')

const formatPoints = points => String(points).padStart(4, '0')

const game = {
    height: 30,
    width: 15,
    squareWidth: 16,
    state: [],
    interval: null,
    pointsPerBlock: 10,
    lastPontuation: 0,
    pontos: 0,
    records: [],
    renderVelocity: 1000 / 60,
    gameplayVelocity: 0,
    status: "inactive",
    isMusicOn: false,
    userPreferences: {
        gameplayVelocity: null,
        music: null
    },
    nextFigure: {
        blocks: null,
        color: '',
        figureType: ''
    },
    nextCanvasSize: {
        height: 6,
        width: 6
    },
    atualFigure: {
        blocks: [[]],
        x: 0,
        y: 0,
        color: '',
        figureType: ''
    },
    moveLock: false,
    move(direction) {
        if (this.moveLock) return

        const { y, x } = this.atualFigure

        const haveBlocksOnLeft = this.atualFigure.blocks.some((line, indexY) => {
            if (line[0].type === "null") {
                return false
            }

            return this.state[y + indexY]?.[x - 1]?.type === "block"
        })

        const haveBlocksOnRight = this.atualFigure.blocks.some((line, indexY) => {
            if (line[line.length - 1].type === "null") {
                return false
            }

            return this.state[y + indexY]?.[x + line.length]?.type === "block"
        })

        if (direction === "right" && !haveBlocksOnRight) {
            if (x + this.atualFigure.blocks[0].length <= 14)
                this.atualFigure.x++
        }

        if (direction === "left" && !haveBlocksOnLeft && x > 0) {
            this.atualFigure.x--
        }

        this.moveLock = true

        setTimeout(() => this.moveLock = false, 100);
    }

}

//#region Pontuação

const addLinePoints = () => {
    game.pontos += game.pointsPerBlock * game.width * 2
}

const addFigurePoints = () => {
    const { blocks: figure } = game.atualFigure

    let figureBlocks = 0

    figure.forEach(line => {
        line.forEach(block => {
            if (block.type === 'block') {
                figureBlocks++
            }
        })
    })

    game.pontos += figureBlocks * game.pointsPerBlock
}

//#endregion

//#region New atributes from game
const makeNullBlock = () => { return { type: "null" } }

const makeALine = () => {
    const line = Array.from({ length: game.width }, makeNullBlock)
    return line
}

const getNewGameState = () => {
    const table = Array.from({ length: game.height }, makeALine)
    return table
}

const centerFigure = () => {
    game.atualFigure.x = Math.trunc(game.width / 2 - game.atualFigure.blocks[0].length / 2)
}

const spawnFirstFigure = () => {
    game.atualFigure = {
        y: 0,
        ...figures.random()
    }
    centerFigure()
}

const spawnNextFigure = () => {
    game.nextFigure = {
        ...figures.random()
    }
}

const spawnNewFigure = () => {
    game.atualFigure = {
        y: 0,
        ...game.nextFigure
    }
    centerFigure()
    spawnNextFigure()
}
//#endregion

//#region Update game.state
const removeCompleteLines = () => {
    const voidLine = makeALine()

    game.state = game.state.filter(line => {

        return line.some(block => {
            return block.type === 'null'
        })

    })

    while (game.state.length < game.height) {
        addLinePoints()
        game.state.unshift(voidLine)
    }
}

const addToState = () => {
    const { x, y, blocks, figureType } = game.atualFigure

    blocks.forEach((line, indexY) => {

        line.forEach((block, indexX) => {

            game.state[y + indexY] = game.state[y + indexY].map((stateBlock, stateX) => {
                if ([x + indexX] == stateX) {
                    if (block.type === 'block') {
                        return { ...block, figureType }
                    }
                    return stateBlock
                }

                return stateBlock
            })
        })
    })

    removeCompleteLines()
}
//#endregion

const collision = () => {
    const { x, y, blocks } = game.atualFigure

    const bottomY = y + blocks.length

    if (bottomY === game.height) {
        return true
    }

    const colidBlock = blocks.some((line, indexY) => {
        return line.some((block, indexX) => {
            if (block.type === "null") {
                return false
            }

            return game.state[y + indexY + 1][x + indexX].type === 'block'
        })
    })

    return colidBlock
}

//#region Gameplay
const pause = async () => {
    clearInterval(game.interval)
    game.status = "paused"
    if (await viewPause()) {
        game.status = "active"
        game.interval = setInterval(playGame, game.userPreferences.gameplayVelocity);
    }
}

const gameOver = async () => {
    clearInterval(game.interval)
    verifyRecords()
    saveLastPontuation()
    await viewGameOver()
    const newGameEvent = new Event('game-over')
    window.dispatchEvent(newGameEvent)
    newGame()
}

const newGame = () => {
    game.status = "active"
    game.state = getNewGameState()
    game.lastPontuation = game.pontos
    game.pontos = 0
    pontosSpan.innerText = formatPoints(game.pontos)
    lastPointsDiv.innerText = formatPoints(game.lastPontuation)
    spawnNewFigure()
    renderAll()
    window.onkeydown = mainKeyDown
    window.onkeypress = mainKeyPress
    game.interval = setInterval(playGame, game.userPreferences.gameplayVelocity)
}

const playGame = () => {
    if (!collision() && game.status == "active") {
        game.atualFigure.y++
    } else {
        if (game.atualFigure.y == 0) {
            return gameOver()
        }
        addFigurePoints()
        addToState()
        spawnNewFigure()
    }

    pontosSpan.innerText = formatPoints(game.pontos)
}
//#endregion

const loadGameData = () => {
    gameData.records.forEach(record => {
        game.records.push(record)
    })
    Object.entries(userPreferences).forEach(([key, value]) => {
        game.userPreferences[key] = value
    })
    console.log(game.userPreferences);
    game.lastPontuation = gameData.lastPontuation
}

const reloadGameConfig = () => {
    if (game.isMusicOn !== game.userPreferences.music) {
        game.isMusicOn = game.userPreferences.music
    }

    if (game.isMusicOn) {
        Audios.theme.volume = userPreferences.musicVolume
        Audios.theme.play()
        Audios.theme.loop = true
    } else {
        Audios.theme.pause()
        Audios.theme.currentTime = 0
    }
}

    ; (
        () => {
            window.addEventListener('game-over', () => {
                game.gameplayVelocity = game.userPreferences.gameplayVelocity
            })
        }
    )()

const verifyRecords = () => {
    const { pontos, records } = game
    console.log(records);
    const atualPointsIsNewRecord = records.some(record => {
        return record.points < pontos
    })
    if (atualPointsIsNewRecord) {
        game.records.pop()
        game.records.push({ points: pontos })
        while (
            game.records[0].points < game.records[1].points ||
            game.records[1].points < game.records[2].points
        ) {
            game.records.forEach((record, index) => {
                if (record.points < game.records[index + 1]?.points) {
                    [
                        game.records[index],
                        game.records[index + 1]
                    ] = [
                            game.records[index + 1],
                            game.records[index]
                        ]
                }
            })
        }
        saveRecords()
    }
}

gameCanvas.width = (game.width * game.squareWidth) + game.width - 1
gameCanvas.height = (game.height * game.squareWidth) + game.height - 1

nextCanvas.width = (game.squareWidth * game.nextCanvasSize.width) + game.nextCanvasSize.width - 1
nextCanvas.height = (game.squareWidth * game.nextCanvasSize.height) + game.nextCanvasSize.height - 1

window.onload = async () => {
    loadGameData()
    await viewInit()
    game.status = "active"
    game.state = getNewGameState()
    spawnFirstFigure()
    spawnNextFigure()
    game.interval = setInterval(playGame, game.userPreferences.gameplayVelocity)
    setInterval(renderAll, game.renderVelocity)
    lastPointsDiv.innerText = formatPoints(game.lastPontuation)
    window.onkeydown = mainKeyDown
    window.onkeypress = mainKeyPress
    if (userPreferences.music) {
        game.isMusicOn = true
        Audios.theme.volume = userPreferences.musicVolume
        Audios.theme.play()
        Audios.theme.loop = true
    }
}

export { game, playGame, collision, addFigurePoints, newGame, pause, formatPoints, reloadGameConfig }
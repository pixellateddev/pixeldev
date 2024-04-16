'use client'

import { NextPage } from 'next'
import { useEffect, useRef } from 'react'

import classes from './snake.module.scss'

interface Point {
    x: number
    y: number
}

interface MovablePoint extends Point {
    dx: number
    dy: number
}

interface RestrictedMovablePoint extends MovablePoint {
    nextDx: number
    nextDy: number
}

const Snake: NextPage = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const appleRef = useRef<Point | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        let snakeHead: RestrictedMovablePoint = {
            x: 0,
            y: 0,
            dx: 1,
            dy: 0,
            nextDx: 1,
            nextDy: 0,
        }
        // let snakeHead = snakeHeadRef.current
        const snakeBody: Point[] = []
        let snakeLength = 2
        let animationFrameId: number
        const cellSize = 20
        const totalCellIn1D = (canvas?.width ?? 0) / cellSize

        const drawGrid = (context: CanvasRenderingContext2D) => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.fillStyle = 'black'
            context.fillRect(0, 0, context.canvas.width, context.canvas.height)
            context.strokeStyle = 'rgba(243, 174, 167, 0.2)'
            for (let i = 0; i < totalCellIn1D; i++) {
                for (let j = 0; j < totalCellIn1D; j++) {
                    context.strokeRect(
                        cellSize * i,
                        cellSize * j,
                        cellSize,
                        cellSize
                    )
                }
            }
        }

        const isGameOver = () => {
            const { x, y, dx, dy } = snakeHead
            if (
                (x === 0 && dx === -1) ||
                (y === 0 && dy === -1) ||
                (x === cellSize * (totalCellIn1D - 1) && dx === 1) ||
                (y === cellSize * (totalCellIn1D - 1) && dy === 1)
            ) {
                return true
            }
        }

        const drawSnake = (context: CanvasRenderingContext2D) => {
            if (snakeHead.x % cellSize === 0 && snakeHead.y % cellSize === 0) {
                snakeHead.dx = snakeHead.nextDx
                snakeHead.dy = snakeHead.nextDy
            }
            for (const scale of snakeBody) {
                context.fillStyle = 'rgba(21, 56, 244, 0.5)'
                context.fillRect(scale.x, scale.y, 20, 20)
            }

            if (!isGameOver()) {
                snakeHead.x += snakeHead.dx
                snakeHead.y += snakeHead.dy
                snakeBody.push({ x: snakeHead.x, y: snakeHead.y })

                if (snakeBody.length > snakeLength * cellSize) {
                    snakeBody.shift()
                }
            }

            context.fillRect(snakeHead.x, snakeHead.y, 20, 20)
        }

        const canPlaceApple = (x: number, y: number) => {
            console.log('hello')
            if (snakeHead.x === x * cellSize && snakeHead.y === y * cellSize) {
                return false
            }
            for (const scale of snakeBody) {
                if (scale.x === x * cellSize && scale.y === y * cellSize) {
                    return false
                }
            }
            return true
        }

        const drawApple = (context: CanvasRenderingContext2D) => {
            let apple = appleRef.current
            context.fillStyle = 'red'

            if (!apple) {
                let x = Math.floor(Math.random() * totalCellIn1D)
                let y = Math.floor(Math.random() * totalCellIn1D)
                while (!canPlaceApple(x, y)) {
                    x = Math.floor(Math.random() * totalCellIn1D)
                    y = Math.floor(Math.random() * totalCellIn1D)
                }
                apple = {
                    x: x!,
                    y: y!,
                }
                appleRef.current = apple
            }

            context.beginPath()
            context.arc(
                apple.x * cellSize + cellSize / 2,
                apple.y * cellSize + cellSize / 2,
                cellSize / 2,
                0,
                Math.PI * 2
            )
            context.closePath()
            context.fill()
        }

        const checkIfEatingApple = () => {
            const apple = appleRef.current
            if (apple) {
                if (
                    snakeHead.x === apple.x * cellSize &&
                    snakeHead.y === apple.y * cellSize
                ) {
                    appleRef.current = null
                    snakeLength++
                }
            }
        }

        const handleVelocityChange = ({ code }: KeyboardEvent) => {
            if (code === 'ArrowLeft' && snakeHead.dx === 0) {
                snakeHead.nextDx = -1
                snakeHead.nextDy = 0
            }

            if (code === 'ArrowRight' && snakeHead.dx === 0) {
                snakeHead.nextDx = 1
                snakeHead.nextDy = 0
            }
            if (code === 'ArrowUp' && snakeHead.dy === 0) {
                snakeHead.nextDx = 0
                snakeHead.nextDy = -1
            }

            if (code === 'ArrowDown' && snakeHead.dy === 0) {
                snakeHead.nextDx = 0
                snakeHead.nextDy = 1
            }
        }

        const render = () => {
            drawGrid(context!)
            drawApple(context!)
            drawSnake(context!)
            checkIfEatingApple()

            // animationFrameId = setTimeout(render, 100) as any

            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        document.addEventListener('keydown', handleVelocityChange)
        return () => {
            // clearTimeout(animationFrameId)
            window.cancelAnimationFrame(animationFrameId)
            document.removeEventListener('keydown', handleVelocityChange)
        }
    })

    return (
        <div>
            <canvas
                height={500}
                width={500}
                className={classes.canvas}
                ref={canvasRef}
            ></canvas>
        </div>
    )
}

export default Snake

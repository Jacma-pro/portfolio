import { useEffect, useRef, useState } from 'react'
import './DodoWalker.scss'

import left0  from '../assets/dodo-frame/walk_left_0.png'
import left1  from '../assets/dodo-frame/walk_left_1.png'
import left2  from '../assets/dodo-frame/walk_left_2.png'
import right0 from '../assets/dodo-frame/walk_right_0.png'
import right1 from '../assets/dodo-frame/walk_right_1.png'
import right2 from '../assets/dodo-frame/walk_right_2.png'
import up0    from '../assets/dodo-frame/walk_top_0.png'
import up1    from '../assets/dodo-frame/walk_top_1.png'
import up2    from '../assets/dodo-frame/walk_top_2.png'
import down0  from '../assets/dodo-frame/walk_down_.0.png'
import down1  from '../assets/dodo-frame/walk_down_1.png'
import down2  from '../assets/dodo-frame/walk_down_.2.png'

const FRAMES = {
  left:  [left0,  left1,  left2],
  right: [right0, right1, right2],
  up:    [up0,    up1,    up2],
  down:  [down0,  down1,  down2],
}

type Direction = 'left' | 'right' | 'up' | 'down'

const DODO_SIZE    = 32
const SPEED_H      = 2 
const SPEED_V      = 1
const TICK_MS      = 120
const PAUSE_CHANCE = 0.004

function nextSegment(): { dir: Direction; dist: number } {
  const horizontal = Math.random() < 0.60
  const dist = 40 + Math.random() * 120
  if (horizontal) {
    return { dir: Math.random() < 0.5 ? 'right' : 'left', dist }
  } else {
    return { dir: Math.random() < 0.5 ? 'down' : 'up', dist }
  }
}

const DodoWalker = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [ready, setReady]   = useState(false)
  const [x,     setX]       = useState(0)
  const [y,     setY]       = useState(0)
  const [frame, setFrame]   = useState(0)
  const [dir,   setDir]     = useState<Direction>('right')
  const [paused,    setPaused]    = useState(false)
  const [pauseLeft, setPauseLeft] = useState(0)

  const segRef   = useRef<{ dir: Direction; remaining: number }>(
    { dir: 'right', remaining: 80 }
  )
  const xRef     = useRef(0)
  const yRef     = useRef(0)
  const pausedRef    = useRef(false)
  const pauseLeftRef = useRef(0)

  useEffect(() => { xRef.current = x },                [x])
  useEffect(() => { yRef.current = y },                [y])
  useEffect(() => { pausedRef.current = paused },      [paused])
  useEffect(() => { pauseLeftRef.current = pauseLeft },[pauseLeft])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const maxX = container.clientWidth  - DODO_SIZE
    const maxY = container.clientHeight - DODO_SIZE
    const startX = Math.random() * maxX
    const startY = Math.random() * Math.max(maxY, 0)
    xRef.current = startX
    yRef.current = startY
    setX(startX)
    setY(startY)
    const seg = nextSegment()
    segRef.current = { dir: seg.dir, remaining: seg.dist }
    setDir(seg.dir)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return

    const interval = setInterval(() => {
      const container = containerRef.current
      if (!container) return
      const maxX = container.clientWidth  - DODO_SIZE
      const maxY = container.clientHeight - DODO_SIZE

      if (pausedRef.current) {
        setPauseLeft(p => {
          const next = p - 1
          if (next <= 0) setPaused(false)
          return next
        })
        return
      }
      if (Math.random() < PAUSE_CHANCE) {
        setPaused(true)
        setPauseLeft(Math.floor(Math.random() * 8) + 3)
        return
      }

      const seg = segRef.current

      let newX = xRef.current
      let newY = yRef.current
      let hitWall = false

      if (seg.dir === 'right') {
        newX = Math.min(xRef.current + SPEED_H, maxX)
        if (newX >= maxX) hitWall = true
      } else if (seg.dir === 'left') {
        newX = Math.max(xRef.current - SPEED_H, 0)
        if (newX <= 0) hitWall = true
      } else if (seg.dir === 'down') {
        newY = Math.min(yRef.current + SPEED_V, maxY)
        if (newY >= maxY) hitWall = true
      } else {
        newY = Math.max(yRef.current - SPEED_V, 0)
        if (newY <= 0) hitWall = true
      }

      seg.remaining -= seg.dir === 'right' || seg.dir === 'left' ? SPEED_H : SPEED_V
      if (seg.remaining <= 0 || hitWall) {
        const next = nextSegment()
        const forbidden = hitWall
          ? seg.dir === 'right' ? 'right'
          : seg.dir === 'left'  ? 'left'
          : seg.dir === 'down'  ? 'down' : 'up'
          : null
        const finalDir = forbidden && next.dir === forbidden
          ? (next.dir === 'right' ? 'left' : next.dir === 'left' ? 'right'
           : next.dir === 'down'  ? 'up'   : 'down') as Direction
          : next.dir
        segRef.current = { dir: finalDir, remaining: next.dist }
        setDir(finalDir)
      }

      setX(newX)
      setY(newY)
      setFrame(f => (f + 1) % 3)
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [ready])

  if (!ready) return <div className="dodo-walker" ref={containerRef} aria-hidden="true" />

  const src = FRAMES[dir][paused ? 1 : frame]

  return (
    <div className="dodo-walker" ref={containerRef} aria-hidden="true">
      <img
        className="dodo-walker__sprite"
        src={src}
        alt=""
        style={{
          left: `${x}px`,
          top:  `${y}px`,
          width:  `${DODO_SIZE}px`,
          height: `${DODO_SIZE}px`,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
}

export default DodoWalker
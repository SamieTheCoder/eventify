'use client'

import { useEffect, useRef } from 'react'

// Inject keyframes once into the document
function useFlipStyles() {
  useEffect(() => {
    const id = 'flip-clock-styles'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

      @keyframes fold {
        0%   { transform: rotateX(0deg); }
        100% { transform: rotateX(-180deg); }
      }
      @keyframes unfold {
        0%   { transform: rotateX(180deg); }
        100% { transform: rotateX(0deg); }
      }

      .flip-unit {
        display: block;
        position: relative;
        width: 52px;
        height: 64px;
        perspective-origin: 50% 50%;
        perspective: 200px;
        background-color: #18181b;
        border-radius: 6px;
        box-shadow: 0 8px 16px -6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);
      }

      .flip-upper, .flip-lower {
        display: flex;
        position: relative;
        justify-content: center;
        width: 100%;
        height: 50%;
        overflow: hidden;
      }

      .flip-upper {
        align-items: flex-end;
        border-bottom: 1px solid #09090b;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background: linear-gradient(to bottom, #27272a, #18181b);
      }

      .flip-upper span {
        transform: translateY(50%);
      }

      .flip-lower {
        align-items: flex-start;
        border-top: 1px solid #09090b;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        background: linear-gradient(to bottom, #18181b, #111113);
      }

      .flip-lower span {
        transform: translateY(-50%);
      }

      .flip-upper span,
      .flip-lower span {
        font-family: 'Share Tech Mono', monospace;
        font-size: 2.6rem;
        color: #f4f4f5;
        line-height: 1;
        letter-spacing: -0.02em;
      }

      .flip-card {
        display: flex;
        justify-content: center;
        position: absolute;
        left: 0;
        width: 100%;
        height: 50%;
        overflow: hidden;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }

      .flip-card span {
        font-family: 'Share Tech Mono', monospace;
        font-size: 2.6rem;
        color: #f4f4f5;
        line-height: 1;
        letter-spacing: -0.02em;
      }

      .flip-card.fold {
        top: 0;
        align-items: flex-end;
        transform-origin: 50% 100%;
        transform: rotateX(0deg);
        background: linear-gradient(to bottom, #27272a, #18181b);
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        border-bottom: 1px solid #09090b;
        animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
        transform-style: preserve-3d;
      }

      .flip-card.fold span {
        transform: translateY(50%);
      }

      .flip-card.unfold {
        top: 50%;
        align-items: flex-start;
        transform-origin: 50% 0%;
        transform: rotateX(180deg);
        background: linear-gradient(to bottom, #18181b, #111113);
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top: 1px solid #09090b;
        animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
        transform-style: preserve-3d;
      }

      .flip-card.unfold span {
        transform: translateY(-50%);
      }
    `
    document.head.appendChild(style)
  }, [])
}

// Single digit unit with flip animation
interface FlipUnitProps {
  digit: number
  shuffle: boolean
  unit: 'hours' | 'minutes' | 'seconds'
}

function FlipUnit({ digit, shuffle, unit }: FlipUnitProps) {
  let current = digit
  let previous = digit - 1

  if (unit !== 'hours') {
    previous = previous === -1 ? 59 : previous
  } else {
    previous = previous === -1 ? 23 : previous
  }

  const curr = String(current).padStart(2, '0')
  const prev = String(previous).padStart(2, '0')

  const digit1 = shuffle ? prev : curr
  const digit2 = !shuffle ? prev : curr
  const anim1 = shuffle ? 'fold' : 'unfold'
  const anim2 = !shuffle ? 'fold' : 'unfold'

  // Force re-mount of animated cards on change using key
  const animKey = `${digit}-${shuffle}`

  return (
    <div className="flip-unit">
      {/* Static upper — shows current */}
      <div className="flip-upper"><span>{curr}</span></div>
      {/* Static lower — shows previous */}
      <div className="flip-lower"><span>{prev}</span></div>
      {/* Animated cards */}
      <div key={`a-${animKey}`} className={`flip-card ${anim1}`}>
        <span>{digit1}</span>
      </div>
      <div key={`b-${animKey}`} className={`flip-card ${anim2}`}>
        <span>{digit2}</span>
      </div>
    </div>
  )
}

function Colon({ running }: { running: boolean }) {
  return (
    <span style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '2rem',
      color: running ? '#52525b' : '#3f3f46',
      lineHeight: 1,
      alignSelf: 'center',
      marginBottom: '2px',
      transition: 'color 0.3s'
    }}>
      :
    </span>
  )
}

// Label under each unit pair
function Label({ text }: { text: string }) {
  return (
    <span style={{
      fontSize: '9px',
      color: '#52525b',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      textAlign: 'center',
      marginTop: '6px',
      fontFamily: 'monospace'
    }}>
      {text}
    </span>
  )
}

interface FlipClockProps {
  seconds: number
  running: boolean
}

export default function FlipClock({ seconds, running }: FlipClockProps) {
  useFlipStyles()

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  // Shuffle state: flip when digit changes
  const prevRef = useRef({ h, m, s })
  const shuffleRef = useRef({ h: true, m: true, s: true })

  if (prevRef.current.h !== h) { shuffleRef.current.h = !shuffleRef.current.h }
  if (prevRef.current.m !== m) { shuffleRef.current.m = !shuffleRef.current.m }
  if (prevRef.current.s !== s) { shuffleRef.current.s = !shuffleRef.current.s }
  prevRef.current = { h, m, s }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '6px',
      padding: '20px 0',
      opacity: running ? 1 : 0.45,
      transition: 'opacity 0.3s'
    }}>

      {/* Hours */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '3px' }}>
          <FlipUnit digit={Math.floor(h / 10)} shuffle={shuffleRef.current.h} unit="hours" />
          <FlipUnit digit={h % 10} shuffle={shuffleRef.current.h} unit="hours" />
        </div>
        <Label text="hours" />
      </div>

      <Colon running={running} />

      {/* Minutes */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '3px' }}>
          <FlipUnit digit={Math.floor(m / 10)} shuffle={shuffleRef.current.m} unit="minutes" />
          <FlipUnit digit={m % 10} shuffle={shuffleRef.current.m} unit="minutes" />
        </div>
        <Label text="mins" />
      </div>

      <Colon running={running} />

      {/* Seconds */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '3px' }}>
          <FlipUnit digit={Math.floor(s / 10)} shuffle={shuffleRef.current.s} unit="seconds" />
          <FlipUnit digit={s % 10} shuffle={shuffleRef.current.s} unit="seconds" />
        </div>
        <Label text="secs" />
      </div>

    </div>
  )
}

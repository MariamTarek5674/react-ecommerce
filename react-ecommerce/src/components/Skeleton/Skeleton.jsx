import React from 'react'
import style from './style.module.css'
export default function Skeleton() {
  return (
    <div className={`bg-gray-200 rounded-md w-full h-full ${style.animatePulse}`}></div>
  )
}

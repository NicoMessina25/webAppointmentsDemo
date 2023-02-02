import { ProgressSpinner } from 'primereact/progressspinner'
import React from 'react'

export default function Loader({size, className, strokeWidth, animationDuration, margin}:any) {
  return (
    <ProgressSpinner style={{width:size, height:size, margin:margin}} className={className} strokeWidth={strokeWidth} animationDuration={animationDuration} />
  )
}

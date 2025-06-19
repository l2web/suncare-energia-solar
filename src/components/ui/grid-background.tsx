"use client"

import * as React from "react"

export function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, #1e40af, #1e3a8a)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  )
} 
"use client"

import { useEffect, useRef } from "react"

export function QuantumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    console.log("Enhanced quantum-neural processing simulation initializing")
    const canvas = canvasRef.current
    if (!canvas) {
      console.error("Canvas element not found")
      return
    }

    const ctx = canvas.getContext("2d", { alpha: true, antialias: true })
    if (!ctx) {
      console.error("Could not get canvas context")
      return
    }

    // Set canvas to full screen with high resolution
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const resolutionMultiplier = 1.5 // Balanced for performance
      canvas.width = window.innerWidth * dpr * resolutionMultiplier
      canvas.height = window.innerHeight * dpr * resolutionMultiplier

      // Scale the context to ensure correct drawing dimensions
      ctx.scale(dpr * resolutionMultiplier, dpr * resolutionMultiplier)

      // Set the CSS size
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      console.log(`Canvas resized to ${canvas.width}x${canvas.height} with DPR ${dpr}`)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    // Define color palette for quantum and neural elements with neon gradients
    const colors = {
      primary: "rgba(0, 210, 255, 0.8)", // Quantum elements - Aqua blue
      secondary: "rgba(0, 255, 210, 0.8)", // Quantum states - Aqua green
      accent: "rgba(120, 0, 255, 0.8)", // Quantum entanglement - Purple
      highlight: "rgba(255, 255, 255, 0.9)", // Active elements - White
      neural: "rgba(180, 0, 255, 0.7)", // Neural pathways - Purple
      brain: "rgba(220, 100, 255, 0.7)", // Brain activity - Light purple
      agi: "rgba(0, 255, 180, 0.7)", // AGI processing - Aqua green
      background: "rgba(0, 30, 60, 0.2)",
      glow: "rgba(0, 255, 255, 0.8)", // Brighter glow
      numbers: "rgba(0, 255, 200, 0.6)", // Color for quantum numbers - Brighter aqua green
      bubble: "rgba(255, 255, 255, 0.8)", // Color for bubbles - Brighter white
      gradientStart: "rgba(0, 255, 210, 0.8)", // Aqua green start
      gradientMid: "rgba(0, 210, 255, 0.8)", // Aqua blue middle
      gradientEnd: "rgba(120, 0, 255, 0.8)", // Purple end
      gradientWhite: "rgba(255, 255, 255, 0.9)", // White highlight
    }

    // Define quantum circuit components
    const qubits = 5 // Number of qubits in our circuit
    const qubitSpacing = window.innerHeight / (qubits + 1)
    const gateWidth = 30
    const gateHeight = 30

    // Define quantum gates with their symbols and colors
    const gates = [
      { name: "H", symbol: "H", color: colors.primary, description: "Hadamard" },
      { name: "X", symbol: "X", color: colors.primary, description: "Pauli-X" },
      { name: "Y", symbol: "Y", color: colors.primary, description: "Pauli-Y" },
      { name: "Z", symbol: "Z", color: colors.primary, description: "Pauli-Z" },
      { name: "CNOT", symbol: "•", color: colors.secondary, description: "Controlled-NOT", control: true },
      { name: "T", symbol: "T", color: colors.primary, description: "T Gate" },
      { name: "S", symbol: "S", color: colors.primary, description: "S Gate" },
      { name: "Measure", symbol: "M", color: colors.highlight, description: "Measurement" },
    ]

    // Track all panels for number placement and bubble avoidance
    const panels: Array<{ x: number; y: number; width: number; height: number }> = []

    // Check if a point is inside any panel
    function isInsideAnyPanel(x: number, y: number, padding = 0): boolean {
      for (const panel of panels) {
        if (
          x >= panel.x - padding &&
          x <= panel.x + panel.width + padding &&
          y >= panel.y - padding &&
          y <= panel.y + panel.height + padding
        ) {
          return true
        }
      }
      return false
    }

    // Quantum Bubble class for tiny bursting effects
    class QuantumBubble {
      x: number
      y: number
      size: number
      maxSize: number
      growthRate: number
      alpha: number
      burstParticles: Array<{
        x: number
        y: number
        vx: number
        vy: number
        size: number
        alpha: number
      }>
      state: "growing" | "bursting" | "done"
      burstTime: number

      constructor() {
        // Find a position not inside any panel
        do {
          this.x = Math.random() * window.innerWidth
          this.y = Math.random() * window.innerHeight
        } while (isInsideAnyPanel(this.x, this.y, 20))

        this.size = 1.0 // Start slightly larger
        this.maxSize = Math.random() * 3.5 + 2.5 // Max size between 2.5-6 pixels
        this.growthRate = Math.random() * 0.05 + 0.02
        this.alpha = Math.random() * 0.3 + 0.4 // Semi-transparent
        this.burstParticles = []
        this.state = "growing"
        this.burstTime = 0
      }

      update() {
        if (this.state === "growing") {
          // Grow until max size
          this.size += this.growthRate
          if (this.size >= this.maxSize) {
            this.state = "bursting"
            this.burst()
          }
        } else if (this.state === "bursting") {
          // Update burst particles
          this.burstTime += 1

          for (let i = this.burstParticles.length - 1; i >= 0; i--) {
            const particle = this.burstParticles[i]
            particle.x += particle.vx
            particle.y += particle.vy
            particle.alpha -= 0.03
            particle.size -= 0.02

            // Remove faded particles
            if (particle.alpha <= 0 || particle.size <= 0) {
              this.burstParticles.splice(i, 1)
            }
          }

          // When all particles are gone, mark as done
          if (this.burstParticles.length === 0) {
            this.state = "done"
          }
        }
      }

      burst() {
        // Create burst particles
        const numParticles = Math.floor(Math.random() * 5) + 3 // 3-7 particles

        for (let i = 0; i < numParticles; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 0.5 + 0.2

          this.burstParticles.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 1.5 + 0.5, // Slightly larger burst particles
            alpha: Math.random() * 0.4 + 0.3,
          })
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.state === "growing") {
          // Draw the growing bubble with gradient
          ctx.save()

          // Create radial gradient for bubble
          const bubbleGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 1.5)
          bubbleGradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`)
          bubbleGradient.addColorStop(0.5, `rgba(0, 255, 210, ${this.alpha * 0.8})`)
          bubbleGradient.addColorStop(1, `rgba(0, 210, 255, ${this.alpha * 0.5})`)

          ctx.fillStyle = bubbleGradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()

          // Add subtle glow
          ctx.shadowColor = colors.glow
          ctx.shadowBlur = 5
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
          ctx.restore()
        } else if (this.state === "bursting") {
          // Draw burst particles with gradients
          ctx.save()
          for (const particle of this.burstParticles) {
            // Create radial gradient for particle
            const particleGradient = ctx.createRadialGradient(
              particle.x,
              particle.y,
              0,
              particle.x,
              particle.y,
              particle.size * 1.5,
            )
            particleGradient.addColorStop(0, `rgba(255, 255, 255, ${particle.alpha})`)
            particleGradient.addColorStop(0.7, `rgba(0, 255, 210, ${particle.alpha * 0.7})`)
            particleGradient.addColorStop(1, `rgba(120, 0, 255, ${particle.alpha * 0.5})`)

            ctx.fillStyle = particleGradient
            ctx.shadowColor = colors.glow
            ctx.shadowBlur = 3
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }
          ctx.restore()
        }
      }
    }

    // Quantum Numbers class for continuously increasing numbers
    class QuantumNumber {
      x: number
      y: number
      value: number
      speed: number
      size: number
      color: string
      alpha: number
      maxValue: number
      panel: { x: number; y: number; width: number; height: number }

      constructor(panel: { x: number; y: number; width: number; height: number }) {
        this.panel = panel
        // Position within the panel bounds
        this.x = panel.x + Math.random() * (panel.width - 40) + 20
        this.y = panel.y + Math.random() * (panel.height - 40) + 20
        this.value = Math.floor(Math.random() * 1000)
        this.speed = Math.random() * 0.5 + 0.1
        this.size = Math.random() * 8 + 6
        this.color = colors.numbers
        this.alpha = Math.random() * 0.3 + 0.1
        this.maxValue = 9999999
      }

      update() {
        // Increase value
        this.value += this.speed * 10

        // Reset when reaching max value
        if (this.value > this.maxValue) {
          this.value = 0
        }

        // Slowly move position but stay within panel bounds
        this.x += (Math.random() - 0.5) * 0.3
        this.y += (Math.random() - 0.5) * 0.3

        // Keep within panel bounds
        if (this.x < this.panel.x + 10) this.x = this.panel.x + 10
        if (this.x > this.panel.x + this.panel.width - 10) this.x = this.panel.x + this.panel.width - 10
        if (this.y < this.panel.y + 10) this.y = this.panel.y + 10
        if (this.y > this.panel.y + this.panel.height - 10) this.y = this.panel.y + this.panel.height - 10
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.font = `${this.size}px 'Courier New', monospace`

        // Create gradient for numbers
        const textGradient = ctx.createLinearGradient(this.x - 20, this.y, this.x + 20, this.y)
        textGradient.addColorStop(0, `rgba(0, 255, 210, ${this.alpha + 0.1})`)
        textGradient.addColorStop(0.5, `rgba(0, 210, 255, ${this.alpha + 0.1})`)
        textGradient.addColorStop(1, `rgba(120, 0, 255, ${this.alpha + 0.1})`)

        ctx.fillStyle = textGradient
        ctx.textAlign = "center"

        // Convert to binary for quantum feel
        const binaryValue = Math.floor(this.value).toString(2).padStart(8, "0")

        // Draw with neon glow
        ctx.shadowColor = colors.glow
        ctx.shadowBlur = 5
        ctx.fillText(binaryValue, this.x, this.y)
        ctx.shadowBlur = 0

        ctx.restore()
      }
    }

    // Minimal quantum data particles
    class QuantumParticle {
      x: number
      y: number
      targetX: number
      targetY: number
      size: number
      speed: number
      color: string
      value: number
      alpha: number
      processing: boolean
      type: string

      constructor(x: number, y: number, targetX: number, targetY: number, type = "quantum") {
        this.x = x
        this.y = y
        this.targetX = targetX
        this.targetY = targetY
        this.size = Math.random() * 1.5 + 1 // Very small size
        this.speed = Math.random() * 1.5 + 0.5
        this.type = type

        // Set color based on type
        if (type === "neural") {
          this.color = colors.neural
        } else if (type === "brain") {
          this.color = colors.brain
        } else if (type === "agi") {
          this.color = colors.agi
        } else {
          this.color = `hsla(${Math.random() * 60 + 180}, 100%, 70%, 0.4)` // Quantum
        }

        this.value = Math.random()
        this.alpha = 0.4 // Lower alpha
        this.processing = false
      }

      update() {
        // Calculate direction to target
        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Move toward target
        if (distance > 5) {
          this.x += (dx / distance) * this.speed
          this.y += (dy / distance) * this.speed
        } else {
          // Reached target, start processing
          this.processing = true
          // Quantum state fluctuation
          this.value = Math.sin(Date.now() * 0.001 + this.x * 0.1) * 0.5 + 0.5
          // Slowly fade out
          this.alpha -= 0.01
          if (this.alpha < 0) this.alpha = 0
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()

        // Create gradient based on particle type
        let particleGradient

        if (this.type === "neural") {
          particleGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
          particleGradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 0.9})`)
          particleGradient.addColorStop(0.5, `rgba(180, 0, 255, ${this.alpha * 0.7})`)
          particleGradient.addColorStop(1, `rgba(120, 0, 255, ${this.alpha * 0.5})`)
        } else if (this.type === "brain") {
          particleGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
          particleGradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 0.9})`)
          particleGradient.addColorStop(0.5, `rgba(220, 100, 255, ${this.alpha * 0.7})`)
          particleGradient.addColorStop(1, `rgba(180, 0, 255, ${this.alpha * 0.5})`)
        } else if (this.type === "agi") {
          particleGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
          particleGradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 0.9})`)
          particleGradient.addColorStop(0.5, `rgba(0, 255, 180, ${this.alpha * 0.7})`)
          particleGradient.addColorStop(1, `rgba(0, 210, 255, ${this.alpha * 0.5})`)
        } else {
          // Quantum type
          particleGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
          particleGradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 0.9})`)
          particleGradient.addColorStop(0.5, `rgba(0, 210, 255, ${this.alpha * 0.7})`)
          particleGradient.addColorStop(1, `rgba(0, 255, 210, ${this.alpha * 0.5})`)
        }

        // Apply gradient with glow
        ctx.fillStyle = particleGradient
        ctx.shadowColor = colors.glow
        ctx.shadowBlur = 3
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.restore()
      }
    }

    // Refined glass panel rendering function with gradient neon colors
    function drawGlassPanel(
      x: number,
      y: number,
      width: number,
      height: number,
      title = "",
      opacity = 0.2,
      borderColor = colors.primary,
      isProcessing = false,
    ) {
      ctx.save()

      // Add panel to the list for number placement
      panels.push({ x, y, width, height })

      // Create gradient background
      const gradient = ctx.createLinearGradient(x, y, x + width, y + height)
      gradient.addColorStop(0, `rgba(0, 255, 210, ${opacity + 0.05})`) // Aqua green
      gradient.addColorStop(0.3, `rgba(0, 210, 255, ${opacity + 0.03})`) // Aqua blue
      gradient.addColorStop(0.7, `rgba(120, 0, 255, ${opacity + 0.02})`) // Purple
      gradient.addColorStop(1, `rgba(0, 255, 210, ${opacity})`) // Back to aqua green

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(x, y, width, height, 10)
      ctx.fill()

      // Create gradient border
      const borderGradient = ctx.createLinearGradient(x, y, x + width, y + height)
      borderGradient.addColorStop(0, colors.gradientStart) // Aqua green
      borderGradient.addColorStop(0.5, colors.gradientMid) // Aqua blue
      borderGradient.addColorStop(1, colors.gradientEnd) // Purple

      // Subtle border with gradient
      ctx.strokeStyle = borderGradient
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.roundRect(x, y, width, height, 10)
      ctx.stroke()

      // Enhanced neon glow
      ctx.shadowColor = colors.glow
      ctx.shadowBlur = 10
      ctx.strokeStyle = borderGradient
      ctx.lineWidth = 0.8
      ctx.stroke()
      ctx.shadowBlur = 0

      // Add title if provided with gradient text
      if (title) {
        ctx.font = "14px 'Courier New', monospace"

        // Create gradient for text
        const textGradient = ctx.createLinearGradient(x + width / 2 - 50, y + 10, x + width / 2 + 50, y + 10)
        textGradient.addColorStop(0, colors.gradientStart) // Aqua green
        textGradient.addColorStop(0.5, colors.gradientMid) // Aqua blue
        textGradient.addColorStop(1, colors.gradientEnd) // Purple

        ctx.fillStyle = textGradient
        ctx.textAlign = "center"
        ctx.textBaseline = "top"

        // Add glow to text
        ctx.shadowColor = colors.glow
        ctx.shadowBlur = 5
        ctx.fillText(title, x + width / 2, y + 10)
        ctx.shadowBlur = 0
      }

      // If processing, add processing indicators with white neon
      if (isProcessing) {
        // Add processing status with white neon glow
        ctx.font = "12px 'Courier New', monospace"
        ctx.fillStyle = colors.gradientWhite
        ctx.textAlign = "right"
        ctx.textBaseline = "top"
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
        ctx.shadowBlur = 5
        ctx.fillText("PROCESSING", x + width - 15, y + 10)
        ctx.shadowBlur = 0
      }

      ctx.restore()
    }

    // Create a quantum circuit with refined visuals
    class QuantumCircuit {
      qubits: number
      depth: number
      gates: Array<Array<{ gate: any; control?: number; active?: boolean } | null>>
      qubitLines: Array<{ x: number; y: number; width: number }>
      panelX: number
      panelY: number
      panelWidth: number
      panelHeight: number
      qubitStates: number[]
      activeGate: { qubit: number; depth: number } | null
      processingTime: number
      particles: QuantumParticle[]

      constructor(
        qubits: number,
        depth: number,
        panelX: number,
        panelY: number,
        panelWidth: number,
        panelHeight: number,
      ) {
        this.qubits = qubits
        this.depth = depth
        this.gates = Array(qubits)
          .fill(null)
          .map(() => Array(depth).fill(null))
        this.qubitLines = []
        this.panelX = panelX
        this.panelY = panelY
        this.panelWidth = panelWidth
        this.panelHeight = panelHeight
        this.qubitStates = Array(qubits)
          .fill(0)
          .map(() => (Math.random() > 0.5 ? 1 : 0))
        this.activeGate = null
        this.processingTime = 0
        this.particles = []

        // Initialize qubit lines
        const lineStartX = panelX + 50
        const lineEndX = panelX + panelWidth - 50
        const lineSpacing = (panelHeight - 60) / (qubits + 1)

        for (let i = 0; i < qubits; i++) {
          this.qubitLines.push({
            x: lineStartX,
            y: panelY + 40 + lineSpacing * (i + 1),
            width: lineEndX - lineStartX,
          })
        }

        // Randomly place gates
        this.randomizeGates()
      }

      randomizeGates() {
        // Clear existing gates
        this.gates = Array(this.qubits)
          .fill(null)
          .map(() => Array(this.depth).fill(null))

        // Place single-qubit gates
        for (let q = 0; q < this.qubits; q++) {
          for (let d = 0; d < this.depth; d++) {
            // 30% chance of placing a gate (reduced density)
            if (Math.random() < 0.3) {
              // Select a random gate (excluding CNOT which is two-qubit)
              const gateIndex = Math.floor(Math.random() * (gates.length - 1))
              if (gateIndex >= 0 && gateIndex < gates.length && !gates[gateIndex].control) {
                this.gates[q][d] = { gate: gates[gateIndex], active: false }
              }
            }
          }
        }

        // Place CNOT gates (two-qubit gates)
        for (let d = 0; d < this.depth; d++) {
          // 15% chance of placing a CNOT gate (reduced density)
          if (Math.random() < 0.15 && this.qubits > 1) {
            // Select control and target qubits
            const controlQubit = Math.floor(Math.random() * this.qubits)
            let targetQubit
            do {
              targetQubit = Math.floor(Math.random() * this.qubits)
            } while (targetQubit === controlQubit)

            // Only place if both positions are empty
            if (!this.gates[controlQubit][d] && !this.gates[targetQubit][d]) {
              const cnotGate = gates.find((g) => g.name === "CNOT")
              if (cnotGate) {
                this.gates[controlQubit][d] = { gate: cnotGate, active: false }
                this.gates[targetQubit][d] = { gate: cnotGate, control: controlQubit, active: false }
              }
            }
          }
        }
      }

      generateParticles() {
        // Generate new particles at random intervals - very low probability
        if (Math.random() < 0.03) {
          const qubitIndex = Math.floor(Math.random() * this.qubits)
          const qubitLine = this.qubitLines[qubitIndex]

          // Create particle at the start of the qubit line
          const particle = new QuantumParticle(
            qubitLine.x - 20,
            qubitLine.y,
            qubitLine.x + qubitLine.width + 20,
            qubitLine.y,
          )

          this.particles.push(particle)
        }
      }

      updateParticles() {
        // Update existing particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].update()

          // Remove particles that have faded out
          if (this.particles[i].alpha <= 0) {
            this.particles.splice(i, 1)
          }
        }
      }

      processQubits() {
        // Simulate quantum processing
        this.processingTime += 0.02

        // Randomly activate gates to simulate processing
        if (Math.random() < 0.05) {
          const qubit = Math.floor(Math.random() * this.qubits)
          const depth = Math.floor(Math.random() * this.depth)

          if (qubit >= 0 && qubit < this.qubits && depth >= 0 && depth < this.depth && this.gates[qubit][depth]) {
            const gateInfo = this.gates[qubit][depth]
            if (gateInfo && gateInfo.gate) {
              // Activate this gate
              this.activeGate = { qubit, depth }
              this.gates[qubit][depth].active = true

              // Apply gate effect to qubit state
              if (gateInfo.gate.name === "X") {
                // X gate flips the qubit
                this.qubitStates[qubit] = this.qubitStates[qubit] === 0 ? 1 : 0
              } else if (gateInfo.gate.name === "H") {
                // H gate puts qubit in superposition (represented as 0.5)
                this.qubitStates[qubit] = 0.5
              }

              // If it's a CNOT gate, also affect the target qubit
              if (gateInfo.gate.name === "CNOT") {
                const controlQubit = qubit
                // Find the target qubit
                for (let q = 0; q < this.qubits; q++) {
                  if (q !== controlQubit && this.gates[q][depth] && this.gates[q][depth].control === controlQubit) {
                    // If control qubit is 1, flip the target qubit
                    if (this.qubitStates[controlQubit] === 1) {
                      this.qubitStates[q] = this.qubitStates[q] === 0 ? 1 : 0
                    }
                    this.gates[q][depth].active = true
                    break
                  }
                }
              }

              // Deactivate after a short time
              setTimeout(() => {
                if (this.activeGate) {
                  const { qubit, depth } = this.activeGate
                  if (
                    qubit >= 0 &&
                    qubit < this.qubits &&
                    depth >= 0 &&
                    depth < this.depth &&
                    this.gates[qubit][depth]
                  ) {
                    this.gates[qubit][depth].active = false

                    // Also deactivate any connected gates
                    if (this.gates[qubit][depth].gate && this.gates[qubit][depth].gate.name === "CNOT") {
                      const controlQubit = qubit
                      for (let q = 0; q < this.qubits; q++) {
                        if (
                          q !== controlQubit &&
                          this.gates[q][depth] &&
                          this.gates[q][depth].control === controlQubit
                        ) {
                          this.gates[q][depth].active = false
                          break
                        }
                      }
                    }
                  }
                  this.activeGate = null
                }
              }, 500)
            }
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, offsetX = 0) {
        // Process quantum computation
        this.processQubits()
        this.generateParticles()
        this.updateParticles()

        // Draw glass panel first with gradient colors
        drawGlassPanel(
          this.panelX + offsetX,
          this.panelY,
          this.panelWidth,
          this.panelHeight,
          "Quantum Processor",
          0.2,
          colors.gradientMid,
          true,
        )

        // Draw qubit lines with gradient effects
        ctx.lineWidth = 1.5

        for (let i = 0; i < this.qubitLines.length; i++) {
          const line = this.qubitLines[i]
          // Draw qubit line with state-based color
          const qubitState = this.qubitStates[i]

          // Create gradient for qubit line
          const lineGradient = ctx.createLinearGradient(line.x + offsetX, line.y, line.x + line.width + offsetX, line.y)

          if (qubitState === 0) {
            // |0⟩ state - Aqua blue to green gradient
            lineGradient.addColorStop(0, colors.gradientMid)
            lineGradient.addColorStop(1, colors.gradientStart)
          } else if (qubitState === 1) {
            // |1⟩ state - Purple to aqua gradient
            lineGradient.addColorStop(0, colors.gradientEnd)
            lineGradient.addColorStop(1, colors.gradientMid)
          } else {
            // Superposition state - Full gradient
            lineGradient.addColorStop(0, colors.gradientStart)
            lineGradient.addColorStop(0.5, colors.gradientMid)
            lineGradient.addColorStop(1, colors.gradientEnd)
          }

          // Apply gradient to stroke
          ctx.strokeStyle = lineGradient
          ctx.shadowColor = colors.glow
          ctx.shadowBlur = 5
          ctx.beginPath()
          ctx.moveTo(line.x + offsetX, line.y)
          ctx.lineTo(line.x + line.width + offsetX, line.y)
          ctx.stroke()
          ctx.shadowBlur = 0

          // Draw qubit state indicator with gradient fill
          const stateGradient = ctx.createRadialGradient(
            line.x + offsetX - 30,
            line.y,
            0,
            line.x + offsetX - 30,
            line.y,
            8,
          )

          if (qubitState === 0) {
            stateGradient.addColorStop(0, colors.gradientWhite)
            stateGradient.addColorStop(1, colors.gradientStart)
          } else if (qubitState === 1) {
            stateGradient.addColorStop(0, colors.gradientWhite)
            stateGradient.addColorStop(1, colors.gradientEnd)
          } else {
            stateGradient.addColorStop(0, colors.gradientWhite)
            stateGradient.addColorStop(1, colors.gradientMid)
          }

          ctx.fillStyle = stateGradient
          ctx.shadowColor = colors.glow
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(line.x + offsetX - 30, line.y, 6, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          // Draw qubit state value with white neon
          ctx.font = "12px 'Courier New', monospace"
          ctx.fillStyle = colors.gradientWhite
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
          ctx.shadowBlur = 5
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          let stateText
          if (qubitState === 0) stateText = "0"
          else if (qubitState === 1) stateText = "1"
          else stateText = "+"

          ctx.fillText(stateText, line.x + offsetX - 30, line.y)
          ctx.shadowBlur = 0
        }

        // Draw qubit labels with gradient
        ctx.font = "12px 'Courier New', monospace"
        const labelGradient = ctx.createLinearGradient(
          this.qubitLines[0].x + offsetX - 70,
          0,
          this.qubitLines[0].x + offsetX - 30,
          0,
        )
        labelGradient.addColorStop(0, colors.gradientStart)
        labelGradient.addColorStop(1, colors.gradientMid)

        ctx.fillStyle = labelGradient
        ctx.shadowColor = colors.glow
        ctx.shadowBlur = 3
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"

        for (let i = 0; i < this.qubits; i++) {
          ctx.fillText(`|q${i}⟩`, this.qubitLines[i].x + offsetX - 50, this.qubitLines[i].y)
        }
        ctx.shadowBlur = 0

        // Draw gates
        const gateSpacing = this.qubitLines[0].width / this.depth

        for (let q = 0; q < this.qubits; q++) {
          for (let d = 0; d < this.depth; d++) {
            const gateInfo = this.gates[q][d]
            if (gateInfo && gateInfo.gate) {
              const x = this.qubitLines[q].x + d * gateSpacing + gateSpacing / 2 + offsetX
              const y = this.qubitLines[q].y

              // Draw the gate
              this.drawGate(ctx, gateInfo.gate, x, y, gateInfo.active || false)

              // If this is a CNOT target, draw the connection line
              if (gateInfo.control !== undefined) {
                const controlY = this.qubitLines[gateInfo.control].y
                this.drawConnection(ctx, x, controlY, y, gateInfo.active || false)
              }
            }
          }
        }

        // Draw particles
        for (const particle of this.particles) {
          particle.draw(ctx)
        }

        // Draw quantum processor status
        ctx.font = "12px 'Courier New', monospace"
        ctx.fillStyle = colors.secondary
        ctx.textAlign = "left"
        ctx.textBaseline = "top"

        const statusX = this.panelX + offsetX + 20
        const statusY = this.panelY + this.panelHeight - 30

        ctx.fillText(`QUBITS: ${this.qubits}`, statusX, statusY)
        ctx.fillText(`GATES: ${this.depth}`, statusX + 150, statusY)
        ctx.fillText(`PROC TIME: ${this.processingTime.toFixed(2)}`, statusX + 300, statusY)
      }

      drawGate(ctx: CanvasRenderingContext2D, gate: any, x: number, y: number, active: boolean) {
        if (!gate) return // Skip if gate is null

        ctx.save()

        // Add subtle glow effect for active gates
        if (active) {
          ctx.shadowColor = colors.highlight
          ctx.shadowBlur = 5
        }

        if (gate.name === "Measure") {
          // Draw measurement gate (circle with cross)
          ctx.strokeStyle = active ? colors.highlight : gate.color
          ctx.lineWidth = 1.5

          // Circle
          ctx.beginPath()
          ctx.arc(x, y, gateWidth / 2, 0, Math.PI * 2)
          ctx.stroke()

          // Cross
          ctx.beginPath()
          ctx.moveTo(x - gateWidth / 3, y)
          ctx.lineTo(x + gateWidth / 3, y)
          ctx.moveTo(x, y - gateWidth / 3)
          ctx.lineTo(x, y + gateWidth / 3)
          ctx.stroke()
        } else if (gate.name === "CNOT" && !gate.control) {
          // Draw control point (filled circle)
          ctx.fillStyle = active ? colors.highlight : gate.color
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          ctx.fill()
        } else if (gate.name === "CNOT" && gate.control) {
          // Draw target (circle with plus)
          ctx.strokeStyle = active ? colors.highlight : gate.color
          ctx.lineWidth = 1.5

          // Circle
          ctx.beginPath()
          ctx.arc(x, y, gateWidth / 2, 0, Math.PI * 2)
          ctx.stroke()

          // Plus
          ctx.beginPath()
          ctx.moveTo(x - gateWidth / 3, y)
          ctx.lineTo(x + gateWidth / 3, y)
          ctx.moveTo(x, y - gateWidth / 3)
          ctx.lineTo(x, y + gateWidth / 3)
          ctx.stroke()
        } else {
          // Draw standard gate (square with symbol)
          ctx.strokeStyle = active ? colors.highlight : gate.color
          ctx.lineWidth = 1.5

          ctx.strokeRect(x - gateWidth / 2, y - gateHeight / 2, gateWidth, gateHeight)

          // Draw gate symbol
          ctx.fillStyle = active ? colors.highlight : gate.color
          ctx.font = "16px 'Courier New', monospace"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(gate.symbol, x, y)
        }

        ctx.restore()
      }

      drawConnection(ctx: CanvasRenderingContext2D, x: number, controlY: number, targetY: number, active: boolean) {
        ctx.save()

        ctx.strokeStyle = active ? colors.highlight : colors.secondary
        ctx.lineWidth = 1.5

        ctx.beginPath()
        ctx.moveTo(x, controlY)
        ctx.lineTo(x, targetY)
        ctx.stroke()

        ctx.restore()
      }
    }

    // Neural Network Visualization
    class NeuralNetwork {
      x: number
      y: number
      width: number
      height: number
      layers: number[]
      nodes: Array<
        Array<{
          x: number
          y: number
          value: number
          connections: number[]
          size: number
          baseSize: number
          pulsePhase: number
        }>
      >
      panelX: number
      panelY: number
      panelWidth: number
      panelHeight: number
      processingTime: number
      particles: QuantumParticle[]
      type: string // "agi" or "brain"
      heartbeatTime: number

      constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        layers: number[],
        panelX: number,
        panelY: number,
        panelWidth: number,
        panelHeight: number,
        type = "agi",
      ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.layers = layers
        this.nodes = []
        this.panelX = panelX
        this.panelY = panelY
        this.panelWidth = panelWidth
        this.panelHeight = panelHeight
        this.processingTime = 0
        this.particles = []
        this.type = type
        this.heartbeatTime = 0

        // Initialize nodes
        this.initializeNodes()
      }

      initializeNodes() {
        const layerSpacing = this.width / (this.layers.length - 1)

        for (let l = 0; l < this.layers.length; l++) {
          const layerNodes = []
          const nodeSpacing = this.height / (this.layers[l] + 1)

          for (let n = 0; n < this.layers[l]; n++) {
            const nodeX = this.x + l * layerSpacing
            const nodeY = this.y + (n + 1) * nodeSpacing
            const baseSize = 3 // Base node size
            const pulsePhase = Math.random() * Math.PI * 2 // Random starting phase for heartbeat

            // Create connections to previous layer
            const connections = []
            if (l > 0) {
              for (let p = 0; p < this.layers[l - 1]; p++) {
                // Not all nodes connect - create sparse connections
                if (Math.random() < 0.7) {
                  connections.push(p)
                }
              }
            }

            layerNodes.push({
              x: nodeX,
              y: nodeY,
              value: Math.random(), // Random activation
              connections: connections,
              size: baseSize, // Current size (will be animated)
              baseSize: baseSize, // Base size to return to
              pulsePhase: pulsePhase, // Phase for heartbeat effect
            })
          }

          this.nodes.push(layerNodes)
        }
      }

      update() {
        this.processingTime += 0.02
        this.heartbeatTime += 0.03 // Heartbeat timer

        // Update node values - simulate neural processing
        for (let l = 1; l < this.layers.length; l++) {
          for (let n = 0; n < this.layers[l]; n++) {
            if (n < this.nodes[l].length) {
              const node = this.nodes[l][n]

              // Update based on connected nodes from previous layer
              if (Math.random() < 0.1) {
                let sum = 0
                for (const connIdx of node.connections) {
                  if (l > 0 && connIdx < this.nodes[l - 1].length) {
                    sum += this.nodes[l - 1][connIdx].value
                  }
                }

                // Apply activation function (sigmoid-like)
                if (node.connections.length > 0) {
                  node.value = Math.sin(sum / node.connections.length + this.processingTime) * 0.5 + 0.5
                }
              }

              // Apply heartbeat/breathing effect - only for brain type
              if (this.type === "brain") {
                // Calculate heartbeat pulse (sine wave with node's phase)
                const pulse = Math.sin(this.heartbeatTime + node.pulsePhase) * 0.5 + 0.5
                // Apply pulse to node size (between 0.8x and 1.5x of base size)
                node.size = node.baseSize * (0.8 + pulse * 0.7)
              }
            }
          }
        }

        // Generate particles
        if (Math.random() < 0.05 && this.nodes.length > 0) {
          // Select random nodes from first and last layer
          const startLayer = 0
          const endLayer = this.layers.length - 1

          if (
            this.nodes[startLayer] &&
            this.nodes[endLayer] &&
            this.nodes[startLayer].length > 0 &&
            this.nodes[endLayer].length > 0
          ) {
            const startNode = Math.floor(Math.random() * this.nodes[startLayer].length)
            const endNode = Math.floor(Math.random() * this.nodes[endLayer].length)

            if (startNode < this.nodes[startLayer].length && endNode < this.nodes[endLayer].length) {
              const startX = this.nodes[startLayer][startNode].x
              const startY = this.nodes[startLayer][startNode].y
              const endX = this.nodes[endLayer][endNode].x
              const endY = this.nodes[endLayer][endNode].y

              // Create particle
              const particleType = this.type === "agi" ? "agi" : "brain"
              const particle = new QuantumParticle(startX, startY, endX, endY, particleType)
              this.particles.push(particle)
            }
          }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].update()

          // Remove particles that have faded out
          if (this.particles[i].alpha <= 0) {
            this.particles.splice(i, 1)
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw glass panel with gradient colors
        const panelColor = this.type === "agi" ? colors.gradientStart : colors.gradientEnd
        const title = this.type === "agi" ? "AGI Neural Network" : "Brain Neural Interface"

        drawGlassPanel(this.panelX, this.panelY, this.panelWidth, this.panelHeight, title, 0.2, panelColor, true)

        ctx.save()

        // Draw connections with gradient colors
        for (let l = 1; l < this.layers.length; l++) {
          if (l < this.nodes.length) {
            for (let n = 0; n < this.nodes[l].length; n++) {
              const node = this.nodes[l][n]

              for (const connIdx of node.connections) {
                if (l > 0 && connIdx < this.nodes[l - 1].length) {
                  const prevNode = this.nodes[l - 1][connIdx]
                  const strength = (node.value + prevNode.value) / 2

                  // Create gradient for connection
                  const connGradient = ctx.createLinearGradient(node.x, node.y, prevNode.x, prevNode.y)

                  if (this.type === "agi") {
                    connGradient.addColorStop(0, `rgba(0, 255, 180, ${strength * 0.6})`)
                    connGradient.addColorStop(1, `rgba(0, 210, 255, ${strength * 0.6})`)
                  } else {
                    connGradient.addColorStop(0, `rgba(180, 0, 255, ${strength * 0.6})`)
                    connGradient.addColorStop(1, `rgba(255, 100, 255, ${strength * 0.6})`)
                  }

                  // Draw connection with gradient
                  ctx.strokeStyle = connGradient
                  ctx.lineWidth = 0.8
                  ctx.shadowColor = this.type === "agi" ? colors.gradientStart : colors.gradientEnd
                  ctx.shadowBlur = strength * 5

                  ctx.beginPath()
                  ctx.moveTo(node.x, node.y)
                  ctx.lineTo(prevNode.x, prevNode.y)
                  ctx.stroke()
                  ctx.shadowBlur = 0
                }
              }
            }
          }
        }

        // Draw nodes with gradient fills
        for (let l = 0; l < this.nodes.length; l++) {
          for (let n = 0; n < this.nodes[l].length; n++) {
            const node = this.nodes[l][n]

            // Create radial gradient for node
            const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2)

            if (this.type === "agi") {
              nodeGradient.addColorStop(0, `rgba(255, 255, 255, ${0.5 + node.value * 0.5})`)
              nodeGradient.addColorStop(0.5, `rgba(0, 255, 180, ${0.4 + node.value * 0.5})`)
              nodeGradient.addColorStop(1, `rgba(0, 210, 255, ${0.3 + node.value * 0.5})`)
            } else {
              nodeGradient.addColorStop(0, `rgba(255, 255, 255, ${0.5 + node.value * 0.5})`)
              nodeGradient.addColorStop(0.5, `rgba(220, 100, 255, ${0.4 + node.value * 0.5})`)
              nodeGradient.addColorStop(1, `rgba(120, 0, 255, ${0.3 + node.value * 0.5})`)
            }

            // Draw node with gradient fill
            ctx.fillStyle = nodeGradient
            ctx.beginPath()
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
            ctx.fill()

            // Add neon glow for active nodes
            if (node.value > 0.7) {
              ctx.shadowColor = this.type === "agi" ? colors.gradientStart : colors.gradientEnd
              ctx.shadowBlur = 8
              ctx.beginPath()
              ctx.arc(node.x, node.y, node.size + 1, 0, Math.PI * 2)
              ctx.fill()
              ctx.shadowBlur = 0
            }
          }
        }

        // Draw particles
        for (const particle of this.particles) {
          particle.draw(ctx)
        }

        // Draw status
        ctx.font = "12px 'Courier New', monospace"
        ctx.fillStyle = this.type === "agi" ? colors.agi : colors.brain
        ctx.textAlign = "left"
        ctx.textBaseline = "top"

        const statusX = this.panelX + 20
        const statusY = this.panelY + this.panelHeight - 30

        ctx.fillText(`NEURONS: ${this.layers.reduce((a, b) => a + b, 0)}`, statusX, statusY)
        ctx.fillText(`LAYERS: ${this.layers.length}`, statusX + 150, statusY)

        // For brain type, show heartbeat status
        if (this.type === "brain") {
          const heartRate = 60 + Math.sin(this.heartbeatTime * 0.5) * 10
          ctx.fillText(`HEARTRATE: ${heartRate.toFixed(0)} BPM`, statusX + 250, statusY)
        }

        ctx.restore()
      }
    }

    // Brain-Quantum Interface
    class BrainQuantumInterface {
      x: number
      y: number
      width: number
      height: number
      panelX: number
      panelY: number
      panelWidth: number
      panelHeight: number
      processingTime: number
      particles: QuantumParticle[]
      connections: Array<{
        from: { x: number; y: number; type: string }
        to: { x: number; y: number; type: string }
        active: boolean
      }>

      constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        panelX: number,
        panelY: number,
        panelWidth: number,
        panelHeight: number,
      ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.panelX = panelX
        this.panelY = panelY
        this.panelWidth = panelWidth
        this.panelHeight = panelHeight
        this.processingTime = 0
        this.particles = []
        this.connections = []
      }

      setConnections(
        brainPoints: Array<{ x: number; y: number }>,
        quantumPoints: Array<{ x: number; y: number }>,
        agiPoints: Array<{ x: number; y: number }>,
      ) {
        this.connections = []

        // Create connections between brain and quantum
        for (let i = 0; i < Math.min(brainPoints.length, 5); i++) {
          if (brainPoints.length > 0 && quantumPoints.length > 0) {
            const brainIdx = Math.floor(Math.random() * brainPoints.length)
            const quantumIdx = Math.floor(Math.random() * quantumPoints.length)

            if (brainIdx < brainPoints.length && quantumIdx < quantumPoints.length) {
              this.connections.push({
                from: { x: brainPoints[brainIdx].x, y: brainPoints[brainIdx].y, type: "brain" },
                to: { x: quantumPoints[quantumIdx].x, y: quantumPoints[quantumIdx].y, type: "quantum" },
                active: Math.random() > 0.5,
              })
            }
          }
        }

        // Create connections between quantum and AGI
        for (let i = 0; i < Math.min(agiPoints.length, 5); i++) {
          if (agiPoints.length > 0 && quantumPoints.length > 0) {
            const agiIdx = Math.floor(Math.random() * agiPoints.length)
            const quantumIdx = Math.floor(Math.random() * quantumPoints.length)

            if (agiIdx < agiPoints.length && quantumIdx < quantumPoints.length) {
              this.connections.push({
                from: { x: quantumPoints[quantumIdx].x, y: quantumPoints[quantumIdx].y, type: "quantum" },
                to: { x: agiPoints[agiIdx].x, y: agiPoints[agiIdx].y, type: "agi" },
                active: Math.random() > 0.5,
              })
            }
          }
        }

        // Create a few direct brain to AGI connections
        for (let i = 0; i < 3; i++) {
          if (brainPoints.length > 0 && agiPoints.length > 0) {
            const brainIdx = Math.floor(Math.random() * brainPoints.length)
            const agiIdx = Math.floor(Math.random() * agiPoints.length)

            if (brainIdx < brainPoints.length && agiIdx < agiPoints.length) {
              this.connections.push({
                from: { x: brainPoints[brainIdx].x, y: brainPoints[brainIdx].y, type: "brain" },
                to: { x: agiPoints[agiIdx].x, y: agiPoints[agiIdx].y, type: "agi" },
                active: Math.random() > 0.7,
              })
            }
          }
        }
      }

      update() {
        this.processingTime += 0.02

        // Randomly activate/deactivate connections
        if (Math.random() < 0.05 && this.connections.length > 0) {
          const connIdx = Math.floor(Math.random() * this.connections.length)
          if (connIdx < this.connections.length) {
            this.connections[connIdx].active = !this.connections[connIdx].active

            // Create particle along the connection
            if (this.connections[connIdx].active) {
              const conn = this.connections[connIdx]
              const particleType =
                conn.from.type === "brain" ? "brain" : conn.from.type === "quantum" ? "quantum" : "agi"

              const particle = new QuantumParticle(conn.from.x, conn.from.y, conn.to.x, conn.to.y, particleType)

              this.particles.push(particle)
            }
          }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].update()

          // Remove particles that have faded out
          if (this.particles[i].alpha <= 0) {
            this.particles.splice(i, 1)
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw glass panel with gradient colors
        drawGlassPanel(
          this.panelX,
          this.panelY,
          this.panelWidth,
          this.panelHeight,
          "Brain-Quantum-AGI Interface",
          0.2,
          colors.gradientMid,
          true,
        )

        ctx.save()

        // Draw connections with gradient colors
        for (const conn of this.connections) {
          let connGradient

          if (conn.from.type === "brain" && conn.to.type === "quantum") {
            connGradient = ctx.createLinearGradient(conn.from.x, conn.from.y, conn.to.x, conn.to.y)
            connGradient.addColorStop(0, `rgba(180, 0, 255, ${conn.active ? 0.8 : 0.3})`)
            connGradient.addColorStop(1, `rgba(0, 210, 255, ${conn.active ? 0.8 : 0.3})`)
          } else if (conn.from.type === "quantum" && conn.to.type === "agi") {
            connGradient = ctx.createLinearGradient(conn.from.x, conn.from.y, conn.to.x, conn.to.y)
            connGradient.addColorStop(0, `rgba(0, 210, 255, ${conn.active ? 0.8 : 0.3})`)
            connGradient.addColorStop(1, `rgba(0, 255, 180, ${conn.active ? 0.8 : 0.3})`)
          } else {
            connGradient = ctx.createLinearGradient(conn.from.x, conn.from.y, conn.to.x, conn.to.y)
            connGradient.addColorStop(0, `rgba(180, 0, 255, ${conn.active ? 0.8 : 0.3})`)
            connGradient.addColorStop(1, `rgba(0, 255, 180, ${conn.active ? 0.8 : 0.3})`)
          }

          ctx.strokeStyle = connGradient
          ctx.lineWidth = conn.active ? 1.5 : 0.8

          // Add glow for active connections
          if (conn.active) {
            ctx.shadowColor = colors.glow
            ctx.shadowBlur = 8
          }

          // Draw dashed line for inactive connections
          if (!conn.active) {
            ctx.setLineDash([2, 3])
          } else {
            ctx.setLineDash([])
          }

          ctx.beginPath()
          ctx.moveTo(conn.from.x, conn.from.y)
          ctx.lineTo(conn.to.x, conn.to.y)
          ctx.stroke()
          ctx.shadowBlur = 0

          // Reset line dash
          ctx.setLineDash([])
        }

        // Draw particles
        for (const particle of this.particles) {
          particle.draw(ctx)
        }

        // Draw interface status
        ctx.font = "12px 'Courier New', monospace"
        ctx.fillStyle = colors.neural
        ctx.textAlign = "left"
        ctx.textBaseline = "top"

        const statusX = this.panelX + 20
        const statusY = this.panelY + this.panelHeight - 30

        const activeConns = this.connections.filter((c) => c.active).length

        ctx.fillText(`CONNECTIONS: ${this.connections.length}`, statusX, statusY)
        ctx.fillText(`ACTIVE: ${activeConns}`, statusX + 150, statusY)
        ctx.fillText(`BANDWIDTH: ${(activeConns * 10).toFixed(1)} Tb/s`, statusX + 250, statusY)

        ctx.restore()
      }
    }

    // Circuit panel dimensions
    const circuitPanelHeight = window.innerHeight * 0.2
    const circuitPanelWidth = window.innerWidth * 0.7
    const circuitPanelY = window.innerHeight * 0.05

    // Create quantum circuits
    const circuits: QuantumCircuit[] = []
    const numCircuits = 1
    const circuitDepth = 12

    for (let i = 0; i < numCircuits; i++) {
      circuits.push(
        new QuantumCircuit(
          qubits,
          circuitDepth,
          (window.innerWidth - circuitPanelWidth) / 2,
          circuitPanelY,
          circuitPanelWidth,
          circuitPanelHeight,
        ),
      )
    }

    // Circuit positions and speeds
    const circuitPositions = circuits.map(() => 0)
    const circuitSpeeds = circuits.map(() => 0.3) // Slower movement

    // Neural network panel dimensions
    const networkPanelWidth = window.innerWidth * 0.3
    const networkPanelHeight = window.innerHeight * 0.25

    // AGI neural network
    const agiNetworkX = window.innerWidth * 0.1
    const agiNetworkY = window.innerHeight * 0.3
    const agiNetwork = new NeuralNetwork(
      agiNetworkX + 30,
      agiNetworkY + 30,
      networkPanelWidth - 60,
      networkPanelHeight - 60,
      [4, 8, 6, 4], // Layers
      agiNetworkX,
      agiNetworkY,
      networkPanelWidth,
      networkPanelHeight,
      "agi",
    )

    // Brain neural network
    const brainNetworkX = window.innerWidth * 0.6
    const brainNetworkY = window.innerHeight * 0.3
    const brainNetwork = new NeuralNetwork(
      brainNetworkX + 30,
      brainNetworkY + 30,
      networkPanelWidth - 60,
      networkPanelHeight - 60,
      [5, 7, 6, 3], // Layers
      brainNetworkX,
      brainNetworkY,
      networkPanelWidth,
      networkPanelHeight,
      "brain",
    )

    // Interface panel dimensions
    const interfacePanelWidth = window.innerWidth * 0.8
    const interfacePanelHeight = window.innerHeight * 0.15
    const interfacePanelX = (window.innerWidth - interfacePanelWidth) / 2
    const interfacePanelY = window.innerHeight * 0.6

    // Create interface
    const brainQuantumInterface = new BrainQuantumInterface(
      interfacePanelX + 30,
      interfacePanelY + 30,
      interfacePanelWidth - 60,
      interfacePanelHeight - 60,
      interfacePanelX,
      interfacePanelY,
      interfacePanelWidth,
      interfacePanelHeight,
    )

    // Collect connection points
    const getBrainPoints = () => {
      const points = []
      // Get points from the first layer of brain network
      if (brainNetwork.nodes.length > 0) {
        for (const node of brainNetwork.nodes[0]) {
          points.push({ x: node.x, y: node.y })
        }
      }
      return points
    }

    const getQuantumPoints = () => {
      const points = []
      // Get points from the quantum circuit
      for (const circuit of circuits) {
        for (const line of circuit.qubitLines) {
          points.push({ x: line.x, y: line.y })
        }
      }
      return points
    }

    const getAGIPoints = () => {
      const points = []
      // Get points from the last layer of AGI network
      if (agiNetwork.nodes.length > 0) {
        const lastLayer = agiNetwork.nodes[agiNetwork.nodes.length - 1]
        for (const node of lastLayer) {
          points.push({ x: node.x, y: node.y })
        }
      }
      return points
    }

    // Set up interface connections
    brainQuantumInterface.setConnections(getBrainPoints(), getQuantumPoints(), getAGIPoints())

    // Create minimal background quantum particles
    const backgroundParticles: QuantumParticle[] = []
    const numBackgroundParticles = 15 // Reduced for clarity

    // Create quantum numbers for background
    const quantumNumbers: QuantumNumber[] = []
    const numQuantumNumbers = 25 // Number of floating numbers to display

    // Create bubbles for bursting effect
    const bubbles: QuantumBubble[] = []
    const maxBubbles = 30 // Maximum number of bubbles at any time

    function createBackgroundParticles() {
      while (backgroundParticles.length < numBackgroundParticles) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        const targetX = Math.random() * window.innerWidth
        const targetY = Math.random() * window.innerHeight

        // Mix of different particle types
        const types = ["quantum", "neural", "brain", "agi"]
        const type = types[Math.floor(Math.random() * types.length)]

        const particle = new QuantumParticle(x, y, targetX, targetY, type)
        particle.size = Math.random() * 1.5 + 0.5 // Very small particles
        particle.speed = Math.random() * 0.3 + 0.1 // Slower movement
        particle.alpha = Math.random() * 0.2 + 0.1 // Very transparent

        backgroundParticles.push(particle)
      }
    }

    function createQuantumNumbers() {
      // Clear existing panels array before redrawing
      panels.length = 0

      // Wait for panels to be drawn before creating numbers
      setTimeout(() => {
        // Only create numbers if we have panels
        if (panels.length > 0) {
          while (quantumNumbers.length < numQuantumNumbers) {
            // Select a random panel
            const randomPanel = panels[Math.floor(Math.random() * panels.length)]
            quantumNumbers.push(new QuantumNumber(randomPanel))
          }
        }
      }, 100)
    }

    function updateBubbles() {
      // Create new bubbles if we're below the maximum
      if (bubbles.length < maxBubbles && Math.random() < 0.1) {
        bubbles.push(new QuantumBubble())
      }

      // Update existing bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].update()

        // Remove bubbles that are done
        if (bubbles[i].state === "done") {
          bubbles.splice(i, 1)
        }
      }
    }

    createBackgroundParticles()
    createQuantumNumbers()

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Reset panels array for this frame
      panels.length = 0

      // Update and draw minimal background particles
      for (let i = backgroundParticles.length - 1; i >= 0; i--) {
        backgroundParticles[i].update()
        backgroundParticles[i].draw(ctx)

        // Replace particles that have faded out
        if (backgroundParticles[i].alpha <= 0) {
          const x = Math.random() * window.innerWidth
          const y = Math.random() * window.innerHeight
          const targetX = Math.random() * window.innerWidth
          const targetY = Math.random() * window.innerHeight

          const types = ["quantum", "neural", "brain", "agi"]
          const type = types[Math.floor(Math.random() * types.length)]

          backgroundParticles[i] = new QuantumParticle(x, y, targetX, targetY, type)
          backgroundParticles[i].size = Math.random() * 1.5 + 0.5
          backgroundParticles[i].speed = Math.random() * 0.3 + 0.1
          backgroundParticles[i].alpha = Math.random() * 0.2 + 0.1
        }
      }

      // Update and draw bubbles
      updateBubbles()
      for (const bubble of bubbles) {
        bubble.draw(ctx)
      }

      // Update and draw circuits
      for (let i = 0; i < circuits.length; i++) {
        circuitPositions[i] += circuitSpeeds[i]

        // Reset position when circuit moves off screen
        if (circuitPositions[i] > window.innerWidth * 0.5) {
          circuitPositions[i] = -window.innerWidth * 0.5
          circuits[i].randomizeGates()
        }

        circuits[i].draw(ctx, circuitPositions[i])
      }

      // Update and draw neural networks
      agiNetwork.update()
      agiNetwork.draw(ctx)

      brainNetwork.update()
      brainNetwork.draw(ctx)

      // Update and draw interface
      brainQuantumInterface.update()
      brainQuantumInterface.draw(ctx)

      // Update and draw quantum numbers
      // If we don't have enough numbers or need to recreate them
      if (quantumNumbers.length < numQuantumNumbers && panels.length > 0) {
        while (quantumNumbers.length < numQuantumNumbers) {
          // Select a random panel
          const randomPanel = panels[Math.floor(Math.random() * panels.length)]
          quantumNumbers.push(new QuantumNumber(randomPanel))
        }
      }

      // Update and draw existing quantum numbers
      for (let i = quantumNumbers.length - 1; i >= 0; i--) {
        quantumNumbers[i].update()
        quantumNumbers[i].draw(ctx)
      }

      requestAnimationFrame(animate)
    }

    animate()
    console.log("Quantum-Neural-AGI simulation started with bursting bubbles effect")

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-5]"
      style={{
        pointerEvents: "none",
        opacity: 0.8, // Reduced opacity for subtler effect
      }}
    />
  )
}

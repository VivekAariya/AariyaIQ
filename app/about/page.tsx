"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Award,
  BookOpen,
  Users,
  Lightbulb,
  Globe,
  Star,
  Zap,
  Brain,
  Cpu,
  Trophy,
  UserCheck,
  BarChart,
  Briefcase,
  Workflow,
  FileCode,
  MessageSquare,
  PieChart,
  Smartphone,
} from "lucide-react"

// AI domains data
const aiDomains = [
  {
    id: "hr",
    name: "AI HR",
    icon: <UserCheck className="h-3.5 w-3.5" />,
    color: "from-purple-600 to-pink-500",
    facts: [
      "AI HR systems can reduce hiring bias by 30%",
      "Automated candidate screening saves 23 hours per hire",
      "AI can predict employee turnover with 95% accuracy",
    ],
  },
  {
    id: "ats",
    name: "AI ATS",
    icon: <Briefcase className="h-3.5 w-3.5" />,
    color: "from-blue-500 to-cyan-400",
    facts: [
      "AI ATS can process 250 resumes in under a minute",
      "Smart keyword matching improves candidate quality by 40%",
      "AI ATS reduces time-to-hire by an average of 9 days",
    ],
  },
  {
    id: "hris",
    name: "AI HRIS",
    icon: <Workflow className="h-3.5 w-3.5" />,
    color: "from-green-500 to-emerald-400",
    facts: [
      "AI HRIS can automate 70% of HR administrative tasks",
      "Predictive analytics can forecast staffing needs 6 months ahead",
      "Employee self-service reduces HR inquiries by 40%",
    ],
  },
  {
    id: "marketing",
    name: "AI Marketing",
    icon: <BarChart className="h-3.5 w-3.5" />,
    color: "from-orange-500 to-amber-400",
    facts: [
      "AI-driven personalization increases conversion rates by 25%",
      "Predictive analytics can forecast campaign performance with 85% accuracy",
      "AI content generation tools can create 10x more content variations",
    ],
  },
  {
    id: "dev",
    name: "AI Dev",
    icon: <FileCode className="h-3.5 w-3.5" />,
    color: "from-red-500 to-rose-400",
    facts: [
      "AI pair programming tools increase developer productivity by 35%",
      "Automated code review catches 24% more bugs than manual review",
      "AI can generate 60% of boilerplate code automatically",
    ],
  },
  {
    id: "chatbot",
    name: "AI Chatbots",
    icon: <MessageSquare className="h-3.5 w-3.5" />,
    color: "from-violet-500 to-purple-400",
    facts: [
      "Modern chatbots can resolve 70% of customer inquiries without human intervention",
      "AI chatbots reduce customer service costs by up to 30%",
      "Multilingual chatbots can communicate in over 100 languages",
    ],
  },
  {
    id: "analytics",
    name: "AI Analytics",
    icon: <PieChart className="h-3.5 w-3.5" />,
    color: "from-cyan-500 to-blue-400",
    facts: [
      "AI analytics can process unstructured data 40x faster than traditional methods",
      "Predictive models can forecast trends with 87% accuracy",
      "Real-time analytics reduces decision-making time by 60%",
    ],
  },
  {
    id: "mobile",
    name: "AI Mobile",
    icon: <Smartphone className="h-3.5 w-3.5" />,
    color: "from-fuchsia-500 to-pink-400",
    facts: [
      "On-device AI reduces cloud processing needs by 70%",
      "AI-powered apps use 30% less battery through smart optimization",
      "Edge AI enables real-time processing with 50ms latency",
    ],
  },
  {
    id: "quantum",
    name: "Quantum AI",
    icon: <Cpu className="h-3.5 w-3.5" />,
    color: "from-indigo-500 to-blue-400",
    facts: [
      "Quantum AI can solve complex problems 100 million times faster",
      "Quantum machine learning models require 90% less training data",
      "Quantum neural networks can process multidimensional data simultaneously",
    ],
  },
  {
    id: "neuro",
    name: "NeuroAI",
    icon: <Brain className="h-3.5 w-3.5" />,
    color: "from-emerald-500 to-green-400",
    facts: [
      "Brain-computer interfaces can translate thoughts to text with 94% accuracy",
      "NeuroAI models mimic human learning with 60% less computational power",
      "Neuromorphic chips process information 1000x more efficiently than GPUs",
    ],
  },
]

// Achievements data
const achievements = [
  { id: "fast_learner", name: "Fast Learner", icon: <Zap className="h-3.5 w-3.5" />, requirement: 100 },
  { id: "ai_explorer", name: "AI Explorer", icon: <Star className="h-3.5 w-3.5" />, requirement: 5 },
  { id: "future_ready", name: "Future Ready", icon: <Trophy className="h-3.5 w-3.5" />, requirement: 250 },
  { id: "hr_specialist", name: "HR Specialist", icon: <UserCheck className="h-3.5 w-3.5" />, requirement: 3 },
  { id: "tech_visionary", name: "Tech Visionary", icon: <Cpu className="h-3.5 w-3.5" />, requirement: 3 },
]

function MouseInteractiveGame() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [collectibles, setCollectibles] = useState<
    Array<{
      id: number
      x: number
      y: number
      collected: boolean
      type: string
      domainId?: string
      moving?: boolean
      direction?: { x: number; y: number }
      speed?: number
      angle?: number
      radius?: number
    }>
  >([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipContent, setTooltipContent] = useState("")
  const [domainLevels, setDomainLevels] = useState<Record<string, number>>({
    hr: 0,
    ats: 0,
    hris: 0,
    marketing: 0,
    dev: 0,
    chatbot: 0,
    analytics: 0,
    mobile: 0,
    quantum: 0,
    neuro: 0,
  })
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [showFact, setShowFact] = useState(false)
  const [currentFact, setCurrentFact] = useState({ text: "", domain: "" })
  const [challenge, setChallenge] = useState<{
    active: boolean
    domainId: string
    count: number
    target: number
    completed: boolean
  } | null>(null)
  const [powerUp, setPowerUp] = useState<{
    active: boolean
    type: string
    duration: number
    startTime: number
  } | null>(null)
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      color: string
      size: number
      velocity: { x: number; y: number }
      life: number
      maxLife: number
    }>
  >([])
  const [skillTree, setSkillTree] = useState<{
    nodes: Array<{
      id: string
      x: number
      y: number
      unlocked: boolean
      domainId: string
    }>
    connections: Array<{
      from: string
      to: string
    }>
  }>({
    nodes: [],
    connections: [],
  })

  // Initialize collectibles and skill tree
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const newCollectibles = []

    // Create skill orbs
    for (let i = 0; i < 7; i++) {
      const domainId = aiDomains[Math.floor(Math.random() * aiDomains.length)].id
      const isMoving = Math.random() > 0.5

      newCollectibles.push({
        id: i,
        x: Math.random() * (container.width - 60) + 30,
        y: Math.random() * (container.height - 120) + 60,
        collected: false,
        type: Math.random() > 0.7 ? "xp" : "skill",
        domainId: domainId,
        moving: isMoving,
        direction: isMoving
          ? {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2,
            }
          : undefined,
        speed: Math.random() * 0.5 + 0.3,
      })
    }

    // Add a power-up
    if (Math.random() > 0.7) {
      newCollectibles.push({
        id: newCollectibles.length,
        x: Math.random() * (container.width - 60) + 30,
        y: Math.random() * (container.height - 120) + 60,
        collected: false,
        type: "powerup",
        moving: true,
        direction: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        speed: Math.random() * 0.3 + 0.2,
      })
    }

    setCollectibles(newCollectibles)

    // Initialize skill tree
    const nodes = aiDomains.map((domain, index) => {
      // Calculate positions in a more compact arrangement
      const totalDomains = aiDomains.length
      const angle = (index / totalDomains) * Math.PI * 2
      const radius = Math.min(container.width, container.height) * 0.22

      return {
        id: domain.id,
        x: container.width / 2 + Math.cos(angle) * radius,
        y: container.height / 2 + Math.sin(angle) * radius,
        unlocked: false,
        domainId: domain.id,
      }
    })

    // Create connections between adjacent nodes
    const connections = nodes.map((node, index) => ({
      from: node.id,
      to: nodes[(index + 1) % nodes.length].id,
    }))

    // Add some cross connections for a more interesting network
    for (let i = 0; i < 3; i++) {
      const from = Math.floor(Math.random() * nodes.length)
      let to = Math.floor(Math.random() * nodes.length)
      while (to === from || to === (from + 1) % nodes.length) {
        to = Math.floor(Math.random() * nodes.length)
      }
      connections.push({
        from: nodes[from].id,
        to: nodes[to].id,
      })
    }

    setSkillTree({ nodes, connections })

    // Create initial challenge
    createNewChallenge()
  }, [])

  // Create a new challenge
  const createNewChallenge = () => {
    const randomDomain = aiDomains[Math.floor(Math.random() * aiDomains.length)]
    setChallenge({
      active: true,
      domainId: randomDomain.id,
      count: 0,
      target: Math.floor(Math.random() * 2) + 2, // 2-3 skills needed
      completed: false,
    })
  }

  // Update moving collectibles
  useEffect(() => {
    if (!containerRef.current || collectibles.length === 0) return

    const container = containerRef.current.getBoundingClientRect()
    const centerX = container.width / 2
    const centerY = container.height / 2

    // Track angle globally to ensure smooth animation
    let animationFrameId: number
    let lastTimestamp = 0

    const animate = (timestamp: number) => {
      // Calculate time difference for smooth animation regardless of frame rate
      const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0.016
      lastTimestamp = timestamp

      setCollectibles((prev) =>
        prev.map((item) => {
          if (item.collected) return item

          // Always set moving to true to ensure all icons are responsive
          if (!item.moving) {
            return {
              ...item,
              moving: true,
              direction: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
              },
              speed: Math.random() * 0.5 + 0.3,
              // Add rotation property and starting angle based on ID
              angle: (item.id * Math.PI) / 4,
              radius: item.id % 3 === 0 ? 80 : item.id % 3 === 1 ? 120 : 160,
            }
          }

          // Update angle for circular movement
          const angleIncrement = (item.speed || 0.5) * deltaTime * 2
          const newAngle = (item.angle || 0) + angleIncrement

          // Calculate position based on circular orbit
          const radius = item.radius || (item.id % 3 === 0 ? 80 : item.id % 3 === 1 ? 120 : 160)
          const orbitX = centerX + Math.cos(newAngle) * radius
          const orbitY = centerY + Math.sin(newAngle) * radius

          // Add small random movement to make it less mechanical
          const randomX = Math.sin(Date.now() * 0.001 + item.id) * 10
          const randomY = Math.cos(Date.now() * 0.002 + item.id) * 10

          const newX = orbitX + randomX
          const newY = orbitY + randomY

          // Ensure items stay within bounds
          const boundedX = Math.max(20, Math.min(container.width - 20, newX))
          const boundedY = Math.max(20, Math.min(container.height - 100, newY))

          return {
            ...item,
            x: boundedX,
            y: boundedY,
            angle: newAngle,
          }
        }),
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [collectibles])

  // Update power-up timer
  useEffect(() => {
    if (!powerUp?.active) return

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - powerUp.startTime
      if (elapsed >= powerUp.duration) {
        setPowerUp(null)
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [powerUp])

  // Update particles
  useEffect(() => {
    if (particles.length === 0) return

    const intervalId = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            life: particle.life - 1,
            velocity: {
              x: particle.velocity.x * 0.98,
              y: particle.velocity.y * 0.98 + 0.1, // Add gravity
            },
          }))
          .filter((particle) => particle.life > 0),
      )
    }, 16)

    return () => clearInterval(intervalId)
  }, [particles])

  // Create particles at position
  const createParticles = (x: number, y: number, color: string) => {
    const newParticles = []
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 1
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        color,
        size: Math.random() * 3 + 1,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        life: Math.random() * 20 + 10,
        maxLife: 30,
      })
    }
    setParticles((prev) => [...prev, ...newParticles])
  }

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const x = e.clientX - container.left
    const y = e.clientY - container.top

    setMousePosition({ x, y })

    // Check for collectible collection with improved hit detection
    setCollectibles((prev) =>
      prev.map((item) => {
        if (item.collected) return item

        const distance = Math.sqrt(Math.pow(item.x - x, 2) + Math.pow(item.y - y, 2))
        // Increased base collection radius for easier catching
        const collectionRadius = powerUp?.active && powerUp.type === "magnet" ? 60 : 40

        if (distance < collectionRadius) {
          // Collect the item with guaranteed score update
          if (!item.collected) {
            // Handle different item types (rest of your existing code)
            if (item.type === "skill" && item.domainId) {
              const domain = aiDomains.find((d) => d.id === item.domainId)
              if (domain) {
                // Always correctly increase domain level
                setDomainLevels((prev) => ({
                  ...prev,
                  [item.domainId!]: (prev[item.domainId!] || 0) + 1,
                }))

                // Always update score
                const points = powerUp?.active && powerUp.type === "doublePoints" ? 20 : 10
                setScore((prev) => prev + points)

                // Other existing code for tooltips, particles, etc.
                // ...

                // Update skill tree
                setSkillTree((prev) => ({
                  ...prev,
                  nodes: prev.nodes.map((node) => (node.id === item.domainId ? { ...node, unlocked: true } : node)),
                }))

                // Show a random fact about this domain
                if (domain.facts && domain.facts.length > 0) {
                  const fact = domain.facts[Math.floor(Math.random() * domain.facts.length)]
                  setCurrentFact({ text: fact, domain: domain.name })
                  setShowFact(true)
                  setTimeout(() => setShowFact(false), 3000)
                }

                // Update challenge progress
                if (challenge?.active && challenge.domainId === item.domainId) {
                  const newCount = challenge.count + 1
                  const completed = newCount >= challenge.target

                  setChallenge({
                    ...challenge,
                    count: newCount,
                    completed,
                  })

                  if (completed) {
                    // Bonus points for completing challenge
                    setScore((prev) => prev + 50)
                    setTooltipContent(`Challenge Complete! +50 points!`)
                    setTooltipPosition({ x: item.x, y: item.y - 30 })
                    setShowTooltip(true)
                    setTimeout(() => {
                      setShowTooltip(false)
                      createNewChallenge()
                    }, 2000)
                  }
                }

                // Check for achievements
                const totalDomainLevel = Object.values(domainLevels).reduce((sum, level) => sum + level, 0) + 1

                achievements.forEach((achievement) => {
                  if (!unlockedAchievements.includes(achievement.id)) {
                    let unlocked = false

                    if (achievement.id === "ai_explorer" && totalDomainLevel >= achievement.requirement) {
                      unlocked = true
                    } else if (
                      achievement.id === "hr_specialist" &&
                      item.domainId === "hr" &&
                      (domainLevels.hr || 0) + 1 >= achievement.requirement
                    ) {
                      unlocked = true
                    } else if (
                      achievement.id === "tech_visionary" &&
                      (item.domainId === "quantum" || item.domainId === "neuro") &&
                      (domainLevels.quantum || 0) + (domainLevels.neuro || 0) + 1 >= achievement.requirement
                    ) {
                      unlocked = true
                    }

                    if (unlocked) {
                      setUnlockedAchievements((prev) => [...prev, achievement.id])
                      setTooltipContent(`Achievement Unlocked: ${achievement.name}!`)
                      setTooltipPosition({ x: item.x, y: item.y - 30 })
                      setShowTooltip(true)
                      setTimeout(() => setShowTooltip(false), 2000)
                    }
                  }
                })

                setTooltipContent(`+${points} ${domain.name} skill!`)

                // Create particles
                const color = domain.color.split(" ")[1].replace("to-", "")
                createParticles(item.x, item.y, color)
              }
            } else if (item.type === "xp") {
              const points = powerUp?.active && powerUp.type === "doublePoints" ? 30 : 15
              setScore((prev) => prev + points)
              setTooltipContent(`+${points} XP!`)
              createParticles(item.x, item.y, "cyan-400")

              // Check for fast learner achievement
              if (!unlockedAchievements.includes("fast_learner") && score + points >= 100) {
                setUnlockedAchievements((prev) => [...prev, "fast_learner"])
                setTimeout(() => {
                  setTooltipContent(`Achievement Unlocked: Fast Learner!`)
                  setTooltipPosition({ x: item.x, y: item.y - 30 })
                  setShowTooltip(true)
                }, 1000)
              }
            } else if (item.type === "powerup") {
              // Activate power-up
              const powerUpTypes = ["magnet", "doublePoints", "speedBoost"]
              const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
              setPowerUp({
                active: true,
                type,
                duration: 8000,
                startTime: Date.now(),
              })

              setTooltipContent(`Power-Up: ${type.replace(/([A-Z])/g, " $1").trim()}!`)
              createParticles(item.x, item.y, "yellow-400")
            }

            setTooltipPosition({ x: item.x, y: item.y })
            setShowTooltip(true)
            setTimeout(() => setShowTooltip(false), 1000)

            // Level up check
            if (score + 10 >= level * 100) {
              setLevel((prev) => prev + 1)
              setTimeout(() => {
                setTooltipContent(`Level Up! You're now level ${level + 1}!`)
                setTooltipPosition({ x: container.width / 2, y: container.height / 2 })
                setShowTooltip(true)
              }, 1000)

              // Check for future ready achievement
              if (!unlockedAchievements.includes("future_ready") && score + 10 >= 250) {
                setUnlockedAchievements((prev) => [...prev, "future_ready"])
                setTimeout(() => {
                  setTooltipContent(`Achievement Unlocked: Future Ready!`)
                  setTooltipPosition({ x: container.width / 2, y: container.height / 2 - 40 })
                  setShowTooltip(true)
                }, 2000)
              }
            }
          }

          return { ...item, collected: true }
        }

        // If not collected, return the original item
        return item
      }),
    )
  }

  // Respawn collectibles when most are collected
  useEffect(() => {
    if (collectibles.length > 0 && collectibles.filter((item) => !item.collected).length < 2) {
      setTimeout(() => {
        if (!containerRef.current) return

        const container = containerRef.current.getBoundingClientRect()
        const centerX = container.width / 2
        const centerY = container.height / 2
        const newCollectibles = []

        // Create skill orbs with better circular distribution
        for (let i = 0; i < 5 + Math.floor(level / 2); i++) {
          const domainId = aiDomains[Math.floor(Math.random() * aiDomains.length)].id
          const angle = (i / (5 + Math.floor(level / 2))) * Math.PI * 2
          const radius = 100 + Math.random() * 80

          // Start at positions around the circle
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          newCollectibles.push({
            id: Date.now() + i,
            x,
            y,
            collected: false,
            type: Math.random() > 0.7 ? "xp" : "skill",
            domainId: domainId,
            moving: true,
            direction: {
              x: Math.cos(angle + Math.PI / 2),
              y: Math.sin(angle + Math.PI / 2),
            },
            speed: Math.random() * 0.5 + 0.3,
            angle,
            radius: i % 3 === 0 ? 80 : i % 3 === 1 ? 120 : 160,
          })
        }

        // Add a power-up with 30% chance
        if (Math.random() > 0.7) {
          newCollectibles.push({
            id: Date.now() + newCollectibles.length,
            x: Math.random() * (container.width - 60) + 30,
            y: Math.random() * (container.height - 120) + 60,
            collected: false,
            type: "powerup",
            moving: true,
            direction: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2,
            },
            speed: Math.random() * 0.3 + 0.2,
          })
        }

        setCollectibles(newCollectibles)
      }, 1000)
    }
  }, [collectibles, level])

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[350px] relative overflow-hidden z-20 rounded-xl bg-gradient-to-br from-slate-900/80 to-indigo-950/50"
      onMouseMove={handleMouseMove}
      style={{
        boxShadow: "0 0 20px rgba(6, 182, 212, 0.2)",
      }}
    >
      {/* Header with score and level */}
      <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center bg-black/30 backdrop-blur-sm z-30">
        <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
          AI Skills Explorer
        </h3>
        <div className="flex items-center gap-3">
          <div className="text-xs bg-black/40 rounded-full px-2 py-1 flex items-center gap-1">
            <Trophy className="h-3 w-3 text-yellow-400" />
            <span className="text-yellow-400">{score}</span>
          </div>
          <div className="text-xs bg-black/40 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 text-cyan-400" />
            <span className="text-cyan-400">Level {level}</span>
          </div>
        </div>
      </div>

      {/* Game instructions */}
      <div className="absolute top-16 left-0 right-0 text-center z-20">
        <div className="text-xs text-gray-300 mx-auto max-w-md bg-black/20 backdrop-blur-sm py-2 px-4 rounded-lg">
          Move your cursor over the orbs to collect AI skills!
        </div>
      </div>

      {/* Active challenge - simplified */}
      {challenge && (
        <div className="absolute top-28 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-white/10 z-20 max-w-[200px]">
          <div className="flex items-center gap-2">
            {aiDomains.find((d) => d.id === challenge.domainId)?.icon}
            <span className="text-xs text-white">
              Collect {challenge.target - challenge.count} more{" "}
              {aiDomains.find((d) => d.id === challenge.domainId)?.name}
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full"
              style={{ width: `${(challenge.count / challenge.target) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Active power-up - simplified */}
      {powerUp?.active && (
        <div className="absolute top-28 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-yellow-500/30 z-20 max-w-[150px]">
          <div className="text-xs text-yellow-400 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            <span>{powerUp.type.replace(/([A-Z])/g, " $1").trim()}</span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-100"
              style={{
                width: `${100 - ((Date.now() - powerUp.startTime) / powerUp.duration) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Cursor follower */}
      <div
        className={`absolute w-10 h-10 rounded-full pointer-events-none z-30 flex items-center justify-center transition-transform duration-100 ${
          powerUp?.active
            ? powerUp.type === "magnet"
              ? "bg-gradient-to-r from-blue-500/40 to-purple-500/40 scale-150"
              : powerUp.type === "doublePoints"
                ? "bg-gradient-to-r from-yellow-500/40 to-amber-500/40"
                : "bg-gradient-to-r from-green-500/40 to-emerald-500/40"
            : "bg-gradient-to-r from-purple-500/30 to-cyan-500/30"
        }`}
        style={{
          left: `${mousePosition.x - 20}px`,
          top: `${mousePosition.y - 20}px`,
          boxShadow: powerUp?.active ? "0 0 15px 5px rgba(255, 255, 255, 0.2)" : "none",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
        {powerUp?.active && (
          <div className="text-white text-xs">
            {powerUp.type === "magnet" ? (
              <Cpu className="h-4 w-4" />
            ) : powerUp.type === "doublePoints" ? (
              <Star className="h-4 w-4" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
          </div>
        )}
      </div>

      {/* Collectibles */}
      {collectibles.map(
        (item) =>
          !item.collected && (
            <div
              key={item.id}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 animate-pulse-slow ${
                item.type === "skill"
                  ? `bg-gradient-to-br ${aiDomains.find((d) => d.id === item.domainId)?.color || "from-purple-500 to-pink-500"}`
                  : item.type === "xp"
                    ? "bg-gradient-to-br from-cyan-500 to-blue-500"
                    : "bg-gradient-to-br from-yellow-500 to-amber-500"
              }`}
              style={{
                left: `${item.x - 24}px`,
                top: `${item.y - 24}px`,
                boxShadow: `0 0 20px 8px ${
                  item.type === "skill"
                    ? `rgba(168, 85, 247, 0.7)`
                    : item.type === "xp"
                      ? "rgba(6, 182, 212, 0.7)"
                      : "rgba(245, 158, 11, 0.7)"
                }`,
                zIndex: 25,
                transform: `scale(${item.moving ? 1.1 : 1})`,
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-black/40 rounded-full backdrop-blur-sm p-1 border border-white/30">
                {item.type === "skill" && item.domainId ? (
                  <div className="w-6 h-6 flex items-center justify-center">
                    {aiDomains.find((d) => d.id === item.domainId)?.icon || <Zap className="h-6 w-6 text-white" />}
                  </div>
                ) : item.type === "xp" ? (
                  <Star className="h-6 w-6 text-white" />
                ) : (
                  <Lightbulb className="h-6 w-6 text-white" />
                )}
              </div>
            </div>
          ),
      )}

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full bg-${particle.color}`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.life / particle.maxLife,
          }}
        />
      ))}

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none z-40 animate-fadeUp"
          style={{
            left: `${tooltipPosition.x - 40}px`,
            top: `${tooltipPosition.y - 30}px`,
          }}
        >
          {tooltipContent}
        </div>
      )}

      {/* Tech fact popup */}
      {showFact && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-lg p-3 max-w-[80%] z-40 animate-fadeIn">
          <div className="text-sm font-semibold text-purple-400 mb-1">Did you know? ({currentFact.domain})</div>
          <div className="text-xs text-white">{currentFact.text}</div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${((score % 100) / (level * 100)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/30 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  About AariyaIQ
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Empowering professionals with cutting-edge skills for the digital age
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 relative p-6 rounded-xl border border-white/10 bg-gray-800/30 backdrop-blur-md shadow-lg">
                <div className="inline-block rounded-lg bg-gradient-to-r from-purple-600/20 via-indigo-700/20 to-cyan-500/20 backdrop-blur-sm px-3 py-1 text-sm">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Bridging the Skills Gap in Technology
                </h2>
                <p className="text-gray-300 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  AariyaIQ was founded with a clear mission: to provide accessible, high-quality education in emerging
                  technologies to professionals worldwide. We believe that continuous learning is essential in today's
                  rapidly evolving digital landscape.
                </p>
                <div className="space-y-2">
                  {[
                    "Deliver industry-relevant curriculum designed by experts",
                    "Make advanced technical education accessible to all",
                    "Foster a community of lifelong learners",
                    "Bridge the gap between academic knowledge and industry requirements",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 relative p-6 rounded-xl border border-white/10 bg-gradient-to-br from-black/40 via-purple-900/10 to-cyan-900/10 backdrop-blur-md h-full overflow-hidden shadow-lg flex flex-col">
                {/* Game title */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-30">
                  <h4 className="text-sm font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 shadow-glow">
                    Interactive AI Skills Game
                  </h4>
                </div>

                {/* Add a constraining wrapper to prevent overflow */}
                <div className="absolute inset-0 p-6 pt-12">
                  <div className="relative w-full h-full">
                    <MouseInteractiveGame />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-900/10 via-indigo-800/10 to-cyan-900/10 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-12">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Defines AariyaIQ Today</h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg/relaxed">Learn Today. Lead Tomorrow</p>
              </div>
              <div className="space-y-6 bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <ul className="space-y-4">
                  {[
                    "Access to Expert Knowledge",
                    "Hands-On, Practical Live Learning",
                    "Career-Ready Skills",
                    "Global, Inclusive Community",
                    "Future-Focused Innovation",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Sets Us Apart</h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-lg/relaxed">
                Our unique approach to technical education and professional development
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Award className="h-10 w-10 text-purple-500" />,
                  title: "Industry Expert Instructors",
                  description:
                    "Learn from professionals who bring years of real-world experience to their teaching, ensuring you gain practical, applicable knowledge.",
                },
                {
                  icon: <BookOpen className="h-10 w-10 text-cyan-500" />,
                  title: "Cutting-Edge Curriculum",
                  description:
                    "Our courses are continuously updated to reflect the latest technologies, frameworks, and industry best practices.",
                },
                {
                  icon: <Users className="h-10 w-10 text-indigo-500" />,
                  title: "Supportive Learning Community",
                  description:
                    "Join a global network of learners and professionals who share knowledge, opportunities, and support.",
                },
                {
                  icon: <Lightbulb className="h-10 w-10 text-purple-500" />,
                  title: "Project-Based Learning",
                  description:
                    "Apply your knowledge to real-world projects that build your portfolio and demonstrate your capabilities to employers.",
                },
                {
                  icon: <Globe className="h-10 w-10 text-cyan-500" />,
                  title: "Flexible Learning Options",
                  description:
                    "Learn at your own pace with our flexible course structure, designed to accommodate busy professionals.",
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-indigo-500" />,
                  title: "Career-Focused Outcomes",
                  description:
                    "Our courses are designed with specific career outcomes in mind, helping you achieve your professional goals.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm p-6 neon-container"
                >
                  <div className="neon-right absolute opacity-0 group-hover:opacity-100"></div>
                  <div className="neon-bottom absolute opacity-0 group-hover:opacity-100"></div>
                  <div className="neon-left absolute opacity-0 group-hover:opacity-100"></div>

                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-8 md:p-12 neon-container neon-always-on">
              <div className="neon-right absolute"></div>
              <div className="neon-bottom absolute"></div>
              <div className="neon-left absolute"></div>

              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Ready to Start Your Learning Journey?
                  </h2>
                  <p className="text-gray-300 md:text-lg/relaxed">
                    Join thousands of professionals who are transforming their careers with AariyaIQ. Explore our
                    courses and take the first step toward mastering the skills of tomorrow.
                  </p>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/courses">
                      <Button className="bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white">
                        Explore Courses
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline">Sign Up Today</Button>
                    </Link>
                  </div>
                </div>
                <div className="relative h-[300px] overflow-hidden rounded-xl">
                  <Image src="/digital-collaboration-hub.png" alt="Learning Journey" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
;<style jsx global>{`
  @keyframes pulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  @keyframes pulse-slow {
    0%, 100% { 
      transform: scale(1); 
      box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
    }
    50% { 
      transform: scale(1.05); 
      box-shadow: 0 0 25px rgba(139, 92, 246, 0.7);
    }
  }

  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .animation-delay-500 {
    animation-delay: 500ms;
  }

  .animation-delay-1000 {
    animation-delay: 1000ms;
  }

  .animation-delay-1500 {
    animation-delay: 1500ms;
  }

  .shadow-glow {
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.3), 0 0 20px rgba(6, 182, 212, 0.2);
  }

  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }
`}</style>

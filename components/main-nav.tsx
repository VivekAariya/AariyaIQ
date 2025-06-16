"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    // Add padding to body to account for fixed header
    document.body.style.paddingTop = isScrolled ? "56px" : "64px"

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction
      if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true)
      } else {
        setIsScrollingUp(false)
      }

      // Update last scroll position
      lastScrollY.current = currentScrollY

      // Determine if scrolled past threshold
      if (currentScrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.body.style.paddingTop = "0"
    }
  }, [isScrolled])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-lg supports-[backdrop-filter]:bg-black/90 transition-all duration-300 ${
        isScrollingUp && isScrolled ? "transform scale-[1.02] shadow-lg" : ""
      }`}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        transformOrigin: "top center",
      }}
    >
      <div
        className={`container flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-14" : "h-16"
        }`}
      >
        <div className="flex gap-6 md:gap-10 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span
              className={`bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text font-bold text-transparent transition-all duration-300 ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
            >
              AariyaIQ
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/learnings" className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
              Courses
            </Link>
            <Link href="/about" className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
              About
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Link href="/learner/login">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-200 hover:text-white hover:border-gray-500"
            >
              Learner Login
            </Button>
          </Link>
          <Link href="/instructor/login">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white backdrop-blur-md bg-opacity-80"
            >
              Instructor Login
            </Button>
          </Link>
        </div>
        <button className="block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden backdrop-blur-md bg-black/80 border-b border-gray-800">
          <nav className="flex flex-col gap-4 pb-6">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/learnings"
              className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/learner/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-200 hover:text-white hover:border-gray-500"
                >
                  Learner Login
                </Button>
              </Link>
              <Link href="/instructor/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white bg-opacity-80 backdrop-blur-md">
                  Instructor Login
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

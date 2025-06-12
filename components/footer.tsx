import Link from "next/link"
import Image from "next/image"
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black relative">
      <div className="container flex flex-col gap-8 py-8 md:py-12 relative">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">AariyaIQ</h3>
            <p className="text-sm text-gray-400">
              Empowering professionals with cutting-edge skills and knowledge for the digital age.
            </p>
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-2 whitespace-nowrap">Learning Management System & Platform By:</p>
              <div className="relative h-8 w-32 -ml-1">
                <Image
                  src="/images/aariyatech-logo.png"
                  alt="AariyaTech Logo"
                  fill
                  className="object-contain opacity-80"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                Home
              </Link>
              <Link
                href="/learnings"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                Courses
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                Contact
              </Link>
              <a
                href="https://www.aariyatech.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                AariyaTech UK
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                Cookie Policy
              </Link>
              <Link
                href="/refund"
                className="text-sm text-gray-400 hover:text-white relative neon-container neon-hover-only px-2 py-1 rounded w-fit"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                Refund Policy
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <nav className="flex flex-row gap-4 mt-2">
              <Link
                href="#"
                className="text-gray-400 hover:text-white relative neon-container neon-hover-only p-2 rounded-full"
                aria-label="Twitter/X"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white relative neon-container neon-hover-only p-2 rounded-full"
                aria-label="LinkedIn"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white relative neon-container neon-hover-only p-2 rounded-full"
                aria-label="Facebook"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white relative neon-container neon-hover-only p-2 rounded-full"
                aria-label="Instagram"
              >
                <div className="neon-right absolute"></div>
                <div className="neon-bottom absolute"></div>
                <div className="neon-left absolute"></div>
                <div className="neon-top absolute"></div>
                <Instagram className="h-5 w-5" />
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} AariyaTech UK. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            Powered by <span className="font-semibold">AariyaTech UK</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

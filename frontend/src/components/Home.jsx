import React from 'react'
import Dashboard from './Dashboard'
import HomeNavbar from './HomeNavbar'

export default function Home() {
  return (
    <div>
        <div className="h-16 mt-2">
        <HomeNavbar />
      </div>
        <div className="h-16">
            <Dashboard />
        </div>
    </div>
  )
}

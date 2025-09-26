//import { useState } from "react"
import Calendar from "./components/Calendar"
import "./App.css"

export default function App() {
//  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  return (
      <div className="app-grid">
      <header className="header"> Calendário </header>
      <main className="main">
        <Calendar/>
      </main>
      </div>
  )
}

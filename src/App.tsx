import { useEffect, useState } from "react"
import type { Cipo } from "./type/types";

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);

  useEffect(() => {
    async function fetchCipok() {
      try {
        const response = await fetch("http://localhost:3000/sportcipok")
      } catch(err) {

      }
    }
  })

  return (
    <>

    </>
  )
}

export default App

import { useEffect, useState } from "react";
import type { Cipo } from "./type/types";
import CipokKiiratasa from "./components/cipok";

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);

  const [marka, setMarka] = useState<string>("");
  const [ar, setAr] = useState<string>("");
  const [vane, setVane] = useState<string>("");
  const [kiallitas, setKiallitas] = useState<string>("");

  useEffect(() => {
    async function fetchCipok() {
      try {
        const response = await fetch("http://localhost:3000/sportcipok");
        const data: Cipo[] = await response.json();
        setCipok(data);
      } catch (err) {
        console.log("Hiba történt: " + err.message);
      }
    }
  }, []);

  async function handleCipoFelvetel(e) {
    e.preventDefault();
    const ujCipo = {
      marka: marka,
      ar: ar,
      vane: vane,
      kiallitas: kiallitas
    }
    try {
      const response = await fetch("http://localhost:3000/sportcipok", {
        "method": "POST",
        headers: { "Content-type" : "applocation/json"},
        body: JSON.stringify(ujCipo)
      });
      const cipo: Cipo = await response.json();
      setCipok((elozo)=>[...elozo, cipo]);
      setMarka("");
      setAr("");
      setVane(""); 
      setKiallitas(""); 
    } catch (err) {
        console.log("Hiba történt: " + err.message);
    }
  }

  return <>
    <div className="container">
      {cipok.map((item)=>(
        <CipokKiiratasa
          marka={item.marka}
          ar={item.ar}
          vane={item.vane}
          kiallitas={item.kiallitas}
        />
      ))}
      
    </div>
  </>;
}

export default App;

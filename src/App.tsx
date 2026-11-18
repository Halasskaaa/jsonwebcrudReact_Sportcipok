import { useEffect, useState } from "react";
import type { Cipo } from "./type/types";
import CipokKiiratasa from "./components/cipok";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    fetchCipok();
  }, []);

  // this goes along the second part, aka: The form
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
      <h1>Cipők</h1>
      <h2>Cipők listája</h2>
      {cipok.map((item)=>(
        <CipokKiiratasa
          key={item.id}
          marka={item.marka}
          ar={item.ar}
          vane={item.vane}
          kiallitas={item.kiallitas}
        />
      ))}
      
      <h2>Felhasználók felvétele</h2>
      <form onSubmit={handleCipoFelvetel}>
        <label htmlFor="input_marka">
          Add meg a márkát: <br />
          <input type="text" value={marka} onChange={(e)=>setMarka(e.target.value)}/> <br />
        </label> <br />
        <label htmlFor="input_marka">
          Add meg az árat: <br />
          <input type="text" value={ar} onChange={(e)=>setAr(e.target.value)}/> <br />
        </label> <br />
        <label htmlFor="input_marka">
          Van-e: <br />

          <select value={vane} onChange={(e)=>setVane(e.target.value)}>
              <option value="0">Nincs❌</option>
              <option value="1">Van✅</option>
            </select> <br />
        </label> <br />
        <label htmlFor="input_marka">
          Add meg a kiállítás idejét: <br />
          <input type="text" value={kiallitas} onChange={(e)=>setKiallitas(e.target.value)} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required/> <br />
        </label> <br />
        <button type="submit">Felvétel</button>
      </form>
    </div>
  </>;
}

export default App;

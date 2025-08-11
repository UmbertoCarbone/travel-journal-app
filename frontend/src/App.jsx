import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
function App() {
  const [viaggi, setViaggi] = useState([]);

  useEffect(() => {
    function fetchViaggi() {
      supabase
        .from('travel_journal')
        .select('*')
        .order('id', { ascending: true })
        .then(({ data, error }) => {
          setViaggi(data || []);
        });
    }
    fetchViaggi();
  }, []);

  return (
    <div>
      <h1>Travel Journal</h1>
      <ul>
        {viaggi.map((viaggio) => (
          <li key={viaggio.id}>
            {viaggio.place} - {viaggio.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [viaggi, setViaggi] = useState([]);
  const [openCardId, setOpenCardId] = useState(null);

  useEffect(() => {
    async function fetchViaggi() {
      const { data, error } = await supabase
        .from('travel_journal')
        .select('*')
        .order('id', { ascending: true });
      setViaggi(data || []);
    }
    fetchViaggi();
  }, []);

  const toggleCard = (id) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  return (
    <div className="container mt-4">
      <h1>Travel Journal</h1>
      <div className="row">
        {viaggi.map((viaggio) => (
          <div className="col-md-4 mb-3" key={viaggio.id}>
            <div className="card">
              {viaggio.photo_url && (
                <img
                  src={viaggio.photo_url}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{viaggio.place}</h5>
                
                <button
                  className={`btn ${openCardId === viaggio.id ? "btn-danger" : "btn-primary"} btn-sm`}
                  onClick={() => toggleCard(viaggio.id)}
                  aria-label="Mostra dettagli"
                >
                  {openCardId === viaggio.id ? "Chiudi dettagli" : "Mostra dettagli"}
                </button>
                {openCardId === viaggio.id && (
                  <div className="mt-3">
                    <p><strong>Stato d'animo:</strong> {viaggio.mood}</p>
                    <p><strong>Riflessione positiva:</strong> {viaggio.positive_reflection}</p>
                    <p><strong>Riflessione negativa:</strong> {viaggio.negative_reflection}</p>
                    <p><strong>Impegno fisico:</strong> {viaggio.physical_effort}</p>
                    <p><strong>Effort economico:</strong> {viaggio.economic_effort}</p>
                    <p><strong>Spesa effettiva:</strong> {viaggio.actual_expense} €</p>
                    <p><strong>Tags:</strong></p>
                    {Array.isArray(viaggio.tags) && viaggio.tags.length > 0 ? (
                      <ul>
                        {viaggio.tags.map((tag, i) => <li key={i}>{tag}</li>)}
                      </ul>
                    ) : (
                      <span>-</span>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
export default function CardViaggio({ viaggio, openCardId, toggleCard }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        {viaggio.photo_url && (
          <img
            src={viaggio.photo_url}
            className="card-img-top"
            alt={viaggio.place}
            style={{ height: "200px", objectFit: "cover", width: "100%" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{viaggio.place}</h5>
          <p className="card-text">{viaggio.description}</p>
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
              <p><strong>Video:</strong> {viaggio.video_url}</p>
              <p><strong>Latitudine:</strong> {viaggio.latitude}</p>
              <p><strong>Longitudine:</strong> {viaggio.longitude}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
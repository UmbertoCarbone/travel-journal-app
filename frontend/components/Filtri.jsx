export default function Filtri({ filterPlace, setFilterPlace, filterDescription, setFilterDescription }) {
  return (
    <div className="row mb-4 justify-content-center">
      <div className="col-md-4 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Filtra per luogo..."
          value={filterPlace}
          onChange={e => setFilterPlace(e.target.value)}
        />
      </div>
      <div className="col-md-4 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Filtra per descrizione..."
          value={filterDescription}
          onChange={e => setFilterDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
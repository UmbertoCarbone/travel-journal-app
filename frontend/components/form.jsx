export default function FormTappa({ formData, handleInputChange, handleSubmit, handleFileChange, getCurrentLocation }) {
    return (
        <form className="card p-4 mb-4" onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Luogo*</label>
                    <input
                        type="text"
                        className="form-control"
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Stato d'animo*</label>
                    <input
                        type="text"
                        className="form-control"
                        name="mood"
                        value={formData.mood}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Descrizione*</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Riflessione positiva*</label>
                    <input
                        type="text"
                        className="form-control"
                        name="positive_reflection"
                        value={formData.positive_reflection}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Riflessione negativa*</label>
                    <input
                        type="text"
                        className="form-control"
                        name="negative_reflection"
                        value={formData.negative_reflection}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Impegno fisico (1-5)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="physical_effort"
                        min="1"
                        max="5"
                        value={formData.physical_effort}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Effort economico (1-5)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="economic_effort"
                        min="1"
                        max="5"
                        value={formData.economic_effort}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Spesa effettiva (€)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="actual_expense"
                        value={formData.actual_expense}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Tags (separati da virgola)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="mare, relax, famiglia"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Foto (scegli dal computer)</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {formData.photo_url && (
                        <img
                            src={formData.photo_url}
                            alt="Anteprima"
                            style={{ width: "100px", marginTop: "10px" }}
                        />
                    )}
                </div>
                <div className="col-md-6">
                    <label className="form-label">Latitudine</label>
                    <input
                        type="number"
                        step="any"
                        className="form-control"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Longitudine</label>
                    <input
                        type="number"
                        step="any"
                        className="form-control"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-12 text-center">
                    <button
                        type="button"
                        className="btn btn-outline-primary mt-2"
                        onClick={getCurrentLocation}
                    >
                        Usa la mia posizione
                    </button>
                </div>
            </div>
            <div className="mt-3 text-end">
                <button className="btn btn-primary" type="submit">
                    Salva tappa
                </button>
            </div>
        </form>
    );
}
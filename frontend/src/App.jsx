import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import FormTappa from "../components/form";
import Filtri from "../components/Filtri";
import CardViaggio from "../components/CardViaggio";
import Mappa from "../components/Mappa";

function App() {
  const [viaggi, setViaggi] = useState([]);
  const [openCardId, setOpenCardId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    place: "",
    description: "",
    mood: "",
    positive_reflection: "",
    negative_reflection: "",
    physical_effort: 1,
    economic_effort: 1,
    actual_expense: "",
    tags: "",
    photo_url: "",
    video_url: "",
    latitude: "",
    longitude: ""
  });

  // Stati per i filtri
  const [filterPlace, setFilterPlace] = useState("");
  const [filterDescription, setFilterDescription] = useState("");

  useEffect(() => {
    fetchViaggi();
  }, []);

  async function fetchViaggi() {
    const { data } = await supabase
      .from('travel_journal')
      .select('*')
      .order('id', { ascending: true });
    setViaggi(data || []);
  }

  const toggleCard = (id) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestione upload file su Supabase Storage
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from('travel-images')
      .upload(filePath, file);

    if (error) {
      return;
    }

    const { data } = supabase
      .storage
      .from('travel-images')
      .getPublicUrl(filePath);
    setFormData((prev) => ({
      ...prev,
      photo_url: data.publicUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gestione array tags
    const tagsArray = formData.tags
      ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    const newTappa = { ...formData, tags: tagsArray };
    const { error } = await supabase.from("travel_journal").insert([newTappa]);
    if (!error) {
      setFormData({
        place: "",
        description: "",
        mood: "",
        positive_reflection: "",
        negative_reflection: "",
        physical_effort: 1,
        economic_effort: 1,
        actual_expense: "",
        tags: "",
        photo_url: "",
        video_url: "",
        latitude: "",
        longitude: ""
      });
      setShowForm(false);
      fetchViaggi();
    }
  };

  // Filtra le tappe per place e description
  const viaggiFiltrati = viaggi.filter(v =>
    v.place.toLowerCase().includes(filterPlace.toLowerCase()) &&
    v.description.toLowerCase().includes(filterDescription.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Travel Journal</h1>
      <div className="mb-4 text-center">
        <button
          className="btn btn-success"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "Chiudi form" : "Aggiungi nuova tappa"}
        </button>
      </div>
      <Filtri
        filterPlace={filterPlace}
        setFilterPlace={setFilterPlace}
        filterDescription={filterDescription}
        setFilterDescription={setFilterDescription}
      />
      <Mappa viaggi={viaggiFiltrati} />
      {showForm && (
        <FormTappa
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
        />
      )}
      <div className="row">
        {viaggiFiltrati.map((viaggio) => (
          <CardViaggio
            key={viaggio.id}
            viaggio={viaggio}
            openCardId={openCardId}
            toggleCard={toggleCard}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
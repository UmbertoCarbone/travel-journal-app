import { useEffect, useState, useRef } from "react";
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

  const [filterPlace, setFilterPlace] = useState("");
  const [filterDescription, setFilterDescription] = useState("");
  const fileInputRef = useRef(null);

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
      [name]: (name === "latitude" || name === "longitude")
        ? value === "" ? "" : Number(value)
        : value,
    }));
  };

  // Gestione upload file su Supabase Storage
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFormData((prev) => ({
        ...prev,
        photo_url: "",
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from('travel-images')
      .upload(filePath, file);

    if (error) {
      alert("Errore nel caricamento dell'immagine");
      setFormData((prev) => ({
        ...prev,
        photo_url: "",
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
      // Reset campo file dopo submit
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setShowForm(false);
      fetchViaggi();
    }
  };

  // Geolocalizzazione
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalizzazione non supportata dal browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        alert("Impossibile ottenere la posizione.");
      }
    );
  };

  const viaggiFiltrati = viaggi.filter(v =>
    v.place.toLowerCase().includes(filterPlace.toLowerCase()) &&
    v.description.toLowerCase().includes(filterDescription.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Travel Journal</h1>
      <Mappa viaggi={viaggiFiltrati} />
      <Filtri
        filterPlace={filterPlace}
        setFilterPlace={setFilterPlace}
        filterDescription={filterDescription}
        setFilterDescription={setFilterDescription}
      />
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
      <div className="mb-4 text-center">
        <button
          className="btn btn-success"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "Chiudi form" : "Aggiungi nuova tappa"}
        </button>
      </div>
      {showForm && (
        <FormTappa
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          getCurrentLocation={getCurrentLocation}
          fileInputRef={fileInputRef}
        />
      )}
    </div>
  );
}

export default App;
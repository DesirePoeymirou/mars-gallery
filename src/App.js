import { useState, useEffect } from "react";
import axios from "axios";
import Rover from "./components/Rover";
import { constants } from "./constants";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstCall, setFirstCall] = useState(true);
  const [camera, setCamera] = useState("fhaz");
  const [selectedRover, setSelectedRover] = useState("curiosity");
  let [photos, setPhotos] = useState([]);

  const rovers = [
    { id: 1, name: "spirit" },
    { id: 2, name: "curiosity" },
    { id: 3, name: "opportunity" },
  ];

  const handleClick = (rover) => {
    setSelectedRover(rover.name);
  };

  const handleSearch = () => {
    axios(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?sol=1000&camera=${camera}&api_key=${constants.key}`
    )
      .then((response) => {
        setIsLoading(true);
        setPhotos(response.data.photos);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setFirstCall(false);
        setIsLoading(false);
      });
  };

  const renderPhotos = () => {
    return photos.map((photo, index) => (
      <img key={index} src={photo.img_src} alt="photo" />
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Mars gallery app!</h1>
      </header>
      <div className="rovers">
        {rovers.map((rover) => (
          <Rover
            key={rover.id}
            name={rover.name}
            handleClick={() => handleClick(rover)}
          />
        ))}
      </div>
      <select value={camera} onChange={(e) => setCamera(e.target.value)}>
        <option value="fhaz">Front Hazard Avoidance Camera</option>
        <option value="rhaz">Rear Hazard Avoidance Camera</option>
        <option value="navcam">Navigation Camera</option>
        {selectedRover === "curiosity" && (
          <option value="mast">Mast Camera</option>
        )}
        {selectedRover === "curiosity" && (
          <option value="chemcam">Chemistry and Camera Complex</option>
        )}
        {selectedRover === "curiosity" && (
          <option value="mahli">Mars Hand Lens Imager</option>
        )}
        {selectedRover === "curiosity" && (
          <option value="mardi">Mars Descent Imager</option>
        )}
        {selectedRover !== "curiosity" && (
          <option value="pancam">Panoramic Camera</option>
        )}
        {selectedRover !== "curiosity" && (
          <option value="minites">
            Miniature Thermal Emission Spectrometer (Mini-TES)
          </option>
        )}
      </select>
      <button onClick={handleSearch}>Search</button>
      {!firstCall && isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {!firstCall &&
        (photos.length > 0 ? (
          renderPhotos()
        ) : (
          <h2>No images with those parameters</h2>
        ))}
    </div>
  );
}

export default App;

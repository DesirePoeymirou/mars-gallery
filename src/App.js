import { useState, useEffect } from "react";
import axios from "axios";
import Rover from "./components/Rover";
import { constants } from "./constants";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [camera, setCamera] = useState("FHAZ");
  const [selectedRover, setSelectedRover] = useState("curiosity");
  let [data, setData] = useState([]);

  const rovers = [
    { id: 1, name: "spirit" },
    { id: 2, name: "curiosity" },
    { id: 3, name: "opportunity" },
  ];

  // useEffect(() => {
  //   axios(
  //     `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${constants.key}`
  //   )
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching data: ", error);
  //       setError(error);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  const handleClick = (rover) => {
    setSelectedRover(rover.name);
  };

  const handleSearch = () => {
    axios(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${constants.key}`
    )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }

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
        <option value="FHAZ">Front Hazard Avoidance Camera</option>
        <option value="RHAZ">Rear Hazard Avoidance Camera</option>
        <option value="NAVCAM">Navigation Camera</option>
        {selectedRover === "curiosity" && (
          <option value="MAST">Mast Camera</option>
        )}
        {selectedRover === "curiosity" && (
          <option value="CHEMCAM">Chemistry and Camera Complex</option>
        )}
        {selectedRover === "curiosity" && (
          <option value="MAHLI">Mars Hand Lens Imager</option>
        )}
        {selectedRover === "curiosity" && (
          <option value="MARDI">Mars Descent Imager</option>
        )}
        {selectedRover !== "curiosity" && (
          <option value="PANCAM">Panoramic Camera</option>
        )}
        {selectedRover !== "curiosity" && (
          <option value="MINITES">
            Miniature Thermal Emission Spectrometer (Mini-TES)
          </option>
        )}
      </select>
      <button onClick={handleSearch}>Search</button>
      {isLoading && <h2>Loading...</h2>}
        {!isLoading && error == null && (
          <img src={data.photos[0].img_src} alt="photo" />
        )}
    </div>
  );
}

export default App;

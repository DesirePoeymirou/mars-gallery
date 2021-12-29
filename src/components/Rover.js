import "../styles/Rover.module.css";

const Rover = ({ name, handleClick }) => (
  <div className="rover" onClick={handleClick}>
    <img
      src={require(`../images/${name}-rover.png`)}
      alt={`${name} rover`}
      width={name === "curiosity" ? "30%" : "25%"}
    />
    {name}
  </div>
);

export default Rover;

import styles from "../styles/Rover.module.css";

const Rover = ({ name, handleClick }) => (
  <div className={styles.rover} onClick={handleClick}>
    <img
      src={require(`../images/${name}-rover.png`)}
      alt={`${name} rover`}
      width={name === "curiosity" ? "100%" : "70%"}
    />
    {name.toUpperCase()}
  </div>
);

export default Rover;

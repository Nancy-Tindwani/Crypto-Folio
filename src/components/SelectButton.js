//import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const styles = {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      margin:'10px',
      backgroundColor: selected ? "#EEBC1D" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      

    
  };

 

  return (
    <span onClick={onClick} style={styles}>
      {children}
    </span>
  );
};

export default SelectButton;
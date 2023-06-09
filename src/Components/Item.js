import React from "react";
import Column from "./column";



const style = {
    width: "100%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0",
    backdropFilter: "blur(.1rem)",
    background: "rgba(165, 199, 229, 0.2)"
};
function Item(props) {
    const {id, state, columns} = props;


    return  <div style={style}>{state[Object.keys(state).find(el => state[el].find(el => el.id === id))].find(el => el.id === id).content}</div>

}

export default Item


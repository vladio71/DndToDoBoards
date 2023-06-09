import Column from "./column";
import React from "react";

export function ColItem(props) {

    const {id, state, columns} = props;

    const col = columns.find(el => el.id === id)


    return  <Column  id={col.id} name={col.name} items={state[col.id]} />
}

export default ColItem
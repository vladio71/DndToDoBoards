import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styled from "styled-components";
import {FiDelete} from "react-icons/fi";


const RemoveBtn = styled.button`
    background: none;
    color: red;
    display: inline-block;
    line-height: 1rem;
    width: 30px;
    font-size: 1.2rem;
    padding-top:.2rem;
     border: none;
    transition: width .5s , background .3s ease;
     &:hover{
        width: 50px;
        background: rgba(10,10,10,.7);
        color: white;  
 
    }
`

export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className={'listItem'}>


                <input type={'checkbox'}/>
                <p className={'item'}>{props.task}</p>
                <RemoveBtn onClick={() => props.remove(props.column, props.id)}>
                    <FiDelete/>
                </RemoveBtn>

            </div>

        </div>
    );
}

export default SortableItem



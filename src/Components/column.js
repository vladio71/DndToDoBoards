import ListItem, {SortableItem} from "./listItem";
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";
import styled from 'styled-components';
import React, {useState} from "react";
import {CSS} from "@dnd-kit/utilities";
import {HiXMark} from "react-icons/hi2";
import {AiFillEdit} from "react-icons/ai";

export const Header = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  font-size: 1.4rem;
  margin: .6rem;
  flex-direction: column;
  justify-content: center;
`

export const Input = styled.input`
  margin: .3rem;
  border-radius: .1rem;
  border: none;
  padding: .5rem;
  outline: none;
  width: 80%;
  max-width: 100%;
`
export const InputWihEnter = styled.div`
  display: flex;
  margin: 0 auto;

`
export const CustomButton = styled.button`

  border: white 2px solid;
  color: white;
  font-size: .8rem;
  width: fit-content;
  height: 50px;
  background: black;
  padding: .4rem;
  transition: .3s;
  white-space:nowrap;

  &:hover {

    color: black;
    background: white;
    border: black 2px solid;
  }

`

export const DeleteButton = styled.button`
  border: none;
  position: absolute;
  right: 1rem;
  border-radius: 50%;
  color: white;
  top: 1rem;
  width: 50px;
  height: 50px;
  font-size: 1rem;
  padding-top: .2rem;
  outline: none;
  text-align: center;
  text-decoration: none;
  background: rgba(219, 121, 121, 0.3);
  cursor: pointer;
  transition: .3s;

  &:hover {
    background: rgba(217, 73, 71, 0.93)
  }
`

const ColumnHeading = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  text-align: center;
  flex-direction: row;
  display: flex;
  margin: .6rem;
  gap: .5rem;
  font-size: 1.4rem;
  justify-content: center;
  
  
`

export const EditBtn = styled.span`
  cursor: pointer;
`


export default function Column({id, items, remove, add, removeCol, name}) {

    const {setNodeRef} = useDroppable({
        id: id,
    });
    const {
        attributes,
        listeners,
        setNodeRef: nodeRefSortable,
        transform,
        transition,
    } = useSortable({id: id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


    const [task, setTask] = useState('')
    const [edit, setEdit] = useState(false)
    const [colName, setName] = useState(name)


    return (
        <>
            <SortableContext
                strategy={verticalListSortingStrategy}
                items={items}
                id={id}


            >
                <div className={'column'}
                     ref={nodeRefSortable} style={style} {...attributes} {...listeners}
                >
                    <DeleteButton onClick={removeCol}><HiXMark/></DeleteButton>
                    {edit ?
                        <InputWihEnter>
                            <Input value={colName} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setEdit(!edit)
                                }
                            }
                            } onDoubleClick={() => setEdit(!edit)}/>
                            <CustomButton onClick={() => {
                                setEdit(!edit)
                            }}>Save</CustomButton>
                        </InputWihEnter>
                        :
                        <ColumnHeading>{colName}
                            <EditBtn onClick={() => setEdit(!edit)}>
                                <AiFillEdit/>
                            </EditBtn></ColumnHeading>
                    }
                    <InputWihEnter>
                        <Input value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                add(id, task)
                            }
                        }}/>
                        <CustomButton onClick={() => add(id, task)}>Add New Task</CustomButton>
                    </InputWihEnter>

                    <div ref={setNodeRef} className={'items'}>

                        {items.map((task) => <SortableItem column={id} remove={remove} task={task.content} key={task.id}
                                                           id={task.id}/>)}

                    </div>
                </div>
            </SortableContext>

        </>

    )
}
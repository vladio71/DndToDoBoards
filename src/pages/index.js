import initialData from "../Components/initialData";
import Column, {CustomButton, Header, Input, InputWihEnter} from "../Components/column";
import React, {useState} from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors, DragOverlay, closestCorners,
} from '@dnd-kit/core';
import {
    rectSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable';
import Item from "../Components/Item";
import ColItem from "../Components/ColItem";
import {useMainLogic} from "../Hooks/useMainLogic";
import Head from "next/head";
import Image from "next/image";


export default function Home() {

    const [columns, setColumns] = useState([{id: "A", name: "To Do"}, {id: "B", name: "Done"}])
    const [items, setItems] = useState(initialData);
    const [activeId, setActiveId] = useState(false);
    const [activeColId, setActiveColId] = useState(false);
    const [columnName, setColumnName] = useState('');


    const {
        addColumn,
        addItem,
        removeColumn,
        removeItem,
        handleDrugStart,
        handleDragOver,
        handleDragEndColumn,
        choseHandler,
    } = useMainLogic(activeColId, items, columns, setActiveId, setColumns, setItems, setActiveColId)


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        }),
    );


    return (


        <div className={'container'}>
            <Head>
                <title>TODOISTIK</title>
                <link rel="icon"
                      href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Microsoft_To-Do_icon.svg/2515px-Microsoft_To-Do_icon.svg.png"/>

            </Head>
            <div className={'background'}>
                <Image
                    src={"https://ucarecdn.com/eec76bbb-cf3f-4992-bca5-df48f51ab751/-/preview/"}
                    priority={true}
                    fill={true}
                    style={{
                        objectFit: 'cover',
                    }}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 1200px"
                />
            </div>
            <Header><h2>_TODOISTIK_</h2>
                <InputWihEnter>
                    <Input value={columnName} onChange={(e) => setColumnName(e.target.value)}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   addColumn(columnName)
                               }
                           }}/>
                    <CustomButton onClick={() => addColumn(columnName)} disabled={columnName.length === 0}>Add New
                        Column</CustomButton>
                </InputWihEnter>
            </Header>
            <section className={'tasks_container'}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEndColumn}
                >
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDrugStart}
                        onDragOver={handleDragOver}
                        onDragEnd={choseHandler}
                    >
                        <SortableContext items={columns} strategy={rectSortingStrategy}>

                            {columns.map(col => {
                                return <Column key={col.id} id={col.id} name={col.name} items={items[col.id]}
                                               add={addItem}
                                               remove={removeItem} removeCol={() => removeColumn(col.id)}/>
                            })}
                            <DragOverlay>
                                {activeId ? <Item id={activeId} state={items} columns={columns}/> : null}
                                {activeColId && !activeId ?
                                    <ColItem id={activeColId} state={items} columns={columns}/> : null}


                            </DragOverlay>
                        </SortableContext>
                    </DndContext>

                </DndContext>

            </section>
        </div>


    )
}

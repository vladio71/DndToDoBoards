"use client"
import {arrayMove} from "@dnd-kit/sortable";
import initialData from "../Components/initialData";
import {useState} from "react";

 const useMainLogic = (activeColId,items, columns,setActiveId,setColumns,setItems,setActiveColId) => {





    function addColumn(cName) {
        if(columns.find(el=> el.name === cName)){
            return
        }

        setColumns(prev => {
            return [
                ...prev,
                {id: cName, name: cName}
            ]
        })
        setItems(prev => {
            return {
                ...prev,
                [cName]: []
            }
        })


    }

    function removeColumn(id) {
        setItems(prev => {
            delete prev[id]
            return prev
        })

        setColumns(prev => {
            return prev.filter(el => el.id !== id)
        })

    }

    function removeItem(columnId, id) {
        setItems(prev => {
            return {
                ...prev,
                [columnId]: prev[columnId].filter(el => el.id !== id)
            }
        })
    }

    function addItem(columnId, newItem) {
        if(newItem.length===0)return

        setItems(prev => {
            return {
                ...prev,
                [columnId]: [...prev[columnId], {id: columnId + (prev[columnId].length + 1) + Math.random(), content: newItem}]
            }
        })

    }

    function handleDrugStart(event) {
        const {active} = event
        const {id} = active
        if (columns.find(el => el.id === id)) {
            setActiveColId(id)
        } else {
            setActiveId(id)
        }
    }

    function getContainerId(id) {
        if(columns.find(el=>el.id===id)){
            return id
        }

        return Object.keys(items).find(key => items[key].find(el => el.id === id))
    }

    function handleDragOver(event) {
        const {active, over} = event;
        const {id} = active;
        const {id: overId} = over;

        const activeContainer = getContainerId(id);
        const overContainer = getContainerId(overId);

        if (
            !activeContainer ||
            activeColId ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setItems((prev) => {
            const activeItems = prev[activeContainer]
            const overItems = prev[overContainer]

            const activeIndex = activeItems.findIndex(el => el.id === active.id)
            const overIndex = overItems.findIndex(el => el.id === over.id)

            const newIndex = overItems.length - 1 === overIndex ? overIndex + 1 : overIndex

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter(el => el.id !== active.id)
                ],
                [overContainer]: [

                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex)
                ]
            }


        })


    }

    function handleDragEnd(event) {
        const {active, over} = event;
        const {id} = active;
        const {id: overId} = over;

        const activeContainer = getContainerId(id);
        const overContainer = getContainerId(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }
        const activeIndex = items[activeContainer].findIndex(el => el.id === active.id)
        const overIndex = items[overContainer].findIndex(el => el.id === over.id)

        if (activeIndex !== overIndex) {
            setItems((items) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
        }
        setActiveColId(false)
        setActiveId(false)


    }

    function handleDragEndColumn(event) {
        const {active, over} = event;
        if (active.id !== over?.id) {
            setColumns((columns) => {
                const oldIndex = columns.findIndex(el => el.id === active.id);
                let newIndex = columns.findIndex(el => el.id === over.id);
                const colIndex =  Object.keys(items).find(el=> items[el].find(el=>el.id === over.id))
                if(newIndex<0)newIndex =  columns.findIndex(el => el.id === colIndex);
                return arrayMove(columns, oldIndex, newIndex);
            });
        }
        setActiveColId(false)
        setActiveId(false)

    }
    function choseHandler(event) {
        if(activeColId){
            handleDragEndColumn(event)
        }else {
            handleDragEnd(event)
        }
    }

    return{
        addColumn,
        addItem,
        removeColumn,
        removeItem,
        handleDrugStart,
        getContainerId,
        handleDragOver,
        handleDragEnd,
        handleDragEndColumn,
        choseHandler,
    }

}

export default useMainLogic
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Tasks, TodolistAndTasksProps} from "./components/Tasks";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}



type PropsType = TodolistAndTasksProps & {
    title: string
    tasks: TasksType
    removeTodolist: (filterID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (filterID: string, title: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistID ,title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }


    let tasksForTodolist = props.tasks[props.todolistID];

    if (props.filter === "active") {
        tasksForTodolist = props.tasks[props.todolistID].filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks[props.todolistID].filter(t => t.isDone);
    }



    return <div>
        <h3>{props.title}
            <button onClick={removeTodolistHandler}> x </button>
        </h3>

        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            <Tasks tasks={tasksForTodolist}
                   changeTaskStatus={props.changeTaskStatus}
                   todolistID={props.todolistID}
                   removeTask={props.removeTask}/>

        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

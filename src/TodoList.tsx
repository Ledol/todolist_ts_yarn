import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState("");

    const tasksListItems = props.tasks.map((task, index) => {
        const onClickRemoveHandler = () => props.removeTask(task.id)
        return (
            <li key={index}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button name={'x'} callback={onClickRemoveHandler}/>
            </li>
        )
    })

    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey === true) {
            onClickAddHandler()
        }
    }

    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickAddHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onClickChangeHandler = (title: FilterValuesType) => {
        props.changeFilter(title)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       onKeyDown={onKeyDownAddTask}
                />
                <Button name={'+'} callback={onClickAddHandler}/>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <Button name={'All'} callback={() => onClickChangeHandler("all")}/>
                <Button name={'Active'} callback={() => onClickChangeHandler("active")}/>
                <Button name={'Completed'} callback={() => onClickChangeHandler("completed")}/>
            </div>
        </div>
    );
};

export default TodoList;
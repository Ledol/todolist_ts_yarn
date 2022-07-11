import React, {useState} from 'react';
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

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
                <Input title={title}
                       setTitle={setTitle}
                       callBack={onClickAddHandler}
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
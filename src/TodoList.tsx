import React, {ChangeEvent, useState} from 'react';
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
    filter: FilterValuesType

    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void

}

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState("");

    const tasksListItems = props.tasks.map((task, index) => {
        const onClickRemoveHandler = () => props.removeTask(task.id)
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }

        return (
            <li key={index}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeTaskStatusHandler}
                />
                <span className={task.isDone ? 'isDone': ''}>{task.title}</span>
                <Button classes={''} name={'x'} callback={onClickRemoveHandler}/>
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
                <Button classes={''} name={'+'} callback={onClickAddHandler}/>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <Button classes={props.filter === 'all' ? 'activeFilter' : ''} name={'All'} callback={() => onClickChangeHandler("all")}/>
                <Button classes={props.filter === 'active' ? 'activeFilter' : ''} name={'Active'} callback={() => onClickChangeHandler("active")}/>
                <Button classes={props.filter === 'completed' ? 'activeFilter' : ''} name={'Completed'} callback={() => onClickChangeHandler("completed")}/>
            </div>
        </div>
    );
};

export default TodoList;
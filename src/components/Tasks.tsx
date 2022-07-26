import React, {ChangeEvent} from 'react';
import {TaskType} from "../Todolist";

export type TodolistAndTasksProps = {
    todolistID: string
    removeTask: (filterID: string, taskId: string) => void
    changeTaskStatus: (filterID: string, taskId: string, isDone: boolean) => void
}

type TasksPropsType = TodolistAndTasksProps & {
    tasks: Array<TaskType>
}

export const Tasks = (props: TasksPropsType) => {
    return (
        <>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </>
    );
}


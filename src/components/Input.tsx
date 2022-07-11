import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputType = {
    setTitle: (title: string) => void
    title: string
    callBack: () => void
}

export const Input = (props: InputType) => {

    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value)
    }

    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            props.callBack()
        }
    }

    return (
        <>
            <input value={props.title}
                   onChange={onChangeSetTitle}
                   onKeyDown={onKeyDownAddTask}
            />
        </>
    );
};

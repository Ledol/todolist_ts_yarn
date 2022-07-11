import React from 'react';

type ButtonType = {
    name: string
    callback: () => void
    classes: string
}

export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callback()
    }

    return (
        <>
            <button className={props.classes}
                    onClick={onClickHandler}>{props.name}</button>
        </>
    );
};

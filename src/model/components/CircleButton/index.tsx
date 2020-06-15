import React, { FC } from 'react';
import "./style.sass";
type Props = {
    className?: string;
    text?: string | React.ReactNode;
    textColor?: string;
    backgroundColor?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CircleButton: FC<Props> = (props) => {

    return (
        <button className={`circle-button-container ${props.className || ""}`} onClick={props.onClick}>
            {props.text}
        </button>
    );
};

export default CircleButton;
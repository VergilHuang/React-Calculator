import React, { FC } from 'react';
import "./style.sass";
type Props = {
    className?: string;
    text?: string;
    textColor?: string;
    backgroundColor?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const RaiusBarButton: FC<Props> = (props) => {

    return (
        <button className={`radius-bar-button-container ${props.className || ""}`} onClick={props.onClick}>
            {props.text}
        </button>
    );
};

export default RaiusBarButton;
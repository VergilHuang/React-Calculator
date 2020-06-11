import React, { FC } from 'react';
import "./style.sass";
type Props = {
    text?: string;
    textColor?: string;
    backgroundColor?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const RaiusBarButton: FC<Props> = (props) => {

    const _textColor = props.textColor || "#fff";
    const _backgroundColor = props.backgroundColor || "#333";

    return (
        <button className="radius-bar-button-container" style={{ color: _textColor, backgroundColor: _backgroundColor }} onClick={props.onClick}>
            {props.text}
        </button>
    );
};

export default RaiusBarButton;
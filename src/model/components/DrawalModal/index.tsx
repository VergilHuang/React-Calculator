import React, { FC, useEffect } from 'react';
import "./style.sass";
import Calculator from '../Calculator';
type Props = {

}

const DrawalModal: FC<Props> = (props) => {

    useEffect(() => {


    }, [])
    return (
        <div className="drawal-modal-container">
            <Calculator />
        </div>
    );
};

export default DrawalModal;
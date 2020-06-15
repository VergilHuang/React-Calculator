import React, { FC } from 'react';
import "./style.sass";

type Props = React.HTMLAttributes<HTMLDivElement>
const Overlay: FC<Props> = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { className, ...otherProps } = props
    return (
        <div ref={ref} className={`overlay-container ${className}`} {...otherProps}>
            {props.children}
        </div>
    );
});

export default Overlay;
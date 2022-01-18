import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
    direction: | 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ( {direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        // debouncer to combat lag with dragging the editors
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
            
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [width]);

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            width, 
            height: Infinity,
            resizeHandles: ['e'],
            maxConstraints: [innerWidth * 0.8, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            }
        }
    } else {
        resizableProps = {
            width: Infinity, 
            height: 300,
            resizeHandles: ['s'],
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 24]
        }
    }
    
    return (
        <ResizableBox {...resizableProps}
            // width={Infinity} 
            // height={300} 
            // resizeHandles={['s']}
            // maxConstraints={[Infinity, window.innerHeight * 0.9]}
        >
            {children}
        </ResizableBox>
    );
};

export default Resizable;
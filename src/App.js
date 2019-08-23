import React, {useRef, useState} from 'react';

function App() {

    const gameApp = useRef(null);

    const [distX, setDistX] = useState(0);
    const [distY, setDistY] = useState(0);
    const [currentBox, setCurrentBox] = useState(0);
    const [position, setCurrentBoxFinalPosition] = useState(0);

    let boxes = [
        {
            id: 1, x: 0, y: 0, color: '#e2e2e2'
        },
        {
            id: 2, x: 300, y: 0, color: '#e2291c'
        },
        {
            id: 3, x: 600, y: 0, color: '#d6e247'
        },
        {
            id: 4, x: 0, y: 300, color: '#543ee2'
        },
        {
            id: 5, x: 300, y: 300, color: '#e25cd0'
        },
        {
            id: 6, x: 600, y: 300, color: '#3be28c'
        }
    ];

    const onDown = (e, item) => {

        e.preventDefault();

        let object = e.target;

        setCurrentBox(object);
        setCurrentBoxFinalPosition(item);

        // Stop bubbling, this is important to avoid
        // unexpected behaviours on mobile browsers:


        // Get the correct event source regardless the device:
        // Btw, "e.changedTouches[0]" in this case for simplicity
        // sake we'll use only the first touch event
        // because we won't move more elements.
        let evt = e.type === 'touchstart' ? e.changedTouches[0] : e;

        // "Get the distance of the x/y", formula:
        // A: Get current position x/y of the circle.
        // Example: circle.offsetLeft
        // B: Get the new position x/y.
        // Example: evt.clientX
        // That's all.
        let x = Math.abs(object.offsetLeft - evt.clientX);
        let y = Math.abs(object.offsetTop - evt.clientY);

        setDistX(x);
        setDistY(y);

        // Disable pointer events in the circle to avoid
        // a bug whenever it's moving.
        object.style.pointerEvents = 'none';
    }

    const onMove = (e) => {
        // Update the position x/y of the circle element
        // only if the "pointerEvents" are disabled,
        // (check the "onDown" function for more details.)


        if (!currentBox) return null;
        if (currentBox.style.pointerEvents === 'none') {

            // Get the correct event source regardless the device:
            // Btw, "e.changedTouches[0]" in this case for simplicity
            // sake we'll use only the first touch event
            // because we won't move more elements.
            let evt = e.type === 'touchmove' ? e.changedTouches[0] : e;

            if((position.x === evt.clientX - distX) && (position.y === evt.clientY - distY)){
                currentBox.style.backgroundColor = '#e2e2e2';
            }else{
                currentBox.style.backgroundColor = position.color;
            }

            // Update top/left directly in the dom element:
            currentBox.style.left = `${evt.clientX - distX}px`;
            currentBox.style.top = `${evt.clientY - distY}px`;

        }
        ;
    }

    const onUp = (e) => {
        if (!currentBox) return null;
        currentBox.style.pointerEvents = 'initial';
    }

    let _boxes_view = boxes.map((item, index) => {

        let style = {
            backgroundColor: item.color
        }

        return <div
            className={'game-app-box'}
            draggable="true"
            onMouseDown={(e) => onDown(e, item)}
            style={style}>
            {item.id}
        </div>
    });

    return (
        <div className="game-app" ref={gameApp} onMouseMove={onMove} onMouseUp={onUp}>
            {_boxes_view}
        </div>
    );
}

export default App;

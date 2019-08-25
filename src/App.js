import React, {useRef, useState} from 'react';

function App() {

    const gameApp = useRef(null);

    const [distX, setDistX] = useState(0);
    const [distY, setDistY] = useState(0);
    const [currentBox, setCurrentBox] = useState(0);
    const [position, setCurrentBoxFinalPosition] = useState(0);

    let boxes = [
        {
            id: 1, x: 0, y: 0, color: '#e2e2e2', move: false,
        },
        {
            id: 2, x: 300, y: 0, color: '#e2291c', move: false,
        },
        {
            id: 3, x: 600, y: 0, color: '#d6e247', move: false,
        },
        {
            id: 4, x: 0, y: 300, color: '#543ee2', move: false,
        },
        {
            id: 5, x: 300, y: 300, color: '#e25cd0', move: false,
        },
        {
            id: 6, x: 600, y: 300, color: '#3be28c', move: false,
        }
    ];

    const onDown = (e, item) => {

        e.preventDefault();

        let object = e.target;
        item.move = true;

        setCurrentBox(object);
        setCurrentBoxFinalPosition(item);

        let evt = e.type === 'touchstart' ? e.changedTouches[0] : e;

        let x = Math.abs(object.offsetLeft - evt.clientX);
        let y = Math.abs(object.offsetTop - evt.clientY);

        setDistX(x);
        setDistY(y);
    }

    const onMove = (e) => {

        if (!currentBox) return null;

        if (position.move) {

            let evt = e.type === 'touchmove' ? e.changedTouches[0] : e;

            if ((position.x === evt.clientX - distX) && (position.y === evt.clientY - distY)) {
                currentBox.style.backgroundColor = '#e2e2e2';
            } else {
                currentBox.style.backgroundColor = position.color;
            }

            currentBox.style.left = `${evt.clientX - distX}px`;
            currentBox.style.top = `${evt.clientY - distY}px`;
        }
    };

    const onUp = (e) => {
        if (!currentBox) return null;
        position.move = false;

        //check if game is completed

        let items = gameApp.current.childNodes;//.filter(item=> !item.classList.contains('game-app-box_light'));


        let _items = items.forEach(item => {
            // console.log(item)

            let _items = checkClass(item, 'game-app-box_light');
            if (!_items) {
                return item;
            }
        })

        console.log(_items);
    }

    const addClass = (element, cssClass) => {
        if (!checkClass(element, cssClass)) {
            element.classList.add(cssClass);
        }
    }

    const removeClass = (element, cssClass) => {
        if (checkClass(element, cssClass)) {
            element.classList.remove(cssClass);
        }
    }

    const checkClass = (element, cssClass) => {
        return element.classList.contains(cssClass);
    };

    let _boxes_view = boxes.map((item, index) => {

        let style = {
            backgroundColor: item.color
        }

        return <div className={'game-app-box'}
                    key={index}
                    onMouseDown={(e) => onDown(e, item)}
                    style={style}>
            {item.id}
        </div>
    });

    let _boxes_finale = boxes.map((item, index) => {

        let style = {
            left: item.x,
            top: item.y,
            pointerEvent: 'unset'
        }

        return <div className={'game-app-box game-app-box_light'}
                    key={index}
                    style={style}>
            {item.id}
        </div>
    });

    return (
        <div className="game-app" ref={gameApp} onMouseMove={onMove} onMouseUp={onUp}>
            {_boxes_view}
            {_boxes_finale}
        </div>
    );
}

export default App;

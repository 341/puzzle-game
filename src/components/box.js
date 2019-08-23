import React, {useRef, useEffect} from 'react';

function Box({item, style, parent}) {

    const box = useRef(null);


    useEffect(() => {
        let _box = box.current.getBoundingClientRect();
        let _parent = parent.current.getBoundingClientRect();

        console.log('_box', _box);
        console.log('_parent', _parent);
    });


    const drop = async (e, item) => {
        // e.preventDefault();

        // let _box = box.current.getBoundingClientRect();
        let _parent = parent.current.getBoundingClientRect();

        let rect = {
            left: e.clientX - box.current.width / 2,
            right: e.clientX + box.current.width / 2,
            top: e.clientY - box.current.height / 2,
            bottom: e.clientY + box.current.height / 2,
            width: box.current.width,
            height: box.current.height
        };

        console.log(rect);

        box.current.style.left = rect.left;
        box.current.style.right = rect.right;
        box.current.style.top = rect.top;
        box.current.style.bottom = rect.bottom;
        box.current.style.width = rect.width;
        box.current.style.height = rect.height;

    }


    const drag = (e, item) => {
        // e.preventDefault();

        let _box = box.current.getBoundingClientRect();
        let _parent = parent.current.getBoundingClientRect();

        const rect = {
            left: e.clientX - _box.width / 2,
            right: e.clientX + _box.width / 2,
            top: e.clientY - _box.height / 2,
            bottom: e.clientY + _box.height / 2,
            width: _box.width,
            height: _box.height
        };

        console.log(rect);

        // _box.style.left = rect.left;
        // _box.style.right = rect.right;
        // _box.style.top = rect.top;
        // _box.style.bottom = rect.bottom;
        // _box.style.width = rect.width;
        // _box.style.height = rect.height;

    }

    return (
        <div id={'game-app-box'}
             className={'game-app-box'}
             draggable="true"
             onDragStart={(e) => drag(e, item)}
             onDragEnd={(e) => drop(e, item)}
             onDrag={(e) => drag(e, item)}
             ref={box}
             style={style}

        > {item.id}</div>
    );

}

export default Box;
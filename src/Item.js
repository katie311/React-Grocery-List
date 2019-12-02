import React from 'react'

const Item = ({ id, name, complete, itemClick }) => (
    <li
    style={ complete ? {...styles.item, ...styles.complete } : styles.item } onClick={ () => itemClick(id) }>
        { name }
    </li>
);

const styles = {
    item: { cursor: 'pointer' },
    complete: { color: 'grey', textDecoration: 'line-through' },
};

export default Item;
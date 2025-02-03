"use strict";
const id = 'app';
function dom({ id }) {
    const currentNode = document.getElementById(id);
    const isNull = currentNode === null;
    if (isNull) {
        throw new Error();
    }
}

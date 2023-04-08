import {saveAs} from 'file-saver'

let objHasEmptyChildren = []
export default function getParentsWithNoChildren(arr, isFirstUse = true) {
    if (isFirstUse) {
        objHasEmptyChildren = []; // makes global variable empty, TODO: don't use global variable
    }
    arr.forEach(obj => {
        if (obj.children.length === 0) {
            objHasEmptyChildren.push(obj.name);
        } else {
            objHasEmptyChildren = getParentsWithNoChildren(obj.children, false);
        }
    });
    return objHasEmptyChildren;
}

export function hasMoreThanOneChild(sequence) {
    const parents = new Map();
    for (let i = 0; i < sequence.length; i++) {
        const element = sequence[i];
        if (/\./.test(element)) {
            const parent = element.replace(/\.\d+$/, '');
            if (!parents.has(parent)) {
                parents.set(parent, []);
            }
            parents.get(parent).push(element);
        }
    }
    for (const [parent, children] of parents.entries()) {
        if (children.length < 2) {
            return false;
        }
    }
    return true;
}

export function fillArrayEmpty(rows, columns) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push("");
        }
        grid.push(row);
    }
    return grid;
}


export function downloadJSONFile(data, fileName) {
    console.log(data);
    let blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    saveAs(blob, fileName);
}

// Check if each number followed by a number with a dot has more than one child
// for (let i = 0; i < sequence.length - 1; i++) {
//     const element = sequence[i];
//     const nextElement = sequence[i + 1];
//     if (/\d\.$/.test(element) && nextElement === `${element}1`) {
//         let j = i + 1;
//         while (j < sequence.length && sequence[j].startsWith(`${element}.`)) {
//             j++;
//         }
//         if (j === i + 2) {
//             return false;
//         }
//         i = j - 1;
//     }}
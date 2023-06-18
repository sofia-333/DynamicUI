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

export function customSort(a, b) {
    let partsA = a.toString().split('.');
    let partsB = b.toString().split('.');

    // Recursive comparison function
    function compareParts(partsA, partsB, index) {
        let partA = partsA[index] ? parseInt(partsA[index]) : 0;
        let partB = partsB[index] ? parseInt(partsB[index]) : 0;

        if (partA < partB) {
            return -1;
        } else if (partA > partB) {
            return 1;
        } else {
            // Parts are equal, continue comparing the next parts recursively
            if (index < Math.max(partsA.length, partsB.length) - 1) {
                return compareParts(partsA, partsB, index + 1);
            } else {
                return 0;
            }
        }
    }

    return compareParts(partsA, partsB, 0);
}
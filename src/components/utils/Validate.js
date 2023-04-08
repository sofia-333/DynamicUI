import {SPACE, EMPTY, COMMA, DIGIT_DOTS_REGEX} from "@/components/utils/constants";
import {hasMoreThanOneChild} from "@/components/utils/helperMethods";


export function preProcessing(input) {
    //Remove dot from string
    input = input.replace(SPACE, EMPTY)
    //Replace spaces and create an array with all the numbers in it
    const myArray = input.split(COMMA).map((element) => {
        return element.replace(SPACE, EMPTY);
    });
    return myArray;
}

export default function analyse(sequence, canHaveOneChild=true) {
    // Check if the sequence is an array
    if (!Array.isArray(sequence)) {
        return [false, "Check if the sequence is an array"];
    }

    // Check if each element is a string consisting of digits and dots
    for (let i = 0; i < sequence.length; i++) {
        const element = sequence[i];
        if (!/^\d+(\.\d+)*$/.test(element)) {
            return [false, "Check if each element is a string consisting of digits and dots"];
        }
    }

    // Check if the sequence is sorted in ascending order
    if (sequence.join() !== sequence.slice().sort().join()) {
        return [false, "Check if the sequence is sorted in ascending order"];
    }

    // Check if each parent element has at least 2 child elements
    if (!canHaveOneChild) {
        if (hasMoreThanOneChild(sequence) === false) {
            return [false, "Check if each parent element has at least 2 child elements"];
        }
    }

    // All validation passed, return true
    return [true, ""];
}


//1,1.1,1.2,1.2.1,1.2.1.1,1.2.1.2,1.2.2,1.2.3,1.3, 2, 3, 4
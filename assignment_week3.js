// Question 1  
let student = [
    { name: "Daniel", email: "daniel@gmail.com", marks: [80, 60, 50, 70, 95] },
    { name: "Mark", email: "mark@gmail.com", marks: [99, 40, 84, 72, 60] },
    { name: "Stacy", email: "stacy@gmail.com", marks: [8, 30, 11, 0, 20] },
    { name: "Geri", email: "geri@gmail.com", marks: [100, 99, 95, 85, 99] }
];

function studentWithHighestMarks(array) {
    let highestMarks = 0; //Set a default value 0 for highestMarks for comparison
    let highestStudent = "";//Create a variable which is the student who get highest marks that will be reassigned

    array.forEach((student) => {
        let totalMarks = student.marks.reduce((acc, mark) => acc + mark, 0);//Calculate the sum of each student marks in the array

        //Compare every student totalMarks in the array
        if (totalMarks > highestMarks) {
            highestMarks = totalMarks;//Reassign the highestMarks
            highestStudent = student.name;//Find the student who get the highest mark
        }
    });

    return highestStudent;
}

console.log(studentWithHighestMarks(student));//Geri

// Question 2
let array = [20, -2, 4, -11, 0, 25]

let minimumValue = array.reduce((acc, cV) => acc < cV ? acc : cV, Infinity);

console.log(minimumValue);//-11

// Question 3
let stringName = "helloworld";

function lengthOfString(string) {
    let arr = string.split("");//Convert a string to an array by letter
    return arr.length;//Count the amount of items in the array

}

console.log(lengthOfString(stringName)); //10


document.getElementById("colorBtn").addEventListener("click", function () {
    this.style.backgroundColor = "green";
    this.style.color = "white";
});

let hour = new Date().getHours();

if (hour < 12) {
    alert("HELLO THIS IS SRUJANA");
} else if (hour < 18) {
    alert("HELLO THIS IS SRUJANA");
} else {
    alert("HELLO THIS IS SRUJANA");
}
function addNumbers() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let sum = num1 + num2;
    document.getElementById("result").innerText = "Result: " + sum;
}

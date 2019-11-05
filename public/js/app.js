console.log($);
console.log("good");
$("#check_insurance").on("change", () => {
  if (check_insurance === true) {
    if (insurance === "atena" || insurance === "obama care") {
      co_pay = 10;
    } else if (insurance === "united way" || insurance === "signa") {
      co_pay = 20;
    }
  } else {
    co_pay = 100;
  }
});

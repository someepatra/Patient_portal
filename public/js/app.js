console.log($);
console.log("good");

$("#check_insurance").on("change", () => {
  console.log("hello");

  $("#insurance").toggleClass("hideInsurance");
  $("#insuranceLabel").toggleClass("hideInsurance");
  $("#co_pay").val("");
});

$("#insurance").on("change", () => {
  console.log("hello");
  if (
    $("#insurance option:selected").val() === "Atena" ||
    $("#insurance option:selected").val() === "ObamaCare"
  ) {
    co_pay = 10;
  } else if (
    $("#insurance option:selected").val() === "UnitedWay" ||
    $("#insurance option:selected").val() === "Signa"
  ) {
    co_pay = 20;
  }

  console.log(co_pay);
  $("#co_pay").val(co_pay);
});

console.log($);
console.log("good");

$("#check_insurance").on("change", () => {
  //console.log("hello");

  $("#insurance").toggleClass("hideInsurance");
  $("#insuranceLabel").toggleClass("hideInsurance");

  if ($("#insurance").hasClass("hideInsurance")) {
    $("#co_pay").val("100");
  } else {
    $("#co_pay").val("10");
  }
});

$("#insurance").on("change", () => {
  //console.log("hello");
  let co_pay;
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

$("#symptoms").on("change", () => {
  const endpoint = "http://localhost:3000/symptoms/all";

  $.ajax({
    url: endpoint
  }).then(data => {
    //console.log(data);
    data.forEach(element => {
      if ($("#symptoms").val() === element.symptoms) {
        $("#medicine").val(element.medicine);
      }
    });
  });
});

$(document).ready(function () {
  $("#s1").click(function () {
    $(this).css("color", "rgba(220,180,30,1)");
    $("#s2").css("color", "rgba(20,20,20,1)");
    $("#s3").css("color", "rgba(20,20,20,1)");
    $("#s4").css("color", "rgba(20,20,20,1)");
    $("#s5").css("color", "rgba(20,20,20,1)");
  });
  $("#s2").click(function () {
    $(this).css("color", "rgba(220,180,30,1)");
    $("#s1").css("color", "rgba(220,180,30,1)");
    $("#s3").css("color", "rgba(20,20,20,1)");
    $("#s4").css("color", "rgba(20,20,20,1)");
    $("#s5").css("color", "rgba(20,20,20,1)");
  });
  $("#s3").click(function () {
    $(this).css("color", "rgba(220,180,30,1)");
    $("#s1").css("color", "rgba(220,180,30,1)");
    $("#s2").css("color", "rgba(220,180,30,1)");
    $("#s4").css("color", "rgba(20,20,20,1)");
    $("#s5").css("color", "rgba(20,20,20,1)");
  });
  $("#s4").click(function () {
    $(this).css("color", "rgba(220,180,30,1)");
    $("#s1").css("color", "rgba(220,180,30,1)");
    $("#s2").css("color", "rgba(220,180,30,1)");
    $("#s3").css("color", "rgba(220,180,30,1)");
    $("#s5").css("color", "rgba(20,20,20,1)");
  });
  $("#s5").click(function () {
    $(this).css("color", "rgba(220,180,30,1)");
    $("#s1").css("color", "rgba(220,180,30,1)");
    $("#s2").css("color", "rgba(220,180,30,1)");
    $("#s3").css("color", "rgba(220,180,30,1)");
    $("#s4").css("color", "rgba(220,180,30,1)");
  });
});

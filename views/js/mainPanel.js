$(document).ready(function(){
  $("#lunch").click(function(){
    $("#Lunch").show();
    $("#Starters").hide();
    $("#Dinner").hide();
    $("#Breakfast").hide();
  });

  $("#starters").click(function(){
    $("#Starters").show();
    $("#Lunch").hide();
    $("#Dinner").hide();
    $("#Breakfast").hide();
  });

  $("#dinner").click(function(){
    $("#dinner").show();
    $("#Starters").hide();
    $("#Lunch").hide();
    $("#Breakfast").hide();
  });

  $("#breakfast").click(function(){
    $("#breakfast").show();
    $("#Starters").hide();
    $("#Dinner").hide();
    $("#Lunch").hide();
  });

  $("#all").click(function(){
    $("#Starters")  .show();
    $("#Dinner").show();
    $("#Breakfast").show();
    $("#Lunch").show()
  });

  $("button").click(function(){
    var a = $(this).val();
    var c = $(this).attr("data-value");
    
  })
});

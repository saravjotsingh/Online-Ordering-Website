$(document).ready(function(){

  var dish = [];
  var  price = [];

  var category = ["all","Starters","Breakfast","Dinner","Lunch"];

  $("#category").change(function(){
    var a = $("#category").val();
    //console.log(a);
    for(var i=0;i<category.length;i++){
      if(a=="all"){
        $("."+category[i]).show();
      }else{
        if(a==category[i]){
          //console.log(category[i]);
          $("."+category[i]).show();
          }else{
          //console.log("a"  + category[i]);
          $("."+category[i]).hide();
        }
      }
      }


  })



  $("#dishSearch").keyup(function(){

    var a = $("#dishSearch").val();
      var parent = document.getElementsByClassName('dishData');;
      var  c = document.getElementsByClassName('nameData');
      for(var i =0;i<c.length;i++){
        var filter  = a.toUpperCase();
  //console.log(filter);
          if(c[i].innerHTML.toUpperCase().indexOf(filter)>-1){
            parent[i].style.display="";
          }else{
            parent[i].style.display="none";
          }

      }

  });



  // $("#lunch").click(function(){
  //   $(".Lunch").show();
  //   $(".Starters").hide();
  //   $(".Dinner").hide();
  //   $(".Breakfast").hide();
  // });
  //
  // $("#starters").click(function(){
  //   $(".Starters").show();
  //   $(".Lunch").hide();
  //   $(".Dinner").hide();
  //   $(".Breakfast").hide();
  // });
  //
  // $("#dinner").click(function(){
  //   $(".dinner").show();
  //   $(".Starters").hide();
  //   $(".Lunch").hide();
  //   $(".Breakfast").hide();
  // });
  //
  // $("#breakfast").click(function(){
  //   $(".breakfast").show();
  //   $(".Starters").hide();
  //   $(".Dinner").hide();
  //   $(".Lunch").hide();
  // });
  //
  // $("#all").click(function(){
  //   $(".Starters")  .show();
  //   $(".Dinner").show();
  //   $(".Breakfast").show();
  //   $(".Lunch").show()
  // });

    var n =0;
  $(".addToCart").click(function(){
    n++;
    $(this).attr('disabled','disabled')
    var a = $(this).val();
    var c = $(this).attr("data-value");

    dish.push(a);
    price.push(c);
    $('#CheckoutText').show();
    $('#CheckoutText').text(n);

    //console.log(dish);
    //console.log(price);
  });

  $("#checkout").click(function(){
    if(n==0){
      alert("Please add something");
    }else{
      sessionStorage.setItem("ID",$("#ID").text())
      sessionStorage.setItem("dish",JSON.stringify(dish));
      sessionStorage.setItem("price",JSON.stringify(price));
      window.location.href="/cart";
    }

  });



});

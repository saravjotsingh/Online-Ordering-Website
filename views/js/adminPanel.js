$(document).ready(function(){

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


});


////Searching dish function
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


})

});

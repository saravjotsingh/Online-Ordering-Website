$(document).ready(function(){

  var dish = JSON.parse(sessionStorage.getItem("dish"));
  var price = JSON.parse(sessionStorage.getItem("price"));
  var identity = sessionStorage.getItem("ID");

  var row;



showData()
function showData(){
  //console.log(dish);
  //console.log(price);
  // var final =`
  // <div class='container'>
  //    <div class="row" id="heading" style="font-weight:bold; padding:10px">
  //      <div class="col-sm-3">DishName</div>
  //      <div class="col-sm-3">Price</div>
  //      <div class="col-sm-3">Quantity</div>
  //      <div class="col-sm-3">Total</div>
  //    </div>
  //  </div>
  //
  // ` ;

  var row = `
    <table class="table table-striped">
    <tr>
      <th>Dishname</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
    </tr>
  `

  for(var i=0;i<dish.length;i++){

     row += `
    <tr>
      <td><button class="btn btn-link remove" id="${i}">&times;</button>${dish[i]}</td>
      <td>${price[i]}</td>
      <td><select class="form-control" id="a${i}" name="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select></td>
      <td id="total${i}">${price[i]}</td>
    </tr>
    `
    //row += row;
}

row += `</table>`;

  $('.put').html(row);


  var totalAmount = 0;
  $("select").change(function(){
    totalAmount = 0;
    for(var i=0;i<dish.length;i++){
     totalAmount += $("#a" + i).val() * price[i];
      $("#total" + i).text($("#a" + i).val() * price[i]);
   }
   $("#Total").text(totalAmount);

 });

 for(var i=0;i<dish.length;i++){
     totalAmount += $("#a" + i).val() * price[i];
   }
    $("#Total").text(totalAmount);



$(".remove").on("click",function(){
  console.log(this.id);
    dish.splice(this.id,1);
    price.splice(this.id,1);
    final = "";
   showData();

});

// $("select").change(function(){
// console.log(dish + " " +price );
// for(var i=0;i<dish.length;i++){
//   console.log($("#a" + i).val());
// }
// });


}

$("#cancel").on('click',function(){
  window.location = "/placeOrder";
});








$("#placeOrder").on('click',function(){
    console.log(dish);
    var a = [];
     for(var i=0;i<dish.length;i++){
       a[i] = $("#a" + i).val();
     }

     var data = {};
     data.dish = dish;
     data.quantity = a;
     data.identity = identity;
     $.ajax({
       type:"POST",
       data:JSON.stringify(data),
       url:"/OrderPlaced",
       contentType:'application/json',
       success:function(data){
         alert(data._id);
         window.location = "/placeOrder";
       }
     })

});





});



  //console.log(dish.length +  price[0]);

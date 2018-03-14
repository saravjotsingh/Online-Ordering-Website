$(document).ready(function(){

  var dish = JSON.parse(sessionStorage.getItem("dish"));
  var price = JSON.parse(sessionStorage.getItem("price"));

  var row;



showData()
function showData(){
  console.log(dish);
  console.log(price);
  var final =`
  <div class='container'>
     <div class="row" id="heading" style="font-weight:bold; padding:10px">
       <div class="col-sm-3">DishName</div>
       <div class="col-sm-3">Price</div>
       <div class="col-sm-3">Quantity</div>
       <div class="col-sm-3">Total</div>
     </div>
   </div>

  ` ;

  for(var i=0;i<dish.length;i++){
    row = `
    <div class='container'>
       <div class="row" id="CafeteriaData">
        <div class="col-sm-3">${dish[i]}<button class="btn btn-link remove" id="${i}">Remove</button></div>
         <div class="col-sm-3">${price[i]}</div>
         <div class="col-sm-3">
           <select class="form-control" id="a${i}" name="quantity">
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
           </select>
         </div>
         <div class="col-sm-3" id="total${i}">${price[i]}</div>
       </div>
     </div>

    `
    final = final+row;
}


  $('.put').html(final);


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


}













  //Retrieve the template data from the HTML .
});



  //console.log(dish.length +  price[0]);

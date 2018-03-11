$(document).ready(function(){

  var dish = JSON.parse(sessionStorage.getItem("dish"));
  var price = JSON.parse(sessionStorage.getItem("price"));
  let final =`
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
          <div class="col-sm-3">${dish[i]}</div>
          <div class="col-sm-3">${price[i]}</div>
          <div class="col-sm-3">
            <select class="form-control" id=${i} name="quantity">
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
      totalAmount += $("#" + i).val() * price[i];
       $("#total" + i).text($("#" + i).val() * price[i]);
    }
    $("#Total").text(totalAmount);

  });

  for(var i=0;i<dish.length;i++){
      totalAmount += $("#" + i).val() * price[i];
    }
     $("#Total").text(totalAmount);



  //Retrieve the template data from the HTML .
});



  //console.log(dish.length +  price[0]);

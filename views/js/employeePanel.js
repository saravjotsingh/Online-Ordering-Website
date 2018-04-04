$(document).ready(function(){
  //$('.complete').hide();
  $(".orderComplete").on('click',function(){
    var a = $(this).attr('value');
    data = {};
    data.ID = a;
    $.ajax({
        type:"POST",
        url:'/orderComplete',
        data:JSON.stringify(data),
        contentType:'application/json',
        success:function(data){
          console.log(data);
          location.reload();
        }
    })
  })

});

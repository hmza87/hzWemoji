
(function ($) {
    //var tbl = motor.tags();   
    $("input[type='text']").on('keydown', function(e){
       console.log(e.keyCode);
       
        //if(e.keyCode==191){
            $(this).val($(this).val().replace(':smile:',emojis[0].emoji));
            /*for(i=0;i<tbl.length;i++){
                $(this).val($(this).val().replace(':'+tbl[i]+':',motor.get(tbl[i])));
            }*/
        //}
        
       
    })

    
   

})(jQuery);



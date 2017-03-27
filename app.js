
(function ($) {
    var debuging = true;

    var emos;
    $.getJSON(chrome.extension.getURL('/assets/js/emoji.json'), function(settings) {
        emos = settings;
        
    });
    function getE(n){
        
        if(emos.length<1){return ':'+n+':';}

        for(i=0;i<emos.length;i++){
            for(a=0;a<emos[i].aliases.length;a++){
                if(emos[i].aliases[a]==n){
                    return emos[i].emoji;
                }
            }
            for(t=0;t<emos[i].tags.length;t++){
                if(emos[i].tags[t]==n){
                    return emos[i].emoji;
                }
            }
        }
        return ':'+n+':';
    }




    //var tbl = motor.tags();   
    $("input[type='text']").on('keyup', function(e){
       console.log(e.keyCode);
       doo($(this));
       
        //if(e.keyCode==191){
            //$(this).val($(this).val().replace(':smile:',getE("smile")==""?":smile:":getE("smile")));
            /*for(i=0;i<tbl.length;i++){
                $(this).val($(this).val().replace(':'+tbl[i]+':',motor.get(tbl[i])));
            }*/
        //}
        
       
    })



    
   
function doo(e){
    var tmp=e.val(), mm=[], m=[];
    while(tmp.indexOf(':')>=0){
        m =tmp.match(':([^\S}^\S]*):', 'g');
        if(m != null && m.length>0){
            tmp=tmp.replace(m[0], m[1]);
            mm.push(m);
        }else{
            break;
        }

    }
    
    if(mm == null) return false;

   for(i=0;i<mm.length;i++){
       m = mm[i];
        if(m[0]!=undefined) e.val(e.val().replace(m[0], getE(m[1])))
   }


    
}

function l(a){
    if(debuging) console.log(a);
}
})(jQuery);





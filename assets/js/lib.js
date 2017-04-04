var hzePopup = {
    all: [],
    url: "https://raw.githubusercontent.com/lionzhunter/hzWemoji/master/assets/js/emoji.json",
    MAX: 200,
    POPUPDOM: ".hz-emos",
    SRCHDOM: '.hz-srch',
    LOADING_CLASS: 'hz-loading',
    UL: jQuery('.hz-emos ul'),
    LIS: jQuery('.hz-emos ul').find('li'),
    INPUT:  $('.hz-srch input'),
    init: function(){
        hzePopup.INPUT.click(function(){
                if($(this).css('margin-left')=='201px'){
                    $(this).animate({marginLeft: '-=201px'}, 1000).css('cursor', 'text');
                };
            }).focusout(function(){
                if($(this).css('margin-left')=='0px'){
                     $(this).animate({marginLeft: '+=201px'}).css('cursor', 'pointer');
                }
                   
            }).keyup(function(e){
                hzePopup.clear()
                    .put(hzePopup.search($(this).val()))
                    .handlClick();
                });
        return this;
    },
    loading: function(v){
        if(v==undefined){
            return hzePopup.UL.hasClass(hzePopup.LOADING_CLASS)
        }else{
            if(v){
                hzePopup.UL.addClass(hzePopup.LOADING_CLASS);
            }else{
                hzePopup.UL.removeClass(hzePopup.LOADING_CLASS);
            }
        }
        return this;
    },
    load: function(callback){
        this.loading(true);
        jQuery.getJSON(hzePopup.url, function(s) {
            hzePopup.all = s;
            hzePopup.loading(false)
                .put()
                .handlClick();
            if(callback!=undefined)  callback();
        });
        return this;
    },
    clear: function(){
        hzePopup.UL.html('');
        return this;
    },
    put: function(list){
        if(list==undefined){
            for(i=0;i<hzePopup.MAX;i++){
                hzePopup.UL.append('<li>'+hzePopup.all[i].emoji+'</li>');
            }
        }else{
            for(i=0;i<list.length;i++){
            hzePopup.UL.append('<li>'+list[i]+'</li>');
            if(i>=MAX) break;
        }
        }
        return this;
    },
    search: function(v){
        var tmp=[];
        for(i=0;i<hzePopup.all.length;i++){
            for(t=0;t<hzePopup.all[i].tags.length;t++){
                if(hzePopup.all[i].tags[t].includes(v)){
                  tmp.push(hzePopup.all[i].emoji);  
                }
            }
            if(tmp.length>MAX){console.log('full'); break;}
        }
        return tmp;
    },
    handlClick: function(){
        hzePopup.LIS.click(function(){
            $("input[data-hze]").val($("input[data-hze]").val()+$(this).html());
        });
        return this;
    }
}
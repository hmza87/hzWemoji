var hzePopup = {
    all: [],
    url: "https://raw.githubusercontent.com/lionzhunter/hzWemoji/master/assets/js/emoji.json",
    MAX: 200,
    POPUPDOM: ".hz-emos",
    SRCHDOM: '.hz-srch',
    LOADING_CLASS: 'hz-loading',
    UL: jQuery(this.POPUPDOM+' ul'),
    LIS: jQuery(this.POPUPDOM+' ul').find('li'),
    INPUT:  $(this.SRCHDOM+' input'),
    init: function(){
        this.INPUT.click(function(){
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
            return this.UL.hasClass(hzePopup.LOADING_CLASS)
        }else{
            if(v){
                this.UL.addClass(hzePopup.LOADING_CLASS);
            }else{
                this.UL.removeClass(hzePopup.LOADING_CLASS);
            }
        }
        return this;
    },
    load: function(callback){
        this.loading(true);
        jQuery.getJSON(this.url, function(s) {
            hzePopup.all = s;
            hzePopup.loading(false)
                .put()
                .handlClick();
            if(callback!=undefined)  callback();
        });
        return this;
    },
    clear: function(){
        this.UL.html('');
        return this;
    },
    put: function(list){
        if(list==undefined){
            for(i=0;i<this.MAX;i++){
                this.UL.append('<li>'+this.all[i].emoji+'</li>');
            }
        }else{
            for(i=0;i<list.length;i++){
            this.UL.append('<li>'+list[i]+'</li>');
            if(i>=MAX) break;
        }
        }
        return this;
    },
    search: function(v){
        var tmp=[];
        for(i=0;i<this.all.length;i++){
            for(t=0;t<this.all[i].tags.length;t++){
                if(this.all[i].tags[t].includes(v)){
                  tmp.push(this.all[i].emoji);  
                }
            }
            if(tmp.length>MAX){console.log('full'); break;}
        }
        return tmp;
    },
    handlClick: function(){
        this.LIS.click(function(){
            $("input[data-hze]").val($("input[data-hze]").val()+$(this).html());
        });
        return this;
    }
}
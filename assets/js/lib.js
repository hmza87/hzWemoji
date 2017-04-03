var hzEmo = {
    all: [],
    url: "https://raw.githubusercontent.com/lionzhunter/hzWemoji/master/assets/js/emoji.json",
    MAX: 200,
    UL: jQuery('.hz-emos ul'),
    LIS: jQuery('.hz-emos ul').find('li'),
    INPUT:  $('.hz-srch input'),
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
                hzEmo.clear()
                    .put(hzEmo.search($(this).val()))
                    .handlClick();
                });
        return this;
    },
    loading: function(v){
        if(v==undefined){
            return this.UL.hasClass('hz-loading')
        }else{
            if(v){
                this.UL.addClass('hz-loading');
            }else{
                this.UL.removeClass('hz-loading');
            }
        }
        return this;
    },
    load: function(callback){
        this.loading(true);
        jQuery.getJSON(this.url, function(s) {
            hzEmo.all = s;
            hzEmo.loading(false)
                .put()
                .handleClick();
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
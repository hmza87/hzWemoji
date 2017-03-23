var motor={
    data : {
        'smile' : '😁',
        ''      : ''
    },
    exists : function(what){
        return (this.data[what]!= undefined)
    },
    get : function(tag){
        for(i=0;i<emojis.length;i++){
            var emo = emojis[i];
            for(a=0;a<emo.aliases.length;a++){
                if(tag==emo.aliases[a]){
                    return emo.emoji;
                }
            }
            for(t=0;t<emo.aliases.length;t++){
                if(tag==emo.tags[t]){
                    return emo.emoji;
                }
            }
        }
        return tag;
    },
    tags    : function(){
        var ret = [];
        for(i=0;i<emojis.length;i++){
            for(t=0;t<emojis[i].tags.length;t++){
                ret.push(emojis[i].tags[t])
            }
            
        }
        return ret;
    }
}

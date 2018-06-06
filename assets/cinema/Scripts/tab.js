// JavaScript Document
function AutoTables(id, init){
    var $this = $("#"+id+"");
    var cnt = $this.find("h2 span").length;    //总个数
    var spd = 3000;       //间隔多少毫秒切换一个
    var dft = 0;
    
    var AutoPlay;
    
    function Play(){
        //alert(dft);
        $this.find("h2 span").removeClass();
        $this.find("h2 span").eq(dft).addClass("show");
        $this.find("div[name='AutoContent']>div").hide();
        $this.find("div[name='AutoContent']>div").eq(dft).show();
        
        if(dft >= cnt-1)
        {
            dft = 0;
        }
        else
        {
            dft++;
         }
        //AutoPlay = setTimeout(Play,spd);  //是否自动播放 不自动则屏蔽
    }
    
    $this.find("h2 span").bind("mouseover",function(){
        clearTimeout(AutoPlay);
        //var $index = $(this).index();
		var $index = $(this).parent().find("span").index($(this));
        $this.find("h2 span").removeClass();
        $this.find("h2 span").eq($index).addClass("show");
        $this.find("div[name='AutoContent']>div").hide();
        $this.find("div[name='AutoContent']>div").eq($index).show();
     
        dft = $index;
        AutoPlay = setTimeout(Play,spd);
    });
	
	
	if(init != undefined){
		dft = init;
	}
    
    Play(dft);
}
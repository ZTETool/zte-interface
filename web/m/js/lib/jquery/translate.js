(function ($) {
    $.fn.translate = function () {
    	var $this = $(this);
    	$this.each(function(){
    		var item = $(this);
    		var trans = item.attr("data-trans");
    		if(!!trans){
            	translateElement(this, trans);
    		}
    	});
    	
    	$this.find("*[data-trans]").each(function () {
    		if($(this).attr("id") == 'chosen-search-field-input'){
    			var val = $("#chosenUserSelect").val();
    			if(val && val.length > 0){
    				return;
    			}
    		}
            var trans = $(this).attr("data-trans");
            if (trans != "") {
            	translateElement(this, trans);
            }
        });

    	//翻译国家码
        $('#container *[transid]').each(function () {
        	var ele = $(this);
            var transid = ele.attr('transid');
            if(ele.attr("name") == "channel"){
            	ele.find('option').each(function () {
            		var item = $(this);
            		if (item.val() != 0) {
            			var val = item.val().split("_");
            			item.html( val[1] + "MHz " + $.i18n.prop(transid + '_' + val[0]) );
            		} else {
            			item.html( $.i18n.prop(transid + '_0') );
            		}
            	});
            }else{
            	ele.find('option').each(function () {
            		$(this).html($.i18n.prop(transid + '_' + $(this).attr('value')));
            	});
            }
        });

//        $('table.ui-table:not(".not-trans")', '#container').each(function(){
//            var e = $(this);
//            if (e.attr("data-role") == "table") {
//                $(".ui-table-cell-label").remove();
//                e.table("refresh");
//            }
//        });


        function translateElement(ele, trans){
        	var word = $.i18n.prop(trans);
            var nodeName = ele.nodeName.toUpperCase();
            if(nodeName == 'INPUT' && $(ele).attr('type') == 'password') {
                $(ele).attr('placeholder', word);
            } else if (nodeName == 'SELECT'){
                $(ele).val(word);
            } else if( nodeName=="TEXTAREA"){
                $(ele).val(word);
            }   else if(nodeName == 'INPUT'){
                var e = $(ele).parent(".ui-input-btn")[0];
                if(!e){
                    $(ele).val(word);
                }else{
                    $(ele).val(word).button('refresh');
                }
            } else if (nodeName == 'BUTTON') {
                var e = $(ele).parent(".ui-input-btn")[0];
                if(!e){
                    $(ele).text(word);
                }else{
                    $(ele).text(word).button('refresh');
                }
            } else if(nodeName =="A"){
                var e = $(ele).find(".ui-btn-text")[0];
                if(!e){
                    $(ele).html(word);
                }else{
                    $(e).html(word);
                }
            }else if(nodeName=="LABEL"){
                var e =  $(ele).find(".ui-btn-text")[0];
                if(!e){
                    $(ele).html(word);
                }else{
                    $(e).html(word);
                }
            }else if(nodeName =="H4"){
                var e = $(ele).find(".ui-collapsible-heading-toggle")[0];
                if(!e){
                    $(ele).html(word);
                }else{
                    $(e).html(word);
                }
            }else{
                $(ele).html(word);
            }
        }

        $('.content div.row-fluid', $this).each(function () {
            if ($(this).has('.required').length > 0) {
                $("label:first-child", $(this)).append("<i class='colorRed'>&nbsp;*</i>");
            } else {
                $("label:first-child", $(this)).append("<i class='colorRed' style='visibility: hidden;'>&nbsp;*</i>");
            }
        });

        $("[data-role]").each(function(){
                var item = $(this);
                var role = item.attr("data-role");
                switch(role){
                    case "slider":
                        var next = item.next();
                        if(next.length>0){
                            var s = next.find("span");
                            $(s[0]).html(item[0].options[0].text);
                            $(s[1]).html(item[0].options[1].text);
                            item.slider("refresh");
                        }
                        break;
//                    case "listview":
//                        item.listview("refresh");
//                        break;
//                    case "slider":
//                        item.slider("refresh");
//                        break;
                }
            }
        );
//        $('select').selectmenu('refresh');
//        $("input[type='checkbox']:first").attr("checked",true).checkboxradio("refresh");
//        $("input[type='radio']:first").attr("checked",true).checkboxradio("refresh");

        return $this;
    };
})(jQuery);

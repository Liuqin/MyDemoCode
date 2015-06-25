(function($){
    function init(target) {
        //ע���˴������ܻ�ȡoptions

        //����������Խ���һЩ��������ʽ����ʱ�������
        $(target).css('cursor', 'pointer');

        $(target).bind('click', function (e, preventBubble) {
            $.fn.hello.methods.sayHello($(e.target));
            return false;
        });

		return $(target);
	}

    //easyui�������
    $.fn.hello = function (options, param) {
        //���optionsΪstring�����Ƿ������ã���$('#divMyPlugin').hello('sayHello');
		if (typeof options == 'string'){
		    var method = $.fn.hello.methods[options];
			if (method){
				return method(this, param);
			}
		}
		
        //�����ǲ����ʼ����������$('#divMyPlugin').hello();
		options = options || {};
		return this.each(function(){
		    var state = $.data(this, 'hello');
			if (state){
				$.extend(state.options, options);
			} else {
                //easyui��parser�����μ���options��initedObj
			    state = $.data(this, 'hello', {
			        options: $.extend({}, $.fn.hello.defaults, $.fn.hello.parseOptions(this), options),
			        initedObj: init(this) //�����initedObj�������ȡ��
				});
			}

			$(this).css('color', state.options.myColor);
		});
	};
	
    //����hello�����һЩ������Ĭ��ʵ��
    //ע����һ������Ϊ��ǰԪ�ض�Ӧ��jQuery����
	$.fn.hello.methods = {
		options: function(jq){
		    return $.data(jq[0], 'hello').options;
		},
		sayHello: function (jq) {
		    var opts = $.data(jq[0], 'hello').options; //��ȡ���ò���
		    for (var i = 0; i < opts.repeatTimes; i++) {
		        opts.howToSay(opts.to);
		    }
		}
	};
	
    //���ò���ת������
	$.fn.hello.parseOptions = function (target) {
	    var opts = $.extend({}, $.parser.parseOptions(target, ['to', 'myColor', { repeatTimes: 'number' }]));//�������ָ������������
	    return opts;
	};
	
    //����hello�����һЩĬ��ֵ
	$.fn.hello.defaults = {
	    to: 'world',
	    repeatTimes: 1,
	    myColor: null,
	    howToSay: function (to) {
	        alert('Hello, ' + to + "!");
	    }
	};
    
    //ע���Զ���easyui���hello
    $.parser.plugins.push("hello");
})(jQuery);

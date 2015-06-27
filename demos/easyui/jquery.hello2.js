(function ($) {
    function init(target) {
        $(target).addClass('hello2');

        return $(target);
    }

    //easyui�������
    $.fn.hello2 = function (options, param) {
        //���optionsΪstring�����Ƿ������ã���$('#divMyPlugin').hello('sayHello');
        if (typeof options == 'string') {
            var method = $.fn.hello2.methods[options];
            if (method) { //���Ե���hello2�ķ�����û���ҵ���ȥ��hello�ķ���
                return method(this, param);
            } else {
                return this.hello(options, param); //���ü̳е�hello�ķ���
            }
        }

        //�����ǲ����ʼ����������$('#divMyPlugin').hello();
        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'hello');
            if (state) {
                $.extend(state.options, options);
            } else {
                //easyui��parser�����μ���options��initedObj
                state = $.data(this, 'hello2', {
                    options: $.extend({}, $.fn.hello2.defaults, $.fn.hello2.parseOptions(this), options),
                });

                init(this);
            }

            $(this).hello(state.options); //���ü̳е�hello�Ĺ��췽��

            var $input = $("<input />");
            var current = this;
            $input.width(state.options.inputWidth).val(state.options.to).change(function () {
                var val = $(this).val();
                $.data(current, 'hello').options.to = val;
                $.data(current, 'hello2').options.to = val;
            });
            $(this).append($input);

            $(this).css('color', state.options.myColor);
        });
    };

    //��ע�⡿�����methodsû�в���$.extend
    $.fn.hello2.methods = {
        options: function (jq) {
            var copts = jq.hello('options'); //��ȡhello�̳е�options
            return $.extend($.data(jq[0], 'hello2').options, {});
        }
    };

    //���ò���ת��������ʹ��$.extend�Ӽ̳е�hello������չ��
    $.fn.hello2.parseOptions = function (target) {
        var opts = $.extend({}, $.fn.hello.parseOptions(target), $.parser.parseOptions(target, [{ inputWidth: 'number' }]));//�������ָ������������
        return opts;
    };

    //����hello�����һЩĬ��ֵ��ʹ��$.extend�Ӽ̳е�hello������չ��
    $.fn.hello2.defaults = $.extend({}, $.fn.hello.defaults, {
        inputWidth: 100
    });

    //ע����hello2
    $.parser.plugins.push("hello2");
})(jQuery);

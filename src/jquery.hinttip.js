(function($, PluginName) {
    var vspacing = 9,
        default_zIndex = 1;

    $[PluginName] = function($target, opts) {
        this.$self = $('<span />').addClass(PluginName).hide().appendTo($('body'));
        this.$target = $target;

        opts = opts || {};
        this.html = opts.html || (function() {
            var title = $target.attr('title');
            $target.attr('title', '');
            return title;
        })();
        this.zIndex = opts.zIndex || default_zIndex;

        var that = this;
        this.$target.on(opts.show || 'mouseover', function(event) {
            that.update().$self.show();
        });
        this.$target.on(opts.hide || 'mouseout', function() {
            that.$self.hide();
        });
        if (opts.sync) {
            this.$target.on(opts.sync, function() {
                that.update();
            })
        }
    };

    $[PluginName].prototype = {
        update: function() {
            var s = this.$self,
                t = this.$target,
                left;
            s.html(
                typeof this.html === 'function' ? this.html.apply(t) : this.html
            );
            if (t.outerWidth() > s.outerWidth()) {
                left = t.offset().left + t.outerWidth() - s.outerWidth();
            } else {
                left = t.offset().left + t.outerWidth() / 2 - s.outerWidth() * 3/4;
            }
            s.css({
                zIndex: this.zIndex,
                display: 'inline-block',
                top:   t.offset().top + t.outerHeight() + vspacing,
                left:  left,
                width: 'auto'
            });
            return this;
        }
    };

    $.fn[PluginName] = function(opts) {
        return this.each(function() {
            var $this = $(this);
            $this.data(PluginName, new $[PluginName]($this, opts));
        });
    }
})(jQuery, 'HintTip');

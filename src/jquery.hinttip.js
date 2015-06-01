(function($, PluginName) {
    var vspacing = 9,
        default_zIndex = 1;

    $[PluginName] = function($target, opts) {
        this.$self = $('<span />').addClass(PluginName).hide();
        this.$target = $target.before(this.$self);

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
                t = this.$target;
            s.html(
                typeof this.html === 'function' ? this.html.apply(t) : this.html
            );
            s.css({
                zIndex: this.zIndex,
                display: 'inline-block',
                top:   t.position().top  + parseInt(t.css('marginTop'))  + t.outerHeight() + vspacing,
                left:  t.position().left + parseInt(t.css('marginLeft')) + t.outerWidth()  - s.outerWidth(),
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

var scrollEffects = (function($) {
    var height = $(window).height();
    var offset = height / 4;

    $('.views-row').each(function() {
        $(this).waypoint(function() {
            $(this.element).addClass('active');
             $(this.element).find('li').each(function(index) {
                $(this).delay(150 * index).queue(function(next) {
                    $(this).addClass('animate');
                    next();
                });
            });

                this.destroy();
        }, {
            offset: '50%'
        });
    });

})(jQuery);
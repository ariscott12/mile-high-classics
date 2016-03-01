    var about = (function($) {
    "use strict";

    var jqueryMap = {
        $slider_wrapper: $('[data-id="slider-wrapper"]'),
        $slider_pagers: $('[data-id="slider-pagers"]'),
        $flip_card: $('[data-id="flip-card"]'),
        $bio_wrapper: $('[data-id="bio-wrapper"]'),
        $name_wrapper: $('[data-id="name-wrapper"]'),
    };

    var initSlider = (function() {
        var imgCount = jqueryMap.$slider_wrapper.find('img').length;
        var wrapperWidth = imgCount * 100;
        var imgWidth = 100 / imgCount;
        var count = 0;

        jqueryMap.$slider_wrapper.css({
            width: wrapperWidth + '%'
        });
        jqueryMap.$slider_wrapper.find('img').css({
            width: imgWidth + '%'
        });

        jqueryMap.$slider_pagers.find('li').click(function() {
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            jqueryMap.$slider_wrapper.animate({
                marginLeft: index * -100 + '%'
            });

            // clear timer when pager clicked
            clearInterval(timer);
        });

        var setTimer = function() {
            count++;
            jqueryMap.$slider_wrapper.animate({
                marginLeft: count * -100 + '%'
            });
            jqueryMap.$slider_pagers.find('li').eq(count).addClass('active').siblings().removeClass('active');
            if(count >= imgCount - 1 ) {
                count = -1;
            }
        }

        var timer = setInterval(setTimer, 4000);
    })();

    jqueryMap.$flip_card.click(function() {
        jqueryMap.$bio_wrapper.removeClass('flipped');
        jqueryMap.$name_wrapper.removeClass('flipped');
        $(this).parent().parent().addClass('flipped');
        $(this).parent().parent().next().addClass('flipped');
    });

})(jQuery);


var scrollEffects = (function($) {
    var whoWeAre = new Waypoint({
        element: $('.about-background'),
        handler: function(direction) {
            $(this.element).addClass('active');
            this.destroy();
        },
        offset: '75%'
    });
    var ourTeam = new Waypoint({
        element: $('.view-our-team'),
        handler: function(direction) {
            $(this.element).find('.views-row').each(function(index) {
                $(this).delay(275 * index).queue(function(next) {
                    $(this).addClass('active');
                    next();
                });
            });
            this.destroy();
        },
        offset: '75%'
    });
    var ourFacility = new Waypoint({
        element: $('#block-mhc-blocks-facility-project-block'),
        handler: function(direction) {
            $(this.element).addClass('active');
            $('.pagers li').each(function(index) {
                $(this).delay(125 * index).queue(function(next) {
                    $(this).addClass('rotate');
                    next();
                });
            });
            this.destroy();

        },
        offset: '75%'
    });

})(jQuery);
var common = (function($) {
    "use strict";

    var jqueryMap = {
        $learn_more: $('[data-id="learn-more"]'),
        $content: $('[data-id="content"]')
    };

    var scrollToMain = function() {
        $('html, body').animate({
            scrollTop: jqueryMap.$content.offset().top
        }, 600);
    };

    jqueryMap.$learn_more.click(scrollToMain);

})(jQuery);


var about = (function($) {
    "use strict";

    var jqueryMap = {
        $slider_wrapper: $('[data-id="slider-wrapper"]'),
        $slider_pagers: $('[data-id="slider-pagers"]'),
        $flip_card: $('[data-id="flip-card"]'),
    };
    var imgCount = jqueryMap.$slider_wrapper.find('img').length;
    var wrapperWidth = imgCount * 100;
    var imgWidth = 100 / imgCount;

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

        //alert(index);
    });
    jqueryMap.$flip_card.click(function() {
        $('.bio-wrapper').removeClass('flipped');
        $('.name-wrapper').removeClass('flipped');
        $(this).parent().parent().addClass('flipped');
        $(this).parent().parent().next().addClass('flipped');
    });



})(jQuery);

var navigation = (function($) {
    "use strict";

    $('.hamburger').click(function() {
        $('ul.menu').slideToggle();
    });

    if ($('.jump-links').is(":visible")) {
        var stickyNavTop = $('.jump-links').offset().top;
        var stickyNavHeight = $('.jump-links').height();

        var stickyNav = function() {
            var scrollTop = $(window).scrollTop();

            if (scrollTop > stickyNavTop) {
                $('.jump-links').addClass('sticky');
                $('.block-system').css({
                    'padding-top': stickyNavHeight
                });
            } else {
                $('.jump-links').removeClass('sticky');
                $('.block-system').css({
                    'padding-top': 0
                });
            }
        };
        stickyNav();
        $(window).scroll(function() {
            stickyNav();
        });
    }


    $('.jump-links').find('a').click(function() {
        var href = $(this).attr("href");
        var hash = href.substr(href.indexOf("#"));
        var tagHeight = $(hash).height();

        $('html, body').animate({
            scrollTop: $(hash).offset().top - tagHeight - 20
        }, 1000);

        //  window.location.hash = hash;
        return false;

    });

})(jQuery);
jQuery(function() {
    var navigation = (function($) {
        "use strict";
        var jqueryMap = {
            $learn_more: $('[data-id="learn-more"]'),
            $content: $('[data-id="content"]'),
            $hamburger: $('[data-id="hamburger"]'),
            $mobile_menu: $('ul.menu'),
            $jump_links: $('.jump-links'),
            $scroll_down: $('[data-id="scroll-down"]'),
            $header: $('header')
        };
        var location = window.location.href;
        var scrollToMain = function() {
            $('html, body').animate({
                scrollTop: jqueryMap.$content.offset().top
            }, 600);
        };
        var toggleMobileMenu = function() {
            jqueryMap.$mobile_menu.slideToggle();
        };
        var scrollJumpLinks = function(hash) {
            hash = hash.replace('#', '');
            var jumpNav = jqueryMap.$jump_links.height();
            var topNav = jqueryMap.$header.height();
            if (location.indexOf('about-us') > -1) {
                $('html, body').animate({
                    scrollTop: $("." + hash).parent().offset().top - jumpNav - topNav
                }, 1000);
            } else {
                $('html, body').animate({
                    scrollTop: $("." + hash).parent().parent().offset().top - jumpNav - topNav
                }, 1000);
            }
        };
        var getHash = function() {
            var href = $(this).attr('href');
            var hash = href.substr(href.indexOf('#'));
            scrollJumpLinks(hash);
        };
        var stickyNav = function() {
            var stickyNavTop = jqueryMap.$jump_links.offset().top;
            var stickyNavHeight = jqueryMap.$jump_links.height();
            var stickyNavTopHeight = jqueryMap.$header.height();
            var scrollNav = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > stickyNavTop - stickyNavTopHeight) {
                    jqueryMap.$jump_links.addClass('sticky');
                    $('main').css({
                        'padding-top': stickyNavHeight
                    });
                } else {
                    jqueryMap.$jump_links.removeClass('sticky');
                    $('main').css({
                        'padding-top': 0
                    });
                }
            };
            return {
                scrollNav: scrollNav
            };
        };
        var stickyTopNav = function() {
            if ($(window).scrollTop() > 26) {
                jqueryMap.$header.addClass('sticky');
            } else {
                jqueryMap.$header.removeClass('sticky');
            }
        }
        if (jqueryMap.$jump_links.is(":visible")) {
            var sticky = stickyNav();
            sticky.scrollNav();
            $(window).scroll(function() {
                sticky.scrollNav();
            });
        }
        if (window.location.hash) {
            var hash = window.location.hash;
            hash = hash.replace('#', '');
            scrollJumpLinks(hash);
        }
        $(window).scroll(function() {
            stickyTopNav();
        });
        // Add Click Listeners
        jqueryMap.$jump_links.find('a').click(getHash);
        jqueryMap.$learn_more.click(scrollToMain);
        jqueryMap.$scroll_down.click(scrollToMain);
        jqueryMap.$hamburger.click(toggleMobileMenu);
    })(jQuery);
});
var projects = (function($) {
    "use strict";
    //window.scroll(0, 650);
    // create img element for large image
    var $imgLarge = $("<img class = \"detail-large\" data-id = \"image-large\" src = \"image\" /> ");
    var jqueryMap = {
        $project_links: $('[data-id="project-links"]'),
        $project_slides: $('[data-id="project-slides"]'),
        $project_pagers: $('[data-id="project-pagers"]'),
        $first_slide: $('.project-slide').eq(0),
        $img_small: $('.feature-image-small'),
        $sidebar: $('[data-id="project-sidebar"]')
    };
    jqueryMap.$project_slides.prepend($imgLarge);
    var updateSrc = function($obj) {
        var largeSrc = $obj.eq(0).attr('data-image-large');
        //$imgLarge.hide().fadeIn(400);
        $imgLarge.attr('src', largeSrc);
    };
    updateSrc(jqueryMap.$first_slide.find('img'));
    var animateImage = function() {
        $('.project-slide.active img').each(function(index, el) {
            $(this).delay(125 * index + 2).queue(function(next) {
                $(this).addClass("animate");
                next();
            });
        });
    };
    var toggleSlides = function() {
        if (!$(this).hasClass('active')) {
            var attr = $(this).attr('data-project-type');
            $('[data-project-type="' + attr + '"]').addClass('active').siblings().removeClass('active');
            updateSrc($('.project-slide.active').find('img'));
            $('.project-slide.active img').eq(0).addClass('active').siblings().removeClass('active');
            $('.project-slide img').removeClass('animate');
            animateImage();
        }
    };
    var toggleLargeImage = function() {
        updateSrc($(this));
        $(this).addClass('active').siblings().removeClass('active');
    };
    jqueryMap.$project_links.children().click(toggleSlides);
    jqueryMap.$project_pagers.children().click(toggleSlides);
    jqueryMap.$img_small.click(toggleLargeImage);
   

    // Waypoint objects
    if ( $( ".project-sidebar" ).length ) {
        var projectSidebar = new Waypoint({
            element: jqueryMap.$sidebar,
            handler: function(direction) {
                $('.pagers a').each(function(index) {
                    $(this).delay(125 * index).queue(function(next) {
                        $(this).addClass('rotate');
                        next();
                    });
                });
                this.destroy();
            },
            offset: '75%'
        });
        var projectSlide = new Waypoint({
            element: jqueryMap.$project_slides,
            handler: function(direction) {
                $(this.element).addClass('active');
                jqueryMap.$first_slide.addClass('active');
                jqueryMap.$first_slide.find('img').eq(0).addClass('active');
                projects.animateImage();
                this.destroy();
            },
            offset: '50%'
        });
    }
    var projectGrid = new Waypoint({
        element: $('.project-row'),
        handler: function(direction) {
            $(this.element).find('a').each(function(index) {
                $(this).delay(175 * index).queue(function(next) {
                    $(this).addClass('animate');
                    next();
                });
            });
            this.destroy();
        },
        offset: '70%'
    });
    return {
        animateImage: animateImage
    };
})(jQuery);
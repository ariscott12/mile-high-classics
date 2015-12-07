var home = (function($) {
    "use strict";

    var jqueryMap = {
        $project_links: $('[data-id="project-links"]'),
        $project_slides: $('[data-id="project-slides"]'),
        $project_pagers: $('[data-id="project-pagers"]'),
    };

    var counterArray = [-1, -180, -180, -180, -180];
    var toggleSlides = function() {
        if (!$(this).hasClass('active')) {
            var
                attr = $(this).attr('data-project-type'),
                index = $(this).index(),
                indexActive = jqueryMap.$project_slides.find('.active').index();

            counterArray[index] += 180;
            counterArray[indexActive] += 180;

            jqueryMap.$project_slides.find('.active').children('.feature-image-large').css('transform', 'rotateX(' + counterArray[indexActive] + 'deg)');
            jqueryMap.$project_slides.find('.active').children('.feature-image-small').css('transform', 'rotateY(' + counterArray[indexActive] + 'deg)');

            $('[data-project-type="' + attr + '"]').find('.feature-image-large').css('transform', 'rotateX(' + counterArray[index] + 'deg)');
            $('[data-project-type="' + attr + '"]').find('.feature-image-small').css('transform', 'rotateY(' + counterArray[index] + 'deg)');
            $('[data-project-type="' + attr + '"]').addClass('active').siblings().removeClass('active');
        }

    };

    jqueryMap.$project_links.children().click(toggleSlides);
    jqueryMap.$project_pagers.children().click(toggleSlides);

})(jQuery);


var scrollEffects = (function($) {
    var serviceFront = new Waypoint({
        element: $('#block-views-services-block'),
        handler: function(direction) {
            $(this.element).addClass('active');
            this.destroy();
        },
        offset: '70%'
    });
    var projectSidebar = new Waypoint({
        element: $('.project-sidebar'),
        handler: function(direction) {
            $('.pagers a').each(function(index) {
                $(this).delay(125 * index).queue(function(next) {
                    $(this).addClass("rotate");
                    next();
                });
            });
            this.destroy();

        },
        offset: '20%'
    });
    var featuredWork = new Waypoint({
        element: $('.project-slide').eq(0),
        handler: function(direction) {
            $(this.element).addClass('active');
            this.destroy();
        },
        offset: '70%'
    });
})(jQuery);
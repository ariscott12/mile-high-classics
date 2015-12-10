var projects = (function($) {
    "use strict";
    // create img element for large image
    var $imgLarge = $("<img class = \"detail-large\" data-id = \"image-large\"  /> ");
   
    var jqueryMap = {
        $project_links: $('[data-id="project-links"]'),
        $project_slides: $('[data-id="project-slides"]'),
        $project_pagers: $('[data-id="project-pagers"]'),
        $first_slide: $('.project-slide').eq(0),
        $img_small: $('.feature-image-small'),
        $sidebar: $('[data-id="project-sidebar"]'),
        $project_grid_link: $('[data-id=project-grid-link')
    };
    //jqueryMap.$project_slides.prepend($imgLarge);
    
    // replace detail-large src with clicked thumbnail src, show loading gif
    var updateSrc = function($obj, callback) {
        var largeSrc = $obj.eq(0).attr('data-image-large');
        var image = new Image();  
        var imageHeight = $('.detail-large').height();

        if($('.loader')) {
            $('.loader').remove();
        }

        image.src = largeSrc;
        $imgLarge.hide();

        $('.project-slide-wrapper').prepend('<img class = "loader" />');
        $('.loader').css({
            height: imageHeight
        });

        image.onload = function() {
            $('.loader').remove();
            $imgLarge.attr('src', largeSrc);
            $imgLarge.show();

            if(typeof(callback) === 'function') {
                callback();
            }
        }  
    };
    //updateSrc(jqueryMap.$first_slide.find('img'));
    
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
    var animatePagers = function() {
        $('.pagers a').each(function(index) {
            $(this).delay(125 * index).queue(function(next) {
                $(this).addClass('rotate');
                next();
            });
        });
    }
    var toggleLargeImage = function() {
        updateSrc($(this));
        $(this).addClass('active').siblings().removeClass('active');
    };
    var loadNewProject = function() {
        // Get href from clicked element
        var link = $(this).attr('href');
        var contentHeight = $('[data-id="content"]').height();
        // prepend loader
        $('[data-id="content"]').html('<img class = "loader" />');
        $('.loader').css({
            height: contentHeight
        });
        // Scroll to content-wrapper section
        $('html,body').animate({
            scrollTop: $(".content-wrapper").offset().top
        });


        var load = $('<div>');
        load.load(link + ' .content-wrapper .region-content', function() {
           var content = load.html();
           $('[data-id = "content"]').html(content);

            // Update large img src
            $('[data-id="project-slides"]').prepend($imgLarge);
            updateSrc($('.project-slide').eq(0).find('img'), function() {
                console.log('loadessd');
            });
          
           // Add CSS classes to slides to trigger animations
            $('.project-slide').eq(0).addClass('active');
            $('.project-slide').eq(0).find('img').eq(0).addClass('active');
            animateImage();
            animatePagers();
            $('[data-id="project-slides"]').delay(50).queue(function(next) {
                $(this).addClass('active');
                next();
            });
          
            // Add click handlers to pagers and links
            $('[data-id="project-links"]').children().click(toggleSlides);
            $('[data-id="project-pagers"]').children().click(toggleSlides);
            $('.feature-image-small').click(toggleLargeImage);
        });
        return false;
    }


    // jqueryMap.$project_links.children().click(toggleSlides);
    // jqueryMap.$project_pagers.children().click(toggleSlides);
    // jqueryMap.$img_small.click(toggleLargeImage);
     jqueryMap.$project_grid_link.find('a').click(loadNewProject);
    // Waypoint objects
    // if ($(".project-sidebar").length) {
    //     var projectSidebar = new Waypoint({
    //         element: jqueryMap.$sidebar,
    //         handler: function(direction) {
    //             $('.pagers a').each(function(index) {
    //                 $(this).delay(125 * index).queue(function(next) {
    //                     $(this).addClass('rotate');
    //                     next();
    //                 });
    //             });
    //             this.destroy();
    //         },
    //         offset: '75%'
    //     });
    //     var projectSlide = new Waypoint({
    //         element: jqueryMap.$project_slides,
    //         handler: function(direction) {
    //             $(this.element).addClass('active');
    //             jqueryMap.$first_slide.addClass('active');
    //             jqueryMap.$first_slide.find('img').eq(0).addClass('active');
    //             projects.animateImage();
    //             this.destroy();
    //         },
    //         offset: '50%'
    //     });
    // }
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
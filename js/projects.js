var projects = (function($) {
    "use strict";
    // Create html elements
    var $imgLarge = $('<img class = \"detail-large\" data-id = \"image-large\"  /> ');
    var $spinner = $('<img class = "spinner" data-id = "spinner" />');
    var imageHeight = 0;
    var image = new Image();

    // Create jqueryMap
    var jqueryMap = {
        $project_grid_link: $('[data-id=project-grid-link'),
        $content: $('[data-id = "content"]'),
        $spinner: $('[data-id = "spinner"]')
    };

    // Update detail-large src with clicked thumbnail src, show loading gif
    var updateLargeImage = function($obj, callback) {
        var largeImageSrc = $obj.eq(0).attr('data-image-large');
        
        // If loader exists remove it
        if (jqueryMap.$spinner) {
            jqueryMap.$spinner.remove();
        }
        image.src = largeImageSrc;

        // Only get height of detail large image if it's visible, otherwise use previously stored height
        if($('.detail-large').is(':visible')) {
            imageHeight = $('.detail-large').height();
        }

        $imgLarge.hide();

        // Prepend loading gif to div wrapper and set height
        $('.project-slide-wrapper').prepend($spinner);
        
        // Callback function will hide spinner when content is finished loading  
        if (typeof(callback) !== 'function') {
            $('[data-id = "spinner"]').css({
                height: imageHeight
            });
        }
        
        // Once requested image loads hide spinner and update image large src
        image.onload = function() {
            $('[data-id = "spinner"]').remove();
            $imgLarge.attr('src', largeImageSrc);
            $imgLarge.show();

            // Execute callback if function and passed in as argument
            if (typeof(callback) === 'function') {
                callback();
            } 
        }
    };
    var animateThumbnailImages = function() {
        $('.project-slide.active img').each(function(index, el) {
            $(this).delay(125 * index + 2).queue(function(next) {
                $(this).addClass("animate");
                next();
            });
        });
    };
    // Hides/shows slideshow gallery for taxonomy terms
    var toggleSlides = function() {
        if (!$(this).hasClass('active')) {
            var attr = $(this).attr('data-project-type');
            $('[data-project-type="' + attr + '"]').addClass('active').siblings().removeClass('active');
            $('.project-slide.active img').eq(0).addClass('active').siblings().removeClass('active');
            $('.project-slide img').removeClass('animate');
            updateLargeImage($('.project-slide.active').find('img'));
            animateThumbnailImages();
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
        updateLargeImage($(this));
        $(this).addClass('active').siblings().removeClass('active');
    };
    var loadNewProject = function() {
            var link = $(this).attr('href');
            var contentHeight = $('[data-id="content"]').height();
            
            if(contentHeight < 100) {
                contentHeight = 800;
            }
           
            // Scroll to content-wrapper section
            $('html,body').animate({
                scrollTop: jqueryMap.$content.offset().top
            });

            // prepend loader
            jqueryMap.$content.html($spinner);
            $('[data-id="spinner"]').css({
                height: contentHeight
            });

            var load = $('<div>');
            load.load(link + ' .content-wrapper .region-content', function() {
                var content = load.html();

                // append content once imageLarge has loaded, uses callback function
                updateLargeImage($(content).find('.project-slide').eq(0).find('img'), function() {
                    jqueryMap.$content.html(content);
                    $('[data-id="project-slides"]').prepend($imgLarge);
                   
                    // Add CSS classes to slides to trigger animations
                    $('.project-slide').eq(0).addClass('active');
                    $('.project-slide').eq(0).find('img').eq(0).addClass('active');
                    
                    animateThumbnailImages();
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
            });
            return false;
        }

    jqueryMap.$project_grid_link.find('a').click(loadNewProject);

    // Waypoints
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
})(jQuery);
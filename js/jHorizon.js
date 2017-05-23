$.fn.jHorizon = function () {
    var elm = $(this);
    if (typeof elm.get(0) === 'undefined') {
        return;
    }
    elm.css("overflow", "hidden");
    var content = $(this).children('.jHorizon_content');
    
	init();
	
	function init() {
        var slide = false;
        var scrollRate;
        var scrollStart;
        var scrollDistance;
        var trailingOffset = 0;
        var animation;
        var animationInterval = 10;
        var animationDuration = 500;
        var threshold = 100;
        var has3D = has3D();
        var isMobile = isMobile();
        var hasThreshold = false;
        
        var dragging = false;
        var factor = 1;
        var hover = false;
        var contentScrollWidth = elm.get(0).scrollWidth;
        var scrollWidth = contentScrollWidth - elm.innerWidth();
        var scrollbarWidth = calcScrollbarWidth();
        var scrollbar = initScrollbar();
        var wheel = (window.onwheel !== undefined) ? 'wheel' : (window.onmousewheel !== undefined) ? 'mousewheel' : (window.attachEvent) ? 'onmousewheel' : 'DOMMouseScroll';

        var sliderPosition = new Array(0, 0);

        elm.bind(wheel, function (event) {
            var orgEvent = event.originalEvent;
            var delta = (typeof orgEvent.deltaY !== 'undefined') ? orgEvent.deltaY : (typeof orgEvent.detail !== 'undefined' && orgEvent.detail !== 0) ? orgEvent.detail : -orgEvent.wheelDelta;
            if (delta > 0) {
                delta = 144;
            } else {
                delta = -144;
            }
            calcPosition(delta);
            clearInterval(animation);
            if (slideToPosition(false)) {
                setScrollbarPosition();
                event.preventDefault();
                event.stopPropagation();
            }
        });
        elm.mouseenter(function () {
            if (!isMobile) {
                hover = true;
                showScrollbar();
            }
        });
        elm.parent().mouseleave(function () {
            if (!isMobile) {
                hover = false;
                hideScrollbar();
            }
        });
        elm.bind("touchstart", function (event) {
            slide = true;
            scrollRate = new Array(0, 0);
            scrollRate[1] = event.originalEvent.touches[0].pageX;
            scrollStart = scrollRate[1];
        });
        $(document).bind("touchmove", function (event) {
            if (!slide) {
                return;
            }
            scrollRate[0] = scrollRate[1];
            scrollRate[1] = event.originalEvent.touches[0].pageX;
            scrollDistance = Math.floor(scrollRate[0] - scrollRate[1]);
            var dist = scrollStart - scrollRate[1];
            if (hasThreshold || Math.abs(dist) > threshold) {
                hasThreshold = true;
                calcPosition(scrollDistance);
                clearInterval(animation);
                if (slideToPosition(false)) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
        elm.bind("touchcancel touchend", function (event) {
            slide = false;
            hasThreshold = false;
            trail();
        });

        function calcPosition(delta) {
            var newPos = sliderPosition[1] + delta;
            trailingOffset = Math.ceil((trailingOffset + delta) / 2);
            setPosition(newPos);
        }

        function setPosition(p) {
            sliderPosition[1] = Math.max(Math.min(p, scrollWidth), 0);
        }

        function slideToPosition(force) {
            if (scrollWidth > 0 && sliderPosition[0] != sliderPosition[1] || force) {
                if (has3D) {
                    do3DTransformation(content, -sliderPosition[1]);
                } else {
                    do2DTransformation(-sliderPosition[1]);
                }
                sliderPosition[0] = sliderPosition[1];
                return true;
            }
            return false;
        }

        function do3DTransformation(elm, offset) {
            elm.css({
                'oTransform': 'matrix(1,0,0,1,' + offset + ',0)',
                'msTransform': 'matrix(1,0,0,1,' + offset + ',0)',
                'webkitTransform': 'matrix(1,0,0,1,' + offset + ',0)',
                'MozTransform': 'matrix(1,0,0,1,' + offset + ',0)',
                'transform': 'matrix(1,0,0,1,' + offset + ',0)'
            });
        }

        function do2DTransformation(offset) {
            content.css({
                left: offset + 'px'
            });
        }

		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}
		
        function initScrollbar() {
            if (scrollbarWidth != 0 && !isMobile) {
                var id = guid();
                elm.append("<div id='" + id + "' class='jHorizon_scrollbar jHorizon_scrollbar_horizontal' style='width: " + scrollbarWidth + "px;'></div>");
                var scrollbar = $('#' + id);
                scrollbar.data('factor', factor);
                scrollbar.draggable({
                    axis: "x",
                    containment: "parent",
                    start: function () {
                        dragging = true;
                    },
                    drag: function (event, ui) {
                        setPosition(Math.floor(scrollbar.data('factor') * scrollbar.position().left));
                        slideToPosition(false);
                    },
                    stop: function () {
                        dragging = false;
                        hideScrollbar();
                    }
                });
                return scrollbar;
            }
            return;
        }

        function calcScrollbarWidth() {
            if (!isMobile) {
                var elmWidth = elm.width();
                if (contentScrollWidth > elmWidth + 2) {
                    var scrollbarWidth = Math.floor(Math.pow(elmWidth, 2) / contentScrollWidth);
                    factor = contentScrollWidth / elmWidth;
                    return scrollbarWidth;
                }
            }
            return 0;
        }

        function refreshScrollbarWidth() {
            if (!isMobile) {
                var width = calcScrollbarWidth();
                var oldFactor = scrollbar.data('factor');
                if (scrollbarWidth != 0) {
                    scrollbar.width(scrollbarWidth);
                    scrollbar.data('factor', factor);
                } else {
                    if (typeof scrollbar !== 'undefined' && scrollbar !== null) {
                        scrollbar.remove();
                        scrollbar = null;
                        setPosition(0);
                        slideToPosition(true);
                    }
                }
                refreshPositions(oldFactor);
            }
        }

        function setScrollbarPosition() {
            if (typeof scrollbar !== 'undefined' && scrollbar !== null && !isMobile) {
                scrollbar.css('left', Math.floor(sliderPosition[1] / scrollbar.data('factor')));
            }
        }

        function refreshPositions(oldFactor) {
            var f = Math.max(factor, oldFactor) / Math.min(factor, oldFactor);
            setPosition(Math.floor(f * sliderPosition[1]));
            slideToPosition(false);
            setScrollbarPosition();
        }

        function showScrollbar() {
            if (typeof scrollbar !== 'undefined' && scrollbar !== null && !slide) {
                scrollbar.show();
            }
        }

        function hideScrollbar() {
            if (typeof scrollbar !== 'undefined' && scrollbar !== null && !dragging && !hover) {
                scrollbar.hide();
            }
        }

        function trail() {
            animation = setInterval(function () {
                trailing(trailingOffset);
            }, animationInterval);
            setTimeout(function () {
                clearInterval(animation);
            }, animationDuration);
        }

        function trailing(offset) {
            calcPosition(offset);
            slideToPosition(false);
        }

        function has3D() {
            var has3D = false;
            var test = $('<div />').css({
                'oTransform': 'matrix(1,1,1,1,1,1)',
                'msTransform': 'matrix(1,1,1,1,1,1)',
                'webkitTransform': 'matrix(1,1,1,1,1,1)',
                'MozTransform': 'matrix(1,1,1,1,1,1)',
                'transform': 'matrix(1,1,1,1,1,1)'
            });
            if (test.attr('style') == '') {
                has3D = false;
            } else if (test.attr('style') != undefined && scrollbar !== null) {
                has3D = true;
            }
            return has3D;
        }

        function isMobile() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }

        $(window).resize(function () {
            setTimeout(doResize, 200);
            function doResize() {
                scrollWidth = contentScrollWidth - elm.innerWidth();
                scrollbarWidth = calcScrollbarWidth();
                if (typeof scrollbar === 'undefined' || scrollbar === null) {
                    scrollbar = initScrollbar();
                } else {
                    refreshScrollbarWidth();
                }
            }
        });
    }
};
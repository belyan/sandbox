/**
 * Tooltip
 * jQuery plugin shows tooltip for the element
 *
 * @example
 * $("#element").tooltip();
 */
;(function ($) {
    "use strict";

    // Default options
    var defaults = {
        className: "tooltip",
        delay: 200,
        animation: {
            time: 100,
            easing: 'ease'
        },
        debug: false
    };

    var tooltipSize,
        tooltipTimeout;

    /**
     * Tooltip constructor
     * @param element
     * @param options
     * @constructor
     */
    function Tooltip(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this.init();
    }

    /**
     * Tooltip initialization
     */
    Tooltip.prototype.init = function () {
        var self = this,
            offset = this.element.offset();

        if (!this.tooltip) this.tooltip = this.create();
        tooltipSize = getSize(this.tooltip);

        this.element.hover(function () {
            if (self.options.debug) console.log('mouseenter');

            $(this).on('mousemove', function (event) {
                if (self.options.debug) console.log('mousemove');

                clearTimeout(tooltipTimeout);
                self.hide();

                tooltipTimeout = setTimeout(function () {
                    self.show({
                        left: event.clientX - offset.left,
                        top: event.clientY - offset.top
                    });
                }, self.options.delay);
            });
        }, function () {
            if (self.options.debug) console.log('mouseleave');

            clearTimeout(tooltipTimeout);
            self.hide();
        });
    };

    /**
     * Create DOM node
     * @returns {*}
     */
    Tooltip.prototype.create = function () {
        var text = this.element.data("title") || this.options.title;

        return $("<div></div>", {class: this.options.className})
            .text(text)
            .appendTo(this.element);
    };

    /**
     * Show tooltip
     * @param position
     * @returns {boolean}
     */
    Tooltip.prototype.show = function (position) {
        if (this.tooltip.is(':visible')) return false;

        this.tooltip.css({
            left: position.left - tooltipSize.width / 2,
            top: position.top - tooltipSize.height - 15
        });

        this.tooltip.fadeIn(this.options.animation.time);

        return true;
    };

    /**
     * Hide tooltip
     * @returns {boolean}
     */
    Tooltip.prototype.hide = function () {
        if (this.tooltip.is(':hidden')) return false;

        this.tooltip.hide();

        return true;
    };

    /**
     * Get element size
     * @returns {{width: *, height: *}}
     */
    function getSize(element) {
        return {
            width: element.outerWidth(),
            height: element.outerHeight()
        };
    }

    /**
     * Plugin wrapper, preventing against multiple instantiations and return plugin instance
     * @param options
     * @returns {Tooltip}
     */
    $.fn.tooltip = function (options) {
        var dataKey = "jquery.tooltip",
            plugin = this.data(dataKey);

        if (plugin instanceof Tooltip) {
            // if have options arguments, call plugin.init() again
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Tooltip(this, options);
            this.data(dataKey, plugin);
        }

        return plugin;
    };
})(jQuery);

/**
 * jQuery Plugin Template
 * https://jqueryboilerplate.com/
 *
 * Example of usage:
 * $("#element").defaultPluginName({
 *     propertyName: "a custom value"
 * });
 */
;(function ($) {
    "use strict";

    var pluginName = "defaultPluginName";

    // Default options
    var defaults = {
        propertyName: "default value"
    };

    // The plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        constructor: Plugin,

        init: function () {
            // Place initialization logic here

            // You already have access to the DOM element and the options via the instance,
            // e.g. this.element and this.settings
            // You can add more functions like the one below and call them like the example below
            this.yourOtherFunction(this.options.propertyName);
        },

        yourOtherFunction: function(text) {
            // Some logic
            $(this.element).text(text);
        }
    };

    // A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery);
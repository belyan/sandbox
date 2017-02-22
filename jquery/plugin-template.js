/**
 * jQuery Plugin Template
 * @link https://jqueryboilerplate.com/
 *
 * @example
 * $("#element").pluginName({
 *     property: "custom text"
 * });
 */
;(function ($) {
    "use strict";

    var pluginName = "pluginName",
        dataKey = "plugin_" + pluginName;

    // Default options
    var defaults = {
        text: "default value"
    };

    /**
     * Plugin constructor
     * @param element
     * @param options
     * @constructor
     */
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    /**
     * Plugin initialization
     */
    Plugin.prototype.init = function () {
        // Place initialization logic here

        // You can add more functions like the one below and call them like the example below
        this.publicMethod(this.options.text);
    };

    /**
     * Public method
     * @param text
     */
    Plugin.prototype.publicMethod = function(text) {
        // You already have access to the DOM element and the options via the instance,
        // e.g. this.element and this.options
        privateMethod(this.element, text);
    };

    /**
     * Private method
     * @param element
     * @param text
     */
    function privateMethod(element, text) {
        element.text(text);
    }

    /**
     * Plugin wrapper, preventing against multiple instantiations and return plugin instance
     * @param options
     * @returns {*}
     */
    $.fn[pluginName] = function (options) {
        var plugin = this.data(dataKey);

        if (plugin instanceof Plugin) {
            // if have options arguments, call plugin.init() again
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Plugin(this, options);
            this.data(dataKey, plugin);
        }

        return plugin;
    };

})(jQuery);
;(function($) {
	var pluginName = "myTab"; //插件的名稱
	var defaults = {
		content: '',
		active: null
	}; //默认的参数
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	Plugin.prototype.init = function() {
		var self = this;
		var activeE = self.options.e_active;
		var $element = $(this.element);
		var $content = $(this.options.content);
		$element.on('click', 'li', function() {
			var $this = $(this);
			var c = $this.data("tab");
			$element.trigger('tab/change', c);
		});
		$element.on('tab/change', function(e, tabName) {
			$element.find('li').removeClass('cur');
			$element.find('>[data-tab=' + tabName + ']').addClass("cur");

			$content.find('>[data-tab]').removeClass('on');
			$content.find('>[data-tab=' + tabName + ']').addClass("on");

			activeE && activeE(tabName);
		});
		var activeName = this.options.active;
		if(activeName == null) {
			$element.find('li').eq(0).click();
		} else {
			$element.trigger('tab/change', activeName);
		}
	}
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if(!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	}
})(jQuery);
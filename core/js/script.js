Wee.fn.make('cookie', {
	/**
	 *
	 * @param conf - Configuration
	 * @param conf.name - Cookie name
	 * @param conf.value - Cookie value
	 * @param conf.daysToExpire - Number of days to set cookie expiration
	 */
	set: function(conf) {
		var options = $.extend({
				daysToExpire: 7
			}, conf),
			date = new Date();

		date.setTime(date.getTime() + (options.daysToExpire * 24 * 60 * 60 * 1000));

		document.cookie = options.name + '=' + options.value + '; ' + 'expires=' + date.toUTCString();
	},

	/**
	 * Get cookie
	 * @param {string} name - Cookie name
	 * @returns {string|boolean} - Returns cookie value if found
	 */
	get: function(name) {
		var value = '; ' + document.cookie,
			parts = value.split('; ' + name + '=');

		if (parts.length === 2) {
			return parts.pop()
				.split(';')
				.shift();
		}

		return false;
	},

	/**
	 * Delete cookie
	 * @param {string} name - Name of cookie to delete
	 */
	destroy: function(name) {
		this.set({
			name: name,
			value: '',
			daysToExpire: -1
		});
	}
});
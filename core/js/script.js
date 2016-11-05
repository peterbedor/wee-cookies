Wee.fn.make('cookie', {
	/**
	 * Set a cookie
	 *
	 * @param conf - Configuration
	 * @param conf.name - Cookie name
	 * @param conf.value - Cookie value
	 * @param [conf.daysToExpire] - Number of days to set cookie expiration
	 */
	set: function(options) {
		this.$private.set(options);
	},

	/**
	 * Get a cookie by key
	 *
	 * @param key
	 * @return {*} - Returns cookie value
	 */
	get: function(key) {
		return this.$private.get(key);
	},

	/**
	 * Delete a cookie by key
	 *
	 * @param key
	 * @return {*} - Returns cookie value
	 */
	delete: function(key) {
		this.$private.delete(key);
	}
}, {
	/**
	 * Set a cookie
	 *
	 * @param conf - Configuration
	 * @param conf.name - Cookie name
	 * @param conf.value - Cookie value
	 * @param [conf.daysToExpire] - Number of days to set cookie expiration
	 */
	set: function(options) {
		this.options = options;

		$._doc.cookie = this.buildCookie()
	},

	/**
	 * Get a cookie by key
	 *
	 * @param key
	 * @return {*} - Returns cookie value
	 */
	get: function(key) {
		var value = '; ' + document.cookie,
			parts = value.split('; ' + key + '=');

		if (parts.length === 2) {
			return parts.pop()
				.split(';')
				.shift();
		}

		return false;
	},

	/**
	 * Get date for cookie
	 *
	 * @return {Date} - Date object
	 */
	getDate: function() {
		var date = new Date(),
			day = 24 * 60 * 60 * 1000;

		return date.setTime(date.getTime() + (this.options.daysToExpire * day));
	},

	/**
	 * Build the cookie string
	 *
	 * @return {string}
	 */
	buildCookie: function() {
		var date = this.getDate();

		return this.options.name + '=' +
			this.options.value + '; ' +
			'expires=' + date.toUTCString();
	},

	/**
	 * Delete a cookie by key
	 *
	 * @param key
	 * @return {*} - Returns cookie value
	 */
	delete: function(key) {
		this.set({
			name: key,
			value: '',
			daysToExpire: -1
		});
	}
});
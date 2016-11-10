Wee.fn.make('cookie', {

	/**
	 * Set a cookie
	 *
	 * @param {string} key
	 * @param {string} value
	 * @param {object} options
	 * @param {int} [options.daysToExpire] - number of days for cookie to expire
	 * @param {string} [options.path] - set path for the cookie
	 * @param {string} [options.domain] - set the domain for the cookie
	 * @param {boolean} [options.secure] - set a secure cookie
	 */
	set: function(key, value, options) {
		options = $.extend({
			daysToExpire: 7,
			path: '/',
			domain: '',
			secure: false
		});

		this.$private.set(key, value, options);
	},

	/**
	 * Get a cookie
	 *
	 * @param {string} key
	 * @param {boolean} [json] - boolean to parse for JSON
	 * @returns {*}
	 */
	get: function(key, json) {
		return this.$private.get(key, json);
	},

	/**
	 * Manually expire a cookie
	 *
	 * @param {string} key
	 */
	expire: function(key) {
		this.$private.expire(key);
	}
}, {
	_construct: function() {
		this.cookieCachePrefix = 'cookie.';

		this.cache = this.getCookieCache();
	},

	set: function(key, value, options) {
		$._doc.cookie = this.generateCookieString(key, value, options);
	},

	get: function(key, json) {
		if (this.cachedDocumentCookie !== $._doc.cookie) {
			this.refreshCookieCache();
		}

		var value = this.cache[this.cookieCachePrefix + key];

		if (value === undefined) {
			return undefined;
		} else {
			value = decodeURIComponent(value);

			if (json) {
				try {
					value = JSON.parse(value);
				} catch (e) {}
			}

			return value;
		}
	},

	expire: function(key) {
		this.set(key, false, {
			daysToExpire: -1
		});
	},

	/**
	 * Generates a valid cookie string
	 *
	 * @param key
	 * @param {*} value
	 * @param {object} [options] - options object
	 * @param {int} [options.daysToExpire] - number of days for cookie to expire
	 * @param {string} [options.path] - set path for the cookie
	 * @param {string} [options.domain] - set the domain for the cookie
	 * @param {boolean} [options.secure] - set a secure cookie
	 * @returns {string|*}
	 */
	generateCookieString: function(key, value, options) {
		var expires = this.getExpireDate(options),
			cookie;

		try {
			value = JSON.stringify(value);
		} catch (e) {}

		key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
		key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
		value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);

		cookie = key + '=' + value;
		cookie += options.path ? ';path=' + options.path : '';
		cookie += options.domain ? ';domain=' + options.domain : '';
		cookie += options.expires ? ';expires=' + expires : '';
		cookie += options.secure ? ';secure' : '';

		return cookie;
	},

	/**
	 * Manually refresh cookie cache
	 */
	refreshCookieCache: function() {
		this.cache = this.getCookieCache();

		this.cachedDocumentCookie = $._doc.cookie;
	},

	/**
	 * Retrieve cookie cache
	 *
	 * @returns {{}}
	 */
	getCookieCache: function() {
		var prefix = this.cookieCachePrefix,
			cookies = $._doc.cookie ? $._doc.cookie.split('; ') : [],
			cache = {},
			i = 0;

		for (; i < cookies.length; i++) {
			var cookie = this.getKeyValuePair(cookies[i]);

			if (cache[prefix + cookie.key] === undefined) {
				cache[prefix + cookie.key] = cookie.value;
			}
		}

		return cache;
	},

	/**
	 * Parse a cookie string to get it's key value pair as an object
	 *
	 * @param cookieString
	 * @returns {{key: *, value: string}}
	 */
	getKeyValuePair: function(cookieString) {
		var index = cookieString.indexOf('='),
			key,
			decodedKey;

		index = index < 0 ? cookieString.length : index;

		key = cookieString.substr(0, index);

		try {
			decodedKey = decodeURIComponent(key);
		} catch (e) {
			console.error('Could not decode cookie with key "' + key + '"', e);
		}

		return {
			key: decodedKey,
			value: cookieString.substr(index + 1)
		};
	},

	/**
	 * Generate valid expiration date for cookie
	 *
	 * @param {int} [options.daysToExpire] - number of days for cookie to expire
	 * @param options
	 * @returns {string}
	 */
	getExpireDate: function(options) {
		var expires = new Date();

		expires.setMilliseconds(
			expires.getMilliseconds() + options.daysToExpire * 864e+5
		);

		return expires.toUTCString();
	}
});
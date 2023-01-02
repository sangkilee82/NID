var hash = {

	_vars: [],
	get: function (key) {

		if ( location.href.indexOf("#") != -1 ) {

			var vars = [];
			var dat = [];
			var url_arr = location.href.slice(window.location.href.indexOf('#') + 1).split('&');
			for (var i = 0; i < url_arr.length; i++) {
				if (!url_arr[i]) continue;

				dat = url_arr[i].split('=');
				vars.push(dat[0]);
				vars[dat[0]] = dat[1];
			}

			hash._vars = vars;

		}

		if (key) {
			if (hash._vars[key]) {
				return decodeURI(hash._vars[key]).trim();
			} else {
				return "";
			}
		} 

		return hash._vars;

	},

	remove: function (key) {

		var _hash = hash.get();
		var idx = _hash.indexOf(key);
		if (idx != -1) {
			_hash.splice(idx, 1);
		}

		return hash;

	},

	join: function () {

		var _hash = hash._vars;
		if (_hash.length == 0) {

			_hash = hash.get();

		}

		var arr = [];
		for (var i = 0, j = _hash.length; i < j; i++) {

			var key = _hash[i];
			arr.push(key + "=" + _hash[key]);

		}

		var url = location.href;

		//파라메터가 없다면
		if (_hash.length == 0) {

			return url;

		} else {

			return url.split('#')[0] + "#" + arr.join("&");

		}

	},

	change: function (key, value) {

		var _hash = hash.get();
		if (_hash.indexOf(key) == -1) {
			_hash.push(key);
			_hash[key] = value;
		} else {
			_hash[key] = value;
		}

		return hash;

	}

}
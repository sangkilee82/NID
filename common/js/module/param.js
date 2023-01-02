var param = {

	_vars: [],
	get: function (key) {

		if (location.href.indexOf("?") != -1) {

			//해쉬 제거를 위한 과정
			var url_qstr = "";
			if (window.location.href.indexOf("#") != -1) {

				url_qstr = window.location.href.split("#")[0];

			} else {

				url_qstr = window.location.href;

			}			

			var vars = [], hash;
			var hashes = url_qstr.slice(url_qstr.indexOf('?') + 1).split('&');
			for (var i = 0; i < hashes.length; i++) {
				if (!hashes[i]) continue;

				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}

			param._vars = vars;

		}

		if (key) {
			if (param._vars[key]) {
				return decodeURI(param._vars[key]).trim();
			} else {
				return "";
			}
		}

		return param._vars;

	},

	remove: function (key) {

		var _param = param.get();
		var idx = _param.indexOf(key);
		if (idx != -1) {
			_param.splice(idx, 1);
		}

		return param;

	},

	join: function () {

		var _param = param._vars;
		if (_param.length == 0) {

			_param = param.get();

		}

		var arr = [];
		for (var i = 0, j = _param.length; i < j; i++) {

			var key = _param[i];
			arr.push(key + "=" + _param[key]);

		}

		//해쉬와 같이 전달
		var url_qstr = "";
		var hstr = "";
		if (window.location.href.indexOf("#") != -1) {

			url_qstr = window.location.href.split("#")[0];
			hstr = "#" + window.location.href.split("#")[1];

		} else {

			url_qstr = window.location.href;

		}

		//파라메터가 없다면
		if (_param.length == 0) {

			return url_qstr + hstr;

		} else {

			return url_qstr.split('?')[0] + "?" + arr.join("&") + hstr;

		}

	},

	add: function (key, value) {

		//var _param = param.get();
		if (param._vars.indexOf(key) == -1) {
			param._vars.push(key);
			param._vars[key] = value;
		} else {
			param._vars[key] = value;
		}

		return param;

	}

}
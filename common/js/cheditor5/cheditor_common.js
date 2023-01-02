var cheditor_common = {
	
	set: function (content_name, width, height) {

		window[content_name + "_editor"] = new cheditor();
		var editor = window[content_name + "_editor"];
		editor.config.editorWidth = width;
		editor.config.editorHeight = height;
		editor.config.imgReSize = true;
		editor.inputForm = content_name;
		editor.run();

	},

	getHtmlContent: function (content_name) {

		return window[content_name + "_editor"].outputHTML();
		//window[content_name + "_editor"].returnFalse();

	},

	getBodyContent: function (content_name) {

		return window[content_name + "_editor"].outputBodyHTML();
		//window[content_name + "_editor"].returnFalse();

	},

	getTextContent: function (content_name) {

		return window[content_name + "_editor"].outputBodyText();
		//window[content_name + "_editor"].returnFalse();

	},

	getContentLength: function (content_name) {

		return window[content_name + "_editor"].inputLength();
		
	},

	getDocumentLength: function (content_name) {

		return window[content_name + "_editor"].contentsLengthAll();

	}

}
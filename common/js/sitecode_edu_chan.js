var siteCode = {

	select: function (oThis, pt_code, ori_code, depth, table_name) {
        
		//선택버튼이 존재한다면,
		if (oThis != null) {
        
			//해당 테이블 내의 아이콘을 정상화 한다.
			$("#sitecode_" + (Number(depth) - 1) + " .select_icon").each(function (idx, obj) {

				$(obj).attr("src", "../images/icon_accept.gif");

			});

			//해당 버튼만 아이콘을 변경한다.
			$(oThis).find("img").attr("src", "../images/action_forward.gif");

		}

		//마지막 Depth일때
		if (Number(depth) == 3) {

			return;

		}

        //DB테이블 이름으로 치매센터용, 외부기관용으로 구분하여 테이블 속성을 변경
		var agency_name = "";
		if (table_name == "TB_EDUCATION_NEWCODE") agency_name = ".agency";
		else agency_name = ".exagency";

		//하위 테이블 초기화
		var real_depth = Number(depth) - 1;
		for (var i = 2, j = real_depth; i > j; i--) {
		    
		    $(agency_name).find("#sitecode_" + i).attr("pt_code", "");
		    $(agency_name).find("#sitecode_" + i).attr("ori_code", "");
		    $(agency_name).find("#sitecode_" + i + " tbody").html("");

		}
		
		//해당 테이블에 코드 설정
		$(agency_name).find("#sitecode_" + depth).attr("pt_code", pt_code);
		$(agency_name).find("#sitecode_" + depth).attr("ori_code", ori_code);

		//조회 Ajax
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "./list_chan.aspx/Select",
			data: "{ 'pt_code': '" + pt_code + "', 'ori_code': '" + ori_code + "', 'depth': '" + depth + "', 'table_name': '" + table_name + "' }",
			success: function (data) { siteCode.selectResult(data, ori_code, depth, table_name); }
		});

	},

	selectResult: function (data, ori_code, depth, table_name) {
        
		//선택시 다음 Table에 값을 할당하기 위해 +1을 해준다.
	    var select_depth = depth + 1;

        //테이블이름을 기준으로 구분자를 보낸다.
	    var get_table = "A";
	    if (table_name == "TB_EDUCATION_EX_NEWCODE") get_table = "B";

		//TR html
		var html = "<tr code='{CODE}'>";
		html += "<td class='tx_a_left'><span onclick='siteCode.modifyClick( this, \"" + table_name + "\", \"" + ori_code + "\" );'>{CODE_NAME}</span></td>";		                                                     //코드명
	    //치매센터용일떄만
		if (get_table == "A") {

		    html += "<td><img src='../images/cog.gif' alt='설정' onclick='FrameLayer.open( \"./regiForm.aspx?code={CODE}&ori_code={ORI_CODE}\", 550, 530, \"no\" );' /></td>";
		}
		html += "<td><img src='../images/action_stop.gif' onclick='siteCode.remove( this, \"" + table_name + "\" );' alt='삭제' /></td>";											             //삭제
		html += "<td onclick='siteCode.select( this, \"{CODE}\", \"{ORI_CODE}\", " + select_depth + ", \"{TABLE_NAME}\" );'><img src='../images/icon_accept.gif' class='select_icon' alt='선택' /></td>";	 //선택
		html += "</tr>";
        
		var data_arr = $.parseJSON(data.d);
		var cache_html = "";										//table에 Append하기 전에 현재 변수에 캐쉬한다.
		for (var i = 0, j = data_arr.length; i < j; i++) {

			var json = data_arr[i];
			var new_html = html.replace("{CODE_NAME}", json.code_name).replaceAll("{CODE}", json.code).replaceAll("{ORI_CODE}", json.ori_code).replaceAll("{TABLE_NAME}", json.table_name);
			cache_html += new_html;

		}

		//해당 테이블에 Append한다.
		$("#sitecode_" + depth + " tbody").append(cache_html);

	},

	add: function (oThis, table_name) {
	    
		var table = $(oThis).parents("table");									//테이블 개체
		var depth = Number(table.attr("id").split('_')[1]);				        //단계
		var code_name = oThis.value;											//코드 명
		var pt_code = table.attr("pt_code");								    //상위 코드
		var ori_code = table.attr("ori_code");

		//유효성
		if (!pt_code.trim()) {

			alert("상위메뉴를 선택해주세요.");
			return;

		}

		if (!code_name.trim()) {

			alert("코드를 입력해주세요.");
			return;

		}

		//등록 Ajax
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "./list_chan.aspx/Add",
			data: "{ 'code_name': '" + code_name + "', 'pt_code': '" + pt_code + "', 'ori_code': '" + ori_code + "', 'depth': '" + depth + "', 'table_name': '" + table_name + "' }",
			success: function (data) { siteCode.selectResult(data, ori_code, depth, table_name); }
		});

		//input을 text로 변경
		oThis.blur();

	},

	addClick: function (oThis, table_name) {
	    
		var input_html = "<input type='text' htip='Enter키: 등록, ESC키: 취소' onkeydown='siteCode.keyCheck( event, \"add\", \"" + table_name + "\" )' /> ";
		var txt_html = "<span onclick='siteCode.addClick( this, \"" + table_name + "\" );'>이곳을 클릭하여 새로운 코드를 등록하세요.</span>";

		//Add
		$(oThis).parent().html(input_html).find("input").eq(0).
			htip("show").
			focus().
			bind("blur", function (evt) {

				//텍스트 처리
				var td = $(evt.currentTarget).parent();
				$(td).html(txt_html);

			});

	},

	remove: function (oThis, table_name) {

		if (!confirm("정말 삭제하시겠습니까?")) return;

		var tr = $(oThis).parents("tr");
		var code = tr.attr("code");

	    //DB테이블 이름으로 치매센터용, 외부기관용으로 구분하여 테이블 속성을 변경
		var agency_name = "";
		if (table_name == "TB_EDUCATION_NEWCODE") agency_name = ".agency";
		else agency_name = ".exagency";

		//삭제 Ajax
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "./list_chan.aspx/Remove",
			data: "{ 'code': '" + code + "', 'table_name': '" + table_name + "' }",
			success: function (data) {

				//선택 유무
				var choice = (tr.find("td:last img").eq(0).attr("src").indexOf("icon_accept") == -1) ? "Y" : "N";

				//하위 테이블 초기화
				if (choice == "Y") {

					//하위 테이블 초기화
				  var depth = Number(tr.parents("table").attr("id").split("_")[1]);
					for (var i = 2, j = depth; i > j; i--) {

					    $(agency_name).find("#sitecode_" + i).attr("pt_code", "");
					    $(agency_name).find("#sitecode_" + i + " tbody").html("");

					}

				}

				//TR삭제						
				tr.remove();

			}
		});

	},

	modifyClick: function (oThis, table_name, ori_code) {

	  var tr = $(oThis).parents("tr");							        //Tr 개체
		var code = tr.attr("code");										//코드
		var code_name = $(oThis).text();								//코드 명

		//TD html
		var html = "<td class='bd_line_right bd_line_left' colspan='4'>";
		html += "<input type='text' htip='Enter키: 수정, ESC키: 취소' onkeydown='siteCode.keyCheck( event, \"modify\", \"" + table_name + "\" )' value='" + code_name + "' />";
		html += "</td>";

		//해당 TR선택 유무
		var choice = (tr.find("td:last img").eq(0).attr("src").indexOf("icon_accept") == -1) ? "Y" : "N";
		tr.attr("choice", choice);

		//TD변경
		tr.html(html).find("input").eq(0).
			htip("show").
			focus().
			bind("blur", function (evt) {

				var data = { "d": { "code": code, "code_name": code_name } };
				var input = evt.currentTarget;

				siteCode.modifyResult(input, data, table_name);

			});

	},

	modify: function (oThis, table_name) {

		var tr = $(oThis).parents("tr");							            //Tr 개체
		var code = tr.attr("code");											//코드
		var code_name = oThis.value;										//코드 명
		var table = $(oThis).parents("table");
		var ori_code = table.attr("ori_code");

		alert(ori_code);

		if (!code_name) {

			alert("수정할 코드명을 입력해주세요.");
			return;

		}

		//수정 Ajax
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "./list_chan.aspx/Modify",
			data: "{ 'code': '" + code + "', 'code_name': '" + code_name + "', 'table_name': '" + table_name + "', 'ori_code': '" + ori_code + "' }",
			success: function (data) { siteCode.modifyResult(oThis, data, table_name); }
		});

	},

	modifyResult: function (oThis, data, table_name) {

	  var tr = $(oThis).parents("tr");							    //Tr 개체
	  var table = $(tr).parents("table");						        //Table 개체
		var depth = table.attr("id").split("_")[1];			            //Depth
		var select_depth = Number(depth) + 1;						    //선택되었을때 전달할 Depth
		var choice = tr.attr("choice");									//선택 유무
		var icon_src = (choice == "Y") ? "action_forward" : "icon_accept";
		var ori_code = table.attr("ori_code");
		tr.removeAttr("choice");

		var json = null;
		if ($.type(data.d) == "string") json = $.parseJSON(data.d);
		else json = data.d;

	    //테이블이름을 기준으로 구분자를 보낸다.
		var get_table = "A";
		if (table_name == "TB_EDUCATION_EX_NEWCODE") get_table = "B";

		//TR html
		var html = "<td class='tx_a_left'><span onclick='siteCode.modifyClick( this, \"" + table_name + "\" );'>{CODE_NAME}</span></td>";				                                    //코드명

        //치매센터용일떄만
		if (get_table == "A") {

		    html += "<td><img src='../images/cog.gif' alt='설정' onclick='FrameLayer.open( \"./regiForm.aspx?code={CODE}&ori_code={ORI_CODE}\", 550, 530, \"no\" );' /></td>";
		}
		
		html += "<td><img src='../images/action_stop.gif' onclick='siteCode.remove( this, \"" + table_name + "\" );' alt='삭제' /></td>";				                                    //삭제
		html += "<td onclick='siteCode.select( this, \"{CODE}\", {DEPTH} );'><img src='../images/" + icon_src + ".gif' class='select_icon' alt='선택' /></td>";	    //선택

		//html replace
		var new_html = html.replace("{CODE_NAME}", json.code_name).replaceAll("{CODE}", json.code).replaceAll("{ORI_CODE}", ori_code).replace("{DEPTH}", select_depth);

		//html 변경
		tr.html(new_html);

	},

	keyCheck: function (evt, type, table_name) {

		var keyCode = $(evt).keyCode();
		var target = evt.currentTarget || evt.target || evt.srcElement;

		if (keyCode == "13") {

			//ToolTip 사라지기
			$(target).htip("hide");

			//등록
			if (type == "add") {

				siteCode.add(target, table_name);

			//수정
			} else if (type == "modify") {

				siteCode.modify(target, table_name);

			}

		} else if (keyCode == "27") {

			//취소
			target.blur();

		}

	},

	move: function (type, depth, table_name) {

		$("#sitecode_" + depth + " img.select_icon").each(function (idx, obj) {

			if ($(obj).attr("src").indexOf("icon_accept") == -1) {

				//Up
				if (type == "up") siteCode.up(obj, depth, table_name);

			    //Down
				else siteCode.down(obj, depth, table_name);

			}

		});

	},

	up: function (obj, depth, table_name) {

	    var tr = $(obj).parents("tr");
		if (tr.index() == 0) {

			alert("더이상, 상단으로 이동할 수 없습니다.");

		} else {

			var code = tr.attr("code");

			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "./list_chan.aspx/Move",
				data: "{ 'code': '" + code + "', 'depth': '" + depth + "', 'type': 'up', 'table_name': '" + table_name + "' }",
				success: function () {

					tr.insertBefore(tr.prev());

				}
			});

		}

	},

	down: function (obj, depth, table_name) {

	    var tr = $(obj).parents("tr");
	    var table = $(tr).parents("table");
		var rowLength = $(table).rowLength();

		if (tr.index() >= rowLength - 3) {

			alert("더이상, 하단으로 이동할 수 없습니다.");

		} else {

			var code = tr.attr("code");

			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "./list_chan.aspx/Move",
				data: "{ 'code': '" + code + "', 'depth': '" + depth + "', 'type': 'down', 'table_name': '" + table_name + "' }",
				success: function () {

					tr.insertAfter(tr.next());

				}
			});

		}

	}

}
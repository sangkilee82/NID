var dynamicTable = {

	create: function (option) {

		//검색 설정
		var search_str = "";
		if (option.search) {

			for (var key in option.search) {

				search_str += ",'" + key + "': '" + option.search[key] + "' ";

			}

		}

		//첫 페이지
		if (!option.page) {

			var init_page = param.get("page");
			if (!init_page) init_page = hash.get("page");
			if (!init_page) init_page = 1;

			option.page = init_page;

		}
		
		//리스트 페이지 일때는 no 쿼리스트링 삭제
		var url = location.href;
		var regexp = new RegExp( option.seq_name + "=[0-9]" );
		if (url.indexOf("list.aspx") != -1) {

			option.list_url = option.list_url.replace(regexp, "");

		}

		//로딩 표시
		$("#load_area").css("display", "");

		//데이터 로딩
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: option.list_url,
			data: "{ 'page': '" + option.page + "' " + search_str + " }",
			success: function (data) { dynamicTable.createResult(option, data); },
			error: function ( data ) {

				var res_txt = data.responseText;
				var status = data.status;
				var status_text = data.statusText;
				
				console.log(res_txt);

				alert("[오류가 발생하였습니다.]\n\n상태 : " + status + "(" + status_text + ")\n\n" + res_txt);

			}
		});

	},

	createResult: function (option, data) {

		var dynamic_obj = $.parseJSON(data.d);
		var data_arr = dynamic_obj.data;

		//테이블 생성
		dynamicTable.createTable(option, data_arr);

		//페이징 생성
		dynamicTable.paging(option, Number(dynamic_obj.page), Number(dynamic_obj.start_page), Number(dynamic_obj.end_page), Number(dynamic_obj.now_block), Number(dynamic_obj.block_cnt), Number(dynamic_obj.total_block_cnt), Number(dynamic_obj.total_page_cnt));

		//해시 변경
		//location.href = hash.change("page", option.page).join();

		//로딩 표시 제거
		setTimeout(function () {
			$("#load_area").css("display", "none");
		}, 350);

	},

	createTable: function (option, data_arr) {

		var html = "";
		var ths = $("#" + option.table_id).parent().find("thead > tr > th ");
		for (var i = 0, j = data_arr.length; i < j; i++) {

			html += "<tr>";
			for (var m = 0, n = data_arr[i].length; m < n; m++) {

				var clas = ths.eq(m).attr("class");
				var clas_str = (clas) ? "class='" + clas + "'" : "";
				var val = data_arr[i][m].replaceAll("[qq]", "\"").replaceAll("[q]", "'");
				html += "<td " + clas_str + ">" + val + "</td>";

			}
			html += "</tr>";

		}

		if (i == 0) {

			var col_len = ths.length;
			html = "<tr><td colspan='" + col_len + "'>등록된 정보가 없습니다.</td></tr>";

		}

		$("#" + option.table_id).html(html);

	},

	paging: function (option, page, start_page, end_page, now_block, block_cnt, total_block_cnt, total_page_cnt) {

		var html = "";

		//게시물이 없을 경우
		if (total_page_cnt == 0) {

			$("#" + option.paging_id).html(html);
			return;

		}

		//맨 처음
		if (page != 1) {

			html += "<a class='fast_forward' href='javascript:" + option.func_name + "( 1 );'></a>";

		}

		//이전
		if (now_block != 1) {

			html += "<a class='forward' href='javascript:" + option.func_name + "(" + ((now_block - 1) * block_cnt) + ")'></a>";

		}

		//페이징 숫자
		html += "<ol>";
		for (var i = start_page, k = 0; i <= end_page; i++, k++) {

			var now_page = Number(option.page);
			if (i == now_page) {

				html += "<li class='on'><a>" + i + "</a></li>";

			} else {

				html += "<li><a href='javascript:" + option.func_name + "( " + i + " );'>" + i + "</a></li>";

			}

		}
		html += "</ol>";

		//다음
		if (now_block != total_block_cnt) {

		  html += "<a class='back' href='javascript:" + option.func_name + "( " + (now_block + block_cnt) + " );'></a>";

		}

		//맨 마지막
		if (now_block != total_block_cnt) {

		  html += "<a class='fast_back' href='javascript:" + option.func_name + "( " + total_page_cnt + " );'></a>";

		}

		$("#" + option.paging_id).html(html);

	}
	
}
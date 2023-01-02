using System;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Web.UI.HtmlControls;
using System.Web.UI;
using System.Web;
using System.Text;

public partial class zadmin_common_inc_top : UserControlBase {

	protected void Page_Load(object sender, EventArgs e) {
		
		if (!Page.IsPostBack) {

			//1Depth의 TOP 리스트를 호출한다.
			SetMatchCode();

			TopList();

		} else {

			//1Depth의 TOP 리스트를 호출한다.
			SetMatchCode();

			TopList();

		}

		VisitCount();

		Count();

	}

	private void SetMatchCode() {

		PJHCmdWrapper P = new PJHCmdWrapper();

		using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

			conn.Open(ref P.cmd);

			string[] ab_path_arr = Request.RawUrl.Split('/');
			string ab_path = ab_path_arr[ab_path_arr.Length - 2] + "/" + ab_path_arr[ab_path_arr.Length - 1];

			//서브페이지는 기존 url을 불러온다
			if (Request.Path.IndexOf("sub/sub.aspx") == -1) {

				string[] ab_path_arr2 = ab_path.Split('?');
				ab_path = ab_path_arr2[0];

			}

			byte[] defaultByte = Encoding.ASCII.GetBytes(ab_path);
			ab_path = Encoding.UTF8.GetString(defaultByte);
			string matchCode = string.Empty;

			//연관링크
			P.query = " select * from ( " +

								"   select top(1) CODE " +
								"   from TB_USER_CODE with( nolock ) " +
								"   where CHARINDEX( @URL, URL ) > 0 and REAL_YN = 'Y' " +

								"   union all " +

								"   select top(1) CODE " +
								"   from TB_SCREEN_CODE with( nolock ) " +
								"   where CHARINDEX( @SITE_LINK, SITE_LINK ) > 0 " +
								"   order by NO desc " +

								" ) Z order by CODE desc ";
			P.Cmd_Query();
			P.Cmd_Parameters_AddWithValue("@URL", ab_path);
			P.Cmd_Parameters_AddWithValue("@SITE_LINK", ab_path);
			matchCode = P.Cmd_ExecuteScalar().ConString();

			conn.Close(ref P.cmd);

			//세션에서 불러오는 매치코드도 없다면 페이지 종료
			if (matchCode.IsEmpty()) {

				if (Request.RawUrl.IndexOf("quiz/quiz") != -1) {

					// 매치코드를 세션에 저장한다
					Session["matchCode"] = "006013000";

				} else if(Request.RawUrl.IndexOf("support_n/c_service_190905") != -1){

          Session["matchCode"] = "006012000";

        } else {

					if (Request.Path.IndexOf("main/main.aspx") != 1) {
						Javascript.AlertUrl("잘못된 경로로 접근하셨거나, 세션정보가 종료 되었습니다.", "../main/main.aspx").End();
					}

        }

			} else {

				//매치코드를 세션에 저장한다
				Session["matchCode"] = matchCode;

			}

		}

	}

	private void TopList() {

		PJHCmdWrapper P = new PJHCmdWrapper();

		using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

			conn.Open(ref P.cmd);

			P.query = " select CODE, CODE_NAME " +
								" from TB_USER_CODE with( nolock ) " +
								" where DEPTH = 1 and CODE not in( 009000000, 011000000, 012000000 ) and REAL_YN = 'Y' " +
								" order by NUM asc ";
			P.Cmd_Query();
			P.dr = P.Cmd_ExecuteReader();
			if (P.dr.HasRows) {

				top_RT.DataSource = P.dr;
				top_RT.DataBind();

			}

			P.dr.CloseDispose();
			conn.Close(ref P.cmd);

		}

	}

	//방문자 수 
	private void VisitCount() {

		PJHCmdWrapper P = new PJHCmdWrapper();

		if (true == Session["REAL_VISIT"].ConString().IsEmpty()) {

			// 순수 방문자 수를 구하기 위해서, 세션에 데이터를 입력한다.
			Session["REAL_VISIT"] = "OK";

			using (SqlConnection conn = new SqlConnection(Base.elderDBString)) {

				conn.Open(ref P.cmd);

				// 첫 방문자인지 아닌지 파악
				P.query = " select LOG_COUNT " +
									" from TB_LOG_COUNT " +
									" where GUBUN = @GUBUN and DATE = @DATE ";
				P.Cmd_Query();
				P.Cmd_Parameters_AddWithValue("@DATE", DateTime.Now.ConDate());
				P.Cmd_Parameters_AddWithValue("@GUBUN", "JA");
				int cnt = P.Cmd_ExecuteScalar().ConInt();
				if (cnt < 1) {

					// 오늘 첫 방문자 
					P.query = " insert into TB_LOG_COUNT " +
										" (GUBUN, LOG_COUNT, DATE) values " +
										" (@GUBUN, @LOG_COUNT, @DATE) ";

				} else {

					P.query = " update TB_LOG_COUNT set " +
										" LOG_COUNT = @LOG_COUNT " +
										" where GUBUN = @GUBUN and DATE = @DATE ";
				}
				P.Cmd_Query();
				P.Cmd_Parameters_AddWithValue("@GUBUN", "JA");
				P.Cmd_Parameters_AddWithValue("@LOG_COUNT", cnt + 1);
				P.Cmd_Parameters_AddWithValue("@DATE", DateTime.Now.ConDate());
				P.Cmd_ExecuteNonQuery();

				conn.Close(ref P.cmd);

			}

		}

	}

	//방문자 수 & 봇 추출
	private void Count() {

		PJHCmdWrapper P = new PJHCmdWrapper();

		string agent = Request.UserAgent;

		int bot_count = 0;
		if (true == Session["VISIT_COUNT"].ConString().IsEmpty()) {

			if (agent.Contains("bot")) {

				Session["VISIT_COUNT"] = "bot";
				bot_count = bot_cnt() + 1;

			} else {

				Session["VISIT_COUNT"] = "OK";
			}

			using (SqlConnection conn = new SqlConnection(Base.elderDBString)) {

				conn.Open(ref P.cmd);

				// 첫 방문자인지 아닌지 파악
				P.query = " select LOG_COUNT " +
									" from TB_VISIT_COUNT_TEST " +
									" where GUBUN = @GUBUN and DATE = @DATE and IP = @IP ";
				P.Cmd_Query();
				P.Cmd_Parameters_AddWithValue("@DATE", DateTime.Now.ConDate());
				P.Cmd_Parameters_AddWithValue("@GUBUN", "JA");
				P.Cmd_Parameters_AddWithValue("@IP", Request.UserHostAddress);
				int cnt = P.Cmd_ExecuteScalar().ConInt();
				if (cnt <= 0) {

					// 오늘 첫 방문자 
					P.query = " insert into TB_VISIT_COUNT_TEST " +
										" (GUBUN, LOG_COUNT, DATE, IP) values " +
										" (@GUBUN, @LOG_COUNT, @DATE ,@IP) ";

				} else {

					P.query = " update TB_VISIT_COUNT_TEST set " +
										" LOG_COUNT = @LOG_COUNT," +
										" BOT_CNT = @BOT_CNT " +
										" where GUBUN = @GUBUN and DATE = @DATE and IP = @IP ";
				}
				P.Cmd_Query();
				P.Cmd_Parameters_AddWithValue("@GUBUN", "JA");
				P.Cmd_Parameters_AddWithValue("@LOG_COUNT", cnt + 1);
				P.Cmd_Parameters_AddWithValue("@BOT_CNT", bot_count);
				P.Cmd_Parameters_AddWithValue("@IP", Request.UserHostAddress);
				P.Cmd_Parameters_AddWithValue("@DATE", DateTime.Now.ConDate());
				P.Cmd_ExecuteNonQuery();

				conn.Close(ref P.cmd);

			}

		}

	}

	//봇 count 
	private int bot_cnt() {

		PJHCmdWrapper P = new PJHCmdWrapper();

		int cnt = 0;
		using (SqlConnection conn = new SqlConnection(Base.elderDBString)) {

			conn.Open(ref P.cmd);

			// 첫 방문자인지 아닌지 파악
			P.query = " select BOT_CNT " +
								" from TB_VISIT_COUNT_TEST " +
								" where GUBUN = @GUBUN and DATE = @DATE and IP = @IP ";
			P.Cmd_Query();
			P.Cmd_Parameters_AddWithValue("@DATE", DateTime.Now.ConDate());
			P.Cmd_Parameters_AddWithValue("@GUBUN", "JA");
			P.Cmd_Parameters_AddWithValue("@IP", Request.UserHostAddress);
			cnt = P.Cmd_ExecuteScalar().ConInt();

			conn.Close(ref P.cmd);

		}

		return cnt;

	}

	protected void TopBounds(object sender, RepeaterItemEventArgs e) {

		if (e.Item.ItemType == ListItemType.AlternatingItem || e.Item.ItemType == ListItemType.Item) {

			PJHCmdWrapper P = new PJHCmdWrapper();

			string code = DataBinder.Eval(e.Item.DataItem, "CODE").ToString();

			string html = string.Empty;

			string depth2_code = string.Empty;
			string depth2_code_name = string.Empty;
			string depth2_url = string.Empty;
			string depth2_open_yn = string.Empty;

			Literal c_lt = new Literal();
			Literal c_lt_depth1 = new Literal();

			using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

				conn.Open(ref P.cmd);

				//2뎁스를 불러온다
				P.query = " select CODE, CODE_NAME, URL,OPEN_YN " +
									" from TB_USER_CODE with( nolock ) " +
									" where PT_CODE = @PT_CODE and DEPTH = 2 and REAL_YN = 'Y' " +
									" order by NUM asc ";
				P.Cmd_Query();
				P.Cmd_Parameters_AddWithValue("@PT_CODE", code);
				P.dr = P.Cmd_ExecuteReader();
				while (P.dr.Read()) {

					depth2_code = P.dr["CODE"].ConString();            //2뎁스의 코드
					depth2_code_name = P.dr["CODE_NAME"].ConString();  //2뎁스의 코드네임
					depth2_url = P.dr["URL"].ConString();              //2뎁스의 URL
					depth2_open_yn = P.dr["OPEN_YN"].ConString();      //2뎁스의 새창 여부 Y : 새창 N : 현재창

					if (depth2_url.ConString().IsEmpty() == true || depth2_url == "#") {

						html += return_html(depth2_code, depth2_url, depth2_code_name);

					} else {

						//새창
						if (depth2_open_yn == "Y") {        //새창 

							html += "<li><a href='" + GetSSO_URL(depth2_url) + "' target='_blank'>" + depth2_code_name + "</a></li>";

						} else if (depth2_open_yn == "P") { //팝업창

							html += "<li><a href='#' onclick=user_popup('" + depth2_url + "')>" + depth2_code_name + "</a></li>";

						} else {                            //현재창

							html += "<li><a  target='_parent' href='../" + depth2_url + "'>" + depth2_code_name + "</a></li>";

						}

					}

				}
				P.dr.CloseDispose();


				string rawUrl = Request.RawUrl;                                                              //원시 URL
				string[] rawUrlArr = rawUrl.Split('/');                                                      //원시 URL 배열
				string matchUrl = rawUrlArr[rawUrlArr.Length - 2] + "/" + rawUrlArr[rawUrlArr.Length - 1];   //쿼리문이랑 매치할 URL

				if (Session["matchCode"].ConString().IsEmpty() == false) {

					if (Session["matchCode"].ConString().Substring(0, 3) == depth2_code.Substring(0, 3) && matchUrl != "main/main.aspx") {
						((HtmlGenericControl)e.Item.FindControl("depth1_item")).Attributes["class"] = "on";
					}

				}

				c_lt = (Literal)e.Item.FindControl("depth2");
				c_lt.Text = html;

				conn.Close(ref P.cmd);

			}

		}

	}

	private static string GetSSO_URL(string url) {

		string uid = HttpContext.Current.Session["MEM_ID"].ConString();

		// 치매파트너일때 SSO 연동
		if (url.IndexOf("partner.nid.or.kr") != -1) {

			if (uid.IsEmpty() == false) {

				AESCipher Aes_cipher = new AESCipher();
				byte[] arr = System.Text.Encoding.Default.GetBytes(Aes_cipher.Encrypt(uid));
				string enc_id = Convert.ToBase64String(arr);

				url = "http://partner.nid.or.kr/member/sso_login.aspx?sso_id=" + enc_id + "&url=" + url;

			}

		}

		return url;

	}

	protected static string return_html(string depth2_code, string depth2_url, string depth2_code_name) {

		PJHCmdWrapper P = new PJHCmdWrapper();

		string html = string.Empty;
		html += "<li><a href='#' class='fix'>" + depth2_code_name + "<img src='../images/common/bg_twoDep_on.gif' alt='더 보기' /></a>";
		html += "<ul class='threeDep'>";

		using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

			conn.Open(ref P.cmd);

			P.query = " select CODE, CODE_NAME, URL, OPEN_YN " +
								" from TB_USER_CODE with( nolock ) " +
								" where PT_CODE = @PT_CODE and DEPTH = 3 and REAL_YN = 'Y' " +
								" order by NUM asc ";
			P.Cmd_Query();
			P.Cmd_Parameters_AddWithValue("@PT_CODE", depth2_code);
			P.dr = P.Cmd_ExecuteReader();
			while (P.dr.Read()) {    
        
        // 임시 점검중 로직
        string href = P.dr["URL"].ConString();       

        if (P.dr["OPEN_YN"].ConString() == "Y") {

          /*
          // 점검중인 로직 alert띄우기
          if (href.OrSearch("support/b_infomation.aspx", "support/free_apply_guide.aspx", "support/find_man.aspx?code=03&seq=006003002", "support/mancard.aspx", "support/missing_tips.aspx" )) {
            html += "<li><p class='dev_chk_url' style='color:#595d66; font-size:14px; font-weight:600; cursor:pointer;' >" + P.dr["CODE_NAME"].ConString().Replace( "<br/>", "" ) + "</p></li>";
          } else {
            html += "<li><a href = '" + GetSSO_URL( href ) + "' target='_blank'>" + P.dr["CODE_NAME"].ConString().Replace( "<br/>", "" ) + "</a></li>";
          }          
          */
          html += "<li><a href = '" + GetSSO_URL( href ) + "' target='_blank'>" + P.dr["CODE_NAME"].ConString().Replace( "<br/>", "" ) + "</a></li>";

        } else {

          /*
          // 점검중인 로직 alert띄우기
          if (href.OrSearch( "support/b_infomation.aspx", "support/free_apply_guide.aspx", "support/find_man.aspx?code=03&seq=006003002", "support/mancard.aspx", "support/missing_tips.aspx" )) {
            html += "<li><p class='dev_chk_url' style='color:#595d66; font-size:14px; font-weight:600; cursor:pointer;'>" + P.dr["CODE_NAME"].ConString().Replace( "<br/>", "" ) + "</p></li>";
          } else {
            html += "<li><a target='_parent' href = '../" + href + "'>" + P.dr["CODE_NAME"].ConString().Replace( "<br/>", "" ) + "</a></li>";
          } */
          html += "<li><a target='_parent' href = '../" + href + "'>" + P.dr["CODE_NAME"].ConString().Replace( "<br/>", "" ) + "</a></li>";

        }


			}

			P.dr.CloseDispose();
			conn.Close(ref P.cmd);

		}

		html += "</ul>";
		html += "</li>";

		return html;

	}

}
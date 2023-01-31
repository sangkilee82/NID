using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class common_inc_footer : UserControlBase {
    protected void Page_Load(object sender, EventArgs e) {

        if (!Page.IsPostBack) {

            List();

            Log();

        }

    }

    protected void List() {

        PJHCmdWrapper P = new PJHCmdWrapper();

        using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

            conn.Open(ref P.cmd);

            P.query = " select CODE, CODE_NAME " +
                                " from TB_USER_CODE with( nolock ) " +
                                " where DEPTH = 1 " +
                                "       and CODE not in (009000000, 011000000, 012000000) " +
                                "       and REAL_YN = 'Y' " +
                                " order by NUM asc ";
            P.Cmd_Query();
            P.dr = P.Cmd_ExecuteReader();
            if (P.dr.HasRows) {


                total_RT.DataSource = P.dr;
                total_RT.DataBind();

            }

            P.dr.CloseDispose();
            conn.Close(ref P.cmd);

        }

    }

    protected void TopBounds(object sender, RepeaterItemEventArgs e) {

        if (e.Item.ItemType == ListItemType.AlternatingItem || e.Item.ItemType == ListItemType.Item) {

            PJHCmdWrapper P = new PJHCmdWrapper();

            string code = DataBinder.Eval(e.Item.DataItem, "CODE").ToString();                  //바인딩되는 코드

            string html = string.Empty;

            string depth2_code = string.Empty;
            string depth2_code_name = string.Empty;
            string depth2_url = string.Empty;

            Literal c_lt = new Literal();
            Literal c_lt_depth1 = new Literal();

            using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

                conn.Open(ref P.cmd);

                //2뎁스를 불러온다
                P.query = " select CODE, CODE_NAME, URL " +
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

                    if (depth2_url.ConString().IsEmpty() == true || depth2_url == "#") {

                        //html += return_html( depth2_code );
                        if (depth2_code.ConString() == "005001000") {

                            html += "<li><a href='" + return_html(depth2_code) + "'>" + depth2_code_name + "</a></li>";

                        } else {

                            html += "<li><a href='../" + return_html(depth2_code) + "'>" + depth2_code_name + "</a></li>";

                        }

                    } else {

                        if (depth2_code.ConString() == "003001000") {

                            html += "<li><a href='javascript:user_popup( \"" + depth2_url + "\" )'>" + depth2_code_name + "</a></li>";

                        } else if (depth2_code.ConString() == "013012000") {

                            html += "<li><a href='" + depth2_url + "' target='_blank'>" + depth2_code_name + "</a></li>";

                        } else {

                            html += "<li><a href='../" + depth2_url + "'>" + depth2_code_name + "</a></li>";

                        }

                    }

                }

                P.dr.CloseDispose();
                conn.Close(ref P.cmd);

            }

            c_lt = (Literal)e.Item.FindControl("depth2");
            c_lt.Text = html;

        }

    }

    protected static string return_html(string depth2_code) {

        PJHCmdWrapper P = new PJHCmdWrapper();

        string html = string.Empty;

        using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

            conn.Open(ref P.cmd);

            P.query = " select TOP(1) URL " +
                                " from TB_USER_CODE with( nolock ) " +
                                " where PT_CODE = @PT_CODE and DEPTH = 3 and REAL_YN = 'Y' " +
                                " order by NUM asc ";
            P.Cmd_Query();
            P.Cmd_Parameters_AddWithValue("@PT_CODE", depth2_code);
            html = P.Cmd_ExecuteScalar().ConString();

            conn.Close(ref P.cmd);

        }

        return html;

    }

    private void Log() {

        PJHCmdWrapper P = new PJHCmdWrapper();

        string agent = Request.UserAgent;

        string menu_code = Session["matchCode"].ConString();
        if (Request.RawUrl.IndexOf("/main/main.aspx") != -1) {

            menu_code = "000000000";

        }

        using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

            conn.Open(ref P.cmd);

            // 접속 로그
            P.query = " insert into TB_USER_VIST_INFO " +
                                " ( AGENT, IP, GUBUN, URL, BOT_YN ) values " +
                                " ( @AGENT, @IP, @GUBUN, @URL, @BOT_YN ) ";
            P.Cmd_Query();
            P.Cmd_Parameters_AddWithValue("@AGENT", agent);
            P.Cmd_Parameters_AddWithValue("@IP", Request.UserHostAddress);
            P.Cmd_Parameters_AddWithValue("@GUBUN", "JA");
            P.Cmd_Parameters_AddWithValue("@URL", Request.Url.ToString());
            P.Cmd_Parameters_AddWithValue("@BOT_YN", ( agent.Contains("bot") ? "Y" : "N" ));
            P.Cmd_ExecuteNonQuery();

            // 메뉴로그
            P.query = " update TB_MENU_LOG_NEW set " +
                                " CNT = CNT+1, URL = @URL " +
                                " where MENU_CODE = @MENU_CODE and REG_DATE = @REG_DATE ";
            P.Cmd_Query();
            P.Cmd_Parameters_AddWithValue("@MENU_CODE", menu_code);
            P.Cmd_Parameters_AddWithValue("@REG_DATE", DateTime.Now.ConDate());
            P.Cmd_Parameters_AddWithValue("@URL", Request.RawUrl);
            int cnt = P.Cmd_ExecuteNonQuery();
            if (cnt <= 0) {

                P.query = " insert into TB_MENU_LOG_NEW" +
                                    " ( MENU_CODE, CNT, REG_DATE, URL ) values " +
                                    " ( @MENU_CODE, @CNT, @REG_DATE, @URL ) ";
                P.Cmd_Query();
                P.Cmd_Parameters_AddWithValue("@MENU_CODE", menu_code);
                P.Cmd_Parameters_AddWithValue("@CNT", 1);
                P.Cmd_Parameters_AddWithValue("@REG_DATE", DateTime.Now.ConDate());
                P.Cmd_Parameters_AddWithValue("@URL", Request.RawUrl);
                P.Cmd_ExecuteNonQuery();

            }

            conn.Close(ref P.cmd);

        }

    }

}
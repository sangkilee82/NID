using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class janid_test_common_inc_title : UserControlBase {

    protected string dep_code_name = string.Empty;
    protected string code_name = string.Empty;

    protected void Page_Load(object sender, EventArgs e) {

        if (!Page.IsPostBack) {

            Titel_List();

        }

    }

    protected void Titel_List() {

        PJHCmdWrapper P = new PJHCmdWrapper();

        if (B.Get("seq").ConString().IsEmpty() == false) {
            Session["matchCode"] = B.Get("seq");
        }

        using (SqlConnection conn = new SqlConnection(Base.commDBString)) {

            conn.Open(ref P.cmd);

            //3뎁스
            if (Session["matchCode"].ConString().Substring(6, 3) != "000") {

                P.query = " select A.CODE, A.CODE_NAME, " +
                                    "        ( select CODE_NAME " +
                                    "          from TB_USER_CODE " +
                                    "          where DEPTH = 1 and substring( CODE, 1, 3 ) = substring( A.PT_CODE, 1, 3 ) ) as DEP_CODE_NAME " +
                                    " from TB_USER_CODE A " +
                                    " where CODE = @CODE and DEPTH = 3 and REAL_YN = 'Y' ";
                P.Cmd_Query();
                P.Cmd_Parameters_AddWithValue("@CODE", Session["matchCode"].ConString());
                P.Cmd_ExecuteReader().CloneStringDic(B.StrDic).CloseDispose();

            } else {

                P.query = " select A.CODE, A.CODE_NAME, " +
                                    "        ( select CODE_NAME " +
                                    "          from TB_USER_CODE " +
                                    "          where DEPTH = 1 and substring( CODE, 1, 3 ) = substring( A.PT_CODE, 1, 3 ) ) as DEP_CODE_NAME " +
                                    " from TB_USER_CODE A " +
                                    " where CODE = @CODE and DEPTH = 2 and REAL_YN = 'Y' ";
                P.Cmd_Query();
                P.Cmd_Parameters_AddWithValue("@CODE", Session["matchCode"].ConString());
                P.Cmd_ExecuteReader().CloneStringDic(B.StrDic).CloseDispose();

            }

            conn.Close(ref P.cmd);

        }

        dep_code_name = B.StrDic["DEP_CODE_NAME"].ConString() == "" ? "" : B.StrDic["DEP_CODE_NAME"].Replace("<br/>", "");
        code_name = B.StrDic["CODE_NAME"].ConString() == "" ? "" : B.StrDic["CODE_NAME"].Replace("<br/>", "");

    }

}
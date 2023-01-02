using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class sub_sub :PageBase {
  protected void Page_Load( object sender, EventArgs e ) {
    if( !Page.IsPostBack ) {
      List();
    }

  }
  private void List() {
    //## Explicit
    string query = string.Empty;                            //쿼리문 초기화		
    SqlCommand cmd = null;

    using( SqlConnection conn = new SqlConnection( Base.commDBString ) ) {

      conn.Open( ref cmd );
      query = "		select ADMIN_ID, NO,(select CODE_NAME from NID_USER_CODE where REAL_YN = 'Y' and CODE = GUBUN ) as NAME, CONTENT_HTML, CONTENT_TEXT, GUBUN, TITLE, REGI_DD, AREA_CODE " +
            "		from NID_TOT_ETC  where REAL_YN = 'Y' and GUBUN = @SEQ ";
      cmd.Query( query );
      cmd.Parameters.AddWithValue( "@SEQ", B.Get( "seq" ) );
      cmd.ExecuteReader().CloneStringDic( B.StrDic ).CloseDispose();

      conn.Close( ref cmd );

    }

  }
}

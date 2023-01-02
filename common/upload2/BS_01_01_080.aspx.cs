using System;
using System.Web.UI;
using DevExpress.Web.ASPxUploadControl;
using DevExpress.Web.ASPxClasses.Internal;
using System.IO;
using System.Data;

using System.Web;

using NRBPM.BERS.CLASSES;
using System.Data.OleDb;
using System.Configuration;

public partial class BS_01_01_080 :System.Web.UI.Page {
  protected void Page_Load(object sender, EventArgs e) {

    if( !IsPostBack ) {

      Read();

    }

  }

  public int i = 1;
  public static string bpmDBString {

    get { return ConfigurationManager.ConnectionStrings["BPM"].ConnectionString; }

  }

  protected void Read() {

    string query = string.Empty;        //쿼리문 초기화
    OleDbCommand cmd = null;
    OleDbDataReader dr = null;

    string appno = Request.QueryString["AppNo"];    //신청번호

    using( OleDbConnection conn = new OleDbConnection( bpmDBString ) ) {
      
      conn.Open();

      query = " select FILE_NM, SERVR_FILE_NM from TB_BERS_200 where app_no = '" + appno + "' order by ATCH_FILE_CODE ";
      cmd = new OleDbCommand( query, conn );
      dr = cmd.ExecuteReader();

      if( dr.HasRows ) {

        file_list.DataSource = dr;
        file_list.DataBind();

      }

      dr.Close();
      conn.Close();


    }

  }

}
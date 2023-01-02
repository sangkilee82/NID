using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class example_upload2_download :System.Web.UI.Page {
  protected void Page_Load(object sender, EventArgs e) {

    string filename = Request.QueryString["filename"];
    string endcode_filename = string.Empty;

    if( filename.IndexOf( "+" ) == -1 ) {

      filename = HttpUtility.UrlDecode( filename );

    }

    //string path = "F:\\ATTCH\\DSM\\Dsm_C0\\ufile\\" + Request.QueryString["path"].Replace( "/", @"\" );
    string path = Request.QueryString["path"].Replace( "/", @"\" );

    if( Page.Request.UserAgent.IndexOf( "NT 5.0" ) >= 0 ) {
      endcode_filename = Server.UrlEncode( filename );
    } else {
      endcode_filename = HttpUtility.UrlEncode( filename, new UTF8Encoding() );
    }

    Response.AddHeader( "Content-Disposition", "attachment;filename=" + endcode_filename );
    Response.ContentType = "application/octet-stream";
    Response.HeaderEncoding = Encoding.GetEncoding( "utf-8" );
    Response.WriteFile( path );

  }

}
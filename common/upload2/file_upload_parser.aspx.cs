using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BERS_example_upload2_file_upload_parser :System.Web.UI.Page {

	protected void Page_Load( object sender, EventArgs e ) {

		HttpFileCollection files = HttpContext.Current.Request.Files;

		string AppNo = Request.Form["AppNo"];	         //신청 번호
		string file_name = string.Empty;				 //파일 이름
		string regi_man = Request.Form["Regi_Man"];    //등록자 아이디
		string dir = String.Format( "F:\\ATTCH\\BERS\\{0}\\{1}\\", String.Format( "{0:yyyyMM}", DateTime.Now ), AppNo );		//전체 경로
		string totalfile = string.Empty;
		foreach( string file_key in files ) {

			////폴더가 없다면 생성,
			if( Directory.Exists( dir ) == false ) {

				Directory.CreateDirectory( dir );

			}

			HttpPostedFile file = files[file_key];
            //file_name = file.FileName;
            file_name = Path.GetFileName( file.FileName );                         //파일명 받는법 변경
            //file.SaveAs( dir + "\\" + file_name );						       //파일 저장
            file.SaveAs( dir + "\\" + Path.GetFileName(file.FileName) );		   //파일 저장
            totalfile = file_name + "!@!" + dir;                  //파일경로, 파일이름 구분자 : !@!

    }

		Response.Write( totalfile );
		Response.End();

	}

}
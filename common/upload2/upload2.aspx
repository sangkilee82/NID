<%@ Page Language="C#" AutoEventWireup="true" CodeFile="upload2.aspx.cs" Inherits="BERS_example_upload2_upload2" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
<meta http-equiv="Content-Script-Type" content="text/javascript" />
	<title></title>
	<link href="./CoaUpload.css" media="all" rel="stylesheet" type="text/css" >
	<script type="text/javascript" src="./jquery-1.8.1.min.js"></script>	
	<script type="text/javascript" src="./CoaConfig.js"></script>
	<script type="text/javascript" src="./CoaUpload.min.js"></script>
</head>
<body>
	
  <script type="text/javascript">
    window.onload = function () {

      Coa.Init({
        "error": function (res) {

          console.log(res);

        },
        "complete": function (res) {

          console.log(res);

          for (var i = 0, j = res.length; i < j; i++) {

            var str = res[i];
            var arr = str.split("!@!");

            var filename = arr[0];
            var folder = arr[1];

            $(document.regiform).append("<input type='hidden' name='innorixSavedPath' value='" + folder + filename + "' />");
            $(document.regiform).append("<input type='hidden' name='innorixOrignalFileName' value='" + filename + "' />");

          }

          $(document.regiform).attr("action", "../innoex/result.aspx?app_no=" + "<%= Request.QueryString[ "AppNo" ] %>" + "&gubun=1");
          document.regiform.submit();

        },
        "data": {
          "AppNo": "<%=Request.QueryString[ "AppNo" ] %>"
	      },
	      "area_id": "upload_area",
	      "upload_url": "/bers/example/upload2/file_upload_parser.aspx",
	      //"max_size": 4000234300,
	      "item_size": 2000000000,
	      "is_upload_btn": true,
	      "is_delete_btn": true
	      //"permit_ext": [ "AVI" ],
	      //"no_permit_ext": [ "WMV" ]
	    });

    }

    function Check() {

      alert('접근할 수 없습니다');
      //self.location.href = "../../BS_01/AdminLogin.aspx";

    }

	</script>

	<div class="upload_form" id="upload_area"></div>
  <form name="regiform" method="post" action="" ></form>

</body>
</html>
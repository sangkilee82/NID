<%@ Control Language="C#" AutoEventWireup="true" CodeFile="cheditor.ascx.cs" Inherits="CHEditor" %>

<script type="text/plain" src="cheditor.js"></script>
<textarea id="editorContentValue" name="editorContentValue" type="hidden" runat="server"></textarea>

<script type="text/javascript">
var myeditor = new cheditor();
myeditor.config.editorHeight = '200px';
myeditor.config.editorWidth = '80%';
myeditor.inputForm = '<%= editorContentValue.ClientID %>';
myeditor.run();
</script>
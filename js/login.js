//************script for user varification***********

var dat , x, uName = "", pWord = "", act = "select", quer = "select * from products", pk = "";
var rowIndex = -1;
$(document).ready(init);
function  init()
{
	
	//$(".inline").colorbox({inline:true, width:"50%"});
	$("div").css("background-color", "powderblue");
	$("#enter").click(sendData);
	$('#pword').keypress(function(e){if(e.keyCode==13)sendData();});
	//$("#exit").click(function(){$.colorbox.close();});
	$("#login_div").on('click', '#exit', function(){$.colorbox.close(); window.location="login.html";});
	$("#result").on('click', '#itemRow', getRowData);
	$("#result").on('click', '#fieldsRow', showAddDialog);
	$("#edit_area").on('click', '#save', saveData);
	$("#edit_area").on('click', '#delete', deleteData);
	$("#edit_area").on('click', '#add', insertData);
	$("#edit_area").on('click', '#exit', function(){$.colorbox.close();});
	$.colorbox({href:"#login_div", inline:true, width:"50%", overlayClose:false, closeButton:false, escKey:false});
}
//******for send data*****
function sendData()
{
	uName = $("#user").val();
	pWord = $("#pword").val();
	dat = {user : uName, password : pWord, action : act, query : quer};
	$("p.response").html("<b> Loading ........ </b>");
	//$("p.response").text(dat.user + " " + dat.password);
	$.post("php/login.php", dat, processData).fail(failFunction);
}
function processData(data, status)
{
	$("p.response").html("<b>" + status + "</b>");
	//$("p.response").html(JSON.parse(data));
	//$("p.response").html("<b>" + JSON.stringify(x) + "</b>");

	if (act == "select")
	{
		x = JSON.parse(data);
		//$("#result").css("background-color", "lightgray");
		generteTable(x);
		$.colorbox.close();
	}
	else
	{
		$("p.response").html(JSON.parse(data));
		if (JSON.parse(data) == "DB operation sucessfull")
		{
			updateProductDOM(rowIndex, act);
			$.colorbox.close();
		}
		else
		{
			var errMsg = JSON.parse(data);
			alert(errMsg.slice(errMsg.indexOf("<br>") + 4, errMsg.length));
		}
	}
}
function failFunction() 
{
	// just in case posting your form failed
	$("p.response").html("<b> Posting Failed !!! </b>");
	alert("p.response");
}

function generteTable(x)
{
	var newRow = "<table id = 'dataTable' class = 'table table-bordered table-hover' style='text-align: center'><tr id = 'fieldsRow'>";
	/*for(var i = 0; i < Object.keys(x[0]).length; i++)
	{
		newRow = newRow + "<td><b>" +  Object.keys(x[0])[i].toUpperCase() + "</b></td>";

	}*/
	$.each(Object.keys(x[0]), function(i, item)
	{
		var temp = "";
		temp = String(item);
		newRow = newRow + "<td><b>" +  temp.toUpperCase() + "</b></td>";

	});
	newRow = newRow + "</tr> </table>"
	$("#result").html(newRow);
	$.each(x, function(i, item)
	{
		newRow = "<tr id = 'itemRow'>";
		for(var ctr = 0; ctr < Object.keys(item).length; ctr++ )
		{
			newRow = newRow + "<td>" + Object.values(item)[ctr] + "</td>";
		}
		newRow = newRow + "</tr>";
		$(newRow).appendTo("#dataTable");
		//alert(i);
	});
}

function getRowData()
{
	//window.open("updateData.html", "_blank");
	//alert(x[0].name);

	//alert($(this).find("td:eq(0)").text());
	rowIndex = Array.prototype.indexOf.call(this.parentElement.children, this) - 1;
	//alert(Array.prototype.indexOf.call(this.parentElement.children, this));
	pk = $(this).find("td:eq(0)").text();
	var editVals = new Array(Object.keys(x[0]).length);
	for (var i = 0; i < Object.keys(x[0]).length; i++)
	{
		editVals[i] = [Object.keys(x[rowIndex])[i], Object.values(x[rowIndex])[i]];
	}
	showEditDialog(editVals);
}

function showEditDialog(rowObj)
{
	var editBoxContent = "<h2>Edit</h2> <br/>";
	for (var i = 0; i < rowObj.length; i++)
	{
		var tempKey = "<p style = 'float:left;'> <b >" + rowObj[i][0].toUpperCase() + "</b></p>";
		if(rowObj[i][0].slice(-1) == "_")
		{
			var tempVal = '<input type="text" id="editText_' + i + ' name="editText" value="' + rowObj[i][1] + '" style = "float:right; width:200px;">'
		}
		else
		{
			var tempVal = '<input type="number" id="editText_' + i + ' name="editText" value="' + rowObj[i][1] + '" style = "float:right; width:200px;">'
		}
		editBoxContent = editBoxContent + tempKey + " &#09 " + tempVal + "<br/><br/>";
	}
	editBoxContent += '<input type = "button" id = "save"  value = "Save"> &nbsp; &nbsp; &nbsp; <input type = "button" id = "delete"  value = "Delete"> &nbsp; &nbsp; &nbsp; <input type = "button" id = "exit"  value = "Cancel"> <br />';
	$("#edit_area").html(editBoxContent);
	$.colorbox({href:"#edit_area", inline:true, width:"35%", overlayClose:false, closeButton:false});
}

function showAddDialog()
{
	var editBoxContent = "<h2>Add</h2> <br/>";
	for (var i = 0; i < Object.keys(x[0]).length; i++)
	{
		var tempKey = "<p style = 'float:left'> <b >" + Object.keys(x[0])[i].toUpperCase() + "</b></p>";
		var tempVal = '<input type="text" id="editText_' + i + ' name="editText" value="" style = "float:right">'
		editBoxContent = editBoxContent + tempKey + " &#09 " + tempVal + "<br/><br/>";
	}
	editBoxContent += '<input type = "button" id = "add"  value = "Save"> &nbsp; &nbsp; &nbsp;     &nbsp; &nbsp; &nbsp; <input type = "button" id = "exit"  value = "Cancel"> <br />';
	$("#edit_area").html(editBoxContent);
	$.colorbox({href:"#edit_area", inline:true, width:"35%", overlayClose:false, closeButton:false});
}

function insertData()
{
	act = "insert";
	quer = "INSERT INTO products (";
	for (var i = 0; i < Object.keys(x[0]).length; i++)
	{
		quer = quer + " " + Object.keys(x[0])[i] + ",";
	}
	quer = quer.slice(0, -1);
	quer = quer + ") VALUES ("
	for (var i = 0; i < Object.keys(x[0]).length; i++)
	{
		if (Object.keys(x[0])[i].slice(-1) == "_")
		{
			quer = quer + '"' + $("#edit_area > input").eq(i).val() + '"';
		}
		else
		{
			quer = quer +  $("#edit_area > input").eq(i).val();
		}
		quer = quer + ","
	}
	quer = quer.slice(0, -1);
	quer = quer + ")";
	alert (quer);
	sendData();
}

function saveData()
{
	act = "update";
	quer = "UPDATE products SET";
	for (var i = 0; i < Object.keys(x[0]).length; i++)
	{
		quer = quer + " " + Object.keys(x[0])[i] + " = ";
		if (Object.keys(x[0])[i].slice(-1) == "_")
		{
			quer = quer + '"' + $("#edit_area > input").eq(i).val() + '"';
		}
		else
		{
			quer = quer +  $("#edit_area > input").eq(i).val();
		}
		quer = quer + ","
	}
	quer = quer.slice(0, -1);
	quer = quer + " WHERE " + Object.keys(x[0])[0] + " = " + pk;
	//alert (quer);
	sendData();
	//$("#edit_area > input:eq(0)").val("hi");
	//$($("#edit_area > input")[0]).val("Hi");
	//$("#edit_area > input").eq(0).val("hi");
	//$("#editText_1").val("hello");
}

function deleteData()
{
	act = "delete";
	quer = "DELETE FROM products";
	quer = quer + " WHERE " + Object.keys(x[0])[0] + " = " + pk;
	//alert (quer);
	sendData();
}

function updateProductDOM(rowId, action)
{
	if (action == "update")
	{
		for(var i = 0; i < Object.keys(x[0]).length; i++)
		{
			$('#dataTable tr:eq(' + (rowId + 1) + ') td:eq(' + i + ')').text($("#edit_area > input").eq(i).val());
		}
	}
	if (action == "delete")
	{
		$('#dataTable tr:eq(' + (rowId + 1) + ')').remove();
	}
	if (action == "insert")
	{
		act = "select"
		quer = "select * from products";
		sendData();
		/*var newRow = "<tr id = 'itemRow'>";
		for(var ctr = 0; ctr < Object.keys(x[0]).length; ctr++ )
		{
			newRow = newRow + "<td>" + $("#edit_area > input").eq(ctr).val(); + "</td>";
		}
		newRow = newRow + "</tr>";*/
		//$(newRow).appendTo("#dataTable");
	}
	
}

//************script for data exchange with php***********

var dat = {action : "SELECT * FROM", table : "inventory", condition : "", values : []};
var x;
$(document).ready(init);
function init()
{
	$("div").css("background-color", "powderblue");
	$("#list_items").click(sendData);
	$("#result").on('click', '#itemRow', getRowData);
}
//******for send data*****
function sendData()
{
	$("p.response").html("<b> Loading ........ </b>");
	$.post("php/tableUpdate.php", dat, processData).fail(failFunction);
}
function processData(data, status)
{
	$("p.response").html("<b>" + status + "</b>");
	x = JSON.parse(data);
	if (dat.action == "SELECT * FROM")
	{
		if (dat.table == "inventory")
		{
			//$("#result").css("background-color", "lightgray")
			$("#result").html("<table id = 'json-data' class = 'table table-bordered table-hover'><tr> <th>SKU</th> <th>ITEM</th> <th>DESCRIPTION</th> <th>SIZE</th> <th>WEIGHT</th> <th>COLOUR</th> <th>COST</th> <th>SALE PRICE</th> <th>QUANTITY</th> <th>RESERVE</th> </table>");
			$.each(x, function(i, item)
			{
				var newRow = "<tr id = 'itemRow'>"
				+ "<td>" + item.sku + "</td>"
				+ "<td>" + item.name + "</td>"
				+ "<td>" + item.description + "</td>"
				+ "<td>" + item.size + "</td>"
				+ "<td>" + item.weight + "</td>"
				+ "<td>" + item.colour + "</td>"
				+ "<td>" + item.purchase_price + "</td>"
				+ "<td>" + item.sale_price + "</td>"
				+ "<td>" + item.quantity + "</td>"
				+ "<td>" + item.reserve + "</td>"
				+"</tr>" ;
				$(newRow).appendTo("#json-data");
				//alert(i);
			});
		}
	}
}
function failFunction() 
{
	// just in case posting your form failed
	$("p.response").html("<b> Posting Failed !!! </b>");
	//alert("Posting failed.");
}

function getRowData()
{
	window.open("updateData.html", "_blank");
	//alert(x[0].name);
	//alert($(this).find("td:eq(0)").text());
	//Object.keys(obj).length
	//alert("fsdgdfg");
	testTrans($(this).find("td:eq(0)").text());
	testTrans("0");}

function testTrans(t1)
{
	if (t1 == "0")
	{
		alert("hello" + testTrans.temp);
	}
	else
	{
		testTrans.temp = t1;
		alert(testTrans.temp);
	}
}

function initEditor()
{
	testTrans("0");
}
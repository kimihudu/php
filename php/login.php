
<?php
	$host = "localhost";
	$user = "root";
	$password = "password";
	$dbName = "ecommerce";
	$clientDat = $_POST;
	//var_dump(json_decode($clientDat));
	$con = mysqli_connect($host, $user, $password, $dbName) or die("Error " . mysqli_error($con));
	//print_r (json_encode(fetchAll()));
	print_r (json_encode(fetchUser($clientDat['user'], $clientDat['password'])));
	//print_r ($clientDat['user']. $clientDat['password']. $clientDat['action']. $clientDat['query']);
	//print_r (json_encode($clientDat));
	//echo $clientDat['user'];
	function fetchUser($uId, $pwd)
	{
		global $con;
		//fetch table rows from mysql db
		$sql = "select * from login where user = '" . $uId . "' AND password = '" . $pwd . "'";
		//$sql = "select * from login where user = '" . $uId . "' AND password = '" . $pwd . "'";
		//$sql = "select `player_id`, `name`,`brigade`,`ch1`,`ch2`,`ch3` from player where player_id = '" . $uId . "'";
		//$sql = $clientDat['action'] . " " . $clientDat["table"];// . " " . $clientDat.["condition"];
		$result = mysqli_query($con, $sql) or die("Error in Selecting " . mysqli_error($con));
		//create an array
		$resultArray = array();
		while($row = mysqli_fetch_assoc($result))
		{
			$resultArray[] = $row;
		}
		/*$resultArray[] = array(
		'uid' => $uId,
        'cost' => 10.00, 
        'name' => 'item1',
        'part_number' => 'zyz-100',
        'item_count' => 15
        );*/
		//echo $clientDat["action"];//$sql1;
		//close the db connection
		// mysqli_close($con);
		// unset($con);

		if (sizeof($resultArray) > 0)
		{
			if ($resultArray[0]['userType'] == "admin")
			{
				//redirectto url()
				//return fetchAll();
				return execute();
			}
		}
		else
		{
			return "login failed";
		}
		
		//return sizeof($resultArray);
		//return $resultArray[0]['user'];
		//If you want to write the data from mysql to json file, use this piece of code at the end instead of 'echo' statement.
		/*$fp = fopen('empdata.json', 'w');
		fwrite($fp, json_encode($emparray));
		fclose($fp);*/
	}

	function execute()
	{
		global $clientDat;
		global $con;
		$action = $GLOBALS['clientDat'];
		$sql = $action['query'];
		if ($action['action'] == "select")
		{
			$result = mysqli_query($con, $sql) or die("Error in Selecting " . mysqli_error($con));
			//create an array
			$resultArray = array();
			while($row = mysqli_fetch_assoc($result))
			{
				$resultArray[] = $row;
			}
			mysqli_close($con);

			return $resultArray;
		}
		if ($action['action'] == "insert")
		{
			if (mysqli_query($con, $sql)) 
			{
				//return "New record created successfully";
				return "DB operation sucessfull";
			}
			else 
			{
				return "Error: " . $sql . "<br>" . mysqli_error($con);
			}
		}
		if ($action['action'] == "update")
		{
			if (mysqli_query($con, $sql)) 
			{
				//return "Record updated successfully";
				return "DB operation sucessfull";
			}
			else 
			{
				return "Error: " . $sql . "<br>" . mysqli_error($con);
			}
		}
		if ($action['action'] == "delete")
		{
			if (mysqli_query($con, $sql)) 
			{
				//return "Record(s) deleted successfully";
				return "DB operation sucessfull";
			}
			else 
			{
				return "Error: " . $sql . "<br>" . mysqli_error($con);
			}
		}
		return $sql;//. $clientDat['password']. $clientDat['action']. $clientDat['query'];
	}

	function fetchAll()
	{
		global $con;
		//fetch table rows from mysql db
		$sql = "select * from products";
		//$sql = $clientDat['action'] . " " . $clientDat["table"];// . " " . $clientDat.["condition"];
		$result = mysqli_query($con, $sql) or die("Error in Selecting " . mysqli_error($con));
		//create an array
		$resultArray = array();
		while($row = mysqli_fetch_assoc($result))
		{
			$resultArray[] = $row;
		}
		//echo $clientDat["action"];//$sql1;
		//close the db connection
		mysqli_close($con);

		return $resultArray;
		//If you want to write the data from mysql to json file, use this piece of code at the end instead of 'echo' statement.
		/*$fp = fopen('empdata.json', 'w');
		fwrite($fp, json_encode($emparray));
		fclose($fp);*/
	}
	/*<%
	//Here is how the ASP file looks like ("demo_test_post.asp"):

	dim fname,city
	fname=Request.Form("name")
	city=Request.Form("city")
	Response.Write("Dear " & fname & ". ")
	Response.Write("Hope you live well in " & city & ".")
	%>*/
?>



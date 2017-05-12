
<?php
	$host = "localhost";
	$user = "root";
	$password = "password";
	$dbName = "ecommerce";
	$clientDat = $_POST;
	//var_dump(json_decode($clientDat));
	$con = mysqli_connect($host, $user, $password, $dbName) or die("Error " . mysqli_error($con));
	
	//fetch table rows from mysql db
    //$sql = "select * from inventory";
	$sql = $clientDat['action'] . " " . $clientDat["table"];// . " " . $clientDat.["condition"];
    $result = mysqli_query($con, $sql) or die("Error in Selecting " . mysqli_error($con));
	
	//create an array
    $resultArray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $resultArray[] = $row;
    }
	
	print_r (json_encode($resultArray));
	//echo $clientDat["action"];//$sql1;
    //close the db connection
    mysqli_close($con);
	
	//If you want to write the data from mysql to json file, use this piece of code at the end instead of 'echo' statement.
    /*$fp = fopen('empdata.json', 'w');
    fwrite($fp, json_encode($emparray));
    fclose($fp);*/
?>

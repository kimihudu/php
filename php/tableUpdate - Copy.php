
<?php
	$host = "localhost";
	$user = "root";
	$password = "password";
	$dbName = "ecommerce";
	$clientDat = $_POST;
	$con = mysqli_connect($host, $user, $password, $dbName) or die("Error " . mysqli_error($con));
	if($con) 
	{
		$clientDat["name"] = $clientDat["name"]. " Singh";
			$clientDat = json_encode($clientDat);
			print_r($clientDat);
		/*if($_REQUEST["name"])
		{
			$name = $_REQUEST['name'];
			/*$clientDat = $_POST;
			$clientDat["name"] = $clientDat["name"] , " Singh"
			$clientDat = json_encode($clientDat);
			print_r($clientDat);
			//echo "Welcome ". $name;
		}*/
		//echo 'Connected to MySQL ' , $clientDat["name"]                     ;
	}
	else 
	{
		echo 'MySQL Server is not connected';
	}
	/*if($_REQUEST["name"]) 
	{
		$name = $_REQUEST['name'];
		$x = json_encode($_POST);
		print_r($x);
		//echo "Welcome ". $name;
	}*/
?>

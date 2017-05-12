
<?php
	if($_REQUEST["name"]) 
	{
	   $name = $_REQUEST['name'];
	   $x = json_encode($_POST);
	   print_r($x);
	   //echo "Welcome ". $name;
	}
?>

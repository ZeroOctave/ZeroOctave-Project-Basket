<?php  
if (isset($_POST['username']) && isset($_POST['password'])) {
	include 'connect.php';

	function validate($data){
       $data = trim($data);
	   $data = stripslashes($data);
	   $data = htmlspecialchars($data);
	   return $data;
	}

	$username = validate($_POST['username']);
	$password = validate($_POST['password']);

	if (empty($username) || empty($password)) {
		header("Location:login.html");
	}else {

		$sql = "INSERT INTO details(Username,Password) VALUES('$username', '$password')";
		$res = mysqli_query($conn, $sql);
        header("Location: /src/html/index.html");
	}

}else {
	header("Location: login.html");
}
<?php

// header('Content-Type: application/json');

// // if (empty($_GET['id'])) {
// //   readfile('dummy-products.json');
// // } else {
// //   readfile('dummy-products.json');
// // }

// require_once 'functions.php';

// set_exception_handler('error_handler');

// $output = file_get_contents('dummy-products.json');
// print $output;

require_once 'functions.php';
require_once 'db_connection.php';

startup();

if(!$conn) {
  throw new Exception(mysqli_connect_error());
}

$whereClause = ''; // string to concat for query with WHERE
$id = false;
if(!empty($_GET['id'])) { // if id isn't empty
  if(!is_numeric($_GET['id'])) { // nested check if id is NOT an int
    throw new Exception('id must be an int');
  }
  $id = (int)$_GET['id']; // doubly sets $id to id
  $whereClause = " WHERE id = $id";
}

$query = "SELECT * FROM `products` $whereClause"; // concat whereClause to query
$result = mysqli_query($conn, $query);

if(!$result) { // if result returns falsy
  throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) === 0 && $id !== false) { // check if id is given but no product exists there
  throw new Exception("Invalid id: {$id}");
}

$output = [];
while($row = mysqli_fetch_assoc($result)) { // pushing results into 
  // array_push($output['data'], $row);
  $row['price'] = intval($row['price']); // intval
  $row['id'] = (int)$row['id']; // casting
  $output[] = $row; // alternate array push method
}

print_r(json_encode($output));

?>

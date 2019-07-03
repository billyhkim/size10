<?php

require_once 'functions.php';
require_once 'db_connection.php';

startup();

if(!$conn){
    throw new Exception('Connection error: ' . mysqli_connect_error());
}

$item = file_get_contents('php://input');
$item = json_decode($item, true);

$order_id = $item['orderId'];
$name = $item['name'];
$address = addslashes($item['address']);
$email = addslashes($item['email']);
$phone = addslashes($item['phone']);
$credit_card = $item['creditCard'];
$order_items = addslashes($item['cart']);

$query = "INSERT INTO `orders` (`order_id`, `name`, `address`, `email`, `phone`, `credit_card`, `order_items`) VALUES ('{$order_id}', '{$name}','{$address}', '{$email}', '{$phone}', '{$credit_card}', '{$order_items}')";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception( mysqli_error($conn) );
}

if ($result) {
    
    $lastId = mysqli_insert_id($conn);
    $output['orderId'] = $lastId;

} else {
    throw new Exception("Failed to process order: " . mysqli_error($conn));
}

$json_output = json_encode($output);
print_r($json_output);

?>
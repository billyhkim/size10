<?php

header('Content-Type: application/json');

if (empty($_GET['id'])) {
  readfile('dummy-products.json');
} else {
  readfile('dummy-products.json');
}

?>

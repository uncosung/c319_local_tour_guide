<?php
require_once 'db_connection.php';
session_start();
header("Content-Type:application/json");
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');
$email = $_SESSION['userEmail'];
$tuuristId = $_SESSION['id'];

if ( $method === 'GET'){
  $id=$_GET['id'];
  if ( $id ){
  // if ( isset($_GET['id'])){
    $where = " WHERE `id` = '{$id}'";
    // SELECT id, title, description, tags, location,timeRange, mainImage, images, profileEmail, GROUP_CONCAT( dates ) FROM `package` 
    // WHERE title = 'TEST' 
    // GROUP BY id
  }
  else {
    $where = '';
  }
  $query = "SELECT * FROM `package`{$where}";
  $result = mysqli_query( $conn , $query );
  $output = [];
  while ( $row = mysqli_fetch_assoc( $result )){
    $output[] = $row;
  }
  $_output = json_encode( $output );
  print_r( $_output );
}
if ( $method === 'POST'){
  $package = json_decode( $item , true );
  $tags = json_encode($package['tags']);
  $dates = json_encode($package['dates']);
  $images = json_encode( $package['imageUrl']);
  $query = "INSERT INTO `package`(`title`, `description`, `tags`, `location`, `timeRange`, `dates`, `mainImage`, `images`, `profileEmail`)
            VALUES ('{$package['title']}', '{$package['description']}', '{$tags}',  '{$package['location']}', '{$package['timeRange']}', 
            '{$dates}', '{$package['imageUrl'][0]}', '{$images}', '{$email}')";

  $result = mysqli_query($conn, $query);
  print_r( $result );
}
if ( $method === 'PATCH'){

}
?>
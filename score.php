<?php

  try{

    $mysqli = new PDO('mysql:host=mysql.hostinger.fr;dbname=u255681172_score;', 'u255681172_hill', 'team2017');
    // $mysqli = new PDO('mysql:host=localhost;dbname=score;', 'root', '');

  }
  catch( Exception $e ) {

    die( 'Erreur : '.$e->getMessage() );

  }

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if( $_POST["name"] && $_POST["score"] ) {

      $name = $_POST["name"];

      $score = $_POST["score"];     

      $query = "INSERT INTO `score`(`name`, `score`, `date`) VALUES ('".$name."','".$score."','".date('Y-m-d')."')";

      $qry_result = $mysqli->exec( $query );
    
    }
  
  }
  
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {

      $query = "SELECT `id`, `name`, `score`, `date` FROM `score` ORDER BY `score` DESC LIMIT 10";
      $statement= $mysqli->prepare( $query );
      $statement->execute();
      $results= $statement->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode( $results );

      echo $json;  
  }

  
?>


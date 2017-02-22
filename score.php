<?php

  try{

    $mysqli = new PDO('mysql:host=mysql.hostinger.fr;dbname=u255681172_score;', 'u255681172_hill', 'team2017');

  }
  catch( Exception $e ) {

    die( 'Erreur : '.$e->getMessage() );

  }

  if( $_POST["name"] && $_POST["score"] ) {

    $name = $_POST["name"];

    $score = $_POST["score"];     

    $query = "INSERT INTO `score`(`name`, `score`, `date`) VALUES ('".$name."','".$score."','".date('Y-m-d')."')";

    $qry_result = $mysqli->exec( $query );
  }
  else {

    $query = "SELECT `id`, `name`, `score`, `date` FROM `score` ORDER BY `score` DESC LIMIT 10";
    $statement= $mysqli->prepare( $query );
    $statement->execute();
    $results= $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode( $results );

  }

  echo $json;
?>


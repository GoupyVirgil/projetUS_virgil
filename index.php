<?php

  try{

    $mysqli= new PDO('mysql:host=localhost;dbname=score;', 'root', '');

  }
  catch(Exception $e){

    die('Erreur : '.$e->getMessage());

  }

  $name = $_POST["name"];

  $score = $_POST["score"];

  $query = "INSERT INTO `score`(`name`, `score`, `date`) VALUES ('".$name."','".$score."','".date('Y-m-d')."')";

  $qry_result = $mysqli->exec($query);

  echo 'bien ajouté';


?>

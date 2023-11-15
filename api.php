<?php

if(isset($_POST['sendmail'])){
    $name = htmlspecialchars($_POST['name']);
    $mail = htmlspecialchars($_POST['mail']);
    $sujet = htmlspecialchars($_POST['sujet']);
    $message = htmlspecialchars($_POST['message']);

    $sujet = "Portfolio $sujet";
    $message = "Message de $name \nMail: $mail\n\n$message";
    mail('aypunal@gmail.com', $sujet, $message);
    echo 'ok';
}


if(isset($_POST['getActivitys'])){
    
    $string = file_get_contents("config.json");
    echo $string;

}
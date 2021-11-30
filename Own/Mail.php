<?php

namespace Own;

set_time_limit (0);
error_reporting(E_ALL);
ini_set('display_startup_errors', 1);
ini_set('display_errors', '1');

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mail {

  // static $attachPath = '/attachments/';
  
  public function init (Request $request) 
  {
    $data = $request->all();
    $sendArr = [];

    ['mail' => $sendList, 'data' => $senderData] = $data;

    if (isset($senderData)) {
      ['name' => $senderName,'email' => $senderEmail, 'phone' => $senderPhone, 'password' => $senderPassword] = $senderData;
    }
    if (isset($sendList[0]['name']) && isset($sendList[0]['email'])) {
      ['name' => $nameArr,'email' => $emailArr] = $sendList[0];
      $sendArr  = array_combine($nameArr,$emailArr);
      return $this->sendMail($sendArr, $senderEmail, $senderPassword, $senderPhone, $senderName);
    } 
    if (!isset($sendList[0]['name']) && isset($sendList[0]['email'])) {
      ['email' => $emailArr] = $sendList[0];
      return $this->sendCopyMail($sendArr, $senderEmail, $senderPassword, $senderPhone, $senderName);
    }

  }

   private function sendMail(array $sendArr, string $senderEmail, string $senderPassword , string $senderPhone, string $senderName): array
   {
    $resultArr = [];

    foreach($sendArr as $sendName => $sendEmail) {

      $mail = new PHPMailer();
      try {
          $mail->isSMTP();   
          $mail->CharSet = "UTF-8";
          $mail->SMTPAuth   = true;
          //$mail->SMTPDebug = 2;
          $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
          // Настройки вашей почты
          $mail->Host       = 'smtp.yandex.ru';
          $mail->Username   = $senderEmail; // Логин на почте
          $mail->Password   = $senderPassword; // Пароль на почте
          $mail->SMTPSecure = 'ssl';
          $mail->Port       = 465;
          $mail->setFrom($senderEmail, $senderEmail); // Адрес самой почты и имя отправителя
      
          // Получатель письма
          $mail->addAddress($sendEmail);  
          //Вложение
          // $mail->addAttachment($attachPath . 'А-Класс уроки будущего.pdf', 'А-Класс уроки будущего.pdf');
          // $mail->addAttachment($attachPath . 'Прописи буква А.pdf', 'Прописи буква А.pdf');
          //Картинка в тексте
          // $mail->AddEmbeddedImage($attachPath . 'image.png', 'image','image.png');
  
          // Прикрипление файлов к письму (еще не реализовал)
      // if (!empty($file['name'][0])) {
      //     for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
      //         $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
      //         $filename = $file['name'][$ct];
      //         if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
      //             $mail->addAttachment($uploadfile, $filename);
      //             $rfile[] = "Файл $filename прикреплён";
      //         } else {
      //             $rfile[] = "Не удалось прикрепить файл $filename";
      //         }
      //     }   
      // }
  
      // Отправка сообщения
      $title = "$sendName, Вам письмо от А-Класс."; // Заголовок сообщения
    
  $body = "
  Дорогая $sendName!
  <br>
  <br>
  Мы восхищаемся Вашей профессией и Вашим вкладом в воспитание <br> подрастающего поколения!<br> 
  Мы создали уроки, полностью соответствующие календарно-тематическому <br> плану УМК \"Школа России\" (математика, азбука, русский язык, окружающий мир).<br>
  Уроки готовы к проведению в классе, Вам нужен только проектор и интернет.<br>
  
  Наша платформа предназначена для того, чтобы позаботиться о Вас и снизить <br> Вашу нагрузку.<br>
  
  На ней Вы найдете готовые красочные презентации. Все слайды создавались <br> экспертами из своих направлений. К каждому уроку предусмотрены методические <br> указания и раздаточный материал: Вам будут доступны адаптированные прописи <br> по советской методике Боголюбова, с помощью которых дети быстро научатся <br> красиво писать. <br> 
  
  У нас нет отчетности, не нужно регистрировать детей и их родителей.<br>
  
  Платформа сделана исключительно для Вас и Вашего комфорта!
  <br>
  <br>
  Ссылка на платформу с уроками: <a href='https://teacher.aclass.ru'>https://teacher.aclass.ru</a><br>
  
  Ссылка на видео-отзыв учителей: <a href='https://www.youtube.com/watch?v=0y2yqLfbR0w'>https://www.youtube.com/watch?v=0y2yqLfbR0w</a>
  <br>
  <br>
  С уважением
  <br>
  $senderName
  <br>
  тел: $senderPhone <br>
  
  тел: 8 (800) 550-76-00
  
  "; //Тело сообщения
  
      $mail->isHTML(true);
      $mail->Subject = $title;
      $mail->Body = $body;  
      $result = '';
      $status = '';  
      
      if ($mail->send()) {
        $result = "success";
      } 
      else {
        $result = "error";
      }
      
      } catch (Exception $e) {
          $result = "error";
          $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
      }
     
      // Отображение результата
      array_push($resultArr, json_encode(['name'=> $sendName,'mail' => $sendEmail,'result' => $result, 'user' => $senderEmail, 'title' => $title, 'status' => $mail->ErrorInfo], JSON_UNESCAPED_UNICODE));
   //}
  
    }
    return $resultArr;
  }
  private function sendCopyMail(array $sendArr, string $senderEmail, string $senderPassword , string $senderPhone, string $senderName): array 
  {
    $resultArr = [];
    $mail = new PHPMailer();

    try {
      $mail->isSMTP();   
      $mail->CharSet = "UTF-8";
      $mail->SMTPAuth   = true;
      //$mail->SMTPDebug = 2;
      $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
      // Настройки вашей почты
      $mail->Host       = 'smtp.yandex.ru';
      $mail->Username   = $senderEmail; // Логин на почте
      $mail->Password   = $senderPassword; // Пароль на почте
      $mail->SMTPSecure = 'ssl';
      $mail->Port       = 465;
      $mail->setFrom($senderEmail, $senderEmail); // Адрес самой почты и имя отправителя
      // $mail->AddEmbeddedImage($attachPath . 'imageaclass.png', 'imageaclass', 'Картинка А-Класс');

      $title = "Вам письмо от А-Класс."; // Заголовок сообщения
    
      $body = "
      <h2 style='text-align:center;'>Наш любимый учитель!</h2>
        <img src='cid:imageaclass' style='display:block; margin: 0 auto; width: 600px; height: 400px;'/>
      <p style='text-align:center; font-weight:bold;'>В этот чудесный осенний день хотим поздравить Вас с Днём учителя!</p>
      
      <p style='text-align:center; font-weight:bold;'>Вы несете свет знаний, учите доброте и справедливости, с большой любовью помогаете детям понять как устроен Мир. Вы те, кем мы гордимся и уважаем! Мы работаем, чтобы сделать Вашу работу ярче, легче и интереснее.</p>
      
      <p style='text-align:center; font-weight:bold;'>От всей души желаем Вам добра и счастья, бодрости и сил, здоровья и благополучия!</p>
      
      <p style='text-align:center; font-weight:bold;'>Ваши друзья и коллеги, команда А-класс</p>
      <p style='text-align:center; font-weight:bold;'>и Ваш личный помощник в А-класс:</p>
      <p style='text-align:center; font-weight:bold;'>$senderName</p>
      <p style='text-align:center; font-weight:bold;'>тел: $senderPhone</p>
      <p style='text-align:center; font-weight:bold;'>тел: 8 (800) 550-76-00</p>
      <p style='text-align:center; font-weight:bold;'><a href='aclass.ru'>aclass.ru</a></p>
      "; //Тело сообщения

        foreach($sendArr as $key) {
            // Если вам надо добавить более чем одного BCC, просто продолжайте!
            array_push($resultArr,$key);
            $mail->AddBCC($key);
        };
        //Вложение
        // $mail->addAttachment($attachPath . 'А-Класс уроки будущего.pdf', 'А-Класс уроки будущего.pdf');
        // $mail->addAttachment($attachPath . 'Прописи буква А.pdf', 'Прописи буква А.pdf');


    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;  
    $result = '';
    $status = '';  
    
    $send = $mail->send();
    $mail->ClearAddresses();
    $mail->ClearAttachments();

    if ($send) {
      $result = "success";
    } 
    else {
      $result = "error";
    }
    
    } catch (Exception $e) {
        $result = "error";
        $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
    }
       array_push($resultArr, json_encode(['result' => $result, 'user' => $senderEmail, 'title' => $title, 'status' => $mail->ErrorInfo], JSON_UNESCAPED_UNICODE));
       return $resultArr;
   }
}
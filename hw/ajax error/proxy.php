<?php
header('Content-Type: application/json');

// 要抓的台北市資料 API
$url = "https://data.taipei/api/v1/dataset/5048d475-7642-43ee-ac6f-af0a368d63bf?scope=resourceAquire";

// 用 cURL 取得資料
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = curl_exec($ch);
curl_close($ch);

// 直接輸出
echo $res;
?>
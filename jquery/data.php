<?php
$avalilbleTypes = [
    'counters' => '../data/counters.json',
    'history' => '../data/history.json',
    'services' => '../data/services.json',
];

$fileName = '';
if (array_key_exists('type', $_GET)) {
    $type = $_GET['type'];
    $fileName = array_key_exists($type, $avalilbleTypes) ? $avalilbleTypes[$type] : '';
}
// Если тип не выбран - отобржаем историю
$fileName = strlen($fileName) > 0 ? $fileName : $avalilbleTypes['history'] ;

$content = file_exists($fileName) ? file_get_contents($fileName) : '{}';
header('Content-Type: application/json');
echo $content;

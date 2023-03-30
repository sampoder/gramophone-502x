<?php
header("Content-Type: image/bmp");

$width = @$_REQUEST['width'];
if(empty($width))
        $width=320;
$img = imagecreatefromjpeg($_REQUEST['url']);
$img = imagescale($img, $width);

imagebmp($img);
imagedestroy($img);

<?php
$eventos = array(
    '0' => array(
        'id'        => 1,
        'nombre'    => 'Asado Final IdeaPais',
        'url_foto'  => 'asado.jpg',
    ),
    '1' => array(
        'id'        => 2,
        'nombre'    => 'Inquietos por Chile: Charla con Juan Lobos',
        'url_foto'  => 'inquietos.jpg',
    )
);
header('Content-type: application/json');
echo json_encode($eventos);
?>

<?php
	$listasVideosYoutube = array(
            'producciones_videos' => array('PL6dkv-UIOgXDubQSW0uzw2s3Qc9mBIhy7','PL6dkv-UIOgXAruuL1RpfLY4HypIKrD7Yx','PL6dkv-UIOgXDubQSW0uzw2s3Qc9mBIhy7'),            
        );
        
        $infografias = array(
            array('titulo'      => 'Nuevo IPC de la Salud',
                  'archivo'     => 'IPCSalud.jpg',
                  'descripcion' => ''),
            array('titulo'      => 'Televisión Digital en Chile',
                  'archivo'     => 'TVDigital.jpg',
                  'descripcion' => ''),
            array('titulo'      => 'El aborto en Chile',
                  'archivo'     => 'aborto.jpg',
                  'descripcion' => ''),
            array('titulo'      => '¿La televisión de todos los Chilenos?',
                  'archivo'     => 'chileYTV.jpg',
                  'descripcion' => ''),
            array('titulo'      => 'Distribución de Ingresos',
                  'archivo'     => 'distribucionIngresos.jpg',
                  'descripcion' => ''),
            array('titulo'      => 'Radiografía de la Participación Juvenil en Chile',
                  'archivo'     => 'participacionJuvenil.jpg',
                  'descripcion' => ''),
            array('titulo'      => 'Radiografía de la Familia Chile',
                  'archivo'     => 'radiografiaFamilia.jpg',
                  'descripcion' => ''),            
        );
        
        $data = array();
        $data['listasYoutube'] = $listasVideosYoutube;
        $data['infografias'] = $infografias;
	header('Content-type: text/json; charset=utf-8');
	header('Content-type: application/json');
	header('Access-Control-Allow-Origin: *');
	echo json_encode($data);
?>
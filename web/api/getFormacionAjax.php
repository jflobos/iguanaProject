<?php
	$cursos = array();
	for($i = 0; $i < 3; $i++){
		$curso = array();
		$curso['titulo'] = 'Desarrollo Humano y Cambio Cultural';
		$curso['precio'] = 10000;
		$curso['lugar'] = 'Apoquindo 4760, oficina 31 - Metro Escuela Militar';
		$curso['descripcion'] = 'Convocamos a una generacion que este comprometida con la promocion de un desarrollo autenticamente humano y que quiera influir verdaderamente en la cultura para humanizarla, generando asi las condiciones necesarias para un bienestar tanto material como espiritual. Asi, el curso busca dar a conocer, mediante reflexiones, testimonios y experiencias en terreno, los factores que determinan la configuracion de la cultura y, en consecuencia, la razon de ser de IdeaPais. Pero no la cultura, vista unicamente como expresiones artisticas como el ballet, la musica o el arte, sino como la forma que actuamos en sociedad, tomamos decisiones y nos relacionamos con los demas. Analizaremos que factores determinan esta cultura y como esta puede variar y transformarse a traves del tiempo, segun lo que nosotros queramos que sea. El curso esta compuesto por siete sesiones y una Experiencia en Terreno a escoger de entre una lista de alternativas.';
		$curso['sesiones'] = array();
		$curso['sesiones'][] = array(
				'titulo' => 'IdeaPais, desarrollo humano y cambio cultural',
				'expositor'	=> 'Diego Schalper y Francisco Salinas',
				'fecha_sesion'  => 'Miercoles 22 de Agosto 18:30'						 
				);
		$curso['sesiones'][] = array(
				'titulo' => 'La familia en la sociedad chilena del siglo XXI',
				'expositor'	=> '',
				'fecha_sesion'  => 'Miercoles 29 de Agosto 18:30'
		);
		$curso['sesiones'][] = array(
				'titulo' => 'Educacion y cultura: mitos y verdades',
				'expositor'	=> 'H. Hochschild',
				'fecha_sesion'  => 'Miercoles 5 de Septiembre 18:30'
		);
		$curso['sesiones'][] = array(
				'titulo' => 'La influencia cultural de los medios de comunicación',
				'expositor'	=> 'Alberto Lopez-Hermida R',
				'fecha_sesion'  => 'Miercoles 12 de Septiembre 18:30'
		);
		$curso['sesiones'][] = array(
				'titulo' => 'La influencia cultural del mercado',
				'expositor'	=> 'M.Petersen',
				'fecha_sesion'  => 'Miercoles 26 de Septiembre 18:30'
		);
		$curso['sesiones'][] = array(
				'titulo' => 'La influencia cultural de la Politica',
				'expositor'	=> 'Jose Luis Widow-M.J.Ossandon',
				'fecha_sesion'  => 'Miercoles 3 de Octubre 18:30'
		);
		$curso['sesiones'][] = array(
				'titulo' => 'Liderazgo cultural y desarrollo Humano: virtudes fundamentales',
				'expositor'	=> 'Alvaro Ferrer',
				'fecha_sesion'  => 'Miercoles 10 de Octubre 18:30'
		);
		$cursos[] = $curso;
	}
        $expositores = array(
          array('id' => '3','nombre' => 'Francisco Salinas','estudios' => 'Periodista de la Pontificia Universidad Católica de Chile','curriculum' => '		    				    		Periodista de la Pontificia Universidad Católica de Chile. Durante su época universitaria Francisco participó en diversas instancias de ayuda social.  El año 2010 Francisco fue Editor General de Política Stereo.  Actualmente se encuentra trabajando en IdeaPaís.		    			    			    			    	','foto' => '0bdd7_Francisco Salinas.jpg','publicada' => '1'),
          array('id' => '4','nombre' => 'José Luis Widow','estudios' => ' Doctor en Filosofía, Pontificia Universidad Santo Tomás de Aquino','curriculum' => '		    		Doctor en Filosofía, Pontificia Universidad Santo Tomás de Aquino, Roma, Italia.  Es licenciado en Filosofía y Profesor de Filosofía de la Universidad Católica de Valparaíso. Jefe del Departamento de Filosofía de la Facultad de Humanidades, Universidad Adolfo Ibáñez.		    			    	','foto' => '34a28_Jose_ Luis Widow.jpg','publicada' => '1'),
          array('id' => '5','nombre' => 'Joaquín García - Huidobro','estudios' => 'Doctor en Filosofía de la Universidad de Navarra','curriculum' => '		    		Doctor en Filosofía de la Universidad de Navarra, España. Es licenciado en Ciencias Jurídicas y Sociales Universidad de Chile. Es Director de Estudios de la Universidad de Los Andes, donde imparte los cursos de Filosofía Política y Filosofía del Derecho. Ha publicado alrededor de setenta artículos en revistas especializadas y es autor de 14 libros.		    			    	','foto' => '9eb2f_Joaqui_n Garci_a Huidobro.jpg','publicada' => '1'),
          array('id' => '6','nombre' => 'Matías Petersen','estudios' => 'Ingeniero comercial y Máster of Science en Finanzas de la Universidad Adolfo Ibáñez','curriculum' => '		    				    		Ingeniero comercial y Máster of Science en Finanzas de la Universidad Adolfo Ibáñez,        donde ejerció labores docentes durante los últimos años. Actualmente cursa estudios de postgrado en Filosofía en la International Academy of Philosophy, sede UC (IAP UC), y trabaja como profesor jornada en la Universidad de los Andes.		    			    			    	','foto' => 'a3b2e_Mati_as Petersen.jpg','publicada' => '1'),
          array('id' => '7','nombre' => 'Carmen Domínguez','estudios' => ' Doctora en Derecho por la Facultad de Derecho de la Universidad Complutense de Madrid','curriculum' => '		    				    				    		Doctora en Derecho por la Facultad de Derecho de la Universidad Complutense de Madrid, España. Realizó sus estudios de pregrado en la Facultad de Ciencias Jurídicas y Sociales de la Universidad de Concepción. Actualmente es profesora de la Universidad Católica y directora del Centro UC de la familia.		    			    			    			    	','foto' => '5c2b7_Carmen Domi_nguez.jpg','publicada' => '1'),
          array('id' => '8','nombre' => 'Diego Schalper','estudios' => 'Abogado, Pontificia Universidad Católica de Chile','curriculum' => '		    				    				    		Abogado, Pontificia Universidad Católica de Chile;  fue Vicepresidente y Presidente del Centro de Alumnos de Derecho, y Consejero Superior de la Federación de Estudiantes; distinguido con “Premio Monseñor Carlos Casanueva” y “Premio Profesor Jaime Guzmán Errázuriz” el 2009; Director Ejecutivo de IdeaPaís.		    			    			    			    	','foto' => '9eb2f_Diego Schalper.jpg','publicada' => '1'),
          array('id' => '9','nombre' => 'Alberto López - Hermida','estudios' => 'Periodista y Máster en Gobierno y Cultura de las Organizaciones y Doctor en Comunicación Pública por la Universidad de Navarra','curriculum' => '		    				    				    		Periodista y Máster en Filosofía de la Universidad de los Andes. Máster en Gobierno y Cultura de las Organizaciones y Doctor en Comunicación Pública por la Universidad de Navarra.  Actualmente se desempeña como profesor de Teoría de la Comunicación, Opinión Pública y Comunicación Política en la Universidad de Los Andes.		    			    			    			    	','foto' => '69175_Alberto Lo_pez - Hermida.jpg','publicada' => '1'),
          array('id' => '10','nombre' => 'Hernán Hochschild','estudios' => 'Ingeniero Civil Industrial Mecánico y egresado de Licenciatura en Filosofía, Pontificia Universidad Católica de Chile','curriculum' => 'Ingeniero Civil Industrial Mecánico y egresado de Licenciatura en Filosofía, Pontificia Universidad Católica de Chile; Director Ejecutivo de EligeEducar.	    	','foto' => '51ea2_hernan.jpg','publicada' => '1'),
          array('id' => '11','nombre' => 'Daniel Mansuy','estudios' => 'Licenciado en Humanidades, mención Historia y Filosofía; Magíster en Fundamentación Filosófica, Universidad de Los Andes; Magíster en Ciencias Políticas, Universidad de Rennes.','curriculum' => '		Licenciado en Humanidades, mención Historia y Filosofía; Magíster en Fundamentación Filosófica, Universidad de Los Andes; Magíster en Ciencias Políticas, Universidad de Rennes.    	','foto' => 'a9151_daniel mansuy.jpg','publicada' => '1'),
          array('id' => '12','nombre' => 'Eduardo Galaz','estudios' => ' Sociólogo Pontificia Universidad Católica de Chile.','curriculum' => 'Sociólogo y profesor del instituto de Sociología, Pontificia Universidad Católica de Chile.','foto' => '7072a_galaz.jpg','publicada' => '1'),
          array('id' => '13','nombre' => 'Marco Antonio Navarro','estudios' => 'Abogado, Pontificia Universidad Católica de Chile','curriculum' => 'Abogado, Pontificia Universidad Católica de Chile; profesor del departamento de Filosofía del Derecho, Pontificia Universidad Católica de Chile.','foto' => '11d78_navarro.jpg','publicada' => '1')
        );
        
        $data = array();
        $data['cursos'] = $cursos;
        $data['expositores'] = $expositores;
	header('Content-type: text/json; charset=utf-8');
	header('Content-type: application/json');
	header('Access-Control-Allow-Origin: *');
	echo json_encode($data);
?>
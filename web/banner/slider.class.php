<?php
    class slider{
    	public $titulo;
    	public $foto;
    	public $optBox;
    	public $optBoxColor;
    	public $optBoxTitulo;
    	public $optBoxBajada;    	
    	public $link;
    	public $urlLink;
    	/*Ejemplo*/    	
    	public function __construct($data){
    		$this->titulo 			= $data['titulo'];
    		$this->foto 			= $data['foto'];
    		$this->optBox 			= $data['optBox'];
    		$this->optBoxColor 		= $data['optBoxColor'];
    		$this->optBoxTitulo 	= $data['optBoxTitulo'];
    		$this->optBoxBajada 	= $data['optBoxBajada'];
    		$this->link         	= $data['link'];
    		$this->urlLink          = $data['urlLink'];
    	}    	
    }
?>
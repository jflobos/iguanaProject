/*
 * Autor: Juan Francisco Lobos Galilea
 * mail: jflobos@gmail.com
 * 
 * Descripcion: Modulo para la gestion del widget de opinionPublica para la pagina de IdeaPais
 * Funcionalidades:
 *   - Imprimir los elementos en el DOM de la pagina del widget de Hazte Parte
 *   - Controlar el Widget de Infografias -> Otro Widget Aparte con HTML5 y en otro Archivo
 *   - Gestionar las listas de video en youtube para la gestion de las listas
 */  

var opinionPublica = ( function(){
    var contenedor;
    var animateTime = 1000;
    var listasYoutube;
    var infografias;
    var videos = {};    
    var getInfo = function getInfo(){
        data = IdeaPaisAPI.getInfoOpinionPublica();
        listasYoutube = data.listasYoutube;         
        infografias = data.infografias;
    }
    //Inicia los elementos del menu central del modulo de opinion publica
    var initDOM = function initDOM(){
        contenedor.append('<div id="opinion_publica"></div>');
        $('#opinion_publica').append('<div id="opinion_publica_elements_container"></div>');
        //Monos de la pagina central
        $('#opinion_publica_elements_container').append('<div id="persona_opinion_publica"><img src="images/opinionPublica/nacho.png"/></div>');
        $('#persona_opinion_publica').append('<div id="rayos_opinion_publica"></div>');
        $('#rayos_opinion_publica').append('<div id="rayo_1" class="rayo"><img src="images/opinionPublica/rayo1.png"/></div>');
        $('#rayos_opinion_publica').append('<div id="rayo_2" class="rayo"><img src="images/opinionPublica/rayo2.png"/></div>');
        $('#rayos_opinion_publica').append('<div id="rayo_3" class="rayo"><img src="images/opinionPublica/rayo3.png"/></div>');
        //Menu central
        $('#opinion_publica').append('<div id="menu_central_opinion_publica"></div>');        
        showSubMenu();
    }
    //Muestra el submenu dependiendo del tipo
    var showSubMenu = function showSubMenu(){
        $('#opinion_publica').append('<div class="sub_menu_central"></div>');
        var subMenuItems;
        //Llenar el menu
        subMenuItems = [{nombre: 'videos',img: 'producciones_videos.png', action: 'producciones_videos'},
                        {nombre: 'infografías',img: 'producciones_infografias.png', action: 'producciones_infografias'},
                        {nombre: 'aparaciones en prensa',img: 'prensa_radio.png', action: 'prensa'},
                        {nombre: 'publicaciones',img: 'producciones_publicaciones.png', action: 'producciones_publicaciones'}                        
                      ];        
        fillSubMenu($('.sub_menu_central'),subMenuItems);
        $('.sub_menu_central').fadeIn(2*animateTime);
    }
    //Llena el submenu central
    var fillSubMenu = function fillSubMenu(element, items){
        $.each(items,function(i, item){
            element.append('<div class="sub_menu_item sub_menu_item_action" action="'+item.action+'"><img src="images/opinionPublica/'+item.img+'"/>'+item.nombre.toUpperCase()+'</div>');            
        });        
        $('.sub_menu_item_action').click(function(){
            var action = $(this).attr('action');
            initModuleAction(action);
        });      
    }
    //Esconde los elementos centrales
    var hideCentralElements = function hideCentralElements(){
        $('#opinion_publica_elements_container').fadeOut(animateTime/2);
        $('#menu_central_opinion_publica').fadeOut(animateTime/2);
        $('.sub_menu_central').fadeOut(animateTime/2);
    }
    //Muestra los elementos centrales
    var showCentralElements = function showCentralElements(){
        $('#opinion_publica_elements_container').fadeIn(animateTime);
        $('#menu_central_opinion_publica').fadeIn(animateTime);
        $('.sub_menu_central').fadeIn(animateTime);
        opinionPublica.animacionExtensionContainer(530);
    }    
    var addBotonesVolver = function addBotonesVolver(nombre_container, section_hash){
        $('#opinion_publica').append('<div class="volver_action volver_action_superior">VOLVER<img src="images/opinionPublica/volverOP.png"/></div>');
        $('#opinion_publica').append('<div class="volver_action volver_action_inferior">VOLVER<img src="images/opinionPublica/volverOP.png"/></div>');
        $('.volver_action').fadeIn(animateTime);
        $('.volver_action').click(function(){
            var botonVolver = $(this);
            $('.volver_action').fadeOut(250,function(){                    
                $('.volver_action').remove();
                if(botonVolver.hasClass('volver_action_inferior')){
                    Scroller.scrollToElement(section_hash);
                }
            });
            $(nombre_container).fadeOut(0.5*animateTime, function(){
                $(nombre_container).remove();                               
            });            
            showCentralElements();
        });
    }
    //Producciones Infografias
    var initProduccionesInfografias = function initProduccionesInfografias(){        
        contenedor.append('<div id="contenedor_producciones_infografias"></div>');
        $('#contenedor_producciones_infografias').append('<div class="titulo_contenedor_videos"><img class="titulo_seccion_infografia" src="images/opinionPublica/infografiaTitulo.png"/></div>');
        $('#contenedor_producciones_infografias').append('<div id="wrapper_producciones_infografias"></div>');
        initInfografiasPreview($('#wrapper_producciones_infografias'));        
        $('#contenedor_producciones_infografias').fadeIn(animateTime);
        addBotonesVolver('#contenedor_producciones_infografias','#opinion_publica_section');        
    }
    //Iniciador el video de inicio
    var initInfografiasPreview = function initInfografiasPreview(container){
        var maxj = 0;
        container.append('<div class="infografia_producciones_list infografia_producciones_list_0" index="0"></div>');
        container.append('<div class="infografia_producciones_list infografia_producciones_list_1" index="0"></div>');
        container.append('<div class="infografia_producciones_list infografia_producciones_list_2" index="0"></div>');
        var index;
        $.each(infografias, function(i, infografia){
           index = (i+1)%3;
           $('.infografia_producciones_list_'+index).append('<div class="infografia_container infografia_container_'+i+'"></div>');
           $('.infografia_container_'+i).append('<div class="thumbnail_wrapper"><img class="infografia_produccion_thumbnail" index='+i+' src="images/infografia/thumb/'+infografia.archivo+'"/></div><div class="video_produccion_info"><div class="video_produccion_info_titulo">'+infografia.titulo.toUpperCase()+'</div><div class="video_produccion_info_decripcion">'+infografia.description+'</div></div>');           
        });
        var elementos = Math.ceil(infografias.length/3);        
        var altura = 300 + 470 * elementos;        
        opinionPublica.animacionExtensionContainer(altura);
        $('.infografia_produccion_thumbnail').click(function(){                        
            var infografia = infografias[$(this).attr('index')];            
            var options = {area: 'infografias ip', subarea: infografia.titulo};
            ViewMedia.initViewer('infografia', infografia, options);            
        });
    }
    
    //Producciones Videos
    var initProduccionesVideos = function initProduccionesVideos(){
        videos.producciones_videos = [];
        $.each(listasYoutube.producciones_videos, function(index, lista){
           videos.producciones_videos[index] = YoutubeAPI.getVideosFromAPlayList(lista);           
        });        
        contenedor.append('<div id="contenedor_producciones_videos"></div>');
        $('#contenedor_producciones_videos').append('<div class="titulo_contenedor_videos"><img class="cinta" src="images/opinionPublica/fondoTitulo.png"/><img class="titulo_sobre_cinta" src="images/opinionPublica/tituloVideos.png"/></div>');
        $('#contenedor_producciones_videos').append('<div id="wrapper_producciones_videos"></div>');
        initProduccionesVideoShow($('#wrapper_producciones_videos'));
        $('#contenedor_producciones_videos').fadeIn(animateTime);
        addBotonesVolver('#contenedor_producciones_videos', '#opinion_publica_section');        
    }
    //Iniciador el video de inicio
    var initProduccionesVideoShow = function initProduccionesVideoShow(container){
        var maxj = 0;            
        container.append('<div id="producciones_listas_videos_control"></div>');
        container.append('<div id="producciones_lista_preview"></div>');
        $.each(videos.producciones_videos, function(i, videosAMostrar){
          $('#producciones_listas_videos_control').append('<div index="'+i+'" class="video_list_controller">'+videos.producciones_videos[i][0].titulo_lista.toUpperCase()+'</div>');
        });
        $('.video_list_controller').click(function(){
          $('#producciones_lista_preview').empty();
          fillPreviewVideos($('#producciones_lista_preview'), videos.producciones_videos[$(this).attr('index')], $(this).attr('index'));
        });
    }
    
    var fillPreviewVideos = function fillPreviewVideos(container, videos, i){
      container.append('<div id="container_producciones_videos_list" class="content"></div>');
      $('#container_producciones_videos_list').append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="overview overview_producciones_videos_list"></div></div>');
      altura = Math.ceil(videos.length/4)*300;
      $('.overview_producciones_videos_list').css('height', altura);      
      $.each(videos, function(j, video){            
           $('.overview_producciones_videos_list').append('<div class="video_container video_container_'+j+'"></div>');
           $('.video_container_'+j).append('<div class="thumbnail_wrapper"><img class="video_produccion_thumbnail" i='+i+' j='+j+' src="'+video.video.thumbnail.hqDefault+'"/></div><div class="video_produccion_info"><div class="video_produccion_info_titulo">'+video.video.title.toUpperCase()+'</div><div class="video_produccion_info_decripcion">'+video.video.description+'</div></div>');     
      });
      $('#container_producciones_videos_list').tinyscrollbar();      
      $('.video_produccion_thumbnail').click(function(){
        console.log(videos);
        var video = videos[$(this).attr('j')];     
        var options = {area: 'videos ip', subarea: video.titulo_lista};
        ViewMedia.initViewer('youtube', video.video, options);
      });
      $('.video_produccion_thumbnail').hover(function(){
        //TODO animacion para destacar 
      });
      $('.video_produccion_thumbnail').mouseleave(function(){
        //TODO cuando se acabe la animacion
      });
      
    }
    
    //initModuleAction
    var initModuleAction = function initModuleAction(action){
        switch(action){
            case 'prensa_television':
                break;
            case 'prensa_diarios':
                break;
            case 'prensa_radio':
                break;
            case 'producciones_videos':
                hideCentralElements();
                initProduccionesVideos();
                break;
            case 'producciones_infografias':
                hideCentralElements();
                initProduccionesInfografias();
                break;
            case 'producciones_publicaciones':
                break;
            default:
                break;                
        }
    }
    
    return{
        init: function init(_contenedor){
            contenedor = _contenedor;
            getInfo();
            initDOM();
            initListeners();
        },
        getVideos: function getVideos(){
            return videos;
        },
        getInfografias: function getInfografias(){
            return infografias;
        },
        //Cambia el alto del contenedor central
        animacionExtensionContainer: function animacionExtensionContainer(height){        
            $('#opinion_publica').animate({'height' : height+'px'},animateTime);
            $('#opinion_publica').parent().animate({'height' : height+'px'},animateTime);
            $('#opinion_publica').parent().parent().animate({'height' : height+'px'},animateTime);
        },
        showMenu: function showMenu(){
            $('#opinion_publica_elements_container').fadeIn(animateTime);
            $('#menu_central_opinion_publica').fadeIn(animateTime);
            initListeners();
        }
    }
})();
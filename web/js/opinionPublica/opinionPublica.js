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
        $('#menu_central_opinion_publica').append('<div class="menu_central_item_action" action="prensa"><img class="flecha_negra_menu" src="images/opinionPublica/flecha_negra.png"/><img class="menu_central_item_titulo" src="images/opinionPublica/prensa.png"/></div>');
        $('#menu_central_opinion_publica').append('<div class="menu_central_item_action" action="noticias"><img class="flecha_negra_menu" src="images/opinionPublica/flecha_negra.png"/><img class="menu_central_item_titulo" src="images/opinionPublica/noticias.png"/></div>');
        $('#menu_central_opinion_publica').append('<div class="menu_central_item_action" action="producciones"><img class="flecha_negra_menu" src="images/opinionPublica/flecha_negra.png"/><img class="menu_central_item_titulo" src="images/opinionPublica/producciones.png"/></div>');        
    }
    //Inicia los Listeners del modulo central
    var initListeners = function initListeners(){        
        $('.menu_central_item_action').click(function(){            
            subMenuActivo = $(this).attr('action');
            switch($(this).attr('action')){                
                case 'prensa':
                    initMenuPrensa();
                    break;
                case 'noticias':
                    initModuleNoticias();
                    break;
                case 'producciones':
                    initMenuProducciones();
                    break;
            }          
        });
    }
    //Inicia el modulo de noticias
    var initModuleNoticias = function initModuleNoticias(){        
        hidePantallaInicial();
        ModuleNoticias.init(contenedor);
    }
    
    var hidePantallaInicial = function hidePantallaInicial(){
        disableListeners();
        $('#opinion_publica_elements_container').fadeOut(animateTime);
        $('#menu_central_opinion_publica').fadeOut(animateTime);
    }
    
    var showPantallaInicial = function showPantallaInicial(){
        $('#opinion_publica_elements_container').fadeIn(animateTime);
        $('#menu_central_opinion_publica').fadeIn(animateTime);
        initListeners();
    }
    
    //Inicia el submenu de prensa
    var initMenuPrensa = function initMenuPrensa(){
        disableListeners();
        hideShowMenuCentralBoton('prensa');        
    }
    //Inicia el submenu de producciones
    var initMenuProducciones = function initMenuProducciones(){
        disableListeners();
        hideShowMenuCentralBoton('producciones');   
    }
    //Muestra el submenu dependiendo del tipo
    var showSubMenu = function showSubMenu(tipo){
        $('#opinion_publica').append('<div class="sub_menu_central"></div>');
        var subMenuItems;
        //Llenar el menu
        switch(tipo){
            case 'prensa':
                subMenuItems = [{nombre: 'televisión',img: 'prensa_television.png', action: 'prensa_television'},
                                {nombre: 'prensa escrita',img: 'prensa_diarios.png', action: 'prensa_diarios'},
                                {nombre: 'radio',img: 'prensa_radio.png', action: 'prensa_radio'}];
                break;
            case 'producciones':
                subMenuItems = [{nombre: 'videos',img: 'producciones_videos.png', action: 'producciones_videos'},
                                {nombre: 'infografias',img: 'producciones_infografias.png', action: 'producciones_infografias'},
                                {nombre: 'publicaciones',img: 'producciones_publicaciones.png', action: 'producciones_publicaciones'},
                ];
                break;
        }
        fillSubMenu($('.sub_menu_central'),subMenuItems);
        $('.sub_menu_central').fadeIn(2*animateTime);
    }
    //Llena el submenu central
    var fillSubMenu = function fillSubMenu(element, items){
        $.each(items,function(i, item){
            element.append('<div class="sub_menu_item sub_menu_item_action" action="'+item.action+'"><img src="images/opinionPublica/'+item.img+'"/>'+item.nombre.toUpperCase()+'</div>');            
        });
        element.append('<div class="sub_menu_item sub_menu_item_salida"><img src="images/opinionPublica/volverOP.png"/>VOLVER</div>');
        $('.sub_menu_item_action').click(function(){
            var action = $(this).attr('action');
            initModuleAction(action);
        });
        $('.sub_menu_item_salida').click(function(){
            $('.sub_menu_central').fadeOut(animateTime*0.25,function(){
                $('.sub_menu_central').remove();
                subMenuActivo = '';
                showMenuCentral();
            });
        });        
    }
    //Muestra el menu central
    var showMenuCentral = function showMenuCentral(){
        $('#menu_central_opinion_publica').animate({'top' : '150px'},animateTime);
        $('.menu_central_item_action').show(animateTime);
        initListeners();
    }
    //Oculta y muestra el nuevo menu central
    var hideShowMenuCentralBoton = function hideShowMenuCentralBoton(tipo){        
        $('#menu_central_opinion_publica').show(animateTime, function(){
            $('.menu_central_item_action').each(function(){                
                if($(this).attr('action') == tipo)
                   $(this).show(animateTime);                
                else
                   $(this).hide(animateTime);                
            });
            $('#menu_central_opinion_publica').animate({'top' : '30px'},animateTime);
            showSubMenu(tipo);
        });
    }
    //Desactiva los escuchadores del menu central
    var disableListeners = function disableListeners(){
        $('.menu_central_item_action').unbind();
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
    
    var arrayMax = function arrayMax(array){        
        return Math.max.apply( Math, array );
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
        /*
        $.each(videos.producciones_videos, function(i, videosAMostrar){
           container.append('<div class="video_producciones_list video_producciones_list_'+i+' index='+i+'"></div>');
           $('.video_producciones_list_'+i).append('<div class="titulo_lista_video_producciones"><img class="titulo_lista_video_producciones_ticket" src="images/opinionPublica/ticketCine.png"/><div class="titulo_lista_video_producciones_titulo_lista">'+videosAMostrar[0].titulo_lista.toUpperCase()+'</div></div>');           
           $.each(videosAMostrar, function(j, video){               
               if(j <= 9){
                $('.video_producciones_list_'+i).append('<div class="video_container video_container_'+i+'_'+j+'"></div>');
                $('.video_container_'+i+'_'+j).append('<div class="thumbnail_wrapper"><img class="video_produccion_thumbnail" i='+i+' j='+j+' src="'+video.video.thumbnail.hqDefault+'"/></div><div class="video_produccion_info"><div class="video_produccion_info_titulo">'+video.video.title.toUpperCase()+'</div><div class="video_produccion_info_decripcion">'+video.video.description+'</div></div>');
                 if(j > maxj){
                     maxj = j;
                 }
               }
           });
        });
        var altura = 300 + 380*(maxj+1);        
        opinionPublica.animacionExtensionContainer(altura);
        */
        
    }
    
    var fillPreviewVideos = function fillPreviewVideos(container, videos, i){
      container.append('<div id="container_producciones_videos_list" class="content"></div>');
      $('#container_producciones_videos_list').append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="overview overview_producciones_videos_list"></div></div>');
      $.each(videos, function(j, video){            
           $('.overview_producciones_videos_list').append('<div class="video_container video_container_'+j+'"></div>');
           $('.video_container_'+j).append('<div class="thumbnail_wrapper"><img class="video_produccion_thumbnail" i='+i+' j='+j+' src="'+video.video.thumbnail.hqDefault+'"/></div><div class="video_produccion_info"><div class="video_produccion_info_titulo">'+video.video.title.toUpperCase()+'</div><div class="video_produccion_info_decripcion">'+video.video.description+'</div></div>');     
      });
      $('#container_producciones_videos_list').tinyscrollbar();
      $('.video_produccion_thumbnail').click(function(){            
          var video = videos.producciones_videos[$(this).attr('i')][$(this).attr('j')];            
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
var ModuleNoticias = (function(){
    //Metodos privados
    var noticias;
    var contenedor;
    var mediaWidth = 600;
    var mediaHeight = 400;
    var animateTime = 1000;
    //Metodos privados
    var initLayOut = function initLayOut(){
        contenedor.append('<div id="noticias_container" style="display: none;"></div>');        
        $('#noticias_container').append('<div class="noticia_container_titulo"><img src="images/opinionPublica/noticias.png"/></div>');
        $('#noticias_container').append('<div class="noticia_activa"></div>');
        $('#noticias_container').append('<div class="historial_noticias"></div>');
    }
    
    var initHistorialNoticias = function initHistorialNoticias(){
        $('.historial_noticias').append('<div id="historial_widget"></div>');
        $("#historial_widget").append('<div class="titulo_historial_widget">Noticias  anteriores:</div><div id="container_overview_historial_noticias" class="content"></div>');
        $('#container_overview_historial_noticias').append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="overview overview_historial_noticias"></div></div>');
        $.each(noticias, function(i, noticia){
            if(i == 0)
                $(".overview_historial_noticias").append('<div class="noticia_preview noticia_preview_first" index="'+i+'">'+noticia.titulo+'</div>');
            else
                $(".overview_historial_noticias").append('<div class="noticia_preview" index="'+i+'">'+noticia.titulo+'</div>');
        });
        $('.noticia_preview').click(function(){
            var id = $(this).attr('index');
            $(".noticia_activa").fadeOut(animateTime, function(){
                $(".noticia_activa").empty();
                activarNoticia(noticias[id]);
                $(".noticia_activa").fadeIn(animateTime*0.4, function(){
                    activarScrollbar($('.noticia_content'));                    
                });                
            });            
        });
    }
    
    var initMenuVolver = function initMenuVolver(){
        //DOM
        $('.historial_noticias').append('<div class="noticia_module_volver"><img class="reflejo_horizontal" src="images/opinionPublica/flecha_negra.png"/><div class="texto_volver">volver</div><div="point_trick"></div></div>')
        //Eventos        
        $('.noticia_module_volver').hover(function(){
            $('.noticia_module_volver .texto_volver').css('text-decoration','underline');
        });
        $('.noticia_module_volver').mouseleave(function(){                            
            $('.noticia_module_volver .texto_volver').css('text-decoration','');
        });
        $('.noticia_module_volver').click(function(){
            $('#noticias_container').fadeOut(animateTime, function(){
                $('#noticias_container').empty();                
                opinionPublica.showMenu();
            });
        });
    }    
    var initElements = function initElements(){
        activarNoticia(noticias[5]);
        initHistorialNoticias();
        initMenuVolver();
        $('#noticias_container').fadeIn(animateTime);
        activarScrollbar($('.noticia_content'));
        activarScrollbar($('#container_overview_historial_noticias'));        
    }
    var activarNoticia = function activarNoticia(noticia){        
        $('.noticia_activa').append('<div class="noticia_content content"></div>');        
        $('.noticia_content').append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="overview overview_noticia"></div></div>');                
        $(".overview_noticia").append('<div class="noticia_epigrafe noticia_element">'+noticia.epigrafe+':</div>');
        $(".overview_noticia").append('<div class="noticia_titulo noticia_element">'+noticia.titulo+':</div>');
        $(".overview_noticia").append('<div class="noticia_bajada noticia_element">'+noticia.bajada.replace("\n","<br/><br/>")+'</div>');        
        $(".overview_noticia").append('<div class="noticia_cuerpo noticia_element">'+noticia.cuerpo.replace("\n","<br/><br/>")+'</div>');
        switch(noticia.media.active){
            //Sin multimedia
            case 0:                
                break;
            //Video Youtube
            case 1:
                agregarVideoYoutube($(".overview_noticia"), noticia.media.video);
                break;
            //Galeria fotos Facebook
            case 2:
                agregarGaleriaImagenes($(".overview_noticia"), noticia.media.galeria_fotos.fb_id);
                break;
            //Ambos
            case 3:
                agregarVideoYoutube($(".overview_noticia"), noticia.media.video);
                agregarGaleriaImagenes($(".overview_noticia"), noticia.media.galeria_fotos.fb_id);
                break;                
        }                       
    }
    var activarScrollbar = function activarScrollbar(contenedor){
        contenedor.tinyscrollbar({sizethumb: 100});
    }
    var agregarGaleriaImagenes = function agregarGaleriaImagenes(container, galeria){
        container.append('<iframe class="iframe_infografia_viewer" type="text/html" style="width:'+(mediaWidth+50)+'px; height:'+(mediaHeight+50)+'px; margin-left: 50px;" width="'+mediaWidth+'" height="'+mediaHeight+'" src="getIframeFacebookGallery.php?galeriaId='+galeria+'&width='+mediaWidth+'&height='+mediaHeight+'" frameborder="0" ></iframe>');
    }
    var agregarVideoYoutube = function agregarVideoYoutube(container, video){
        container.append('<iframe class="youtube-player" type="text/html" style="width:'+(mediaWidth)+'px; height:'+(mediaHeight)+'px; margin-left: 80px;" src="http://www.youtube.com/embed/'+video.ytb_id+'" frameborder="0"></iframe>');
    }
    var getNoticias = function getNoticias(){
        noticias = IdeaPaisAPI.getNoticias().noticias;        
    }
    //Metodos publicos
    return{
        init: function init(_contenedor){            
            contenedor = _contenedor;            
            getNoticias();            
            initLayOut();
            initElements();
        },
        getNoticiasExtern: function getNoticiasExtern(){
            return noticias;
        }
    }
})()
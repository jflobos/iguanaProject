/*
 *
 */
var Scroller = (function (){
    //variables publicas    
    //metodos privados
    //Realiza un Scroll en base a un hash dado
    var scrollToHash = function scrollToHash(hash){
        var hash = (hash != undefined) ? hash:'';
        var destination = (hash != '' && hash != '#header') ? ($(hash).offset().top+10):0;
        WaypointManager.desactivarWaypoints();
        $('html, body').stop().animate({ 
            scrollTop: destination
        }, 1000, 
        function() { 
            window.location.hash = hash;
            WaypointManager.activarWaypoints();
        });
        return false;
    }
    //Metodos publicos
    return{
        scrollToElement: function scrollToElement(hash){            
            scrollToHash(hash);
        }        
    }
})();

var WaypointManager = (function(){
    var nombre_elemento;    
    return{
        activarWaypoints: function activarWaypoints(){                                   
            $(nombre_elemento).waypoint(function(){                        
                 Menu.changeBotonActivo($(this).attr('menu'));
            });
        },
        desactivarWaypoints: function desactivarWaypoints(){
             $(nombre_elemento).waypoint('destroy');             
        },
        init:  function init(_nombre_elemento){
            nombre_elemento = _nombre_elemento;
            WaypointManager.activarWaypoints();
        }
    }
})();

/*
 *  Plugin para gestionar el uso del Facebook Graph Plugin:   
 */

 var FacebookAPI = (function(){
    //variables privadas
    var albums = [];
    var token;        
    //variables publicas
    var processImages = function processImages(_images){
        var images = [];
        $.each(_images, function(i,image){
            images.push({                
                src: image.images[3].source,
                height: image.images[3].height,
                width: image.images[3].width                
            });
        });
        return images;
    }
    //metodos publicos
    return{
        /*
         *  Retorna todos los albunes de fotos de un usuario:
         *    - "user": el facebook ID del user 
         */
        getAlbums: function getAlbums(user){
            var data = Connections.getExternalJSON('https://graph.facebook.com/'+user+'/albums?fields=name,cover_photo');
            albums = albums.concat(data.data);
            while(data.paging.next != undefined){                
                data = Connections.getExternalJSON(data.paging.next);
                albums = albums.concat(data.data);
            }
            return albums;
        },
        /*
         *  Retorna todas las fotos de un determinado album:
         *    - "album": el facebook ID del album
         *    - "type": El tipo de imagen que se va a extraer por tamanho
         *      + 1 -> Tamano real de la foto
         *      + 2 -> 720x720
         *      + 3 -> 600x600 
         */
        getPhotosAlbum: function getPhotosAlbum(album, type){
            var photos = [];            
            var data = Connections.getExternalJSON('http://graph.facebook.com/'+album+'?fields=photos');
            photos = photos.concat(data.photos.data);
            if(data.photos.paging != undefined && data.photos.paging.next != undefined){
                data = Connections.getExternalJSON(data.photos.paging.next);
                photos = photos.concat(data.data);
                while(data.paging.next != undefined){                    
                    data = Connections.getExternalJSON(data.paging.next);
                    photos = photos.concat(data.data);
                } 
            }                       
            return processImages(photos);
        }
    }
})();

/*
 * Intefaz para cargar los videos de Youtube
 */
var YoutubeAPI = (function (){
    var videos;
    //Metodos privados
    var getVideosPlayList = function getVideosPlayList(playList){
        videos = Array();
        $.ajax({            
            url: 'http://gdata.youtube.com/feeds/api/playlists/'+playList+'?v=2&alt=jsonc',
            async: false,
            crossDomain: true,
            success: function(data) {
                var list = data;
                $.each(list.data.items, function(index, video) {
                    video.titulo_lista = list.data.title;
                    videos.push(video);                    
                });                
                
            }
        });
    }
    //FuncionesPublicas
    return{
        getVideosFromAPlayList: function getVideosFromAPlayList(playList){            
            getVideosPlayList(playList);
            return videos;
        }
    }    
})();

var ViewMedia = (function(){
    //Variables privadas
    var animateTime = 500;
    //Metodos privados
    
    /**
     * initModalLayer
     * Cubre la vista de la web con una ventana negra     
    */
    var initModalLayer = function initModalLayer(){
        $('body').append('<div id="modal_layer" style="display: none;"></div>');        
        $('#modal_layer').fadeIn(animateTime);
    }    
    var initModalComponent = function initModalComponent(options){
        $('body').append('<div id="modal_component"></div>');
        if(options.subarea != undefined)
            $('#modal_component').append('<div class="modal_titulo">'+options.area.toUpperCase()+': '+options.subarea.toUpperCase()+'</div>');
        else
            $('#modal_component').append('<div class="modal_titulo">'+options.area.toUpperCase()+':</div>');
        $('#modal_component').append('<div id="modal_element_container"></div>');
        $('#modal_element_container').append('<div id="modal_element_container_titulo"></div>');
        $('#modal_element_container').append('<div id="modal_element_container_contenido"></div>');
        $('#modal_element_container').append('<div id="modal_element_container_descripcion"></div>'); 
        $('#modal_element_container').append('<div id="modal_element_action_cerrar">X</div>');        
    }
    /**
     * Youtube Viewer
     * @video <video> Video de youtube, obtenido por el API jsonc
     * @options <object> Opciones para el iframe del video
     * @return Inicia el elemento para ver un video en youtube
     */
    var initYoutubeViewer = function initYoutubeViewer(video, options){        
        initModalComponent(options);
        var width = 0.8 * $('#modal_element_container').width();
        var height = 0.8 * width *(540/640);  
        $('#modal_element_container_titulo').append(video.title.toUpperCase());
        $('#modal_element_container_contenido').append('<iframe class="youtube-player" type="text/html" width="'+width+'" height="'+height+'" src="http://www.youtube.com/embed/'+video.id+'" frameborder="0"></iframe>');
        $('#modal_element_container_descripcion').append(video.description);
        $('#modal_element_action_cerrar').click(function(){
           $('#modal_component').fadeOut(1000);
           $('#modal_layer').fadeOut(1000, function(){
               $('#modal_component').remove();
               $('#modal_layer').remove();
           });
        });
    }
    
    /**
     * Youtube Viewer
     * @infografia <infografia> Infografia almacenada en la web de IP
     * @options <object> Opciones para mostrar la vista
     * @return Inicia el elemento para ver un video en youtube
     */
    var initInfografiaViewer = function initInfografiaViewer(infografia, options){        
        $('body').append('<div id="modal_component"></div>');       
        $('#modal_component').append('<div id="modal_element_container"></div>');        
        $('#modal_element_container').append('<div id="modal_element_container_contenido"></div>');
        var width = $('#modal_layer').width()*0.8;
        var height = $('#modal_layer').height()*0.95;
        $('#modal_element_container_contenido').append('<iframe class="iframe_infografia_viewer" type="text/html" width="'+width+'" height="'+height+'" src="getIframeInfografia.php?infografia='+infografia.archivo+'&infografia_nombre='+infografia.titulo+'" frameborder="0" ></iframe>');        
    }       
    var initListener = function initListener(){
        initModalLayer();
        $('#modal_layer').click(function(){
           $('#modal_component').fadeOut(1000);
           $('#modal_layer').fadeOut(1000, function(){
               $('#modal_component').remove();
               $('#modal_layer').remove();
           });
        });
    }
    return{
        //Metodos publicos
        initViewer: function initViewer(type, info, options){
            switch(type){
                case 'youtube':
                    initYoutubeViewer(info, options);
                    break;
                case 'infografia':
                    initInfografiaViewer(info,options);
                    break;
            }
            initListener();
        }
    }
})();

/*
 * Modulo que permite obtener informacion desde la base dde datos de IdeaPais
 */
var IdeaPaisAPI = (function(){
    //variables privadas
    return {
        getNoticias: function getNoticias(){            
            return Connections.getDataAJAX('api/getNoticiasAjax.php');
        },
        getInfoOpinionPublica: function getInfoOpinionPublica(){            
            return Connections.getDataAJAX('api/getOpinionPublicaAjax.php');
        }
    }
})()


/*
 *  Modulo de coneccionex AJAX cuyo objetivo es manejar todo las llamadas AJAX ajenas a la pagina
 */
var Connections = (function(){
    var AJAXCall = function AJAXCall(_url, method, parameters, async, dataType, crossDomain){
        var info;
        $.ajax({
              url: _url,
              type: method,
              data: parameters,              
              async: async,
              dataType: dataType,              
              crossDomain: crossDomain,
              success: function(data, textStatus, jqXHR) {
                //Llamada correcta
                info = data;                
              },              
              error: function(jqXHR, textStatus, errorThrown){
                //Error en la llamada
                info = textStatus;
              }
        });
        return info;
    }
    return{
        getDataAJAX: function getDataAJAX(_url, method, parameters, async, crossDomain){            
            var async = (typeof async === "undefined") ? false : async;
            var method = (typeof async === "undefined") ? 'post' : method;
            var parameters = (typeof async === "undefined") ? {} : parameters;
            var dataType = 'json';            
            var crossDomain = false;
            return AJAXCall(_url, method, parameters, async, dataType);
        },
        getExternalJSON: function getExternalJSON(_url, method, parameters, async, crossDomain){            
            var async = (typeof async === "undefined") ? false : async;
            var method = (typeof async === "undefined") ? 'post' : method;
            var parameters = (typeof async === "undefined") ? {} : parameters;
            var dataType = 'json';  
            var crossDomain = true;
            return AJAXCall(_url, method, parameters, async, dataType);
        } 
    }
})();

/*
    Administra el Menu de la pagina central del sitio de IP.
 */

var Menu = (function(){
    //Variables privadas    
    var seccion_actual;    
    var scrollListener = 0;
    //Metodos privados
    var initializeScroll = function initializeScroll(){
        var hash = window.location.hash;
        scrollToElement(hash);
    }
    //Inicializa los menu
    var initializeListeners = function initializeListeners(){        
        WaypointManager.init('.scroll_waypoint');
        $('#logo_head').click(function(){
            $('#nav').attr('class','');
        });
        $('.nav_menu_boton_action').hover(function(){
            if(seccion_actual != $(this).attr('menu')){
                activarBotonMenu($(this).attr('menu'));
            }            
        });
        $('.nav_menu_boton_action').mouseleave(function(){
            if(seccion_actual != $(this).attr('menu')){
                desactivarBotonMenu($(this).attr('menu'));
            }
        });
        $('#nav a, .clients-capabilities a').click(function(){
            Menu.changeBotonActivo($(this).attr('menu'));
            scrollToElement(this.hash);
            Menu.changeBotonActivo($(this).attr('menu'));
        });        
    }    
    //Deja el menu en el estado inicial
    var setMenuInicial = function setMenuInicial(){
        estado_menu = 'inicial';
        $('#nav').removeClass('active');
        $('#nav').removeClass('nav_active');
        $('#logo_head').removeClass('logo_active');
        $('#logo_head').addClass('logo_initial');
        $('.menu').addClass('menu_initial');	
        $('.menu').addClass('initial');
        $('#logo_wrapper').addClass('logo_wrapper_initial');	
        $('#menu_wrapper').addClass('menu_wrapper_initital');
        scrollListener();
    } 
    
    var scrollListener = function scrollListener(){
        if(scrollListener == 0){
            scrollListener = 1;
            $(window).scroll(function(){            
                    setMenuSuperior();            
            });
        }
    }
    //Deja el menu en estado activo 'pasa a estar arriba'
    var setMenuSuperior = function setMenuSuperior(){
        $('#nav').removeClass('initial');
        $('#logo_head').removeClass('initial');
        $('#logo_head').removeClass('logo_initial');		
        $('.menu').removeClass('menu_initial');
        $('#logo_wrapper').removeClass('logo_wrapper_initial');	
        $('#menu_wrapper').removeClass('menu_wrapper_initital');
        $('#logo_head').addClass('active');
        $('#nav').addClass('nav_active');
        $('#nav').addClass('active');        
        $('#logo_head').addClass('logo_active');        
    }    
    var scrollToElement = function scrollToElement(hash){        
        if(hash == "#header" || hash == '')
            setMenuInicial();
        else
            setMenuSuperior();
        Scroller.scrollToElement(hash);        
    }
    //Activa un boton del menu    
    var activarBotonMenu = function activarBotonMenu(menuaActivar){
        $('#'+menuaActivar+'_boton_selected').show();
        $('#'+menuaActivar+'_boton_normal').hide();
    }
    //Activa un boton del menu
    var desactivarBotonMenu = function desactivarBotonMenu(menuaActivar){
        $('#'+menuaActivar+'_boton_selected').hide();
        $('#'+menuaActivar+'_boton_normal').show(); 
    }    
    //Metodos publicos
    return{
        init: function init(){
            initializeListeners();
            initializeScroll();
        },
        //Activa y desactiva un boton del menu:
        changeBotonActivo: function changeBotonActivo(nuevoBoton){
            if(seccion_actual != nuevoBoton){
                if(seccion_actual != undefined){
                    desactivarBotonMenu(seccion_actual);
                }
                activarBotonMenu(nuevoBoton);
                seccion_actual = nuevoBoton;
            }
        },
        externalSetMenuSuperior: function externalSetMenuSuperior(){
            setMenuSuperior();
        }
    }    
})()
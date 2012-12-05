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
        initModalLayer();
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
        initModalLayer();
        $('body').append('<div id="modal_component"></div>');       
        $('#modal_component').append('<div id="modal_element_container"></div>');        
        $('#modal_element_container').append('<div id="modal_element_container_contenido"></div>');
        var width = $('#modal_layer').width()*0.8;
        var height = $('#modal_layer').height()*0.95;
        $('#modal_element_container_contenido').append('<iframe class="iframe_infografia_viewer" type="text/html" width="'+width+'" height="'+height+'" src="infografiaViewer/getIframeInfografia.php?infografia='+infografia.archivo+'&infografia_nombre='+infografia.titulo+'" frameborder="0" ></iframe>');
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
        }
    }
})()
/*
 * Modulo que permite obtener informacion desde la base dde datos de IdeaPais
 */
var IdeaPaisAPI = (function(){
    //variables privadas
    return {
        getNoticias: function getNoticias(){            
            return Connections.getDataAJAX('api/getOpinionPublicaAjax.php');
        },
        getInfoOpinionPublica: function getInfoOpinionPublica(){            
            return Connections.getDataAJAX('api/getOpinionPublicaAjax.php');
        }
    }
})()

var Connections = (function(){
    return{
        getDataAJAX: function getDataAJAX(_url, method, parameters, async){
            var info;
            var async = (typeof async === "undefined") ? false : async;
            var method = (typeof async === "undefined") ? 'post' : method;
            var parameters = (typeof async === "undefined") ? {} : parameters;
            $.ajax({
              url: _url,
              type: method,
              data: parameters,
              async: async,
              success: function(data, textStatus, jqXHR) {
                //Llamada correcta
                info = data;            
              },
              error: function(jqXHR, textStatus, errorThrown){
                //Error en la llamada
                alert(errorThrown);
                info = 'error';
              }
            });
            return info;
        }
    }    
})();
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
})();
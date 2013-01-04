/* 
 * Autor: Juan Francisco Lobos Galilea
 * Script para el widget de IdeaPais
 */

var Formacion = (function(){
    //Varaibles privadas
    var ancho = 1278;
    var cursos;
    var videos_formacion;
    var expositores;
    var curso_detalle_state;
    var contenedor;    
    //Metodos privados
    var initDOM = function initDOM(){
        contenedor.append('<div id="curso"></div>');
        $('#curso').append('<img class="fondo_curso" src="images/formacion/sillas.png"/>');
        $('#curso').append('<img class="titulo_curso" src="images/formacion/cursos.png"/>');
        /*
        $('#curso').append('<img class="icono_silla silla_1" src="images/formacion/silla_1.png"/>');
        $('#curso').append('<img class="icono_silla silla_2" src="images/formacion/silla_2.png"/>');
        $('#curso').append('<img class="icono_silla silla_3" src="images/formacion/silla_3.png"/>');
        $('#curso').append('<img class="icono_silla silla_4" src="images/formacion/silla_4.png"/>');
        $('#curso').append('<img class="icono_silla silla_5_1" src="images/formacion/silla_5_1.png"/>');
        $('#curso').append('<img class="icono_silla silla_5_2" src="images/formacion/silla_5_2.png"/>');
        $('#curso').append('<img class="icono_silla silla_5_3" src="images/formacion/silla_5_3.png"/>');
        $('#curso').append('<img class="icono_silla silla_5_4" src="images/formacion/silla_5_1.png"/>');
        $('#curso').append('<img class="icono_silla silla_6" src="images/formacion/silla_6.png"/>');
        */
        $('#curso').append('<img class="indicador_curso indicador_curso_1" src="images/formacion/indicador.png"/>');
        $('#curso').append('<img class="indicador_curso indicador_curso_2" src="images/formacion/indicador.png"/>');
        $('#curso').append('<img class="indicador_curso indicador_curso_3" src="images/formacion/indicador.png"/>');
        $('#curso').append('<div class="indicador_texto_curso indicador_texto_curso_1" curso="0">desarrollo humano y cambio cultural</div>');
        $('#curso').append('<div class="indicador_texto_curso indicador_texto_curso_2" curso="1">desarrollo humano y comunicaci&oacute;n pol&iacute;tica</div>');
        $('#curso').append('<div class="indicador_texto_curso indicador_texto_curso_3" curso="2">liderazgo: hacia un desarrollo humano para chile</div>');        
        $('#curso').append('<img class="flecha_action flecha_expositores expositores_action" src="images/formacion/flecha_azul.png"/>');
        $('#curso').append('<img class="flecha_action flecha_plan_formacion plan_formacion_action" src="images/formacion/flecha_azul.png"/>');
        $('#curso').append('<div class="texto_action_cursos texto_expositores_action expositores_action">expositores</div>');
        $('#curso').append('<div class="texto_action_cursos texto_plan_de_formacion_action plan_formacion_action"><div>plan de formaci&oacute;n</div><div>v&iacute;deo</div></div>');		
    }
    
    //Inicializador de los eventos principales de la pagina
    var activarEventosPrincipales = function activarEventosPrincipales(){
        $('.expositores_action').hover(function(){
            $('.texto_expositores_action').css('text-decoration', 'underline');
        });
        $('.expositores_action').mouseleave(function(){
            $('.texto_expositores_action').css('text-decoration', '');
        });
        $('.plan_formacion_action').hover(function(){
            $('.texto_plan_de_formacion_action').css('text-decoration','underline');
        });
        $('.plan_formacion_action').mouseleave(function(){
            $('.texto_plan_de_formacion_action').css('text-decoration','');
        });
        $('.indicador_texto_curso').hover(function(){		
            var classes = $(this).attr('class').split(' ');
            $('.'+classes[1]).css('text-decoration','underline');
        });
        $('.indicador_texto_curso').mouseleave(function(){
            var classes = $(this).attr('class').split(' ');
            $('.'+classes[1]).css('text-decoration','');
        });
        $('.expositores_action').click(function(){
            modalExpositores();
        });
        $('.plan_formacion_action').click(function(){
            modalPlanFormacion();
        });
        $('.indicador_texto_curso').click(function(){           
            modalCurso($(this).attr('curso'));        
        });
    }
    //Inactiva los eventos principales para permitir el funcionamiento de un solo elemento
    var desactivarEventosPrincipales = function desactivarEventosPrincipales(){
        $(".expositores_action").unbind('click');
        $(".plan_formacion_action").unbind('click');
        $('.indicador_texto_curso').unbind('click');
    }
    //Obtiene los datos de los curos y expositores activos desde la BD
    var CargarInfo = function CargarInfo(){
        /*
         * Carga de informacion desde la base de datos de IP
         */
        $.ajax({
          url: 'api/getFormacionAjax.php',
          success: function(data) {                
            cursos = data.cursos;		
            expositores = data.expositores;
          }
        });
        /*
         * Carga de lista de videos de cursos IP
         * - Ojo con el id de la Lista que puede llegar a cambiar si se cambia, ha de ser entregado a la hora de la carga del modulo
         * - La sacada del id del video tambien puede cambiar con forme al cambio de la API de youtube 
         */
        $.ajax({            
            url: 'https://gdata.youtube.com/feeds/api/playlists/PL6dkv-UIOgXAz6m1k0AoxscpIm98sBKKl?v=2&alt=json',
            success: function(data) {
                list = data;
                videos_formacion = Array();
                $.each(list.feed.entry, function(index, video) {                    
                    video.videoId = video.link[0].href.substring(video.link[0].href.indexOf('?v=')+3 ,video.link[0].href.indexOf('&'));                    
                    videos_formacion.push(video);                    
                });                
            }
        });
    }   
    
    var modalPlanFormacion = function modalPlanFormacion(){        
        desactivarEventosPrincipales();
        $('#curso').append('<div id="videos_plan_de_formacion_container"></div>');        
        $('#curso').append('<div id="plan_de_formacion_container"></div>');
        agregarTextosPlandeFormacion($('#plan_de_formacion_container'));
        $('#videos_plan_de_formacion_container').append('<div class="video_player_wrapper"></div><div class="video_select_container content"><div class="scrollbar cinta_video"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport videos_formacion"><div class="overview overview_videos_formacion"></div></div></div><div class="point_trick"></div>');    
        $('#curso').append('<div id="volver_videos_plan_de_formacion"><img src="images/formacion/volver.png"/></div>');
        var cinta_height = (152)*videos_formacion.length;
        $('.overview_videos_formacion').append('<div class="video_cinta_izquierda" style="height: '+cinta_height+'px"></div><div class="video_select_wrapper"></div><div class="video_cinta_derecha" style="height: '+cinta_height+'px"></div><div class="point_trick"></div>');
        $.each(videos_formacion, function(i, video){
            if(i == 0)
                $('.video_select_wrapper').append('<div class="video_select_element video_curso_active" video="'+i+'"><div class="video_active_layer"></div><img src="http://img.youtube.com/vi/'+video.videoId+'/1.jpg"/><div class="titulo_video_element"><p>'+video.title.$t+'</p></div></div>');
            else
                $('.video_select_wrapper').append('<div class="video_select_element" video="'+i+'"><div class="video_active_layer"></div><img src="http://img.youtube.com/vi/'+video.videoId+'/1.jpg"/><div class="titulo_video_element"><p>'+video.title.$t+'</p></div></div>');
        });
        // Inicializacion de componentes
        $('.video_select_container').tinyscrollbar();    
        cargarVideo($('.video_curso_active'));
        // Eventos del estado
        $('.video_select_element img').click(function(){
            cargarVideo($(this).parent());        
        });
        $('#volver_videos_plan_de_formacion').click(function(){
            activarEventosPrincipales();
            $('#videos_plan_de_formacion_container').empty();
            $('#plan_de_formacion_container').empty();
            $('#volver_videos_plan_de_formacion').empty();
            $('#videos_plan_de_formacion_container').remove();
            $('#plan_de_formacion_container').remove();
            $('#volver_videos_plan_de_formacion').remove();        
        });
    }
    
    var agregarTextosPlandeFormacion = function agregarTextosPlandeFormacion(elemento){
      elemento.append('<p>Dedicar la vida al servicio de los demás es la más noble de las vocaciones. Pero, al parecer, hoy eso no es opción para muchos jóvenes chilenos. Existe hay una gran apatía y desencanto con todo lo relacionado con lo público, en especial con la política.</p>');
      elemento.append('<p>En IdeaPaís, como centro de formación de líderes para el cambio cultural, buscamos incentivar que universitarios y profesionales jóvenes opten por trabajar y colaborar con el mundo público, sea de forma temporal o como vocación de vida, buscando producir el tránsito del voluntariado a un compromiso social permanente.</p>');
      elemento.append('<p>Para ello, proponemos la participación en Cursos de Formación, por medio de los cuales los jóvenes puedan adquirir herramientas tanto de fondo como técnicas, que les permitan ejercer un liderazgo positivo y que se transformen en agentes de influencia en los principales factores que configuran la cultura.</p>');
      elemento.append('<p>De esta forma, IdeaPaís contribuye a la gestación de un movimiento social, político y cultural por medio de la formación de jóvenes líderes comprometidos y dispuestos a jugársela por el país, y así promover en distintos lugares y espacios un Desarrollo Humano Integral.</p>');      
    }
    
    var cargarVideo = function cargarVideo(video_select){    
        var id = video_select.attr('video');
        $('.video_curso_active').children('.video_active_layer').hide();
        $('.video_curso_active').removeClass('video_curso_active');
        $('.video_player_wrapper').empty();
        var video = videos_formacion[id];
        video_select.addClass('video_curso_active');
        video_select.children('.video_active_layer').show();
        $('.video_player_wrapper').append('<div class="titulo_seccion_video">videos cursos idea país</div><div class="titulo_video">'+video.title.$t.toUpperCase()+'</div><div class="video_player"></div>');
        $('.video_player').append('<iframe type="text/html" width="'+$('.video_player').width()+'" height="'+$('.video_player').height()+'" src="http://www.youtube.com/embed/'+video.videoId+'" frameborder="0"></iframe>');
    }
    
    var modalExpositores = function modalExpositores(){
        desactivarEventosPrincipales();
        var leftMarg = 0;
        //DOM
        $('#curso').append('<div id="expositores_container"></div>');
        $('#expositores_container').append('<div id="expositores_overview"></div>');
        $('#expositores_overview').append('<div id="expositores_wrapper" style="width: '+expositores.length*170+'px; height: 250px;"></div>');
        $('#expositores_container').append('<div id="left_bottom_container"><img src="images/formacion/flecha.png" /></div>');
        $('#expositores_container').append('<div id="right_bottom_container"><img src="images/formacion/flecha.png" /></div>');
        $.each( expositores ,function(i, val){
            $('#expositores_wrapper').append('<div class="expositor_frame"><img src="images/formacion/expositores/'+val.foto+'" class="expositor_foto"/><div class="expositor_nombre">'+val.nombre+'</div><div class="expositor_estudios">'+val.estudios+'</div></div>');
        });
        $('#expositores_container').append('<div class="boton_volver_expositores"><img class="img_volver" src="images/formacion/flecha_negra.png"/><div class="secciones_menu_boton_volver">volver</div><div class="point_trick"></div></div>');
        //Eventos
        $('.boton_volver_expositores').hover(function(){
            $('.secciones_menu_boton_volver').css('text-decoration','underline');
        });
        $('.boton_volver_expositores').mouseleave(function(){                            
            $('.secciones_menu_boton_volver').css('text-decoration','');
        });
        $('#left_bottom_container').click(function(){
            var ancho = $('#expositores_overview').width() + 10;
            if( leftMarg + $('#expositores_overview').width() < 0) 
                leftMarg += $('#expositores_overview').width();
            else
                leftMarg = 0;        
            $('#expositores_wrapper').stop().animate({marginLeft:leftMarg+'px'},450);
        });
        $('#right_bottom_container').click(function(){
            var ancho = $('#expositores_overview').width() + 10;
            if(($('#expositores_wrapper').width() + leftMarg - 2*$('#expositores_overview').width()) < 0) 
                 leftMarg -= $('#expositores_wrapper').width() + leftMarg - $('#expositores_overview').width();
            else
                leftMarg -= $('#expositores_overview').width();        
            $('#expositores_wrapper').stop().animate({marginLeft:leftMarg+'px'},450);
        });
        $('.boton_volver_expositores .secciones_menu_boton_volver').click(function(){
            $('#expositores_container').remove();
            activarEventosPrincipales();
        });
        $('.boton_volver_expositores .img_volver').click(function(){
            $('#expositores_container').remove();
            activarEventosPrincipales();
        });
        $('.texto_expositores_action').css('text-decoration', '');    
    }
    var modalCurso = function modalCurso(curso){
            desactivarEventosPrincipales();
            var elCurso = cursos[curso];
            $('#curso').append('<div id="curso_container"></div>');
            /* Agregamos la informacion del curso */
            /* Descripcion del curso */
            $('#curso_container').append('<div id="curso_info"></div>');
            $('#curso_info').append('<div class="detalle_curso info_curso_active"></div>');
            $('.detalle_curso').append('<div class="titulo_descripcion_curso">'+elCurso.titulo.toLowerCase()+'</div>');	
            $('.detalle_curso').append('<div class="datos_valor_curso">Valor: '+elCurso.precio+'</div>');
            $('.detalle_curso').append('<div class="datos_lugar_curso">Lugar: '+elCurso.lugar+'</div>');
            $('.detalle_curso').append('<div class="cuerpo_descripcion_curso"><p>'+elCurso.descripcion+'</p></div>');

            /* Calendario de las sesiones*/
            $('#curso_info').append('<div class="sesiones_curso content" style="display: none;"></div>');
            $('.sesiones_curso').append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="overview overview_sesiones"></div>');
            $('.overview_sesiones').append('<div class="titulo_descripcion_curso">calendario del curso: '+elCurso.titulo.toLowerCase()+'</div>');
            $.each( elCurso.sesiones,function(i, val){
                $('.overview_sesiones').append('<div class="titulo_sesion">'+val.titulo+'</div>');
                $('.overview_sesiones').append('<div class="expositores_sesion">'+val.expositor+'</div>');
                $('.overview_sesiones').append('<div class="fecha_sesion">'+val.fecha_sesion+'</div>');	
            });
            
            /* Formulario de postulacion */
            $('#curso_info').append('<div class="postula_curso content" style="display: none;"></div>');
            $('.postula_curso').append('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="overview overview_postula"></div>');
            $('.overview_postula').append('Duro con los duros');

            /* Menu del curso */
            $('#curso_container').append('<div class="secciones_curso"></div>');
            $('.secciones_curso').append('<div class="opcion_menu_curso boton_menu_cursos descripcion boton_menu_cursos_active"></div>');			
            $('.descripcion').append('<img id="boton_descripcion_descripcion" src="images/formacion/descripcion_normal.png" style="display: none;"/>');
            $('.descripcion').append('<img id="boton_descripcion_descripcion_selected" src="images/formacion/descripcion_activada.png"/>');
            $('.secciones_curso').append('<div class="opcion_menu_curso boton_menu_cursos sesiones"></div>');			
            $('.sesiones').append('<img id="boton_descripcion_sesiones" src="images/formacion/sesiones_normal.png"/>');
            $('.sesiones').append('<img id="boton_descripcion_sesiones_selected" src="images/formacion/sesiones_activada.png" style="display: none;"/>');
            $('.secciones_curso').append('<div class="opcion_menu_curso boton_menu_cursos postula"></div>');
            $('.postula').append('<img id="boton_descripcion_postula" src="images/formacion/postula_normal.png"/>');
            $('.postula').append('<img id="boton_descripcion_postula_selected" src="images/formacion/postula_activada.png" style="display: none;"/>');
            $('.secciones_curso').append('<div class="boton_volver_detalle_curso"><img class="img_volver" src="images/formacion/flecha_negra.png"/><div class="secciones_menu_boton_volver">volver</div><div class="point_trick"></div></div>');
            $('#curso_container').append('<div class="point_trick"></div>');

            /* Funciones para activar al superponer el mouse sobre los botones */                        
            curso_detalle_state = 'descripcion';
            $('.boton_menu_cursos').hover(function(){
                var clase = $(this).attr('class').split(' ')[2];
                if(clase != curso_detalle_state)
                    activarBoton(clase);                                
            });
            $('.boton_menu_cursos').mouseleave(function(){
                var clase = $(this).attr('class').split(' ')[2];
                if(clase != curso_detalle_state)
                    desactivarBoton(clase);                                
            });
            $('.boton_volver_detalle_curso').hover(function(){
                $('.secciones_menu_boton_volver').css('text-decoration','underline');
            });
            $('.boton_volver_detalle_curso').mouseleave(function(){                            
                $('.secciones_menu_boton_volver').css('text-decoration','');
            });

            /* Seleccion de las vistas de los distintos componentes de los cursos*/
            $('.boton_menu_cursos').click(function(){
                var classes = $(this).attr('class').split(' ');
                if(curso_detalle_state != classes[2]){
                    $('.info_curso_active').hide();
                    $('.boton_menu_cursos_active').removeClass('boton_menu_cursos_active');
                    $('.info_curso_active').removeClass('info_curso_active');
                    desactivarBoton(curso_detalle_state);
                    curso_detalle_state = classes[2];
                    activarBoton(curso_detalle_state);
                    switch(classes[2]){
                      case 'descripcion':
                          $('.detalle_curso').show();
                          $('.detalle_curso').addClass('info_curso_active');                                      
                          break;
                      case 'sesiones':
                          $('.sesiones_curso').show();
                          $('.sesiones_curso').addClass('info_curso_active');
                          $('.sesiones_curso').tinyscrollbar();
                          break;
                      case 'postula':
                          $('.postula_curso').show();
                          $('.postula_curso').addClass('info_curso_active');
                          $('.postula_curso').tinyscrollbar();
                          break;                                  
                    };
                }
            });
            /* Boton para el cierre de la ventana del curso*/
            $('.boton_volver_detalle_curso').click(function(){
                activarEventosPrincipales();
                $('#curso_container').empty();
                $('#curso_container').remove();
            });
    }
    var activarBoton = function activarBoton(clase){
    $('#boton_descripcion_'+clase).hide();
    $('#boton_descripcion_'+clase+'_selected').show();
    }
    var desactivarBoton = function desactivarBoton(clase){
        $('#boton_descripcion_'+clase+'_selected').hide();
        $('#boton_descripcion_'+clase).show();                    
    }
    
    //Metodos publicos
    return{
        iniciarWidgetFormacion: function iniciarWidgetFormacion(_contenedor){
            contenedor = _contenedor;
            initDOM();
            CargarInfo();
            activarEventosPrincipales();
        }
    }    
})()

/*
 * Construir un objeto que permita la carga via Ajax de los distintos componentes de los cursos:
 * 	- Carga de los integrantes via AJAX -> Ver el API
 *  - Manejo de memoria para no perder los integrantes cargados previamente
 *  - Manejo de vistas de página y ver el modo de hacer los layouts ordenados via JS
 *  - Posibilidad de manejar mas de un equipo 
 *    
 */
var Equipo = (function(){
    var contenedor;
    var equipo = {};
    var colores = { 
        Dirección_de_Comunicación_Corporativa: '#EF2136', 
        Dirección_de_Formación: '#F1D50B',  
        Dirección_de_Opinión_Pública: '#00A3B1',
        Dirección_Ejecutiva: '#9C0',
        Directorio: '#005EAD',
        Dirección_de_Administración_y_Finanzas_: '#8C2F92'
    }
    var initDOM = function initDOM(){
        contenedor.append('<div id="equipo_matrix"></div>');
        $('#equipo_matrix').append('<div id="equipo"></div>');                            
        $('#equipo_matrix').append('<div id="curriculo"></div>');
        $('#equipo_matrix').append('<div class="point_trick"></div>');                        
    }
    var loadEquipo = function loadEquipo(){
        $.ajax({
            type: 'POST',
            url: "http://www.ideapais.cl/dev/ajax/equipo/getIntegrantes.php",
            data: {info: 'equipo'},
            async: false,
            success: function(data) {
                equipo.equipo = data;                		    
            }
        });	
    }
    var fillContainer =  function fillContainer(){		
        $.each(equipo.equipo, function(i, val){			
            $('#equipo').append('<img src="images/media/'+val.foto+'" class="integrante '+val.clase+'" onclick="Equipo.callData('+i+')" alt="'+val.nombre+'" style="max-height: 75px; max-width: 75px;"/>');			
        });
        $('#equipo').waitForImages(function() {
            toBWFotos();
        });
    }
    var toBWFotos = function toBWFotos(){					
        $('.integrante').each(function(){	
            var el = $(this);
            el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
                var el = $(this);
                el.parent().css({"width": "75px","height": "75px"});
                el.dequeue();
            });
            this.src = Equipo.grayscale(this.src);			
        });		
        $('.integrante').hover(function(){
            $(this).addClass('integrante_hover');
            $(this).parent().find('img:first').stop().animate({opacity:1}, 10);
        })
        $('.integrante').mouseleave(function(){			
            $(this).removeClass('integrante_hover');
            if($(this).attr("elegido") != 1)	
                $(this).stop().animate({opacity:0}, 10);			
        });
        $(".integrante").click(function(event){	
            $(document).find('.integrante[elegido]').each(function(){
                if($(this).attr('elegido')==1){
                    $(this).attr('elegido',"0");
                    $(this).mouseleave();
                }
            });
            $(this).attr("elegido",'1');
            $('.integrante').hover();
            $(".integrante").css('background-color','');			
            clases = $(this).attr('class').split(' ');		
            $('.'+clases[1]).css('background-color',colores[clases[1]]);		
        });	
    }
    var agregarInformacion = function agregarInformacion(container, integrante){
        container.append('<div class="curriculo_informacion"></div>');                
        $('.curriculo_informacion').append('<div class="titulo_direccion titulo_'+integrante.clase+'">'+integrante.direccion+'</div>');
        $('.curriculo_informacion').append('<div class="curriculo_datos"></div>');
        $('.curriculo_datos').append('<div class="curriculo_datos_nombre">'+integrante.nombre+'</div>');
        $('.curriculo_datos').append('<div class="curriculo_datos_cargo">'+integrante.cargo+'</div>');
        $('.curriculo_datos').append('<div class="curriculo_datos_extra"><a mailto="'+integrante.mail+'">'+integrante.mail+'</a></div>');
        var twitter = "";
        if(integrante.twitter != "")
            twitter = integrante.twitter;		
        else
            twitter = 'ideapais';
        $('.curriculo_datos').append('<div class="curriculo_datos_extra"><a href="http://www.twitter.com/'+twitter+'">@'+twitter+'</div>');
        $('.curriculo_informacion').append('<div class="point_trick"></div>');
    }
    var agregarBiografia = function agregarBiografia(container, integrante){
        container.append('<div class="bloque_biografia"></div>');        
        $('.bloque_biografia').append('<div class="imagen_datos"><img src="images/media/'+integrante.foto+'"></img></div>');                
        $('.bloque_biografia').append('<div class="curriculo_text_curriculum">'+integrante.curriculum+'</div>');
        $('.bloque_biografia').append('<div class="point_trick"></div>');
    }
    return {
        grayscale: function grayscale(src){
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var imgObj = new Image();
            imgObj.src = src;
            canvas.width = imgObj.width;
            canvas.height = imgObj.height; 
            ctx.drawImage(imgObj, 0, 0); 
            var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for(var y = 0; y < imgPixels.height; y++){
                for(var x = 0; x < imgPixels.width; x++){
                    var i = (y * 4) * imgPixels.width + x * 4;
                    var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                    imgPixels.data[i] = avg; 
                    imgPixels.data[i + 1] = avg; 
                    imgPixels.data[i + 2] = avg;
                }
            }
            ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
            return canvas.toDataURL();
        },
        callData: function callData(integrante_id){
            var integrante = equipo.equipo[integrante_id]; 
            $('#curriculo').fadeOut(500, function(){
                $('#curriculo').empty();
                $('#curriculo').append('<div class="datos_curriculo_container"></div>');
                $('.datos_curriculo_container').append('<div class="datos_curriculo_wrapper"></div>');                
                agregarInformacion($('.datos_curriculo_wrapper'), integrante);
                agregarBiografia($('.datos_curriculo_wrapper'), integrante);
                //_gaq.push(['_trackEvent', 'Quienes Somos', 'Vista', integrante.nombre]);
                $('#curriculo').fadeIn(500);		
            });		
        },
        init: function init(_contenedor){
            contenedor = _contenedor;
            loadEquipo();
            initDOM();
            fillContainer();
        }
    }
})();
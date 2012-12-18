/*
 * Carrusel de fotos armado a partir de un arreglo de fotos
 * Usar por defecto el plugin Galleria
 * Cada foto es un objeto con los campos:
 *   - image.src  -> url de la imagen 
 *   - image.name -> para el alt de la imagen
 */
var GalleryWidget = (function(){
    var images;
    var contenedor;    
    //Inicia los elementos HTML de la pagina
    var initDOM = function initDOM(width, height){
        contenedor.append('<div id="galeria_imagenes" style="width: '+(width)+'px; height: '+(height)+'px; margin-left: auto; margin-right: auto; background: #000;"></div>');        
        $.each(images, insertImage);
        Galleria.loadTheme('css/gallery/galleria/galleria.classic.min.js');
        Galleria.configure({
            transition: 'slide'
        });                   
    }
    var insertImage = function insertImage(i, image){
        $('#galeria_imagenes').append('<img src="'+image.src+'" alt="Prueba" style="max-height: 400;"/>');
    }
    return{
        init: function(_contenedor, _images, width, height){
            contenedor = _contenedor;
            images = _images;
            initDOM(width, height);     
        },
        run: function(){
            Galleria.run('#galeria_imagenes');
        }
    }
})();
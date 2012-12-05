/*
 * Autor: Juan Francisco Lobos Galilea
 * mail: jflobos@gmail.com
 * 
 * Descripcion: Modulo para la gestion del widget de hazteParte para la pagina de IdeaPais
 * Funcionalidades:
 *   - Imprimir los elementos en el DOM de la pagina 
 *   - Inicializar los listeners usando las funciones de JQuery
 *   - Gestionar formularios para distintos eventos y ademas ordenar funcionalidades.
 */  

var hazteParte = ( function(){
    //Variables privadas
    var contenedor; 
    var eventos;           
    //Funciones privadas    
    //Carga la informacion del Ajax: Ver excepciones si el server esta caido
    var initInfo = function initInfo(){
        $.ajax({
            url: 'api/getEventosInscribibles.php',
            success: initAll
        });
    }
    //Ordena la inicializacion de los componentes una ve que se inicia el elemento
    var initAll = function initAll(info){
        eventos = info;        
        initDOM();
        initListeners();
    }
    //Inicializa todos los elementos del DOM a la hora de cargar la pagina
    var initDOM = function initDOM(){
        contenedor.append('<div id="hazte_parte"></div>');
        $('#hazte_parte').append('<img class="fondo_hazte_parte" src="images/hazteParte/fondoFotos.jpg"/>');
        $('#hazte_parte').append('<img class="titulo_forma_parte" src="images/hazteParte/tituloFormaParte.png"/>');
        $('#hazte_parte').append('<img class="titulo_evento" src="images/hazteParte/tituloEvento.png"/>');
        $('#hazte_parte').append('<img class="flecha_blanca" src="images/hazteParte/flechaBlanca.png"/>');        
        $.each(eventos, function(i, evento){            
            initEvento(i, evento, $('#hazte_parte'));            
        });
        $('#hazte_parte').append('<div class="formulario_hazte_parte"><div class="formulario_hazte_parte_background"></div></div>');
        initFormulario($(".formulario_hazte_parte"), 'informacion');        
    }
    //Inicia el Formulario
    var initFormulario = function initFormulario(contenedor){        
        var campos = [
            {nombre: 'nombre', type: 'text', options: {value: 'Nombre'}},
            {nombre: 'apellidos', type: 'text', options: {value: 'Apellidos'}},
            {nombre: 'fecha_nacimiento', type: 'date', options: {value: 'Fecha de Nacimiento'}},
            {nombre: 'colegio', type: 'text', options: {value: 'Colegio'}},
            {nombre: 'universidad', type: 'text', options: {value: 'Universidad'}},
            {nombre: 'carrera', type: 'text', options: {value: 'Carrera'}},
            {nombre: 'celular', type: 'text', options: {value: 'celular'}},
            {nombre: 'e_mail', type: 'e-mail', options: {value: 'E-mail'}},
            {nombre: 'areas_de_interes', type: 'textarea', options: {value: 'Áreas de intéres'}},
        ];
        var clases_formulario = 'formulario_input';
        var nombre_formulario = 'formulario_hazte_parte_form';
        formularioView.form(campos, clases_formulario, nombre_formulario, contenedor);        
    }    
    //Agrega un evento al DOM
    var initEvento = function initEvento(indice, evento, wrapper){
        wrapper.append('<div class="evento_action evento_'+indice+'" indice="'+indice+'"></div>');
        $('.evento_'+indice).append('<img class="imagen_evento" src="images/hazteParte/'+evento.url_foto+'" alt="'+evento.nombre+'"/>');
        $('.evento_'+indice).append('<img class="imagen_participa imagen_participa_'+indice+'" src="images/hazteParte/participa.png"/>');
    }    
    //Inicializa todos los delegados de los eventos
    var initListeners = function initListeners(){        
        $('.evento_action').hover(function(){
            $('.imagen_participa_'+$(this).attr('indice')).show();
        });
        $('.evento_action').mouseleave(function(){
            $('.imagen_participa_'+$(this).attr('indice')).hide();
        });
        $('.evento_action').click(function(){
            modalFormularioEvento($(this).attr('indice'));
        });
    }
    var sleepListeners = function sleepListeners(){
        $('.evento_action').unbind();
    }
    //Muestra el Form para posturlar a un evento
    var modalFormularioEvento = function modalFormularioEvento(id){
        sleepListeners();
        $('#hazte_parte').append('<div class="modal_box_evento modal_box_evento_'+id+'"></div>');
        //Titulo
        $('.modal_box_evento_'+id).append('<div class="titulo_modal_box_evento">'+eventos[id].nombre+'</div>');
        //Formulario
        var campos = [
            {nombre: 'nombre', type: 'text', options: {value: 'Nombre'}},
            {nombre: 'apellidos', type: 'text', options: {value: 'Apellidos'}},
            {nombre: 'fecha_nacimiento', type: 'date', options: {value: 'Fecha de Nacimiento'}},          
            {nombre: 'celular', type: 'text', options: {value: 'celular'}},
            {nombre: 'e_mail', type: 'e-mail', options: {value: 'E-mail'}},
            {nombre: 'comentarios', type: 'textarea', options: {value: 'Comentarios'}},
        ];
        formularioView.form(campos, 'formulario_input_evento formulario_input_evento_'+eventos[id].id, 'formulario_evento_id_'+eventos[id].id, $('.modal_box_evento_'+id));
        //Imagen evento
        $('.modal_box_evento_'+id).append('<div class="submit_action_formulario_'+id+' boton_participa_formulario_evento"><img src="images/hazteParte/participa.png"/></div>');
        $('.submit_action_formulario_'+id).click(function(){
            $('.modal_box_evento_'+id).remove();
            initListeners();
        });
        
    }
    return {
        init: function init(container){
            contenedor = container;
            initInfo();            
        }
    }
})();

/*
 * Modulo para la gestion de los formularios, sus funciones son:
 *   - Presentar el formulario en pantalla:
 *     + Imprime los campos del formulario dependiendo del tipo de campo
 *     + Elementos del campo
 *   - Conectar la opcion de confirmacion con el metodo
 */
var formularioView = (function(){
    //variables privadas
    var types = ['text', 'date', 'e-mail', 'textarea'];
    var container;
    var form_fields;
    var clases_formulario;
    var form_name;
    
    //metodos privados
    //Imprime un campo e indexa a la funcion correcta.
    var printField = function printField(field){        
        switch(field.type){
            case 'text':
                printTextField(field);
                break;
            case 'date':
                printDateField(field);
                break;
            case 'e-mail':
                printEMailField(field);
                break;
            case 'textarea':
                printTextAreaField(field);
                break;
            default:
                alert('Error no existe un controlador para manejar campos del tipo '+field.type);
                break;
        }
    }
    
    var printTextField = function printTextField(field){
        var html = '<input type="text" id="'+form_name+'_'+field.nombre+'" class="form_input_text formulario_input_'+field.nombre+' '+clases_formulario+'" value="'+field.options.value+'"/>';
        container.append(html);
        //Agregar eventos para controlar el formulario
    }    
    var printDateField = function printDateField(field){
        var html ='<input type="text" id="'+form_name+'_'+field.nombre+'" class="form_input_date formulario_input_'+field.nombre+' '+clases_formulario+'" value="'+field.options.value+'"/>';
        container.append(html);
        //Agregar eventos para controlar el formulario
    }
    var printEMailField = function printEMailField(field){
        var html ='<input type="text" id="'+form_name+'_'+field.nombre+'" class="form_input_email formulario_input_'+field.nombre+' '+clases_formulario+'" value="'+field.options.value+'"/>';
        container.append(html);
        //Agregar eventos para manejar y validar los correos
    }
    var printTextAreaField = function printTextAreaField(field){
        var html ='<textarea id="'+form_name+'_'+field.nombre+'" class="formulario_input_textbox formulario_input'+field.nombre+' '+clases_formulario+'" >'+field.options.value+'</textarea>';
        container.append(html);
        //Agregar
    }
    
    var printForm = function printForm(){
        $.each(form_fields, function(i, field){
            printField(field);
        });        
    }    
    return{
        form: function form(_form_fields, _clases_formulario, _form_name, _container){
            form_fields = _form_fields;
            clases_formulario = _clases_formulario;
            form_name = _form_name;
            container = _container;
            printForm();
        }
    }
    
})();
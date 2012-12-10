var Menu = (function(){    //Variables privadas        var seccion_actual;        //Metodos privados    var initializeScroll = function initializeScroll(){        var hash = window.location.hash;                scrollToElement(hash);                }    //Inicializa los menu    var initializeListeners = function initializeListeners(){        $('#logo_head').click(function(){            $('#nav').attr('class','');        });        $('.nav_menu_boton_action').hover(function(){            if(seccion_actual != $(this).attr('menu')){                activarBotonMenu($(this).attr('menu'));            }                    });        $('.nav_menu_boton_action').mouseleave(function(){            if(seccion_actual != $(this).attr('menu')){                desactivarBotonMenu($(this).attr('menu'));            }        });        $('#nav a, .clients-capabilities a').click(function(){            changeBotonActivo($(this).attr('menu'));            scrollToElement(this.hash);        });        $('.scroll_waypoint').waypoint(function(){            changeBotonActivo($(this).attr('menu'));        });            }    //Deja el menu en el estado inicial    var setMenuInicial = function setMenuInicial(){        $('#nav').removeClass('active');        $('#nav').removeClass('nav_active');        $('#logo_head').removeClass('logo_active');        $('#logo_head').addClass('logo_initial');        $('.menu').addClass('menu_initial');	        $('.menu').addClass('initial');        $('#logo_wrapper').addClass('logo_wrapper_initial');	        $('#menu_wrapper').addClass('menu_wrapper_initital');        $('html').scroll(function(){            setMenuSuperior();            $('html').unbind('scroll',false);        });    }       //Deja el menu en estado activo 'pasa a estar arriba'    var setMenuSuperior = function setMenuSuperior(){        $('#nav').removeClass('initial');        $('#logo_head').removeClass('initial');        $('#logo_head').removeClass('logo_initial');		        $('.menu').removeClass('menu_initial');        $('#logo_wrapper').removeClass('logo_wrapper_initial');	        $('#menu_wrapper').removeClass('menu_wrapper_initital');        $('#logo_head').addClass('active');        $('#nav').addClass('nav_active');        $('#nav').addClass('active');                $('#logo_head').addClass('logo_active');            }    //Activa y desactiva un boton del menu:    var changeBotonActivo = function changeBotonActivo(nuevoBoton){        if(seccion_actual != nuevoBoton){            if(seccion_actual != undefined){                desactivarBotonMenu(seccion_actual);            }            activarBotonMenu(nuevoBoton);            seccion_actual = nuevoBoton;        }    }    var scrollToElement = function scrollToElement(hash){        if(hash == "#header" || hash == '')            setMenuInicial();        else            setMenuSuperior();        Scroller.scrollToElement(hash);    }    //Activa un boton del menu        var activarBotonMenu = function activarBotonMenu(menuaActivar){        $('#'+menuaActivar+'_boton_selected').show();        $('#'+menuaActivar+'_boton_normal').hide();    }    //Activa un boton del menu    var desactivarBotonMenu = function desactivarBotonMenu(menuaActivar){        $('#'+menuaActivar+'_boton_selected').hide();        $('#'+menuaActivar+'_boton_normal').show();     }        //Metodos publicos    return{        init: function init(){            initializeListeners();            initializeScroll();        }    }})()
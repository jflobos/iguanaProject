<?php
    $infografiaFile = $_GET['infografia'];
    $infografiaNombre = $_GET['infografia_nombre'];
    $width = $_GET['width'];
    $height = $_GET['height'];
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Infografías IP: <?php echo $infografiaNombre ?></title>
        <link rel="stylesheet" href="css/jquery.iviewer.css" />
        <script type="text/javascript" src="../js/jquery.min.js" ></script>
        <script type="text/javascript" src="js/jqueryui.js" ></script>
        <script type="text/javascript" src="js/jquery.mousewheel.min.js" ></script>
        <script type="text/javascript" src="js/jquery.iviewer.min.js" ></script>
        <script type="text/javascript">            
            var iv;
            var src;
            $(window).load(function(){
                var theImage = new Image();
                imageSRC = '<?php echo '../infografia/'.$infografiaFile ?>';
                var imageHeight;
                loadSprite(imageSRC, function() {
                    theImage.src = imageSRC;                
                    var imageWidth = theImage.width;                
                    imageHeight = theImage.height;
                    console.log(theImage);                
                    var zoom = ($('body').width()/imageWidth)*100;
                    iv = $("#viewer").iviewer({
                        src: imageSRC,
                        zoom_min: zoom,
                        zoom: zoom,
                        zoom_max: zoom,
                        ui_disabled: true 
                    });
                });                
                
                
                $('#viewer').bind('ivieweronfinishload', function(ev, src) {                    
                    $('#viewer').iviewer('moveTo', 0, -imageHeight);                    
                });
                
            });
            function loadSprite(src, callback) {
                var sprite = new Image();
                sprite.onload = callback;
                sprite.src = src;
            }
        </script>        
        <style>            
            html{
                overflow: hidden;
            }
            .viewer{
                width: 100%;                
                height: 100%;                
                position: relative;
            }

            .wrapper{
                overflow: hidden;
            }
        </style>
    </head>
    <body>
    <div class="wrapper">            
    <div id="viewer" class="viewer"></div>
    <br />            
    </div>
    </body>
</html>
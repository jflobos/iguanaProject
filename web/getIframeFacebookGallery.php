<?php
    $galeriaId = $_GET['galeriaId'];
    $width = $_GET['width'];
    $height = $_GET['height']
?>
<html>
    <head>
        <script src="js/jquery.min.js"></script>
        <script src="js/servicios.js"></script>
        <script src="js/gallery/galleria/galleria-1.2.8.min.js"></script>
        <script src="js/gallery/gallery.js"></script>        
    </head>
    <body>
        <div id="galleria" style="width: 100%; height: 100%;"></div>
    </body>
    <script>
        $(document).ready(function(){
            var imagenes = FacebookAPI.getPhotosAlbum(<?php echo $galeriaId?>, 3);            
            GalleryWidget.init($('#galleria'), imagenes, <?php echo $width?>, <?php echo $height?>);
            GalleryWidget.run();
        });
    </script>
</html>
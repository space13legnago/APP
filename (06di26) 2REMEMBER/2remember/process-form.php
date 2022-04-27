<!DOCTYPE html>
<html lang="en">
    <?php require "connessione.php";?>
<head>
    <meta charset="UTF-8">
    <title>Risultato ricerca</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css" />

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/756bbb6b89.js" crossorigin="anonymous"></script>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img src="images/logospace.png" width=16% alt="..." class="img-thumbnail">

    &nbsp;&nbsp;&nbsp;&nbsp;

    <a href="index.php" class="btn btn-home btn-info btn-lg">
        <span class="glyphicon glyphicon-home"></span> Home
    </a>


</nav>
<br><br><br><br>
<?php


    if (isset($_POST["cognomenome"]))
    {
        $nome=$_POST["cognomenome"];
    }

//link cimiteri

$linkCim="";


$sql = "SELECT * FROM nominativi where cognomenome = '$nome'";

$result = $conn->query($sql);

// Output data of each row
if ($result-> num_rows> 0) {
    // Returns the file in an HTML Page
    while($row = $result-> fetch_assoc()) {
       if($row["cimitero"]=="CEREA"||$row["cimitero"]=="cerea")
           $linkCim="https://www.google.com/maps/place/Cimitero+Comunale+Di+Cerea/@45.1931496,11.2170123,16z/data=!4m9!1m2!2m1!1scimitero+cerea!3m5!1s0x477f72876c6a5e5b:0xb449a8d6f259c17e!8m2!3d45.193261!4d11.2179211!15sCg5jaW1pdGVybyBjZXJlYZIBCGNlbWV0ZXJ5";

       else if($row["cimitero"]=="legnago" ||$row["cimitero"]=="LEGNAGO" ) $linkCim="https://www.google.com/maps/place/Cimitero+Legnago/@45.1852604,11.2142863,11.75z/data=!4m9!1m2!2m1!1scimitero+legnago!3m5!1s0x477f0d6024a71fbd:0x4c29b7e954897c0c!8m2!3d45.1918145!4d11.2902321!15sChBjaW1pdGVybyBsZWduYWdvkgEIY2VtZXRlcnk";

       else if($row["cimitero"]=="san vito" ||$row["cimitero"]=="SAN VITO") $linkCim="https://www.google.com/maps/place/Cimitero+San+Vito+di+Legnago/@45.2012291,11.2626677,12.75z/data=!4m9!1m2!2m1!1scimitero+legnago!3m5!1s0x477f12f33009a5cf:0xbb620bcfc02d5439!8m2!3d45.2097896!4d11.3114028!15sChBjaW1pdGVybyBsZWduYWdvkgEIY2VtZXRlcnk";

       else if($row["cimitero"]=="angiari" || $row["cimitero"]=="ANGIARI")
           $linkCim="https://www.google.com/maps/place/Cimitero+di+Angiari/@45.2185477,11.2784146,18z/data=!4m5!3m4!1s0x477f13255185493b:0x33a2b49488b177f9!8m2!3d45.2184778!4d11.2795036";
        ?>
        <h1 class="display-4 text-uppercase text-center">
   <?php     echo($nome);?>
          </h1><br><br>

        <table class="table table-hover">
    <tbody>
    <tr>
        <td class="col-md-2 "><h5><STRONG>DATA DI MORTE</h5></STRONG></h5> </td>
        <td ><h5><?php echo($row["dataMorte"]);?></h5></td>
    </tr>
    <tr>
        <td><h5><STRONG>STATO:</STRONG></h5></td>
        <td><h5 class="text-uppercase"><?php echo($row["stato"]);?></h5></td>
    </tr>
    <tr>
        <td><h5><STRONG>CIMITERO:</STRONG></h5></td>
        <td><h5 class="text-uppercase"><?php echo($row["cimitero"]);?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="<?php echo($linkCim);?> " ><i class="fa-solid fa-location-dot fa-2xl "></i></a>

            </h5></td>
    </tr>
    </tbody>
</table>

        <?php
    }
}

?>
<footer class="bg-light text-center ">
    <!-- Grid container -->

    <!-- Grid container -->

    <!-- Copyright -->
    <div class="fixed-bottom">
        <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
            <p class="h4"> © 2022 Powered by I.I.S. SILVA RICCI</p>

        </div>
    </div>
    <!-- Copyright -->
</footer>
</body>
</html>
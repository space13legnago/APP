<!DOCTYPE html>
<html lang="en">
<?php require "connessione.php";?>
<head>
    <meta charset="UTF-8">
    <title>Risultato ricerca periodo</title>
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
<?php


//date da datepicker convertite per mysql
$dataInizio =DateTime::createFromFormat("d-m-Y", $_POST['datainizio'])->format('Y-m-d');
$dataFine =DateTime::createFromFormat("d-m-Y", $_POST['datafine'])->format('Y-m-d');
//$dataInizio = $_POST['datainizio'];
//echo ($dataInizio);echo ($dataFine);





//faccio la query sulle date per trovare il periodo
$sqlPerData = "SELECT * FROM nominativi where dataMorte between '$dataInizio' and '$dataFine'";
$resultData = $conn->query($sqlPerData);

if ($resultData->num_rows > 0) {
    // output data of each row
    while($row = $resultData->fetch_assoc()) {
        if($row["cimitero"]=="cerea") $linkCim="https://www.google.com/maps/place/Cimitero+Comunale+Di+Cerea/@45.1931496,11.2170123,16z/data=!4m9!1m2!2m1!1scimitero+cerea!3m5!1s0x477f72876c6a5e5b:0xb449a8d6f259c17e!8m2!3d45.193261!4d11.2179211!15sCg5jaW1pdGVybyBjZXJlYZIBCGNlbWV0ZXJ5";
        else if($row["cimitero"]=="legnago") $linkCim="https://www.google.com/maps/place/Cimitero+Legnago/@45.1852604,11.2142863,11.75z/data=!4m9!1m2!2m1!1scimitero+legnago!3m5!1s0x477f0d6024a71fbd:0x4c29b7e954897c0c!8m2!3d45.1918145!4d11.2902321!15sChBjaW1pdGVybyBsZWduYWdvkgEIY2VtZXRlcnk";

        else if($row["cimitero"]=="san vito") $linkCim="https://www.google.com/maps/place/Cimitero+San+Vito+di+Legnago/@45.2012291,11.2626677,12.75z/data=!4m9!1m2!2m1!1scimitero+legnago!3m5!1s0x477f12f33009a5cf:0xbb620bcfc02d5439!8m2!3d45.2097896!4d11.3114028!15sChBjaW1pdGVybyBsZWduYWdvkgEIY2VtZXRlcnk";
        ?>
        <h1 class="display-4 text-uppercase text-center">
            <?php     echo($row["cognomenome"]);?>
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
else echo("<br><br><br><h2>Nessun risultato per questo periodo di tempo</h2>");




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
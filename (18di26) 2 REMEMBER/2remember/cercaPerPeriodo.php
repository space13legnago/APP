<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ricerca il tuo caro</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <!-- Optional theme -->

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/css/bootstrap-datetimepicker.min.css" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js"></script>

</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img src="images/logospace.png" width=16% alt="..." class="img-thumbnail">

    &nbsp;&nbsp;&nbsp;&nbsp;

    <a href="index.php" class="btn btn-home btn-info btn-lg">
        <span class="glyphicon glyphicon-home"></span> Home
    </a>


</nav>
<?php require "connessione.php";?>

<div class="text-center">
    <h1 class="display-4">Ricerca per periodo di morte</h1>
</div>

<form action="process-form-periodo.php" method="post">
<div class="container">




    <div class='col-md-5'>
      <h3>DAL</h3>
        <div class='input-group date' id='datetimepicker6'>
                <input data-date-format="DD-MM-YYYY" type='text' name="datainizio" id="datainizio" class="form-control" />
                <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
          </span>

        </div>
    </div>




    <div class='col-md-5'>
        <h3>AL</h3>
            <div class='input-group date' id='datetimepicker7'>
                <input data-date-format="DD-MM-YYYY" type='text' name="datafine" id="datafine" class="form-control" />
                <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
          </span>
            </div>

    </div>
<br><br><br><br><br><br><br><br><br><br><br><br><br>
    <input type="submit"  class="btn  btn-xl btn-secondary btn-lg btn-block btn-xl active" value="Cerca"></div>
</form>
<script>
    $(document).ready(function() {
        $(function() {
            $('#datetimepicker6').datetimepicker(
                {
                    viewMode: 'years',
                    defaultDate: new Date()
                }
            );
            $('#datetimepicker7').datetimepicker({
                useCurrent: false,
                viewMode: 'years',
                defaultDate: new Date()//Important! See issue #1075

            });
            $("#datetimepicker6").on("dp.change", function(e) {
                $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
            });
            $("#datetimepicker7").on("dp.change", function(e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
            });
        });
    });
</script>
<br><br><br><br><br><br><br><br><br><br><br><br><br>
<footer class="bg-light text-center ">
    <!-- Grid container -->

    <!-- Grid container -->

    <!-- Copyright -->
    <div class="fixed-bottom">
        <div class="text-center p-6" style="background-color: rgba(0, 0, 0, 0.2);">
            <p class="h4"> © 2022 Powered by I.I.S. SILVA RICCI</p>

        </div>
    </div>
    <!-- Copyright -->
</footer>
</body>
</html>
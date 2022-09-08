<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ricerca il tuo caro</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css" />

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <style>

        .btn-xl {
            padding: 10px 20px;
            font-size: 40px;
            border-radius: 10px;
            width:100%;
        }
        .btn-home {
            padding: 10px 20px;
            font-size: 30px;
            border-radius: 10px;

        }
        .input-lg {
            font-size: 32px;
        }
    </style>
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
<br><br>
<div class="text-center">
<h1 class="display-4">Ricerca per cognome e nome</h1>
</div>
<br><br>
    <form action="process-form.php" method="post">
        <div class="row">
            <h1 class="display-6">&nbsp;&nbspInserisci cognome e nome del tuo caro:</h1><br>
            <div class="col-sm-12">
                <input type="text" style="height:80px" class="form-control form-control-lg input-lg" name="cognomenome" id="cognomenome" >
            </div>
        </div>




        <script type="text/javascript">
            $(function() {
                $( "#cognomenome" ).autocomplete({
                    source: 'live-search-ajax-google.php',
                });
            });
        </script>
        <br><br><br><br><br>


        <input type="submit"  class="btn  btn-xl btn-secondary btn-lg btn-block btn-xl active" value="Cerca">

    </form>


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
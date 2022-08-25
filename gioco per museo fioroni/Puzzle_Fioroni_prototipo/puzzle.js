    /**
     * Vengono settate 2 variabili globali:
     * firstImage e secondImage.
     * Queste contengono le variabili di due
     * immagini.
     * 1-Quando firstImage e' vuoto,
     * 2-Verra' riempito al click
     * 3-Quando firstImage contiene un valore, ma secondImage e' vuoto,
     * 4-Viene riempito secondImage
     * 5-Quindi avverra' lo scambio tra le posizioni delle due immagini
     * 6-Vengono svuotate le due variabili
     */
    var firstImage;
    var firstId;
    var secondImage;
    var secondId;
    var moves=0;

    var minutes=00;
    var seconds=00;
    //Tempo per stampa
    var printTime;
    chronometerCall=setInterval(chronometer, 1000);

    //Ordine delle immagini nel puzzle
    var images=[0,1,2,3,4,5,6,7,8];
    var imagesHTML=["pos0","pos1","pos2","pos3","pos4","pos5","pos6","pos7","pos8"];

    /**
     * Trovato in:
     * https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
     * 
     * Permette di ottenere un numero a due cifre.
     * Utile se si vuole fare una stampa del tempo. 
     * Nota bene: può superare le due cifre se il
     * numero è più alto da rappresentare
     */
    const twoDigitNumber = (number) => String(number).padStart(2, "0");

function main()
{
    //Mette come variabile tutti i td
    let elements=document.querySelectorAll("td");
    console.log(elements);

    let elemento;
    let indexImage=0;
    //Inverte l'ordine dell'array
    shuffleArray(images);
    /**
     * Una funzione che ha come parametro
     * un'altra funzione, invocata automaticamente
     * dal metodo forEach.
     * forEach passa tutti gli elementi di un array.
     * element e' uguale agli elementi di elements.
     */
    elements.forEach((element) => {
        /**
         * ('#' + element.id + " img")
         * '#': indica un id
         * element.id: indica l'elemento di un id
         * " > img": > indica i tag img figli diretti
         * di element (es. pos0)
         * un esempio di stringa che esce: #pos0 img
         */
        console.log('#'+ "pos" + images[indexImage] + " img");
        elemento='#'+ "pos" + images[indexImage] + " img";

        /**
         * Posiziona l'elemento selezionato,
         * nell'ordine posto dall'array images,
         * randomizzato. indexImage aumenta
         * per scorrere l'array
         */
        putImage(elemento,indexImage);
        indexImage++;
    })
    //Controllo se firstImage e secondImage siano undefined
    console.log("firstImage: "+firstImage+", secondImage: "+secondImage);
}

function putImage(element, choice)
{
    if(choice==0) document.querySelector(element).src="imgs/s1.png";
    else if(choice==1) document.querySelector(element).src="imgs/s2.png";
    else if(choice==2) document.querySelector(element).src="imgs/s3.png";
    else if(choice==3) document.querySelector(element).src="imgs/s4.png";
    else if(choice==4) document.querySelector(element).src="imgs/s5.png";
    else if(choice==5) document.querySelector(element).src="imgs/s6.png";
    else if(choice==6) document.querySelector(element).src="imgs/s7.png";
    else if(choice==7) document.querySelector(element).src="imgs/s8.png";
    else document.querySelector(element).src="imgs/s9.png";
}

function selectImage(image)
{
    if(firstImage==undefined)
    {
        console.log(image.id);
        firstImage=image;
        firstId=image.id;
        console.log("firstImage fulled: "+firstImage);
        firstImage.style.opacity="30%";
    }
    else if(secondImage==undefined)
    {
        console.log(image.id);
        //Settiamo secondImage
        secondImage=image;
        secondId=image.id;

        /**
         * Ora che abbiamo settato
         * tutte e due le immagini,
         * possiamo eseguire lo scambio
         */
        console.log("secondImage fulled: "+secondImage);
        console.log("Swap between: "+firstImage+", "+secondImage);

        idSwapper();
        swapper(firstImage, secondImage);
        moves+=1;
        document.getElementById("score").innerHTML=moves;
        document.getElementById("scoreEnd").innerHTML=moves;

        //Rimettiamo l'opacità
        firstImage.style.opacity="100%";
        /**
         * Rimettiamo undefined per
         * permettere la scelta
         */
        firstImage=undefined;
        secondImage=undefined;
        firstId=undefined;
        secondId=undefined;
        console.log("Swap finished, checking puzzle...");
        check();
    }
}

function check()
{
    let checksum=0;
    for(let i = 0; i < 9; i++)
    {

        //console.log(i+" primo: "+ imagesHTML[i] );
        //console.log(i+" secondo: "+( "pos" + images[i] ));
        if( imagesHTML[i] == ( "pos" + images[i] ) )
        {
           console.log("elemento "+ i +" e' nella posizione corretta!");
           checksum++;
        }
    }
    if(checksum==9)
    {
        console.log("PUZZLE FINITO!");
        clearInterval(chronometerCall);

        document.getElementById("summary").style.display="grid";
        document.getElementById("game").style.display="none";
    }
}


/**
 * Funzione spudoratamente copiata da:
 * https://stackoverflow.com/questions/698301/is-there-a-native-jquery-function-to-switch-elements
 * 
 * Permette di cambiare la posizione di due elementi.
 * Da capire ancora bene
 */
function swapper(a, b)
{
    console.log("Start swap");
    /* Viene salvata nella variabile a
    l'elemento a, ovvero il primo elemento selezionato */
    a = $(a);
    b = $(b);
    //nasconde qualcosa...?
    var tmp = $('<span>').hide();
    //scambio effettivo
    a.before(tmp);
    b.before(a);
    tmp.replaceWith(b);
};

/**
 * Metodo preso da: https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
 */
function shuffleArray(array)
{
    for (var i = array.length - 1; i > 0; i--) {
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function idSwapper()
{
    let isEqualPosFirst= (position) => position == firstId;
    let iPrimo=imagesHTML.findIndex(isEqualPosFirst);

    let isEqualPosSecond= (position) => position == secondId;
    let iSecondo=imagesHTML.findIndex(isEqualPosSecond);

    console.log("Scambio tra: "+ iPrimo+ " e "+iSecondo);

    let temp=imagesHTML[iPrimo];
    imagesHTML[iPrimo]=imagesHTML[iSecondo];
    imagesHTML[iSecondo]=temp;
    console.log(imagesHTML);
    console.log(images);
}


/**
 * Informa l'utente del tempo trascorso
 */
function chronometer()
{
    seconds+=1;
    if (seconds>59)
    {
        minutes+=1;
        seconds=0;
    }
    printTime=twoDigitNumber(minutes)+":"+twoDigitNumber(seconds);

    document.getElementById("display").innerHTML=printTime;
    document.getElementById("displayEnd").innerHTML=printTime;
}
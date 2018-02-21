/**
 * Created by kelpe on 21/02/18.
 */

const reviewText = 'WOW, this is really great! I cant stop playing this, it is sooooo cool!';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$("#inputText").on('keydown', e => {
    e.preventDefault();
    let presentText = $("#inputText").val();
    if (presentText.length < reviewText.length)
        $("#inputText").val(presentText + reviewText[presentText.length]);
});

$("button").on('click', _ => {
   $(".alert").removeClass('alert-success').removeClass('alert-danger').html('').hide();
   //validation
   if (!emailRegex.test($("#inputEmail").val().toLowerCase())){
       $(".alert").addClass('alert-danger').html('E-mail is not valid').show();
       return;
   }
   if ($("#inputText").val().length < 3){
       $(".alert").addClass('alert-danger').html('Text must contain of at least 3 symbols').show();
       return;
   }

    $(".alert").addClass('alert-success').html('Thank you! Your review will be sent soon. Or maybe not.').show();

});
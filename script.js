$(document).ready(function(){
    $("#result_msg").hide(); 
    $("#button").click(function(e){ 
        $('.container').addClass('anim')
        $("#result_msg").fadeIn(1550)
        e.preventDefault();
        searchstring = $('#searchfield').val();
        $(".results *").fadeOut(300, function() { $(this).remove(); });

        $.getJSON(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchstring}&namespace=0&limit=10&callback=?`, function(json){
            let searchterm = json[0],
                headers = json[1],
                description = json[2],
                links = json[3];
            if (searchstring == "") {
                return $('#result_msg').text(`Please enter an item in the search bar.`);
            }
            $('#result_msg').text(`Here are your results for ${searchterm}`);
            for (let i = 0; i < headers.length; i++) {
                result = $(`<div class="result"><a href="${links[i]}"><h1>${headers[i]}</h1> <p>${description[i]}</p></a></div>`).hide()
                $(".results").append(result); 
                result.fadeIn(750);
            }
        });
    });
});
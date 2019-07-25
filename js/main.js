
// All JS/jQuery and AJAX goes inside this function
$(function () {

    //whats is going to happen after change on selection menu
    $('#times-menu').on('change', function () {
        $('.loading').append('<img class="loading-gif" src="images/ajax-loader.gif" alt="loading gif" height="40px" width="40px">');
        const selected = $(this).val();
        if (selected !== '') {
            console.log('The value picked is ' + selected);
            loadArticles(selected);
        } else {
            $('ul').html('');
        }

    });

    //Function to load the articles (img, text and link)
    function loadArticles(selected) {

        $('ul').html('');
        $.getJSON('https://api.nytimes.com/svc/topstories/v2/' +
            selected + '.json?api-key=F1xf3ui78H7Qu4HpUjn3uwmx5wpEr0V2')
            .done(function (data) {
                const articlesArray = data.results;
                let backImage;  // assign to the image
                let newsUrl;    // assign to the url
                let abstract;   //assign to the text
                let contentToBeAppend;
                //let cssToAppend;
                //let cssObj;


                //function to append every loop inside the <ul>
                function appendingToAJAX(newsUrl, abstract, backImage) {
                    contentToBeAppend =
                        '<li><a href =' + newsUrl +
                        '><div style="background: url(' + backImage + ')  no-repeat center; background-size: cover;">' +
                        '<article>' +
                        '<p>' +
                        abstract +
                        '</p>' +
                        '</article>' +
                        '</div>' +
                        '</a>' +
                        '</li >';

                }

                // Another way to do the loop
                // articlesArray.forEach(function (article) {
                //     console.log("forEach", article);
                // });

                const filteredArticles = articlesArray.filter((value) => {
                    return value.multimedia[4] !== undefined;
                }).slice(0, 12);

                console.log(filteredArticles);

                $.each(filteredArticles, function (index, article) {

                    // defining the variables
                    backImage = article.multimedia[4].url;
                    newsUrl = article.url;
                    abstract = article.abstract;

                    // Running func to append variables
                    appendingToAJAX(newsUrl, abstract, backImage);

                    //Appending content to elements
                    $('ul')
                        .append(contentToBeAppend);
                });

            })
            .fail(function (err) {
                console.log(err);

            })
            .always(function () {
                $('.loading').html('');
                console.log("this is working");

            });
    }




}); //end of document ready
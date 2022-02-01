var rightContent = document.querySelector("#right-content-starter");
var inputDiv = document.createElement("div");
inputDiv.innerHTML = `
<form class="form-group">
<input type="search" placeholder="Search By Tag Name....." class="form-control" id="search" autocomplete="off" onkeyup="validate()"/>

</form>
`;
rightContent.appendChild(inputDiv);

// var limitedData = document.getElementById("limit");
// var lmt;

// function limitGenerator() {
//     lmt = limitedData.value;
//     lmt = parseInt(lmt);
//     console.log(lmt);
//     getCat()
// }



// Api used : https://cataas.com/api/cats
// To get Image :  https://cataas.com/cat/595f280a557291a9750ebf58;

var search = document.getElementById("search");

var renderedCatImages = [];
var catPicturesCards = document.createElement("section");
rightContent.append(catPicturesCards);
var rowDiv = document.createElement("div");
rowDiv.setAttribute("class", "row empty");
catPicturesCards.append(rowDiv);
var heart = 0;


async function getCat() {

    // ?limit=6
    var catWholeImages = await fetch(`https://cataas.com/api/cats?limit=120`);
    renderedCatImages = await catWholeImages.json();

    displayInPage(renderedCatImages);



}




async function displayInPage(renderedCatImages) {
    document.querySelector(".empty").innerHTML = " ";
    renderedCatImages.forEach(async(ele) => {
        var tags = ele.tags;

        if (tags.length > 0) {
            var tagsNewer = tags.map((ele) => {
                return ele;
            });
        } else {
            tagsNewer = "Rude";
        }



        var id = ele.id;
        console.log(id);
        // tags.map((tagValue) => {

        // })

        // ?limit=6

        var images = await fetch(`https://cataas.com/cat/${id}?limit=120`);
        console.log(images);
        var imageUrl = images.url;


        // creating with dom
        var divisionDiv = document.createElement("div");
        divisionDiv.setAttribute("class", "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 text-center boxes");
        rowDiv.appendChild(divisionDiv);

        var wholeCardDiv = document.createElement("div");
        wholeCardDiv.setAttribute("class", "wholee");
        divisionDiv.appendChild(wholeCardDiv);

        var cardImage = document.createElement("div");
        cardImage.setAttribute("class", "card-image");
        wholeCardDiv.appendChild(cardImage);

        var actualImage = document.createElement("img");
        actualImage.setAttribute("src", `${imageUrl}`);
        actualImage.setAttribute("alt", "Cat-Image");
        actualImage.setAttribute("class", "cat-card-images");
        cardImage.appendChild(actualImage);

        var heartOverLay = document.createElement("div");
        heartOverLay.setAttribute("class", "overlay");
        cardImage.appendChild(heartOverLay);

        actualImage.addEventListener("dblclick", (e) => {

            e.stopPropagation();

            heartOverLay.innerHTML = `<i class="fa fa-heart"></i>`;
            heart++;
            document.querySelector(".number").innerHTML = heart;

        });



        actualImage.addEventListener("click", (e) => {

            e.stopPropagation();
            heartOverLay.innerHTML = " ";
            // heart++;
            document.querySelector(".number").innerHTML = heart;
        });


        var tagsOfCat = document.createElement("div");
        tagsOfCat.setAttribute("class", "tags-split text-center");
        tagsOfCat.innerText = `${tagsNewer}`;
        wholeCardDiv.appendChild(tagsOfCat);

    });
}

getCat();
var input = "";

async function validate() {

    input += search.value;
    try {
        if (input === " " || input === "") {
            document.querySelector(".empty").innerHTML = " ";
            getCat(renderedCatImages);
        } else {

            try {
                renderedCatImages.map((character) => {
                    console.log(character);
                    var filteredChar = character.tags.filter((ele) => {
                        if (ele.includes(input)) {
                            // return character;
                            document.querySelector(".empty").innerHTML = " ";

                            displayInPage([character]);
                            console.log(character);
                        } else {

                            displayInPage([]);
                        }

                    })



                });
            } catch (err) {
                alert("No data Found");
            }
        }
    } catch (err) {
        alert("No data Found");
    }

    input = "";

}



// Pointer tends to page top
var scrollItem = document.querySelector(".pointer");
console.log(scrollItem);



function scrollToTop() {
    document.body.scrollTop = 0;
    scrollItem.style.transition = "2s";
    document.documentElement.scrollTop = 0;
}
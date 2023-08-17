// getting the required elements
let copies = document.querySelector(".copies"); //contains list of copies generated.
let copiedItemParent = document.querySelector(".copies ul") //list of copies generated.
let errorMsg = document.querySelector(".message");  //to show messages upon errors.
let generateCopiesBtn = document.querySelector(".generateCopies");  //this will generate copies when clicked upon.
let copyBtn = document.querySelector(".copyBtn");  //this will copy the generated copies to clipboard.
let resetBtn = document.querySelector(".resetBtn");  //this will restore the original state when clicked upon.

// making required variables
let areCopiesGenerated = false; //'copyBtn' will not work if it is 'false', as there would be no copies generated to be copied.

//getting required data
let suppliedText = document.querySelector("#textToCopy");  //for getting the text from user, to generate copies of.
let howManyCopies = document.querySelector("#howManyCopies"); //for getting number of copies to be generated.



//generating copies of the text supplied by the user.
generateCopiesBtn.addEventListener('click', () => {
    // if user does not supply text or the number of copies to be generated
    if (suppliedText.value.length <= 0 || Number(howManyCopies.value) <= 0) {
        showErrorMsg('Either text to be copied, or the number of copies to be generated is not specified!');
    } else {
        copiedItemParent.innerHTML = ""; //emptying the list prior to generate copies.
        for (let i = 0; i < Number(howManyCopies.value); i++) {
            copiedItemParent.innerHTML += `<li><xmp>${suppliedText.value}</xmp></li>`; //<xmp> will stop the tags from being exicuted.
        }
        areCopiesGenerated = true; //now 'copyBtn' will work.
    }
});


//copying the generated copies to clipboard.
copyBtn.addEventListener('click', () => {
    if (areCopiesGenerated) { //if copies are generated.
        try {
            navigator.clipboard.writeText(copiedItemParent.innerText);  //this will copy the generated items.
            let allCopies = copiedItemParent.querySelectorAll('li');  //selecting all the generated items (copies)
            for (let j = 0; j < allCopies.length; j++) {
                allCopies[j].classList.add('selected');
            }
            // showing the tooltip
            showMsg('Copied to clipboard');
        } catch (error) {
            showErrorMsg(error);
        }
    } else {
        showMsg('Generate copies first.');
    }
});


//restoring the original state.
resetBtn.addEventListener('click', () => {
    copiedItemParent.innerHTML = `<li><h2>//Generate Copies.</h2></li>`;
    areCopiesGenerated = false;
    suppliedText.value = "";
    howManyCopies.value = "";
});

//showing messages in tooltip.
function showMsg(msg) {
    let span = copyBtn.querySelector('span');
    span.innerHTML = `${msg}`;
    span.style.display = 'inline-block';
    setTimeout(() => {
        span.style.display = 'none';
    }, 4000);
}

//showing error messages.
function showErrorMsg(msg) {
    errorMsg.innerHTML = `<p>${msg}</p>`;
    errorMsg.style.display = 'inline-block';
    setTimeout(() => {
        errorMsg.style.display = 'none';
    }, 5000);
}
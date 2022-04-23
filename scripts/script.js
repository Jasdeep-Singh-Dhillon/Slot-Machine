$("document").ready(main);

var images = ["coin", "grapes", "seven", "cherries"]
var money = 1000;

function main() {
    updateMoney();
    $("#spin").on("click", onSpinClick);
}

function onSpinClick() {
    reset();

    let val = $("#spinValue").val();
    if (val <= 0 | val > money) {
        $("#invalidAmount").html("Invalid Amount");
        $("#slotIcons").html(`<img class="slotIcon" src="images/coin.png" alt="gold coin">
        <img class="slotIcon" src="images/cherries.png" alt="cherries">
        <img class="slotIcon" src="images/seven.png" alt="seven">`)
        return;
    }

    money = money - val;

    let randArr = [];
    for (i = 0; i < 3; i++) {
        let rand = Math.floor(Math.random() * images.length);
        randArr.push(rand);
        $("#slotIcons").append(`<img class="slotIcon" src="images/${images[rand]}.png" alt="${images[rand]}}">`);
    }

    if (resultMessage(randArr, val)) {
        money = money + (val * 2);
    }

    updateMoney();
}

function resultMessage(array, val) {
    if (allSame(array)) {
        $("#result").html(`You won ${val*2} credits`);
        $("#result").css("background-color", "green");
        return true;
    } else {
        $("#result").html(`You lost ${val} credits`);
        $("#result").css("background-color", "red");
        return false;
    }
}

function allSame(array) {
    for (i = 0; i < array.length - 1; i++) {
        if (array[i] != array[i + 1])
            return false;
    }
    return true;
}

function reset() {
    $("#result").html("");
    $("#result").css("background-color", "black");
    $("#invalidAmount").html("");
    $("#slotIcons").html(``);
}

function updateMoney() {
    $("#money").html(`Credits: ${money}`);
}
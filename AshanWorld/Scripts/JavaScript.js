

function scrolltodiv(div) {
    var menuMobile = document.getElementById('menu-mobile-id');
    if (menuMobile) {
        RemoveMobileMenu();
    }
    window.scroll(0, findPos(document.getElementById(div)));
}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop - 30;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

window.onresize =
    function () {
        if (this.document.readyState === "complete")
            CheckResolution();
    };

function CheckResolution() {
    var width = window.innerWidth;
    var nodeMain = document.getElementById('full-menu-main');
    var nodeAccount = document.getElementById('full-menu-account');
    var menuMobileExist = document.getElementById('menu-mobile-id');
    if (width < 800) {
        if (nodeMain != null) {
            var ifLogged = document.getElementsByClassName("nickname");
            nodeMain.remove();
            nodeAccount.remove();
            CreateMobileMenu(ifLogged);
        }
    }
    else {
        if (menuMobileExist != null) {
            menuMobileExist.remove();
        }
        if (nodeMain == null) {
            var ifLogged = document.getElementsByClassName("nickname");
            RemoveMobileMenuBtn();
            CreateFullMenu(ifLogged);
        }
    }
};

function CreateFullMenu(ifLogged) {
    var menuDiv = document.getElementById('main-menu-div');
    var menuAccountDiv = document.getElementById('menuAccountDiv');

    var ul2 = document.createElement('ul');
    ul2.className = 'account-btns';
    ul2.id = "full-menu-account";

    var ul1 = document.createElement('ul');
    ul1.className = 'menu-btns';
    ul1.id = "full-menu-main";

    var li1 = document.createElement('li');
    li1.onclick = function () { scrolltodiv('home'); };
    var a1 = document.createElement('a');
    a1.textContent = "Homepage";

    var li2 = document.createElement('li');
    li2.onclick = function () { scrolltodiv('info'); };
    var a2 = document.createElement('a');
    a2.textContent = "Informations";

    var li3 = document.createElement('li');
    li3.onclick = function () { scrolltodiv('strategy'); };
    var a3 = document.createElement('a');
    a3.textContent = "Strategy";

    var li4 = document.createElement('li');
    li4.onclick = function () { scrolltodiv('artifacts'); };
    var a4 = document.createElement('a');
    a4.textContent = "Artifacts";

    var li5 = document.createElement('li');
    li5.onclick = function () { scrolltodiv('ranking'); };
    var a5 = document.createElement('a');
    a5.textContent = "Ranking List";

    if (userAuthorized) {
        var li6 = document.createElement('li');
        li6.className = "nickname";
        li6.id = "nickname";

        li6.addEventListener("mouseover", function () {
            debugger;
            nicknameUser = document.getElementById('nickname');
            var fly = document.createElement('div');
            fly.textContent = "You're logged as " + Name;
            fly.className = "flyMessage";
            fly.id = "nicknameFly";
            nicknameUser.appendChild(fly);
        });

        li6.addEventListener("mouseout", function () {
            debugger;
            var fly = document.getElementById('nicknameFly');
            if (fly != null)
            fly.remove();
        });
        //li6.onclick = function () { scrolltodiv('register-login'); };
        //var a6 = document.createElement('a');

        var li7 = document.createElement('li');
        li7.onclick = function () { LoggOffUser(); };
        var a7 = document.createElement('a');
        a7.textContent = "Logout";
    }
    else {
        var li6 = document.createElement('li');
        li6.onclick = function () { scrolltodiv('register-login'); };
        var a6 = document.createElement('a');
        a6.textContent = "Register";

        var li7 = document.createElement('li');
        li7.onclick = function () { scrolltodiv('register-login'); };
        var a7 = document.createElement('a');
        a7.textContent = "Login";
    }

    li1.appendChild(a1);
    li2.appendChild(a2);
    li3.appendChild(a3);
    li4.appendChild(a4);
    li5.appendChild(a5);

    //li6.appendChild(a6);
    li7.appendChild(a7);

    ul1.appendChild(li1);
    ul1.appendChild(li2);
    ul1.appendChild(li3);
    ul1.appendChild(li4);
    ul1.appendChild(li5);

    ul2.appendChild(li6);
    ul2.appendChild(li7);

    menuDiv.appendChild(ul1);
    menuAccountDiv.appendChild(ul2);
}
function CreateMobileMenu(ifLogged) {
    var mobIcon = document.createElement('div');
    var menuAccountDiv = document.getElementById('menuAccountDiv');
    mobIcon.className = 'mobIcon';
    mobIcon.id = 'menuMobi';
    mobIcon.onclick = function () { openMenuMobile(); };
    if (ifLogged == null) {
        mobIcon.value = "logged";
    }
    else {
        mobIcon.value = "unlogged";
    }

    menuAccountDiv.appendChild(mobIcon);
}
function RemoveMobileMenuBtn() {
    var menuM = document.getElementById('menuMobi');
    if (menuM != null) {
        menuM.remove();
    }
}
function openMenuMobile() {
    var menuContent = document.getElementById('menu-content');
    var menuMobileContent = document.getElementById('menu-mobile-id');
    if (menuMobileContent != null) {
        RemoveMobileMenu();
    }
    else if (menuMobileContent == null) {
        var MenuMobile = document.createElement('div');
        MenuMobile.className = 'menu-mobile';
        MenuMobile.id = 'menu-mobile-id';
        menuContent.appendChild(MenuMobile);
        AddMenuOptions();
    }
}
function RemoveMobileMenu() {
    var menuMobileContent = document.getElementById('menu-mobile-id');

    if (menuMobileContent != null) {
        menuMobileContent.remove();
    }
}
function AddMenuOptions() {
    var mobicon = document.getElementById('menuMobi');
    var menu = document.getElementById('menu-mobile-id');
    var ul = document.createElement('ul');
    ul.className = 'union-mobile-menu';
    ul.id = "union-menu-list";

    var li1 = document.createElement('li');
    li1.onclick = function () { scrolltodiv('home'); };
    var a1 = document.createElement('a');
    a1.textContent = "Homepage";

    var li2 = document.createElement('li');
    li2.onclick = function () { scrolltodiv('info'); };
    var a2 = document.createElement('a');
    a2.textContent = "Informations";

    var li3 = document.createElement('li');
    li3.onclick = function () { scrolltodiv('strategy'); };
    var a3 = document.createElement('a');
    a3.textContent = "Strategy";

    var li4 = document.createElement('li');
    li4.onclick = function () { scrolltodiv('artifacts'); };
    var a4 = document.createElement('a');
    a4.textContent = "Artifacts";

    var li5 = document.createElement('li');
    li5.onclick = function () { scrolltodiv('ranking'); };
    var a5 = document.createElement('a');
    a5.textContent = "Ranking List";

    if (userAuthorized) {
        var li6 = document.createElement('li');
        var a6 = document.createElement('a');
        a6.className = "nickname";

        var li7 = document.createElement('li');
        li7.onclick = function () { LoggOffUser(); };
        var a7 = document.createElement('a');
        a7.textContent = "Logout";
    }
    else {
        var li6 = document.createElement('li');
        li6.onclick = function () { scrolltodiv('register-login'); };
        var a6 = document.createElement('a');
        a6.textContent = "Register";

        var li7 = document.createElement('li');
        li7.onclick = function () { scrolltodiv('register-login'); };
        var a7 = document.createElement('a');
        a7.textContent = "Login";
    }

    li1.appendChild(a1);
    li2.appendChild(a2);
    li3.appendChild(a3);
    li4.appendChild(a4);
    li5.appendChild(a5);
    li6.appendChild(a6);
    li7.appendChild(a7);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    ul.appendChild(li7);

    menu.appendChild(ul);
}
function openLoginWindow() {
    var loginBtn = document.getElementById("login");
    loginBtn.onclick = window.alert("sdasdasda");
}
function LoggOffUser() {
    debugger;
    var form = document.getElementById("logOffForm");
    form.submit();
};
//submit register and login events handler
document.addEventListener("submit", function (e) {
    var form = e.target.id;
    var submit;
    switch (form) {
        case "loginForm":
            submit = validationOnLogin(form);
            debugger;
            break;
        case "registerForm":
            submit = validationOnRegister(form)
            break;
        default:
            submit = [true, true];
            break;
    }
    if (submit.includes(false))
        e.preventDefault();
});
function validationOnLogin(form) {
    var logForm = document.getElementById(form);
    var lPassword = document.getElementById("lPswd");
    var lEmail = document.getElementById("lEmail");
    var results = [true, true];

    if (document.getElementById("ulL") != null) {
        document.getElementById("ulL").remove();
        debugger;
    }

    var ulExist = document.getElementById("ulL");

    if (ulExist == null) {
        var logErrorSection = document.getElementById("logErrors");
        var ulL = document.createElement('ul');
        ulL.id = "ulL";
    }

    if (lPassword.value == "") {
        var liL = document.createElement('li');
        liL.textContent = "Password field is required";
        ulL.appendChild(liL);
        logErrorSection.appendChild(ulL);
        results[0] = false;
    }

    if (lEmail.value == "") {
        var liL = document.createElement('li');
        liL.textContent = "Email field is required";
        ulL.appendChild(liL);
        logErrorSection.appendChild(ulL);
        results[1] = false;
    }

    return results;
}
function validationOnRegister(form) {
    var submit = true;
    var regForm = document.getElementById(form);
    var RPassword = document.getElementById("rPswd");
    var REmail = document.getElementById("rEmail");
    var RPasswordC = document.getElementById("rPswdC");
    var RNickname = document.getElementById("rNickname");
    var results = [true, true, true, true, true, true, true];

    if (document.getElementById("ulR") != null) {
        document.getElementById("ulR").remove();
        debugger;
    }

    var ulExist = document.getElementById("ulR");

    if (ulExist == null) {
        var regErrorSection = document.getElementById("regErrors");
        var ulR = document.createElement('ul');
        ulR.id = "ulR";
    }

    if (RPassword.value == "") {
        var liR = document.createElement('li');
        liR.textContent = "Password field is required";
        ulR.appendChild(liR);
        regErrorSection.appendChild(ulR);
        results[0] = false;
    }
    else {
        results[5] = CheckPassword(RPassword.value, RPasswordC.value, ulR, regErrorSection);
    }

    if (REmail.value == "") {
        var liR = document.createElement('li');
        liR.textContent = "Email field is required";
        ulR.appendChild(liR);
        regErrorSection.appendChild(ulR);
        results[1] = false;
    }
    else {
        results[4] = CheckEmailPattern(REmail.value, ulR, regErrorSection);
    }

    if (RPasswordC.value == "") {
        var liR = document.createElement('li');
        liR.textContent = "Confirm password field is required";
        ulR.appendChild(liR);
        regErrorSection.appendChild(ulR);
        results[2] = false;
    }

    if (RNickname.value == "") {
        var liR = document.createElement('li');
        liR.textContent = "Nickname field is required";
        ulR.appendChild(liR);
        regErrorSection.appendChild(ulR);
        results[3] = false;
    }
    else {
        results[6] = CheckNickname(RNickname.value, ulR, regErrorSection);
    }

    return results;
}
function CreateLogErrorMsg() {
    debugger;
    var logErrorSection = document.getElementById("logErrors");
    var ulL = document.createElement('ul');
    ulL.id = "ulL";
    var liL = document.createElement('li');
    liL.textContent = Logerror;
    ulL.appendChild(liL);
    logErrorSection.appendChild(ulL);
    if (accountL != "" && lEmail.value == "") {
        lEmail.value = accountL;
    }
    scrolltodiv('register-login');
}
var RegExistErrors;
function CreateRegErrorMsg() {
    var regErrorSection = document.getElementById("regErrors");
    var ulR = document.createElement('ul');
    ulR.id = "ulR";
    SplitRegError();
    if (RegExistErrors != null) {
        for (i = 0; i < RegExistErrors.length; i++) {
            var liR = document.createElement('li');
            liR.textContent = RegExistErrors[i];
            ulR.appendChild(liR);
        }
    }
    regErrorSection.appendChild(ulR);
    if (accountR != "" && REmail.value == "") {
        REmail.value = accountR;
    }
    scrolltodiv('register-login');
}
function SplitRegError() {
    RegExistErrors = Regerror.split(',');
}
//register email validation
function CheckEmailPattern(email, ulR, regErrorSection) {

    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = pattern.test((email).toLowerCase());
    if (!result) {
        var liR = document.createElement('li');
        liR.textContent = "Invalid email address";
        ulR.appendChild(liR);
        regErrorSection.appendChild(ulR);
        return result;
    }
    return true;
};
//password validation
function CheckPassword(password, confirmPassword, ulR, regErrorSection) {
    var pattern = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    var result = pattern.test(password);
    if (!result) {
        var liR = document.createElement('li');
        liR.textContent = "Password must contain at least upper case, lower case, alphanumeric and minimum 8 characters";
        ulR.appendChild(liR);
        regErrorSection.appendChild(ulR);
        return result;
    }
    else if (password != confirmPassword) {
        var liR = document.createElement('li');
        liR.textContent = "Passwords must be identicall";
        ulR.appendChild(liR);
        regErrorSection.appendChild(ulR);
        return result;
    }
    return true;
};
//nickname validtion
function CheckNickname(nickname, ulR, regErrorSection) {
    var result = false;
    debugger;
    if (nickname.length > 7)
        return true;
    var liR = document.createElement('li');
    liR.textContent = "Nickname length must be at least 8 characters";
    ulR.appendChild(liR);
    regErrorSection.appendChild(ulR);
    return result;
    debugger;
}
//Ranking sort
function SortByPoints() {
    model.sort(function (a, b) {
        return b.Points - a.Points;
    });
    CheckIfAscending();
}
function SortByMatches() {
    model.sort(function (a, b) {
        return b.MatchesAmount - a.MatchesAmount;
    });
    CheckIfAscending();
}
function SortByField() {
    model.sort(function (a, b) {
        return b.FieldBattles - a.FieldBattles;
    });
    CheckIfAscending();
}
function SortBySiege() {
    model.sort(function (a, b) {
        return b.SiegeBattles - a.SiegeBattles;
    });
    CheckIfAscending();
}
//Reorganize ranking table
function UpdateRankView() {
    var Ranking = document.getElementById('rankTable');
    Ranking.innerHTML = '';
    var tableHeader = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.textContent = "#";
    var th2 = document.createElement('th');
    th2.textContent = "Player";
    var th3 = document.createElement('th');
    th3.textContent = "Matches";
    var th4 = document.createElement('th');
    th4.textContent = "Siege battles";
    var th5 = document.createElement('th');
    th5.textContent = "Field battles";
    var th6 = document.createElement('th');
    th6.textContent = "Points";
    tableHeader.appendChild(th1);
    tableHeader.appendChild(th2);
    tableHeader.appendChild(th3);
    tableHeader.appendChild(th4);
    tableHeader.appendChild(th5);
    tableHeader.appendChild(th6);
    Ranking.appendChild(tableHeader);
    for (i = 0; i < model.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.textContent = i + 1;
        var td2 = document.createElement('td');
        td2.textContent = model[i].Player;
        var td3 = document.createElement('td');
        td3.textContent = model[i].MatchesAmount;
        var td4 = document.createElement('td');
        td4.textContent = model[i].SiegeBattles;
        var td5 = document.createElement('td');
        td5.textContent = model[i].FieldBattles;
        var td6 = document.createElement('td');
        td6.textContent = model[i].Points;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        Ranking.appendChild(tr);
    }
};
function ReverseOrderSort() {
    model.reverse();
}
function CheckIfAscending() {
    if (ascDescSort.value == "ascending") {
        model.reverse();
    }
}
function CreateCreateMatchErrMsg() {
    var createErrorSection = document.getElementById("createErrors");
    var ulR = document.createElement('ul');
    ulR.id = "ulR";
    if (matchCreateErr != null) {
        var liR = document.createElement('li');
        liR.textContent = matchCreateErr;
        ulR.appendChild(liR);
    }
    createErrorSection.appendChild(ulR);
    rankSection = false;
    matchSection = false;
    manageSection = true;
    rankHeader.style.display = "none";
    var rank = document.getElementById('rankTable').style.display = "none";
    var match = document.getElementById('matchTable').style.display = "none";
    var manage = document.getElementById('addMatch').style.display = "table";
    var submit = document.getElementById('matchForm').style.display = "block";
    scrolltodiv('ranking');
}


function good() {
    alert('zzz');
}

function checkPW(){
    var id = document.querySelector('#id');
    var pw1 = document.querySelector('#password');
    var pw2 = document.querySelector('#confirmp_pssword');

    if (id.value == '' || id.value.length < 4) {
        alert('ID 확인');
        id.focus();
    }
    else if (pw1.value.length < 4) {
        alert('PW는 4자 이상');
        pw1.focus();
    }
    else if (pw1.value != pw2.value) {
        alert('PW가 일치하지 않습니다.');
        pw2.focus();
    }
    else {
        alert(id.value + '님 환영합니다!');
        location.href='login.html'
    }
}
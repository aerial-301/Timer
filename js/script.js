const digits = document.getElementsByClassName('time-input');
const start_button = document.getElementById("start-btn");
let paused = true;
var timer_id;

function num_valid(e, n, d){
    const k = e.key;
    if (isNaN(k) || k > n) return false;
    digits[d-1].value = k
    if (d < 6) digits[d].focus();
}

function pressedEnter(e){
    if (e.key == 'Enter') startTimer(start_button);
}

function zeroTimer(){
    clearInterval(timer_id)
    for (i of digits) {
        i.value = null;
        i.disabled = false;
    }
}

function startTimer(e){

    let x = 0;
    for (i of digits) x += i.value;
    if (x == 0) return false
    
    if (e.textContent == 'Start'){
        start_button.textContent = 'Pause';
        
    }
    else {
        
        start_button.textContent = 'Start';
        for (i of digits) {
            i.disabled = false;
        }
        clearInterval(timer_id);
        return false;
    }



    for (i of digits){
        if (i.value == '') i.value = '0'
    }

    let total_seconds = 0;
    let value = '';

    const hours = document.getElementsByClassName('hours');
    const minutes = document.getElementsByClassName('minutes');
    const seconds = document.getElementsByClassName('seconds');





    for (i of hours) value += i.value;
    total_seconds += parseInt(value) * 3600;   
    value = '';
     
    for (i of minutes) value += i.value;
    total_seconds += parseInt(value) * 60; 
    value = '';

    for (i of seconds) value += i.value;
    total_seconds += parseInt(value);

    if (!total_seconds) return false;



    // start_button.textContent = 'Pause';
    for (i of digits) i.disabled = true;

    let h, m, s;

    timer_id = setInterval( () => {
        total_seconds -= 1;
        console.log(total_seconds);


        // Implement display timer ..

        h = Math.floor(total_seconds / 3600);
        m = Math.floor((total_seconds % 3600) / 60);
        s = (total_seconds % 3600) % 60;
        
        console.log(`${h}:${m}:${s}`);

        digits[0].value = Math.floor(h / 10);
        digits[1].value = h % 10;

        digits[2].value = Math.floor(m / 10);
        digits[3].value = m % 10;

        digits[4].value = Math.floor(s / 10);
        digits[5].value = s % 10;

        if (total_seconds == 0) {
            clearInterval(timer_id);
            zeroTimer();
        }
    }, 1000);


}
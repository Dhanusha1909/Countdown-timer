document.addEventListener('DOMContentLoaded',()=>{
    //Get dom element
    const daysElement=document.getElementById('days');
    const hoursElement=document.getElementById('hours');
    const minutesElement=document.getElementById('minutes');
    const secondsElement=document.getElementById('seconds');
    const targetDateInput=document.getElementById('target-date');
    const startButton=document.getElementById('start-btn');
    const resetButton=document.getElementById('reset-btn');

    let countdownIntervel;
    let targetDate;
    //set minimum datetime to current time
    targetDateInput.min=new Date().toISOString().slice(0,16);
    //start the countdown
    startButton.addEventListener('click',()=>{
        if(countdownIntervel){
            clearInterval(countdownIntervel);
        }
        targetDate=new Date(targetDateInput.value).getTime();
        if(isNaN(targetDate)){
            alert('please select valid date and time');
            return;
        }
        updateCountdown();
        countdownIntervel = setInterval(updateCountdown,1000);

    });
    //Reset the countdown
    resetButton.addEventListener('click',()=>{
        clearInterval(countdownIntervel);
        daysElement.textContent='00';
        hoursElement.textContent='00';
        minutesElement.textContent='00';
        secondsElement.textContent='00';
        targetDateInput.value='';
    });
    //update countdown
    function updateCountdown(){
        const now=new Date().getTime();
        const distance=targetDate-now;
        if(distance<0){
            clearInterval(countdownIntervel);
            daysElement.textContent='00';
            hoursElement.textContent='00';
            minutesElement.textContent='00';
            secondsElement.textContent='00';
            alert('Countdown finised');
            return;
        }
        //time calculation
        const days=Math.floor(distance/(1000*60*60*24));
        const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
        const  minutes=Math.floor((distance%(1000*60*60))/(1000*60));
        const seconds=Math.floor((distance%(1000*60))/1000);
        //Display the result
        daysElement.textContent=formatTime(days);
        hoursElement.textContent=formatTime(hours);
        minutesElement.textContent=formatTime(minutes);
        secondsElement.textContent=formatTime(seconds);
    }
    //Adding leading zero for the number less than 10
    function formatTime(time){
        return time<10 ? `0${time}`:time;
    }

});
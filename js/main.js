const numbers = document.querySelectorAll(".screen span");
const main = document.querySelector("main");
const menus = document.querySelectorAll("nav span");
const [am, pm] = document.querySelectorAll(".screen em");

setInterval(()=>{
    const times = setTime();
    let hr = times[0];
    times.forEach((time,index)=>getTime(time, index));

    //조건식과 그에 매칭되는 클래스명을 객체형태로 묶어서 배열로 저장
    const data = [
        {condition: hr>=5 && hr<11, name: 'morning'},
        {condition: hr>=11 && hr<16, name: 'afternoon'},
        {condition: hr>=16 && hr<19, name: 'evening'},
        {condition: hr>=19 || hr<5, name: 'night'},
    ]

    //해당 배열을 반복돌면서 main, menus를 활성화
    data.forEach((item, index)=>{
        if(item.condition){
            main.className='';
            main.classList.add(item.name);
    
            for(let menu of menus) menu.classList.remove('on');
            menus[index].classList.add('on');
        }
    })

    //afternoon 테마일때 글자 어둡게 보이게 하기 위한 조치
    if(main.classList.contains("afternoon")){
        main.classList.add("dark_text");
    }else {
        main.classList.remove("dark_text");
    }

    // if(hr>=5 && hr<11){
    //     main.className = "";
    //     main.classList.add("morning")
    // }

    // if(hr>=11 && hr<16){
    //     main.className = "";
    //     main.classList.add("afternoon")
    // }

    // if(hr>=16 && hr<19){
    //     main.className = "";
    //     main.classList.add("evening")
    // }

    // if(hr>=19 || hr<5){
    //     main.className = "";
    //     main.classList.add("night")
    // }

    // if(hr<10) hr= "0"+hr;
    // if(min<10) min = "0"+min;
    // if(sec<10) sec = "0"+sec;

    // time[0].innerText = hr;
    // time[1].innerText = min;
    // time[2].innerText = sec;
},1000)

//시간값을 구해서 [시간,분,초]로 반환
function setTime(){
    let now = new Date();
    let hr = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let hr2 = null;

    if(hr>12){
        hr2 = hr-12;
        pm.classList.add("on")
        am.classList.remove("on")
    }else {
        hr2 = hr;
        am.classList.add("on");
        pm.classList.remove("on");
    }
    return[hr2, min, sec];
}

//변환할 숫자값과 순서값을 인수로받아 숫자를 보정하고, 해당 인수의 부모요소에 값 적용
function getTime(num,index){
    if(num<10) num = "0"+num;
    numbers[index].innerText = num;
}
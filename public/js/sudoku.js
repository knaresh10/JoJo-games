let sc = true;
let num = null; 
let e = 0;
let cnt = 0;
let hover = []
let display = [9,9,9,9,9,9,9,9,9];

let Bcolor = ['0-0','0-1','0-2','0-6','0-7','0-8','1-0','1-1','1-2','1-6','1-7','1-8','2-0','2-1','2-2','2-6','2-7','2-8',
                '6-0','6-1','6-2','6-6','6-7','6-8','7-0','7-1','7-2','7-6','7-7','7-8','8-0','8-1','8-2','8-6','8-7','8-8',
                '3-3','3-4','3-5','4-3','4-4','4-5','5-3','5-4','5-5']

let array1 = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

function SetGame(){
    let a = document.createElement("button");
    a.id = 'easy';
    a.innerText = "EASY";
    a.addEventListener('click',function() {SetBoard(45);})
    document.getElementById("buttons").appendChild(a);
    a = document.createElement("button");
    a.id = 'medium';
    a.innerText = "MEDIUM";
    a.addEventListener('click',function() {SetBoard(30);})
    document.getElementById("buttons").appendChild(a);
    a = document.createElement("button");
    a.id = 'hard';
    a.innerText = "HARD";
    a.addEventListener('click',function() {SetBoard(20);})
    document.getElementById("buttons").appendChild(a);
    document.getElementById('start').remove();
}

function Reset(){
    window.location.reload();
}
function SetBoard(count){
    cnt = count;
    document.getElementById('easy').remove();
    document.getElementById('medium').remove();
    document.getElementById('hard').remove();
    document.getElementById('reset').style.display = 'inline-block';
    let a = document.createElement('p');
    a.innerText = 'ERRORS : ';
    a.style.color = 'white';
    a.style.display = 'inline';
    document.getElementById('buttons').appendChild(a);

    a = document.createElement('p');
    a.id = 'error';
    a.innerText = e;
    a.style.color = 'red';
    a.style.display = 'inline';
    document.getElementById('buttons').appendChild(a);

    

    for(let i = 1 ; i < 10 ; i++){
        let a = document.createElement("div");
        a.id = i;
        a.innerText = i;
        a.classList.add('number');
        a.addEventListener('click',numbers);
        document.getElementById('elements').appendChild(a);
    }

    for(let i = 0 ; i < 9 ; i++){
        for(let j = 0 ; j < 9 ; j++){
            let a = document.createElement("div");
            let c = i.toString() + "-" + j.toString();
            a.id = c;
            a.classList.add('tile');
            a.addEventListener('click',selected_tile);
            a.addEventListener('mouseover',HoverIn);
            a.addEventListener('mouseout',HoverOut);
            document.getElementById("board").appendChild(a);
        }
    }

    for(let i = 0 ; i < Bcolor.length ; i++){
        document.getElementById(Bcolor[i]).classList.add('separate');
    }

    let array = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];


    let i = 0;
    while(i < 5){
        let a = Math.floor(Math.random()*9);
        let b = Math.floor(Math.random()*9);
        let c = Math.floor(Math.random()*9)+1;
        if(array[a][b] == 0 && check(array,a,b,c)){
            array[a][b] = c;
            i++;
        }
    }

    solve(array,0,count);
}


function numbers(){
    if(num != null){
        num.classList.remove('num-selected');
    }
    if(num === this){
        num.classList.remove('num-selected');
        num = null;
    }
    else{
        num = this;
        num.classList.add('num-selected');
    }
}


function selected_tile(){
    let cords = this.id.split('-');
    let a = cords[0];
    let b = cords[1];
    if(check1(a,b,num.id)){
        this.innerText = num.id;
        cnt++;
        display[parseInt(num.id)-1]--;
        if(display[parseInt(num.id)-1] == 0){
            num.classList.remove('number');
            num.removeEventListener('click',numbers);
            num.innerText = '';
        }
        if(cnt == 81){
            let failureMessage = document.getElementById('GameOver');
            failureMessage.style.display = 'block';
            failureMessage.innerText = "SOLVED";
            load();
        }
    }
    else{
        document.getElementById('error').innerText = ++e;
        
        if(e == 3){
            let failureMessage = document.getElementById('GameOver');
            failureMessage.style.display = 'block';
            failureMessage.innerText = "OOPS";
            load();
        }
    }
}

function load(){
    setTimeout(()=>{
        window.location.reload();
    },2000);
    
}

function check(array,x,y,p){
    for(let i = 0 ; i < 9 ; i++){
        if(i != y && array[x][i] == p) return false;
        if(i != x && array[i][y] == p) return false;
    }
    let a = parseInt(x/3);
    let b = parseInt(y/3);
    for(let i = 3*a ; i < 3*a+3 ; i++){
        for(let j = 3*b ; j < 3*b+3 ; j++){
            if((i != x || j != y) && array[i][j] == p) return false;
        }
    }
    return true;
}

function check1(x,y,p){
    if(array1[x][y] == p) return true;
    return false;

}

function solve(array,x,count){
    if(x >= 9){
        sc = false;

        let a = 0;
        while(a < count){
            let i = Math.floor(Math.random()*9);
            let j = Math.floor(Math.random()*9);
            let c = i.toString() + '-' + j.toString();
            let t = document.getElementById(c);
            if(t.innerText == ''){
                display[array[i][j]-1]--;
                t.innerText = array[i][j];
                a++;
            }
        }

        for(let i = 0 ; i < 9 ; i++){
            for(let j = 0 ; j < 9 ; j++){
                array1[i][j] = array[i][j];
            }
        }

        return true;
    }

    if(sc){
        for(let y=0;y<9;y++){
            if(array[x][y]==0)
            {
                let f=-1;
                for(let i=1;i<=9;i++){
                    if(check(array,x,y, i)){
                        array[x][y]=i;
                        if(!solve(array,x,count))
                        {
                            array[x][y]=0;
                        }
                        else{
                            f=1;
                            break;
                        }
                    }
                }
                if(f==-1) return false;
            }
        }
        solve(array,x+1,count);
        
    }
}

function HoverIn(){
    let cords = this.id.split('-');
    let x = cords[0] , y = cords[1];
    for(let i = 0 ; i < 9 ; i++){
        let X = x + '-' + i;
        let Y = i + '-' + y;
        console.log(X,Y);
        document.getElementById(X).classList.add('hov');
        document.getElementById(Y).classList.add('hov');
    }
    let a = parseInt(x/3);
    let b = parseInt(y/3);
    for(let i = 3*a ; i < 3*a+3 ; i++){
        for(let j = 3*b ; j < 3*b+3 ; j++){
            let X = i + '-' + j; 
            document.getElementById(X).classList.add('hov');
        }
    }
}

function HoverOut(){
    let cords = this.id.split('-');
    let x = cords[0] , y = cords[1];
    for(let i = 0 ; i < 9 ; i++){
        let X = x + '-' + i;
        let Y = i + '-' + y;
        document.getElementById(X).classList.remove('hov');
        document.getElementById(Y).classList.remove('hov');
    }
    let a = parseInt(x/3);
    let b = parseInt(y/3);
    for(let i = 3*a ; i < 3*a+3 ; i++){
        for(let j = 3*b ; j < 3*b+3 ; j++){
            let X = i + '-' + j; 
            document.getElementById(X).classList.remove('hov');
        }
    }
}
// Criando Variáveis
var posicoes = new Array(3);
let player = 1;
let countEmpate = 0;
let victory = false;
let placarX = 0, placarO = 0;

for(i=0; i<3; i++){
    posicoes[i] = new Array(3);
}

for(i=0; i<3; i++){
    for(j=0; j<3; j++){
        posicoes[i][j] = 0;
    }
}

atualizarPlacar();

// Criando Funções
function selecionarPosicao(pos){

let posicaoLivre = false;
    
    if(!victory){    
        let position = document.getElementById("posicao-" + pos);
        let xpos = pos[0], ypos = pos[1];        

        if(posicoes[xpos][ypos] == 0){
            posicaoLivre = true;

            if(player == 1){           
                if(posicaoLivre){
                    position.style.backgroundImage = "url('img/x.png')";
                    posicoes[xpos][ypos] = 1;
                }
            }
            
            if(player == 2){
                if(posicaoLivre){
                    position.style.backgroundImage = "url('img/o.png')";
                    posicoes[xpos][ypos] = 2;
                }
            }

        }else{
            alert("Posição Ocupada!");
            posicaoLivre = false;
        }
        
        verificarVitoria(player);
    
        if(victory){
            
            if(player == 1){
                placarX++;
            }else{
                placarO++;
            }

            atualizarPlacar();
        }
    }
        
    if(posicaoLivre){
        mudarTurno();
        verificarEmpate();
    }
}

function mudarTurno(){
    if(player == 1){
        player = 2;
    }else{
        player = 1;
    }
}

function verificarEmpate(){

    countEmpate++;

    if(countEmpate == 9){
        alert("EMPATE");    
    }

}

function verificarVitoria(player){
    if(posicoes[0][0] == player && posicoes[0][1] == player && posicoes[0][2] == player){
        alert("Player " + player + " wins");
        victory = true;
    }
    if(posicoes[1][0] == player && posicoes[1][1] == player && posicoes[1][2] == player){
        alert("Player " + player + " wins");
        victory = true;
    }
    if(posicoes[2][0] == player && posicoes[2][1] == player && posicoes[2][2] == player){
        alert("Player " + player + " wins");
        victory = true;
    }
    if(posicoes[0][0] == player && posicoes[1][0] == player && posicoes[2][0] == player){
        alert("Player " + player + " wins");
        victory = true;
    }
    if(posicoes[0][1] == player && posicoes[1][1] == player && posicoes[2][1] == player){
        alert("Player " + player + " wins");
        victory = true;
    }
    if(posicoes[0][2] == player && posicoes[1][2] == player && posicoes[2][2] == player){
        alert("Player " + player + " wins");
        victory = true;
    }
    if(posicoes[0][0] == player && posicoes[1][1] == player && posicoes[2][2] == player){
        alert("Player " + player + " wins");
        victory = true;
    }
    if(posicoes[2][0] == player && posicoes[1][1] == player && posicoes[0][2] == player){
        alert("Player " + player + " wins");
        victory = true;
    }
}

function atualizarPlacar(){
    let pontosX = document.getElementById("placarJogadorX");
    pontosX.innerHTML = placarX;

    let pontosO = document.getElementById("placarJogadorO");
    pontosO.innerHTML = placarO;
}

function novoJogo(){
    let position;

    victory = false;

    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            position = document.getElementById("posicao-" + i + j);
            position.style.backgroundImage = "url('img/none.png')";
            posicoes[i][j] = 0;
        }
    }
 
    countEmpate = 0;

    alert("1º Turno - Jogador " + player);
}

// Chamando Funções

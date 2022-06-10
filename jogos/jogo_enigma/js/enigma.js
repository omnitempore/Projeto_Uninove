const fases = [
    fase001 = {nome: "fase01", index: "ad7a3da6ded4d99ff0705a2dff167370ffb3a67252f8b06d2cdc850d40ea1306", url: "02/Yesterday.html"},
    fase002 = {nome: "fase02", index: "123c605f0fdce9b13bdbf927e9013a16923a64185ea240a1d0ea0e1149260be0", url: "03/upon_the_stair.html"},
    fase003 = {nome: "fase03", index: "4d116a0ea14a1da85112ed367a114788e12151dcfd4d3d139702639babe5e187", url: "04/I_met_a_man.html"},
    fase004 = {nome: "fase04", index: "45d4290b3cbb3f2f620553f1107a6c789149855b13b9f778acc5c63e2d665f04", url: "05/who_wasnt_there.html"},
];

var sha256 = function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value>>>amount) | (value<<(32 - amount));
    };
    
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; 
    var result = ''

    var words = [];
    var asciiBitLength = ascii[lengthProperty]*8;
    
    var hash = sha256.h = sha256.h || [];
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];


    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
            k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
        }
    }
    
    ascii += '\x80' 
    while (ascii[lengthProperty]%64 - 56) ascii += '\x00' 
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j>>8) return; 
        words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
    words[words[lengthProperty]] = (asciiBitLength)
    
    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        var w = words.slice(j, j += 16); 
        var oldHash = hash;

        hash = hash.slice(0, 8);
        
        for (i = 0; i < 64; i++) {
            var i2 = i + j;

            var w15 = w[i - 15], w2 = w[i - 2];

            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e&hash[5])^((~e)&hash[6])) // ch
                + k[i]
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                    )|0
                );
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
            
            hash = [(temp1 + temp2)|0].concat(hash); 
            hash[4] = (hash[4] + temp1)|0;
        }
        
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i])|0;
        }
    }
    
    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i]>>(j*8))&255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};

let faseIndex = document.getElementById("fase_name").value;
let fii = fases[faseIndex].index;
let fase = "https://s3.sa-east-1.amazonaws.com/app.jogosonline.cf/jogos/jogo_enigma/fases/" + fases[faseIndex].url;
let resp;

function verificarResposta(answer){
    resp = sha256(answer);
    
    if(resp == fii){
        location.assign(fase);
    }else{
        alert("Resposta Errada!");
    }
}


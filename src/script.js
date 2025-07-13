function generatePassword() {
    let length = parseInt(document.getElementById('length').value, 10);

    if (length < 8 || length > 10) {
        alert('A senha deve ter entre 8 e 10 caracteres.');
        return;
    }

    const specialCharacters = ['@', '#', '*']; //apenas 3 opções de caracteres especiais
    const numbers = '123456789'; //não tem o zero para não ser confundido com a letra O
    const letters = 'abcdefghijkmnopqrstuvwxyz'; //removido L para nao gerar confusão com i maiusculo
    const firstLetters = 'abcdefghjklmnopqrstuvwxyz'; //removido i para nao gerar confusão com l minusculo

    let password = '';
    let usedChars = new Set();

    let firstChar;
    do {
        firstChar = firstLetters.charAt(Math.floor(Math.random() * firstLetters.length)).toUpperCase();
    } while (usedChars.has(firstChar));

     if (document.getElementById('uppercase').checked) {
        password += firstChar; //se marcado uppercase, adiciona a letra maiúscula
    } else {    
        password += firstChar.toLowerCase(); //se não marcado, converte para minúscula
     }

    firstChar = firstChar.toLowerCase(); //Passa a 1 letra p/ minúscula p/ nao ser repetida
    usedChars.add(firstChar);

    for (let i = 1; i < length - 3; i++) { 
        let lowerChar;
        do {
            lowerChar = letters.charAt(Math.floor(Math.random() * letters.length));
        } while (usedChars.has(lowerChar));
        password += lowerChar;
        usedChars.add(lowerChar);
    }

    let numPart = '';
    for (let i = 0; i < 2; i++) {
        let randomNumber;
        do {
            randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
        } while (usedChars.has(randomNumber)); 
        numPart += randomNumber;
        usedChars.add(randomNumber);
    }
    password += numPart;

    let lastChar;
    do {
        lastChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
    } while (usedChars.has(lastChar));
    password += lastChar;

    const passwordOutput = document.getElementById('passwordOutput');
    passwordOutput.value = password;
    passwordOutput.style.display = 'block';

    document.getElementById('copyButton').style.display = 'flex';
    document.getElementById('clearButton').style.display = 'flex';
}


function copyPassword() {
    const passwordOutput = document.getElementById('passwordOutput');
    const password = passwordOutput.value;
    if (!password) return;

    navigator.clipboard.writeText(password)
        .then(() => alert('Senha copiada para a área de transferência!'))
        .catch(() => alert('Erro ao copiar a senha.'));
}

function clearPassword() {
    const passwordOutput = document.getElementById('passwordOutput');
    passwordOutput.value = '';
    passwordOutput.style.display = 'none';
    document.getElementById('copyButton').style.display = 'none';
    document.getElementById('clearButton').style.display = 'none';
}

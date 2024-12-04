const buttom = document.getElementById('enviar');
    buttom.addEventListener('click', () => {
        const consumoM = parseFloat(document.getElementById('consUsuaMensual').value);
        main();
        console.log(s);
        let consuTA = (consumoM /1000)*12;
        let consumoT = (consuTA*100) / s;
        document.getElementById('resultado').innerHTML = consumoT;
    });
    
function pojoConvert() {

    let textArea = document.getElementById("pojo")
    let innerText = textArea.value;
//finding a class class( )+(.*)( )*{
    let className = innerText.match(/class( )+(.*)( )*{/)[2];
    console.log(className);
    let textInsideClassBody = innerText.match(/(?<=(.|\n|\r)*class.*{)(.|\n)*(?=})/g);

    const textInsideClassBodyMethodsRemoved = textInsideClassBody[0].replace(/{(\n|\r| |.)*?}/g, "");

    const filteredAsLines = (textInsideClassBodyMethodsRemoved.split(/\n/));

    const varialbles = (filteredAsLines.filter(e => e.match(/(?<=(.)+)( )+(\w)*( )*(?=;)/)));

    let typeScriptInterface = "export interface " + className + " {";

    varialbles.map(line => {

        const regExpMatchArray = line.match(/((.)+?) ((\w)*( )*)(?=;)/);
        let type = regExpMatchArray[1];
        let varName = regExpMatchArray[3];

        //  type=(type.exec(/(byte|short|int|long|float|double)/)!==null)?"number":dataType;
        console.log(typeof type);
        console.log(/(byte|short|int|long|float|double)/.exec(type));
        typeScriptInterface += (`\n ${type}:${varName};`);

    });
    console.log(typeScriptInterface + "\n}")
}

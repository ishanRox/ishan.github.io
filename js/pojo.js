function pojoConvert() {

    let textArea = document.getElementById("pojo")
    let innerText = textArea.value;

    //finding a class name used for typescript interface class( )+(.*)( )*{
    let className = innerText.match(/class( )+(.*)( )*{/)[2];

    let textInsideClassBody = innerText.match(/(?<=(.|\n|\r)*class.*{)(.|\n)*(?=})/g);

    const textInsideClassBodyMethodsRemoved = textInsideClassBody[0].replace(/{(\n|\r| |.)*?}/g, "");

    const filteredAsLines = (textInsideClassBodyMethodsRemoved.split(/\n/));

    const varialbles = (filteredAsLines.filter(e => e.match(/(?<=(.)+)( )+(\w)*( )*(?=;)/)));

    let typeScriptInterface = "export interface " + className + " {\n";

    varialbles.map(line => {
        const regExpMatchArray = line.match(/((.)+?) ((\w)*( )*)(?=;)/);

        let type = regExpMatchArray[1];
        let varName = regExpMatchArray[3];

        if (/(byte|short|int|long|float|double)/.exec(type) != null) {
            type = "number";
        } else if (/String|char/.exec(type) != null) {
            type = "string";
        } else if (/<(.)*>/.exec(type) != null) {
            type = `${(type.match(/<(.*)>/)[1])}[]`;
        }else{
            type=type.trimStart();
        }
        typeScriptInterface += (`\n ${varName}: ${type};\n`);

    });

    document.getElementById("interface").innerHTML = typeScriptInterface + "\n}";
}

function pojoConvert() {

    let textArea = document.getElementById("pojo")
    let innerText = textArea.value;
    let removedImports=innerText.replace(/(package.*)|import.*|[\r\n]+/gm, "");
    console.log(removedImports);
    console.log(removedImports.split(";"))

}

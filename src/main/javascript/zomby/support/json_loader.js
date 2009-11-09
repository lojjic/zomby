
/*
 * If JSON object not built in to browser, load external JSON library script
 */
if(!JSON) {
    document.write('<script type="text/javascript" src="' + zomby.Util.getScriptLoc() + 'json2.js"></script>');
}
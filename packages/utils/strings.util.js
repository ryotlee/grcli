module.exports = {
    firstUpperCase
} 

function firstUpperCase(value) {
    return value.toLowerCase().replace(/^\S/g,function(s){return s.toUpperCase();});
}
exports.formatQuotes = (str) => {
   var reg = /"/g;
   var newstr = `\\"`;
   str = str.replace(reg,newstr);

   var reg2 = /'/g;
   newstr = "\\'"
   return  str.replace(reg2,newstr);
}
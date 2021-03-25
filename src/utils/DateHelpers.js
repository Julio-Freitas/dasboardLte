class dateHelpers {
 static dateFormat(date, lenguage = 'pt-BR',  options) {
   const newDate = date.toLocaleDateString(lenguage, options);
   const time = date.toLocaleTimeString(lenguage)
    return  `${newDate} - ${time}`;
  }

}
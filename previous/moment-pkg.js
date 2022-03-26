const moment = require("moment");

console.log("Desde mi fecha de nacimiento han pasado", moment("19960626", "YYYYMMDD").fromNow());
console.log("Desde mi fecha de nacimiento han pasado", moment("19960626", "YYYYMMDD").fromNow(true));
console.log("Desde mi fecha de nacimiento han pasado", moment("19960626", "YYYYMMDD").locale("es-mx").fromNow(true));
console.log("Desde mi fecha de nacimiento han pasado", moment().diff(moment("19960626", "YYYYMMDD"), 'seconds'), "segundos");
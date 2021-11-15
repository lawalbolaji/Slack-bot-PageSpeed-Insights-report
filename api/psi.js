const psi = require('psi');

module.exports = {
    async generate_report (url){
        return await psi(url, 
        {
            key: process.env['PSI_KEY'],
            strategy: "mobile"
        });
      }  
}
type UsersCreds = {
  blockedCreditans: {
    email: string,
    password: string
  }
}


class Helper {

  parseJsonFile(filename: string){
    const fs = require('fs');
    let rawdata: string = fs.readFileSync(filename);
    return JSON.parse(rawdata);
  }

  getUsersCreds(): UsersCreds {
    return this.parseJsonFile('./fixtures/users.json')
  }
}

const helper = new Helper
export default helper

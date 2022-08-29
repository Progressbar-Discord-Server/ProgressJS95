export interface save {
  "score": number,
  "highscore": number
}

export interface oses {
  "name": string,
  "shortName": string,
  "proLevel": number,
  "unlockLevel": number,
  "systemUnlock": string,
  "requiredString": string,
  "listInBootMenu": number,
  "startupString": string,
  "save": save
}

export interface os {
  "95": oses,
  "98": oses
}

export interface lang {
  "code": string,
  "langDescription": string,
  "sparow": string,
  "energyStar": string,
  "jsVer": string,
  "compiled": string,
  "dev": string,
  "loading": string,
  "beginMenu": string,
  "newGame": string,
  "restart": string,
  "settings": string,
  "shutdown": string,
  "error": string,
  "livesLeft": string,
  "bar": string,
  "progreHave": string,
  "instruction": string,
  "level": string
}
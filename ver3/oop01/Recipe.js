import { ColorTheme } from "./ColorTheme.js";

class Recipe {
  constructor(name, procedures) {
    this.name = name;
    this.procedures = procedures;
    this.colorTheme = ColorTheme.DEFAULT;
  }

  getName() {
    return this.name
  }

  getProcedureCount() {
    return this.procedures.length;
  }

  getProcedureText(index) {
    const text = this.procedures[index].getText();
    return `${index}.${text}`
  }

  getColorTheme() {
    return this.colorTheme;
  }
}

export { Recipe };

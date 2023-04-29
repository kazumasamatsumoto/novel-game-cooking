class Recipe {
  constructor(name, procedures) {
    this.name = name;
    this.procedures = procedures;
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
}

export { Recipe };

import fs from "fs";

export class State {
  constructor(path) {
    this.path = path;
    this.data = { notifiedIds: [] };
    this._load();
  }

  _load() {
    try {
      if (fs.existsSync(this.path)) {
        const raw = fs.readFileSync(this.path, "utf-8");
        this.data = JSON.parse(raw);
      } else {
        this._save();
      }
    } catch {
      this.data = { notifiedIds: [] };
    }
  }

  _save() {
    try {
      fs.mkdirSync(require("path").dirname(this.path), { recursive: true });
      fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
    } catch {
      // best-effort persistence
    }
  }

  has(id) {
    return this.data.notifiedIds.includes(id);
  }

  add(id) {
    if (!this.has(id)) {
      this.data.notifiedIds.push(id);
      this._save();
    }
  }
}

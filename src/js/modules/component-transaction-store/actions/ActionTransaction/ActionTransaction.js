export class ActionTransaction {
  /**
   *
   * @param {String} ticket
   * @param {boolean} active
   */
  constructor(ticket, active = false) {
    this.ticket = ticket
    this.active = active
  }
}

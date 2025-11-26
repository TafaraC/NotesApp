// src/classes/BaseNote.ts

// The Parent/Super Class
export class BaseNote {
  // Common properties for persistence
  protected readonly dateCreated: Date; 
  
  constructor(public id: string, public title: string, public content: string) {
    this.dateCreated = new Date();
  }

  // Common method that can be overridden
  public summarize(maxLength: number = 50): string {
    if (this.content.length <= maxLength) {
      return this.content;
    }
    return this.content.substring(0, maxLength) + '...';
  }
}
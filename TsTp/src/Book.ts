export enum Status {
  Read = "Read",
  ReRead = "Re-read",
  DNF = "DNF",
  CurrentlyReading = "Currently reading",
  ReturnedUnread = "Returned Unread",
  WantToRead = "Want to read",
}

export enum Format {
  Print = "Print",
  PDF = "PDF",
  Ebook = "Ebook",
  AudioBook = "AudioBook",
}

export class Book {
  public title: string;
  public author: string;
  public pages: number;
  public status: Status;
  public price: number;
  public pagesRead: number;
  public format: Format;
  public suggestedBy: string;
  public finished: boolean;

  constructor(
    title: string,
    author: string,
    pages: number,
    status: Status,
    price: number,
    pagesRead: number,
    format: Format,
    suggestedBy: string,
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.price = price;
    this.pagesRead = Math.min(pagesRead, pages);
    this.format = format;
    this.suggestedBy = suggestedBy;
    this.finished = false;

    this.updateFinished();
  }

  private updateFinished(): void {
    this.finished = this.pagesRead >= this.pages;
  }

  setPagesRead(pagesRead: number): void {
    if (pagesRead < 0 || pagesRead > this.pages) {
      throw new Error("pagesRead must be between 0 and total pages");
    }
    this.pagesRead = pagesRead;
    this.updateFinished();
  }

  get progress(): number { 
    if (this.pages === 0) return 0;
    return Math.round((this.pagesRead / this.pages) * 100);
  }

  currentlyAt(): string {
    return `Currently at page ${this.pagesRead} of ${this.pages} (${this.progress}%)`;
  }

  deleteBook(list: Book[]): Book[] {
    return list.filter((b) => b !== this);
  }
}

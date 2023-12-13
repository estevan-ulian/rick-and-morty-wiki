class InfoEntity {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;

  constructor(info: InfoEntity) {
    this.count = info.count;
    this.pages = info.pages;
    this.next = info.next;
    this.prev = info.prev;
  }
}

export default InfoEntity;

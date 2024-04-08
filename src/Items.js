class Picture {
    constructor(price, tagCol,date, note) {
    this.id = `${this.randId()}`
    this.name = 'Picture:';
    this.price = price;
    this.tagCol = tagCol;
    this.date = date;
    this.note = note;
    // this.imgFile = imgFile
    }
    randId() {
        const randomID = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('')
        return randomID;
    }
    
}

export default Picture;
class Picture {
    constructor(price, tagCol, note) {
    this.id = `${this.randId()}`
    this.name = 'Picture:';
    this.price = price;
    this.tagCol = tagCol;
    this.date = this.addDate();
    this.note = note;
    // this.imgFile = imgFile
    }
    randId() {
        const randomID = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('')
        return randomID;
    }
    addDate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        if (day < 10) {
            day = `0${day}`
        }
        if (month < 10) { 
            month = `0${month}`
        }
        return `${day}/${month}` 
    }
}

export default Picture;
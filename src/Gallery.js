import Storage from './Storage.js'

class Gallery {
    constructor() {
        this._pictures = Storage.getPictures();
        // this._pictures = [] 
        this._soldPictures = Storage.getSoldPic();
        // this._displayNumOfPic()
    }
    // Public Methods/API
    addPicture(picture) {
        this._pictures.push(picture);
        Storage.savePictures(picture);
        this._displayNewPicture(picture);
        this.displayPicturesSum()//
        // this._render();
    }
    removePicture(id) {
        const index = this._pictures.findIndex((picture) => picture.id === id);
        if (index !== -1) {
            const picture = this._pictures[index]
            this._pictures.splice(index, 1);
            Storage.removePicture(id);
            this.displayPicturesSum()
            // this._render();
        }
    }
    soldPicture(id, pic) {
        const index = this._pictures.findIndex((picture) => picture.id === id);
        if (index !== -1) {
            // const picture = this._pictures[index]
            this._pictures.splice(index, 1);
            Storage.saveSoldPic(pic);
            Storage.removePicture(id);
            this.displayPicturesSum();
        }
    }
    reset() {
        this._pictures = [];
        Storage.clearAll();
        this.displayPicturesSum()
        this._render();
        
    }

    loadItems() {
        this._pictures.forEach((picture) => this._displayNewPicture(picture));
    }
    displayPicturesSum() {
        const picturesSumEl = document.getElementById('gallery-sum');
        // const picturesSumEl = this._pictures.reduce((total) => total + pictures, 0)
        const picturesSum = this._pictures.length
        picturesSumEl.innerHTML = picturesSum;
    }
    tagGetGradient(picture) {
        switch (picture) {
            case 'white': return '#fff';
            case 'blue': return '#0dcaf0';
            case 'green': return '#03fa6e';
            case 'orange': return '#ffc107';
            case 'yellow': return 'rgb(224, 245, 66';

    }
    }
    loadDate() {
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

    // Private Methods//
    _displayNewPicture(picture) {
        const picturesELs = document.getElementById('pictures-items')
        const pictureEl = document.createElement('div');
        pictureEl.classList.add('card', 'my-2', 'PicElement')
        // pictureEl.setAttribute('id', 'picture-items')
        pictureEl.setAttribute('data-id', picture.id)
        pictureEl.setAttribute('data-price', picture.price)
        pictureEl.setAttribute('data-tag', picture.tagCol)
        pictureEl.setAttribute('data-img', picture.img)
        pictureEl.setAttribute('data-date', picture.date)
        pictureEl.style.backgroundColor = this.tagGetGradient(picture.tagCol);
        const pictureElFlex = document.createElement('div');
        pictureElFlex.classList.add('d-flex', 'align-items-center', 'justify-content-between')
        // const pictureInfoEl = document.createElement('h5')
        const pictureName = document.createElement('i');
        pictureName.classList.add('fa-regular', 'fa-image', 'pic-details')
        pictureName.style.fontSize = '2rem'
        pictureName.style.marginLeft = '0.2rem'
        pictureName.style.marginRight = '0.2rem'
        pictureName.style.cursor = 'pointer'
        // pictureName.textContent = picture.name;
        const pictureNote = document.createElement('button')
        pictureNote.classList.add('btn', 'btn-sm', 'note-btn')
        const picNoteEl = document.createElement('i')
        picNoteEl.classList.add('fa-regular', 'fa-note-sticky')
        pictureNote.appendChild(picNoteEl)
        const pictureDate = document.createElement('div');
        pictureDate.classList.add('fs-8', 'text-dark', 'text-center', 'rounded-2', 'px-2', 'px-sm-2')
        pictureDate.style.fontWeight = 'bold'
        pictureDate.textContent = this.loadDate();
        pictureDate.setAttribute('data-date', this.loadDate());
        const pictureId = document.createElement('div')
        pictureId.textContent = picture.id;
        pictureId.style.fontWeight = 'bold'
        const pictureIconId = document.createElement('div');
        pictureIconId.classList.add('pictureIdIcon')
        const picturePrice = document.createElement('div');
        picturePrice.classList.add('fs-9', 'bg-dark', 'text-white', 'text-center', 'rounded-2', 'px-2', 'px-sm-2');
        picturePrice.style.fontSize = '1rem';
        picturePrice.textContent = `$${picture.price}`;
        const pictureBtnDl = document.createElement('button');
        pictureBtnDl.classList.add('delete', 'btn', 'btn-danger', 'btn-sm', 'mx-9')
        const pictureBtnIconDl = document.createElement('i');
        pictureBtnIconDl.classList.add('fa-solid', 'fa-xmark')
        pictureBtnDl.insertAdjacentElement('beforeend', pictureBtnIconDl)
        const pictureBtnS = document.createElement('button');
        pictureBtnS.classList.add('sold', 'btn', 'btn-success', 'btn-sm', 'mx-7')
        // pictureBtnDl.style.width = '10px'
        // pictureBtnS.setAttribute('data-bs-toggle','modal')
        const pictureBtnIconS = document.createElement('i');
        pictureBtnIconS.classList.add('fa-solid', 'fa-dollar-sign')
        pictureBtnS.insertAdjacentElement('beforeend', pictureBtnIconS)
        // pictureBtnS.style.margin = '1px'
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.alignItems = 'center';
        btnContainer.style.justifyContent = 'center';
        btnContainer.style.marginLeft = '5px';
        pictureIconId.insertAdjacentElement('afterbegin', pictureName)
        pictureIconId.insertAdjacentElement('beforeend', pictureId)


        pictureElFlex.appendChild(pictureIconId);
        pictureElFlex.appendChild(pictureNote);
        pictureElFlex.appendChild(pictureDate);
        pictureElFlex.appendChild(picturePrice);
        btnContainer.appendChild(pictureBtnS);
        btnContainer.appendChild(pictureBtnDl);
        pictureElFlex.appendChild(btnContainer);
        pictureEl.appendChild(pictureElFlex);
         
        picturesELs.insertAdjacentElement('afterbegin', pictureEl);
    }
    
    _getNotes(id) {
        const index = this._pictures.findIndex((picture) => picture.id === id);
        const note = this._pictures[index].note
        if (index !== -1) {
        return note
        }
    }
    

    _render() {
        this.displayPicturesSum
        // this._displayNumOfPic()
    }

}

export default Gallery;
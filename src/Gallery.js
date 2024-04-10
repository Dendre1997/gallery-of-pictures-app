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
        const picturesELs = document.getElementById('pictures-items');
const pictureEl = document.createElement('div');
pictureEl.classList.add('card', 'my-2', 'PicElement');

// Set data attributes for pictureEl
pictureEl.setAttribute('data-id', picture.id);
pictureEl.setAttribute('data-price', picture.price);
pictureEl.setAttribute('data-tag', picture.tagCol);
pictureEl.setAttribute('data-img', picture.img);
pictureEl.setAttribute('data-date', this.loadDate());
pictureEl.style.backgroundColor = this.tagGetGradient(picture.tagCol);

// Create pictureElFlex
const pictureElFlex = document.createElement('div');
pictureElFlex.classList.add('row');

// Create elements for pictureIconId
const pictureIconId = document.createElement('div');
pictureIconId.classList.add('col', 'pictureIdIcon');
const pictureName = document.createElement('i');
pictureName.classList.add('fa-regular', 'fa-image', 'pic-details');
pictureName.style.fontSize = '2rem';
pictureName.style.marginLeft = '0.2rem';
pictureName.style.marginRight = '0.2rem';
pictureName.style.cursor = 'pointer';
const pictureId = document.createElement('div');
pictureId.textContent = picture.id;
pictureId.style.fontWeight = 'bold';

// Create elements for pictureNote
const pictureNote = document.createElement('div');
pictureNote.classList.add('col', 'btn', 'note-btn');
pictureNote.style.display = 'flex';
pictureNote.style.justifyContent = 'center';
pictureNote.style.alignItems = 'center';
pictureNote.style.padding = '0'
const picNoteEl = document.createElement('i');
picNoteEl.classList.add('fa-regular', 'fa-note-sticky');
pictureNote.appendChild(picNoteEl);

// Create elements for pictureDate
const pictureDate = document.createElement('div');
pictureDate.classList.add('col', 'fs-8', 'text-dark', 'text-center', 'rounded-2', 'px-2', 'px-sm-2');
pictureDate.style.fontWeight = 'bold';
pictureDate.style.display = 'flex';
pictureDate.style.justifyContent = 'center';
pictureDate.style.alignItems = 'center';
// pictureDate.style.padding = '0'
pictureDate.textContent = this.loadDate();

// Create elements for picturePrice
const picturePrice = document.createElement('div');
picturePrice.classList.add('col', 'fs-9', 'bg-dark', 'text-white', 'text-center', 'rounded-2', 'px-2', 'px-sm-2');
        // picturePrice.style.textAlign = 'center';
picturePrice.style.display = 'flex';
picturePrice.style.justifyContent = 'center';
picturePrice.style.alignItems = 'center';
picturePrice.style.fontSize = '1rem';
picturePrice.textContent = `$${picture.price}`;

// Create elements for buttons
const pictureBtnDl = document.createElement('button');
pictureBtnDl.classList.add('delete', 'btn', 'btn-danger', 'btn-sm', 'mx-9');
const pictureBtnIconDl = document.createElement('i');
pictureBtnIconDl.classList.add('fa-solid', 'fa-xmark');
pictureBtnDl.insertAdjacentElement('beforeend', pictureBtnIconDl);
pictureBtnDl.style.marginRight = '3px'

const pictureBtnS = document.createElement('button');
pictureBtnS.classList.add('sold', 'btn', 'btn-success', 'btn-sm', 'mx-7');
pictureBtnS.style.marginRight = '3px'
const pictureBtnIconS = document.createElement('i');
pictureBtnIconS.classList.add('fa-solid', 'fa-dollar-sign');
pictureBtnS.insertAdjacentElement('beforeend', pictureBtnIconS);

// Create and style btnContainer
const btnContainer = document.createElement('div');
btnContainer.classList.add('col');
btnContainer.style.display = 'flex';
btnContainer.style.justifyContent = 'flex-end';
btnContainer.style.alignItems = 'center';
// btnContainer.style.paddingLeft = '10px'
// btnContainer.style.marginLeft = '5px';

// Append elements to pictureElFlex
pictureIconId.appendChild(pictureName);
pictureIconId.appendChild(pictureId);
pictureElFlex.appendChild(pictureIconId);
pictureElFlex.appendChild(pictureNote);
pictureElFlex.appendChild(pictureDate);
pictureElFlex.appendChild(picturePrice);
btnContainer.appendChild(pictureBtnS);
btnContainer.appendChild(pictureBtnDl);
pictureElFlex.appendChild(btnContainer);

// Append pictureElFlex to pictureEl and then to picturesELs
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
    
    _displaySoldPictures() { 
        const soldPicturesArray = this._soldPictures
        const soldPicContainer = document.createElement('div')
        soldPicContainer.classList.add('sold-pic-container')
        soldPicContainer.style.position = 'absolute'
        soldPicContainer.style.width = '100%'
        soldPicContainer.style.height = window.innerHeight + 'px'
        soldPicContainer.style.top = '-10000px'
        soldPicContainer.style.left = '0'
        soldPicContainer.style.backgroundColor = 'white'
        soldPicContainer.style.transition = 'all 0.5s ease-in-out';
        // soldPicContainer.style.paddingTop = '1px'

        // Pictures Inner
        const picInner = document.createElement('div')
        picInner.style.width = '100%'
        picInner.style.height = '100%'
        picInner.style.position = 'relative'
        picInner.style.paddingTop = '5rem'

        // close Button
        const closeButton = document.createElement('button')
        closeButton.classList.add('btn', 'btn-dark', 'btn-lg')
        closeButton.style.position = 'absolute'
        closeButton.style.left = '1rem'
        closeButton.style.top = '1rem'
        closeButton.textContent = 'Return to Main Page'
        closeButton.style.textAlign = 'center'
        const btnClosseIco = document.createElement('svg')
        btnClosseIco.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
</svg>
        `
        // btnClosseIco.classList.add('fa-solid', 'fa-rotate-left')
        btnClosseIco.querySelector('svg').style.width = '2rem'
        btnClosseIco.querySelector('svg').style.height = '2rem'
        closeButton.appendChild(btnClosseIco)
        // soldPicContainer.zIndex = '9999'

        // Sold pictures List
        const soldPicturesList = document.createElement('div')
        soldPicturesList.classList.add('list-group', 'sold-pictures-list')
        
        soldPicturesArray.forEach((picture) => {
            // console.log(picture)
            const picEl = document.createElement('div')
            picEl.classList.add('col')
            picEl.style.display = 'flex'
            picEl.style.justifyContent = 'space-between'
            picEl.style.alignItems = 'center'
            picEl.style.padding = '0.5rem'
            picEl.style.marginBottom = '0.2rem'
            picEl.style.fontWeight = 'bold'
            picEl.style.backgroundColor = this.tagGetGradient(picture.tag)
            const picId = document.createElement('div')
            picId.textContent = `ID:${picture.id}`
            const picDate = document.createElement('div')
            picDate.textContent = `Date: ${picture.date}`
            const picSoldDate = document.createElement('div')
            picSoldDate.textContent = `Sold Date: ${picture.soldDate}`
            const picPrice = document.createElement('div')
            picPrice.textContent = `Price: ${picture.price}`
            picEl.appendChild(picId)
            picEl.appendChild(picDate)
            picEl.appendChild(picSoldDate)
            picEl.appendChild(picPrice)
            soldPicturesList.appendChild(picEl)
            console.log(picture)
        })
        // Append

        picInner.appendChild(closeButton)
        picInner.appendChild(soldPicturesList)
        soldPicContainer.appendChild(picInner)

        document.body.appendChild(soldPicContainer)

        // Events
        closeButton.addEventListener('click', () => {
            soldPicContainer.style.top = '-10000px'
            setTimeout(() => {
                soldPicContainer.remove()
            }, 200)
            // soldPicContainer.remove()
        })

        setTimeout(() => {
            soldPicContainer.style.top = '0'
        }, 200)

    }

    _render() {
        this.displayPicturesSum
        // this._displayNumOfPic()
    }

}

export default Gallery;
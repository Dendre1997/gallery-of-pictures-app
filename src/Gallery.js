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
// pictureElFlex.style.paddingLeft = '10px';

// Create elements for pictureIconId
const pictureIconId = document.createElement('div');
pictureIconId.classList.add('col', 'pictureIdIcon');
const pictureName = document.createElement('i');
pictureName.classList.add('fa-regular', 'fa-image', 'pic-details');
pictureName.style.fontSize = '1.8rem';
pictureName.style.marginLeft = '0.2rem';
pictureName.style.marginRight = '0.2rem';
pictureName.style.cursor = 'pointer';
const pictureId = document.createElement('div');
pictureId.classList.add('media-font-size')
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
picNoteEl.classList.add('fa-regular', 'fa-note-sticky', 'media-font-size');
pictureNote.appendChild(picNoteEl);
        // picNoteEl.style.fontSize = '1.5rem';
        

// Create elements for pictureDate
const pictureDate = document.createElement('div');
pictureDate.classList.add('col', 'fs-8', 'text-dark', 'text-center', 'rounded-2', 'px-2', 'px-sm-2', 'media-font-size');
pictureDate.style.fontWeight = 'bold';
pictureDate.style.display = 'flex';
pictureDate.style.justifyContent = 'center';
pictureDate.style.alignItems = 'center';
// pictureDate.style.padding = '0'
pictureDate.textContent = this.loadDate();

// Create elements for picturePrice
const picturePrice = document.createElement('div');
picturePrice.classList.add('col', 'fs-9', 'bg-dark', 'text-white', 'text-center', 'rounded-2', 'px-2', 'px-sm-2', 'media-font-size');
        // picturePrice.style.textAlign = 'center';
picturePrice.style.display = 'flex';
picturePrice.style.justifyContent = 'center';
picturePrice.style.alignItems = 'center';
// picturePrice.style.fontSize = '0.5rem';
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
if (picture.note !== 'Here is no note') {
    pictureElFlex.appendChild(pictureNote);
}        
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
        const soldPicturesArray = Storage.getSoldPic()
        // soldPicturesArray.reverse()
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
        // picInner.style.height = window.innerHeight + 'px'
        picInner.style.position = 'relative'
        picInner.style.backgroundColor = 'white'
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


        // Filter by date
        const filterBydateContainer = document.createElement('div')
        filterBydateContainer.classList.add('dropdown')
        filterBydateContainer.style.paddingLeft = '1rem'
        filterBydateContainer.style.paddingBottom = '0.2rem'
        const dropDownBtn = document.createElement('button')
        dropDownBtn.classList.add('btn', 'btn-dark', 'dropdown-toggle')
        dropDownBtn.setAttribute('type', 'button')
        dropDownBtn.setAttribute('id', 'dropdownMenuButton')
        dropDownBtn.setAttribute('data-toggle', 'dropdown')
        dropDownBtn.textContent = 'Filter Pictures'

        // dropDownBtn.setAttribute('aria-haspopup', 'true')
        // dropDownBtn.setAttribute('aria-expanded', 'false')


        const filterBydateSelect = document.createElement('div')
        filterBydateSelect.classList.add('dropdown-menu')
        // filterBydateSelect.setAttribute('aria-labelledby', 'dropdownMenuButton')
        const optionLastSevenDays = document.createElement('a')
        optionLastSevenDays.classList.add('dropdown-item')
        optionLastSevenDays.setAttribute('id','display-for-seven-days')
        optionLastSevenDays.setAttribute('href', '#')
        optionLastSevenDays.textContent = 'Show For Last 7 Days'
        const optionDisplayAll = document.createElement('a')
        optionDisplayAll.classList.add('dropdown-item')
        optionDisplayAll.setAttribute('href', '#')
        optionDisplayAll.setAttribute('id', 'display-all-pictures')
        optionDisplayAll.textContent = 'Show All'
        filterBydateSelect.appendChild(optionLastSevenDays)
        filterBydateSelect.appendChild(optionDisplayAll)
        

        filterBydateContainer.appendChild(dropDownBtn)
        filterBydateContainer.appendChild(filterBydateSelect)

        dropDownBtn.addEventListener('click', () => {
            if (filterBydateSelect.style.display !== 'block') {
                filterBydateSelect.style.display = 'block'
            } else {
                filterBydateSelect.style.display = 'none'
            }
        })
        // Sold pictures List
        const soldPicturesList = document.createElement('div')
        soldPicturesList.classList.add('list-group', 'sold-pictures-list')
        const soldPicInfoTable = document.createElement('div')
        soldPicInfoTable.classList.add('col', 'sold-picture-element')
            soldPicInfoTable.style.display = 'flex'
            soldPicInfoTable.style.justifyContent = 'space-between'
            soldPicInfoTable.style.alignItems = 'center'
            soldPicInfoTable.style.padding = '0.5rem'
            // soldPicInfoTable.style.marginBottom = '0.2rem'
            soldPicInfoTable.style.fontWeight = 'bold'
            soldPicInfoTable.style.backgroundColor = 'white'
            // soldPicInfoTable.setAttribute('data-date')
            const picId = document.createElement('div')
            picId.textContent = `ID`
            const picDate = document.createElement('div')
            picDate.textContent = `Date`
            const picSoldDate = document.createElement('div')
            picSoldDate.textContent = `Sold Date`
            const picPrice = document.createElement('div')
            picPrice.textContent = `Price`
            const atStock = document.createElement('div')
            atStock.textContent = `At Stock`
            soldPicInfoTable.appendChild(picId)
            soldPicInfoTable.appendChild(picDate)
            soldPicInfoTable.appendChild(picSoldDate)
            soldPicInfoTable.appendChild(picPrice)
            soldPicInfoTable.appendChild(atStock)
        
            
            soldPicturesList.appendChild(soldPicInfoTable)
            
            const children = soldPicInfoTable.children
            // console.log(children)
            for (let i = 0; i < children.length; i++) {
            children[i].classList.add('flex-element-soldPic-item')
        }

        soldPicturesArray.reverse().forEach((picture) => {
            // console.log(picture)
            const picEl = this._displaySoldPicturesElements(picture)        
            soldPicturesList.appendChild(picEl)
            // console.log(picture)
        })
        // Append

        picInner.appendChild(closeButton)
        picInner.appendChild(filterBydateContainer)
        picInner.appendChild(soldPicturesList)
        soldPicContainer.appendChild(picInner)

        document.body.appendChild(soldPicContainer)

        // Events
        closeButton.addEventListener('click', () => {
            soldPicContainer.style.top = '-10000px'
            document.body.style.overflow = 'visible'
            setTimeout(() => {
                soldPicContainer.remove()
            }, 200)
            // soldPicContainer.remove()
        })

        setTimeout(() => {
            soldPicContainer.style.top = '0'
        }, 200)
        const reversedArray = soldPicturesArray
        filterBydateSelect.addEventListener('click', (e) => {
            const filteredElementsSevenDays = this._sortByDate(reversedArray, 'last 7 days')
            if (e.target.getAttribute('id') === 'display-for-seven-days') {
                soldPicturesList.innerHTML = ''
                soldPicturesList.appendChild(soldPicInfoTable)
                filteredElementsSevenDays.forEach((picture) => {
                    const picEl = this._displaySoldPicturesElements(picture)        
                    filterBydateSelect.style.display = 'none'
                    soldPicturesList.appendChild(picEl)
                    // console.log(picture)
                })
            } else if (e.target.getAttribute('id') === 'display-all-pictures') {
                soldPicturesList.innerHTML = '';
                soldPicturesList.appendChild(soldPicInfoTable)
                reversedArray.forEach((picture) => {
                    const picEl = this._displaySoldPicturesElements(picture)        
                    filterBydateSelect.style.display = 'none'
                    soldPicturesList.appendChild(picEl)
                    // console.log(picture)
                })
            }
        })

    }
    _displaySoldPicturesElements(picture) {
        const picEl = document.createElement('div')
            picEl.classList.add('col', 'sold-picture-element')
            picEl.style.display = 'flex'
            // picEl.style.justifyContent = 'space-between'
            picEl.style.alignItems = 'center'
            picEl.style.padding = '0.5rem'
            picEl.style.marginBottom = '0.2rem'
            picEl.style.fontWeight = 'bold'
            picEl.style.backgroundColor = this.tagGetGradient(picture.tag)
            picEl.setAttribute('data-date', picture.date)
            const picId = document.createElement('div')
            // picId.classList.add('flex-element-soldPic-item')
            picId.textContent = `${picture.id}`
            const picDate = document.createElement('div')
            picDate.textContent = `${picture.date}`
            const picSoldDate = document.createElement('div')
            picSoldDate.textContent = `${picture.soldDate}`
            const picPrice = document.createElement('div')
            picPrice.textContent = `${picture.price}`
            const atStock = document.createElement('div')
            atStock.textContent = this._daysAtStock(picture)
            picEl.appendChild(picId)
            picEl.appendChild(picDate)
            picEl.appendChild(picSoldDate)
            picEl.appendChild(picPrice)
            picEl.appendChild(atStock)
            const children = picEl.children
        for (let i = 0; i < children.length; i++) {
            children[i].classList.add('flex-element-soldPic-item')
        }
        return picEl
    }

    _sortByDate(elements, term) {
        const today = new Date();
        let filteredElements = elements
        if (term === 'last 7 days') {
        const lastSevenDaysStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

    filteredElements = filteredElements.filter(element => {
        const [day, month] = element.soldDate.split("/");
        const elementDate = new Date(today.getFullYear(), month - 1, day); // Note: month - 1 because months are zero-indexed in JavaScript
        return elementDate >= lastSevenDaysStart && elementDate <= today;
    });        
}
 return filteredElements;
    

    }

    _daysAtStock(element) {
        const [startDay, startMonth] = element.date.split('/');
        const startDate = new Date(`2024-${startMonth}-${startDay}`)
        const [endDay, endMonth] = element.soldDate.split('/');
        const endDate = new Date(`2024-${endMonth}-${endDay}`)

        // Calculate the difference in milliseconds
        const differenceMs = endDate.getTime() - startDate.getTime();
    // Check if parsing succeeded
        // Check if start and end dates are the same
        // if (startDate === endDate) {
        // return `1 Day`; // If start and end dates are the same, return 1 day
        // }

    // Check if difference calculation succeeded
    if (isNaN(differenceMs)) {
        console.error("Failed to calculate difference");
        return;
    }
    // Convert milliseconds to days
    let differenceDays = differenceMs / (1000 * 60 * 60 * 24);

    // Ensure the minimum difference is 1 day
    differenceDays = Math.max(1, differenceDays);
        if (differenceDays > 1) {
        return `${differenceDays} Days`
        } else {
            
            return `${differenceDays} Day`;
    }
    }

    _render() {
        this.displayPicturesSum
        // this._displayNumOfPic()
    }

}

export default Gallery;
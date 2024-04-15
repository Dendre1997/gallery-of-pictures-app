import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import Gallery from './Gallery.js';
import Picture  from './Items.js'

import './css/bootstrap.css';
import './css/style.css';  


class App {
    constructor() {
        this._gallery = new Gallery();
        this._loadEventListeners();
        this._gallery.loadItems();
        this._gallery.displayPicturesSum()
    }

    _loadEventListeners() {
        document.getElementById('picture-form').addEventListener('submit', this._newItem.bind(this, 'picture'));
        // document.getElementById('upload-photo-container').addEventListener('input', this._prevImg.bind(this))
        document.getElementById('pictures-items').addEventListener('click', this._removeItems.bind(this, 'picture'));
        document.getElementById('pictures-items').addEventListener('click', this._soldPicture.bind(this));
        document.getElementById('pictures-items').addEventListener('click', this._itemEditor.bind(this))
        document.getElementById('filter-pictures')
            .addEventListener('keyup', this._filterItems.bind(this, 'pictures'));
        document.getElementById('reset')
            .addEventListener('click', this._reset.bind(this))
        document.getElementById('button-addon3').addEventListener('click', this._setTagCol.bind(this));
        
        document.getElementById('pictures-items').addEventListener('click', this._displayNotes.bind(this));

        document.getElementById('nav-bar').addEventListener('click', this._loadNavBar.bind(this))

        // document.addEventListener('click', this._outsideClick.bind(this));
        // Edit Items EventListeners
        // document.getElementById('nav-bar-el').addEventListener('click', this._navBar.bind(this))
    }
    _newItem(type,e) {
        e.preventDefault();
        const price = document.getElementById(`picture-price`)
        const tag = document.querySelector('.tag-color.active')
        let note = document.querySelector('.leave-note-newItem');
        // const img = document.getElementById('img-prevId')
        // const imageFile = document.querySelector('.imgprev').files[0]
        // const imageData = this._createPicture(imageFileInput)


        
        // let imgSrc
        if (price.value === '' && !tag) {
            alert('Please fill in all fields')
            return;
        }
        if (isNaN(price.value)) {
            alert('Price must be a number')
            return;
        }
        if (!tag) {
            alert('Please select a tag')
            return;
        }
        if (price.value === '') {
            alert('Please set the price')
            return;
        }
        if (note.value === '') { 
            note.value = 'Here is no note'
        }
        
        // this._createPicture(imageFile, (compresedImg) => {
        //     const picture = new Picture(+price.value, tag.value, compresedImg, date);
        //     const date = this._gallery.loadDate();
        //     // this._gallery.tagGetGradient(picture)
        // this._gallery.addPicture(picture)

        // tag.classList.remove('active');
        // price.value = '';
        // if (img) {
        //     document.getElementById('img-prevId').remove()
        // }
        // document.getElementById('formFileSm').value = '';
        // const collapseItem = document.getElementById(`collapse-picture`)
        // const bsCollapse = new Collapse(collapseItem, {
        //     toggle: true
        // })
        // })
        const date = this._gallery.loadDate();
        const picture = new Picture(+price.value, tag.value, note.value)
        this._gallery.tagGetGradient(picture)
        this._gallery.addPicture(picture)

        tag.classList.remove('active');
        price.value = '';
        note.value = '';
        // document.getElementById('formFileSm').value = '';
        const collapseItem = document.getElementById(`collapse-picture`)
        const bsCollapse = new Collapse(collapseItem, {
            toggle: true
        })
        
        // console.log(note.value)
    }
    _removeItems(type, e) {
        e.preventDefault();
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            const id = e.target.closest('.card').getAttribute('data-id')
            this._confirmChanges(`Are you sure you want to delete picture: ${id}`).then(isConfirmed => {
                if (isConfirmed) {
                    this._gallery.removePicture(id);
                    e.target.closest('.card').remove();
                }
                })
        }
    }

    _soldPicture(e) {
        e.preventDefault();
        if (e.target.closest('.sold')) {
            const id = e.target.closest('.card').getAttribute('data-id')
            const price = e.target.closest('.card').getAttribute('data-price')
            const tag = e.target.closest('.card').getAttribute('data-tag')
            const date = e.target.closest('.card').getAttribute('data-date')
            //  const isConfirm = this._confirmChanges(`Is picture: ${id} sold?`)
            this._confirmChanges(`Is picture: ${id} sold?`).then(isConfirmed => {
                // const img =
                if (isConfirmed) {
                    const soldPic = {
                        name: "Picture",
                        price: price,
                        id: id,
                        tag: tag,
                        date: date,
                        soldDate: this._gallery.loadDate(),
                    }
                    this._gallery.soldPicture(id, soldPic);
                    e.target.closest('.card').remove();
                }
            })
        }
    }
    _setTagCol(e) {
        e.preventDefault();
        if (e.target.classList.contains('tag-color') || e.target.classList.contains('btn')) {
            const tagCol = document.querySelectorAll('.tag-color')
            tagCol.forEach(col => {
                if (col.classList.contains('active')) {
                    col.classList.remove('active');
                }
            })

            e.target.classList.add('active');
        }
    }

    _filterItems(type, e) {
        const inputValue = e.target.value.trim();
        document.querySelectorAll(`#${type}-items .card`).forEach(item =>{
            const id = item.getAttribute('data-id');
            if (id.includes(inputValue)) {
                item.style.display = 'block';

            } else {
                item.style.display = 'none';
            }
        })
    }
    _prevImg(e) {
        e.preventDefault()
        let img
        if (e.target.classList.contains('imgprev')) {
            let imgContainer
            if (e.target.classList.contains('imgprev-edit')) {
                imgContainer = document.getElementById('img-prev-edit')
            } else {

                imgContainer = document.getElementById('img-prev')
            }
            imgContainer.style.width = '100%';
            img = e.target.files[0];
            if (img.type.startsWith('image/')) {
                // console.log(img.type)np
                const imgPrev = document.createElement('img');
                imgPrev.classList.add('rounded', 'mx-auto', 'd-block', 'prevImg')
                imgPrev.setAttribute('alt', 'Image Preview')
                imgPrev.style.width = '100%';
                imgPrev.setAttribute('id', 'img-prevId')
                imgPrev.setAttribute('src', URL.createObjectURL(img));
                
                if (imgContainer.childElementCount > 0) {
                    imgContainer.removeChild(imgContainer.firstChild);
                    imgContainer.appendChild(imgPrev);
                } else {
                    imgContainer.appendChild(imgPrev);
                }
            } else {
                alert('Please select an image')
                document.querySelector('.imgprev').value = ''
                return;
            }

        }
    } 
    _itemEditor(e) {
        e.preventDefault();
        const tags = ['white', 'blue', 'green', 'orange', 'yellow'] 
        const tagClasses = ['btn-outline-secondary', 'btn-outline-info', 'btn-outline-success', 'btn-outline-warning','btn-outline-danger']
        // const imgSrc = e.target.closest('.card').getAttribute('data-img');
        const tagValue = e.target.closest('.card').getAttribute('data-tag');
        const id = e.target.closest('.card').getAttribute('data-id');
        // const blod = new Blob([imgSrc], { type: 'image/*' })
        // const blobUrl = URL.createObjectURL(blod);
        // if (e.target.classList.contains('pic-details') ||
        //     e.target.classList.contains('fa-image') ||
        //     e.target.classList.contains('sold') ||
        //     e.target.classList.contains('btn-success') || 
        //     e.target.classList.contains('fa-dollar-sign') ||
        //     e.target.classList.contains('delete') ||
        //     e.target.classList.contains('fa-xmark')) {
            // Create endit Items inner
            if (e.target.closest('.pictureIdIcon') || e.target.classList.contains('fa-image')) {
                const editItemFormContainer = document.createElement('div');
                editItemFormContainer.style.height = window.innerHeight + 'px';
                editItemFormContainer.classList.add('editItemContainer');
                
            
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '18rem';
                card.setAttribute('id', 'card-edit')
                card.setAttribute('data-editid', id)
                card.setAttribute('data-tag', tagValue)
                // card.setAttribute('data-img', imgSrc)
                card.style.padding = '1rem';
                card.style.position = 'relative';
                const closeEditorBtn = document.createElement('button');
                closeEditorBtn.setAttribute('type', 'button');
                closeEditorBtn.classList.add('btn-close')
                closeEditorBtn.setAttribute('aria-label', 'Close')
                closeEditorBtn.style.position = 'absolute';
                closeEditorBtn.style.right = '0';
                closeEditorBtn.style.top = '0';

                closeEditorBtn.addEventListener('click', () => editItemFormContainer.remove())

                const editForm = document.createElement('form');
                editForm.setAttribute('id', 'picture-edit-form')
                
                
                const noteEditCont = document.createElement('div')
                noteEditCont.classList.add('form-group')
                noteEditCont.style.marginBottom = '0.5rem'
                const noteEditLabel = document.createElement('label')
                noteEditLabel.setAttribute('for', 'exampleFormControlTextarea1')
                noteEditLabel.textContent = 'Update Note'
                const noteEditInput = document.createElement('textarea')
                noteEditInput.classList.add('form-control', 'note-edit-newItem')
                noteEditInput.setAttribute('id', 'exampleFormControlTextarea1')
                noteEditInput.setAttribute('rows', '3')
                noteEditInput.setAttribute('placeholder', this._gallery._getNotes(id))
                noteEditCont.insertAdjacentElement('afterbegin', noteEditLabel)
                noteEditCont.insertAdjacentElement('beforeend', noteEditInput)
                // <div class="form-group" style="margin-bottom: 1rem;">
                //     <label for="exampleFormControlTextarea1">Leave a Note</label>
                //     <textarea class="form-control leave-note-newItem" id="exampleFormControlTextarea1" rows="3"></textarea>
                //   </div>
            // const prevImg = document.createElement('img')
            // prevImg.classList.add('card-img-top')
            // prevImg.setAttribute('src', imgSrc)
            //     prevImg.style.marginBottom = '0.2rem'
            //     const prevImgContainer = document.createElement('div')
            //     prevImgContainer.setAttribute('id', 'img-prev-edit')
            // Upload Image
            // const uplImgContainer = document.createElement('div')
            // uplImgContainer.classList.add('imgprev', 'form-control', 'form-control-sm')
            // uplImgContainer.style.marginBottom = '0.2rem'
            // const uplIlable = document.createElement('lable')
            // uplIlable.setAttribute('for', "formFileSm")
            // uplIlable.classList.add('form-label')
            // uplIlable.textContent = 'Upload Image'
            // const uplInput = document.createElement('input')
            // uplInput.setAttribute('type', 'file');
            // uplInput.classList.add('imgprev', 'form-control', 'form-control-sm', 'imgprev-edit')
            // uplInput.setAttribute('id', 'formFileSm')
            //     uplInput.addEventListener('input', (e) => {
            //         prevImg.remove();
            //         this._prevImg(e)
            // })
            // uplImgContainer.appendChild(uplIlable)
            //     uplImgContainer.appendChild(uplInput)
                
            // Buttons tags
            const tagbtnContainer = document.createElement('div');
            tagbtnContainer.classList.add('input-group-prepend')
            tagbtnContainer.setAttribute('id', 'button-addon3')
                tagbtnContainer.style.marginBottom = '0.5rem'
            tags.forEach((tag, index) => {
               const  tagEl = document.createElement('button');
                tagEl.classList.add('btn', 'tag-color')
                tagEl.classList.add(tagClasses[index % tagClasses.length])
                tagEl.setAttribute('value', tag)
                if (tagValue === tagEl.value) {
                    tagEl.classList.add('active')
                }
                tagEl.textContent = tag
                tagEl.style.margin = '2px'
                tagEl.addEventListener('click', (e) => {
                    e.preventDefault();
                    this._setTagCol(e)
                })
                tagbtnContainer.appendChild(tagEl)
            })
                const epriceC = document.createElement('div')
                epriceC.classList.add('mb-3')
                const editPrice = document.createElement('input')
                editPrice.setAttribute('type', 'text')
                editPrice.setAttribute('id', 'edit-picture-price')
                editPrice.classList.add('form-control')
                editPrice.setAttribute('placeholder', e.target.closest('.card').getAttribute('data-price'))
                // editPrice.setAttribute('aria-lable', 'tag-color')
                epriceC.appendChild(editPrice)
                
                const buttonSubmitEdit = document.createElement('button')
                buttonSubmitEdit.setAttribute('type', 'submit')
                buttonSubmitEdit.classList.add('btn', 'btn-dark', 'text-white')
                buttonSubmitEdit.setAttribute('type', 'submit')
                
                const btnAddDiscount = document.createElement('button')
                btnAddDiscount.setAttribute('type', 'button')
                btnAddDiscount.classList.add('btn', 'btn-outline-dark')
                btnAddDiscount.textContent = 'Add Discount'
                btnAddDiscount.style.marginLeft = '3rem'

                
                btnAddDiscount.addEventListener('click', (e) => {
                        e.preventDefault();
                        if(btnAddDiscount.classList.contains('active')) {
                            btnAddDiscount.classList.remove('active')
                        } else {
                            btnAddDiscount.classList.add('active')

                        }
                    })

                const self = this;
                // Submit
                
                buttonSubmitEdit.textContent = 'Submit'
                editForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const picturesElements = document.querySelectorAll('.PicElement')
                    // const imgSrcEdited = document.querySelector('.imgprev-edit').files[0]
                    const price = document.getElementById('edit-picture-price');
                    const tagValueEd = document.querySelector('.tag-color.active').value;
                    let note
                    if (noteEditInput.value === '') { 
                        note = self._gallery._getNotes(id)
                    } else {
                        note = noteEditInput.value
                    }

                    // let imgUrl
                    // if (imgSrcEdited === null || imgSrcEdited === undefined) {
                    //     imgUrl = document.getElementById('card-edit').getAttribute('data-img')
                    //     handleEdit(imgUrl)
                    // } else {
                    //     self._createPicture(imgSrcEdited, (compresedImg) => {
                    //         imgUrl = compresedImg
                    //         handleEdit(imgUrl)
                    // })
                    // }
                    // function handleEdit(imgUrl) {
                    //     if (price.value === '') {
                    //     price.value = price.getAttribute('placeholder')
                    // }
                    // console.log(imgUrl)
                    // const date = self._gallery.loadDate()
                    // const editedPicture = new Picture(+price.value, tagValue, imgUrl, date)
                    // self._gallery.addPicture(editedPicture)
                    // picturesElements.forEach((pic) => {
                    //     if (pic.getAttribute('data-id') === id) {
                    //         self._gallery.removePicture(id)
                    //         pic.remove()

                    //     }
                    // })
                    // }
                    
                    
                   
                    if (price.value === '') {
                        price.value = price.getAttribute('placeholder')
                    }
                    if (btnAddDiscount.classList.contains('active')) {
                        let currentPrice = parseFloat(price.value);
                        let discount = currentPrice * 0.75
                        price.value = (currentPrice - discount).toFixed(2)
                        // price.value = currentPrice - discount
                    }
                    // if (tagValueEd === e.target.closest('.card').getAttribute('data-tag') && price.value === '') {
                    //     // console.log(price.value)
                    //     // console.log(tagValueEd)
                    //     return;
                    // } else {
                        // console.log(imgUrl)
                        const date = self._gallery.loadDate()
                    // const editedPicture = new Picture(price.value, tagValueEd, date)
                    const editedPicture = {
                        id: id,
                        price: price.value,
                        tagCol: tagValueEd,
                        date: date,
                        note: note,

                    }
                    self._gallery.removePicture(id)
                    picturesElements.forEach((pic) => {
                        if (pic.getAttribute('data-id') === id) {
                            pic.remove()
                            
                        }
                    })
                    self._gallery.addPicture(editedPicture)
                        editItemFormContainer.remove()
                    // }
                    // console.log(picturesElements)
                })



            // editForm.appendChild(prevImg)
            // editForm.appendChild(prevImgContainer)
                // editForm.appendChild(uplImgContainer)
                editForm.appendChild(tagbtnContainer)
                editForm.appendChild(epriceC)
                editForm.appendChild(noteEditCont)
            editForm.appendChild(buttonSubmitEdit)
            editForm.appendChild(btnAddDiscount)
            card.appendChild(editForm)
            card.appendChild(closeEditorBtn)    
            editItemFormContainer.appendChild(card)
//             editItemFormContainer.innerHTML = `
//             <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src="${imgSrc}" alt="Card image cap">
//   <div class="card-body">
//     <form>
//               <div class="form-group">
//                 <label for="picture-price">Price:</label>
//                 <input type="number" class="form-control" id="picture-price" placeholder="Enter price">
//               </div>
//               <div class="form-group">
//                 <label for="tag-color">Tag Color:</label>
//                 <input type="text" class="form-control" id="tag-color" placeholder="Enter tag color">
//               </div>
//               <div class="form-group">
//                 <label for="imgprev">Image Upload:</label>
//                 <input type="file" class="form-control-file" id="imgprev">
//               </div>
//               <button type="submit" class="btn btn-primary">Submit</button>
//             </form>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
//             `
// return
document.body.appendChild(editItemFormContainer);
}
        // }
        // console.log(imgSrc)
    }
    _createPicture(imageFile,callback) {
        // let imageData
        if (!imageFile) {
            callback('No image') ;
        } else {
            const reader = new FileReader()
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    // imageData = img;
                
                    // this._newItem(imageData)
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d')
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0)
                    const compresedImg = canvas.toDataURL('image/jpeg', 1)
                    callback(compresedImg)
                }
            }
            reader.onerror = (error) => {
            console.error('Error occurred while loading image:', error);
        };
            reader.readAsDataURL(imageFile)
            
            // imgSrc = img.getAttribute('src')
            // return imageData
        }
        // return imageFile;
    }

    // Confirm Changes
    _confirmChanges(id) {
        // const tagValue = e.target.closest('.card').getAttribute('data-tag');
        // const id = e.target.closest('.card').getAttribute('data-id');
        return new Promise((resolve, reject) => {
            let result
        const confirmItemFormContainer = document.createElement('div');
        confirmItemFormContainer.style.height = window.innerHeight + 'px';
        confirmItemFormContainer.classList.add('editItemContainer');
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';
        card.setAttribute('id', 'card-confirm')
        card.setAttribute('data-confirm', id)
        card.style.padding = '1rem';
        const confirmTitle = document.createElement('h2');
        confirmTitle.textContent = id;
        confirmTitle.style.textAlign = 'center'
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('modal-footer')
        const confirmBtn = document.createElement('button');
        confirmBtn.classList.add('btn', 'btn-primary', 'confirm')
        const cancellBtn = document.createElement('button');
        cancellBtn.classList.add('btn', 'btn-secondar', 'cancel');
        confirmBtn.textContent = 'Confirm'
        cancellBtn.textContent = 'Cancel'

        btnContainer.appendChild(cancellBtn)
        btnContainer.appendChild(confirmBtn)

        card.appendChild(confirmTitle)
        card.appendChild(btnContainer)
        confirmItemFormContainer.appendChild(card)


        
        btnContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('confirm')) {
                // result = true;
                resolve(true)
                confirmItemFormContainer.remove();
            } else if (e.target.classList.contains('cancel')) {
                // result = false;
                resolve(false)
                confirmItemFormContainer.remove();
                // return
            }
            // console.log(result)
        })
            confirmItemFormContainer.addEventListener('click', () => {
            resolve(false)
            confirmItemFormContainer.remove();
        })
                
        document.body.appendChild(confirmItemFormContainer)
        })
        
    }
    _displayNotes(e) {
        const id = e.target.closest('.card').getAttribute('data-id');
        if (e.target.classList.contains('note-btn') || e.target.classList.contains('fa-note-sticky')) {
            const noteContainer = document.createElement('div');
        noteContainer.style.height = window.innerHeight + 'px';
        noteContainer.classList.add('editItemContainer');
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';
        card.setAttribute('id', 'card-confirm')
        card.setAttribute('data-confirm', id)
            card.style.padding = '1rem';
            card.style.textAlign = 'center';
        card.textContent = this._gallery._getNotes(id)    
           card.style.position = 'relative';
                const closeNoteBtn = document.createElement('button');
                closeNoteBtn.setAttribute('type', 'button');
                closeNoteBtn.classList.add('btn-close')
                closeNoteBtn.setAttribute('aria-label', 'Close')
                closeNoteBtn.style.position = 'absolute';
                closeNoteBtn.style.right = '0';
                closeNoteBtn.style.top = '0';
                closeNoteBtn.addEventListener('click', () => noteContainer.remove())
            card.appendChild(closeNoteBtn);
            noteContainer.appendChild(card);
            document.body.appendChild(noteContainer);
        }
        
    }
    
    _loadNavBar(e) {
        e.preventDefault();
        const navBarOuter = document.createElement('div');
        navBarOuter.style.height = window.innerHeight + 'px';
        navBarOuter.classList.add('navBarOuter');
        navBarOuter.style.width = '100%';
        navBarOuter.style.position = 'absolute';
        navBarOuter.style.top = '0';
        navBarOuter.style.left = '0';
        navBarOuter.style.backgroundColor = 'rgba(52, 58, 64, 0.5)';
        const navBar = document.createElement('div')
        navBar.setAttribute('id', 'nav-bar-el')
        navBar.style.height = window.innerHeight + 'px';
        navBar.style.width = '40%';
        navBar.style.position = 'absolute';
        navBar.style.top = '0';
        navBar.style.left = '-1000px';
        navBar.style.transition = 'all 0.5s ease-in-out';
        navBar.style.backgroundColor = '#343a40';
        // navBar inner
        const navBarInner = document.createElement('div');
        navBarInner.style.height = '100%'
        navBarInner.style.width = '100%';
        navBarInner.style.paddingTop = '5rem';
        navBarInner.style.position = 'relative';
        // navBarInner.textContent = 'NavBer'
        // colse bar btn
        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('type', 'button');
        closeBtn.classList.add('btn-close', 'btn-close-white')
        closeBtn.setAttribute('aria-label', 'Close')
        closeBtn.style.position = 'absolute';
        closeBtn.style.right = '0.5rem';
        closeBtn.style.top = '0.5rem';
        
        
        // List group nav
        const listgroup = document.createElement('div');
        listgroup.classList.add('list-group');
        const listSoldItems = document.createElement('button');
        listSoldItems.setAttribute('type', 'button');
        listSoldItems.textContent = 'Sold Pictures';
        listSoldItems.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-center');
        listSoldItems.setAttribute('id', 'sold-pictures-list');
        listSoldItems.style.borderRadius = '0'
        listSoldItems.style.fontWeight = 'bold'

        
        listgroup.appendChild(listSoldItems);
        navBar.appendChild(navBarInner);
        navBarInner.appendChild(listgroup);
        navBarInner.appendChild(closeBtn)

        document.body.style.overflow = 'hidden';
        document.body.appendChild(navBarOuter)
        document.body.appendChild(navBar);
        
        setTimeout(() => {
            navBar.style.left = 0;
        }, 100)
        navBar.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target === closeBtn) {
                navBar.style.left = '-1000px';
                navBarOuter.style.left = '-1000px';
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    navBar.remove()
                    navBarOuter.remove()
                }, 50)
            }
            if (event.target === listSoldItems) {
                navBar.remove()
                navBarOuter.remove()
                this._gallery._displaySoldPictures();
                document.body.style.overflow = 'scroll';
            }
        })
        navBarOuter.addEventListener('click', () => { 
            navBar.style.left = '-1000px';
            navBarOuter.style.left = '-1000px';
            document.body.style.overflow = 'auto';
                setTimeout(() => {
                    navBar.remove()
                    navBarOuter.remove()
                }, 100)
        })
    }
    _navBar() {

    }

    _reset(e) {
        this._gallery.reset();
        document.getElementById('pictures-items').innerHTML = '';
        document.getElementById('filter-pictures').value = '';
    }
}

const app = new App();

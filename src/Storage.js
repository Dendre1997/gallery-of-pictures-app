// Storage local storage
class Storage {
    static getPictures() {
        let pictures;

        if (localStorage.getItem('pictures') === null) {
            pictures = [];
        } else {
            pictures = JSON.parse(localStorage.getItem('pictures'));
        }
        return pictures;
    }
    static getSoldPic() {
        let soldPictures;
        if (localStorage.getItem('SoldPic') === null) {
            soldPictures = []
        } else {
            soldPictures = JSON.parse(localStorage.getItem('SoldPic'));
        }
        return soldPictures;
    }

    static savePictures(picture) {
        // Storage.requestStorageQuota()
        const pictures = Storage.getPictures();
        pictures.push(picture);
        localStorage.setItem('pictures', JSON.stringify(pictures))
    }

    static removePicture(id) {
        const pictures = Storage.getPictures();
        pictures.forEach((picture, index) => {
            if (picture.id === id) {
                pictures.splice(index, 1)
            }
        })
        localStorage.setItem('pictures', JSON.stringify(pictures))
    }
    
    static saveSoldPic(pic) {
        // Storage.requestStorageQuota();
        const soldPictures = Storage.getSoldPic();
        soldPictures.push(pic);
        localStorage.setItem('SoldPic', JSON.stringify(soldPictures))
        // Storage.removePicture(id)
    }

    static clearAll() {
        localStorage.removeItem('pictures');

        
        
        // localStorage.clear();

    }
    
// static requestStorageQuota() {
//     if ('storage' in navigator && 'persist' in navigator.storage) {
//         const requestedQuota = 1024 * 1024 * 200; // Increase quota by 200MB
//         return navigator.storage.persist().then(granted => {
//             if (granted) {
//                 console.log('Storage quota granted');
//             } else {
//                 console.error('Storage quota not granted');
//                 // Implement fallback or alternative strategy here
//             }
//             return granted;
//         }).catch(error => {
//             console.error('Error requesting storage quota:', error);
//             // Implement error handling here
//             return false;
//         });
//     } else {
//         console.error('Storage manager not available');
//         return Promise.resolve(false);
//     }
// }
}

export default Storage;

// Storage IndexedDB
// class Storage {
//     static openDatabase() {
//         return new Promise((resolve, reject) => {
//             const request = window.indexedDB.open('myDatabase', 1);

//             request.onerror = () => {
//                 console.error('Failed to open database');
//                 reject();
//             };

//             request.onsuccess = () => {
//                 const db = request.result;
//                 resolve(db);
//             };

//             request.onupgradeneeded = event => {
//                 const db = event.target.result;
//                 db.createObjectStore('pictures', { keyPath: 'id', autoIncrement: true });
//                 db.createObjectStore('soldPictures', { keyPath: 'id', autoIncrement: true });
//             };
//         });
//     }

//     static getPictures() {
//         return new Promise((resolve, reject) => {
//             Storage.openDatabase().then(db => {
//                 const transaction = db.transaction(['pictures'], 'readonly');
//                 const objectStore = transaction.objectStore('pictures');
//                 const request = objectStore.getAll();

//                 request.onsuccess = () => {
//                     resolve(request.result);
//                 };

//                 request.onerror = () => {
//                     console.error('Failed to retrieve pictures');
//                     reject();
//                 };
//             }).catch(() => {
//                 reject();
//             });
//         });
//     }

//     static getSoldPic() {
//         return new Promise((resolve, reject) => {
//             Storage.openDatabase().then(db => {
//                 const transaction = db.transaction(['soldPictures'], 'readonly');
//                 const objectStore = transaction.objectStore('soldPictures');
//                 const request = objectStore.getAll();

//                 request.onsuccess = () => {
//                     resolve(request.result);
//                 };

//                 request.onerror = () => {
//                     console.error('Failed to retrieve sold pictures');
//                     reject();
//                 };
//             }).catch(() => {
//                 reject();
//             });
//         });
//     }

//     static savePictures(picture) {
//         return new Promise((resolve, reject) => {
//             Storage.openDatabase().then(db => {
//                 const transaction = db.transaction(['pictures'], 'readwrite');
//                 const objectStore = transaction.objectStore('pictures');
//                 const request = objectStore.add(picture);

//                 request.onsuccess = () => {
//                     console.log('Picture saved successfully');
//                     resolve();
//                 };

//                 request.onerror = () => {
//                     console.error('Failed to save picture');
//                     reject();
//                 };
//             }).catch(() => {
//                 reject();
//             });
//         });
//     }

//     static saveSoldPic(pic) {
//         return new Promise((resolve, reject) => {
//             Storage.openDatabase().then(db => {
//                 const transaction = db.transaction(['soldPictures'], 'readwrite');
//                 const objectStore = transaction.objectStore('soldPictures');
//                 const request = objectStore.add(pic);

//                 request.onsuccess = () => {
//                     console.log('Sold picture saved successfully');
//                     resolve();
//                 };

//                 request.onerror = () => {
//                     console.error('Failed to save sold picture');
//                     reject();
//                 };
//             }).catch(() => {
//                 reject();
//             });
//         });
//     }

//     static removePicture(id) {
//         return new Promise((resolve, reject) => {
//             Storage.openDatabase().then(db => {
//                 const transaction = db.transaction(['pictures'], 'readwrite');
//                 const objectStore = transaction.objectStore('pictures');
//                 const request = objectStore.delete(id);

//                 request.onsuccess = () => {
//                     console.log('Picture removed successfully');
//                     resolve();
//                 };

//                 request.onerror = () => {
//                     console.error('Failed to remove picture');
//                     reject();
//                 };
//             }).catch(() => {
//                 reject();
//             });
//         });
//     }

//     static clearAll() {
//         return new Promise((resolve, reject) => {
//             Storage.openDatabase().then(db => {
//                 const transaction = db.transaction(['pictures', 'soldPictures'], 'readwrite');
//                 transaction.objectStore('pictures').clear();
//                 transaction.objectStore('soldPictures').clear();

//                 transaction.oncomplete = () => {
//                     console.log('All data cleared successfully');
//                     resolve();
//                 };

//                 transaction.onerror = () => {
//                     console.error('Failed to clear data');
//                     reject();
//                 };
//             }).catch(() => {
//                 reject();
//             });
//         });
//     }

//     static requestStorageQuota() {
//         // Your quota request implementation
//     }
// }

// export default Storage;

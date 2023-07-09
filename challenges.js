'use stric';
///Challenge number 3 and the last challenge

//Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
// 3.jpg']. To test, turn off the 'loadNPause' function


//Part_one

const wait1 = function (seconds) {
    // it is impossible for a timer promise to be rejected
    return new Promise(function (resolve) {

        setTimeout(resolve, seconds * 1000)

    })
}

const images = document.querySelector('.images')

const createImage = function (ImagePath) {
    const newImage = document.createElement('img')

    return new Promise(function (resolve, reject) {

        newImage.src = ImagePath
        newImage.addEventListener('load', function () {
            images.appendChild(newImage)
            resolve(newImage)
            newImage.style.display = 'block'
        })
        newImage.addEventListener('error', () => {
            reject(new Error('Failed to load the image.'));
        });

    })
}



const loadNPause = async function (img1, img2, img3) {

    try {

        const image_1 = await createImage(img1)
        await wait1(10)
        image_1.style.display = 'none';
        console.log('i have waited for 10 seconds');

        const image_2 = await createImage(img2)
        await wait1(20)
        image_2.style.display = 'none';
        console.log('i have waited for 20 seconds');

        const image_3 = await createImage(img3)
        await wait1(30)
        console.log('i have waited for 30 seconds');
        image_3.style.display = 'none';

    }
    catch (err) {
        console.error(err)
    }
}

const imagePathes = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]
// loadNPause(...imagePathes)

//Part 2 

const loadAll = async function (imgArr) {


    try {
        if (!imgArr || imgArr.length === 0) {
            throw new Error('OOPS there are no images to be shown 🔎');
        }

        const imgs = imgArr.map(async (el) => {
            return await createImage(el);
        });

        const imgsEl = await Promise.all(imgs)
        imgsEl.forEach(img => img.classList.add('parallel'))

    }
    catch (err) {
        console.error(`${err.message}`)
    }


}


loadAll(imagePathes)

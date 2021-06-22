const video = document.getElementById('videoInput')
const socket = io('/')
let LopId
let TenHs
let globalresult;
let FolderStudentID;
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/aimodels'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/aimodels'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/aimodels')
]).then(start)

function start() {
    document.body.append('Models Loaded')

    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )

    //video.src = '../videos/speech.mp4'
    console.log('video added')
    recognizeFaces()

}

async function recognizeFaces() {

    const labeledDescriptors = await loadLabeledImages()
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)


    video.addEventListener('play', async () => {
        console.log('Playing')
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)



        setInterval(async () => {
            let count = 0;
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            count++;
            results.forEach((result, i) => {
                if (results[i].distance > 0.5) {
                    const box = resizedDetections[i].detection.box
                    const drawBox = new faceapi.draw.DrawBox(box, { label: result = "unknown" })
                    drawBox.draw(canvas)
                    return
                } else {
                    const box = resizedDetections[i].detection.box
                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                    drawBox.draw(canvas)
                    socket.emit('reckonized', result.toString())
                    location.replace("http://localhost:8081/pgTeacher")

                }
            })

        }, 100)
        alert("đã điểm danh được" + TenHs)
    })
}
socket.on('name-id', async (lopid, tenhs, folderid) => {
    LopId = lopid;
    TenHs = tenhs;
    FolderStudentID = folderid;
    
})


function loadLabeledImages() {
    //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel','Tom Holland','Thanh Binh']
    const labels = [FolderStudentID]; // for WebCam
    return Promise.all(
        labels.map(async (label) => {
            const descriptions = []
            for (let i = 1; i <= 1; i++) {
                const img = await faceapi.fetchImage(`../labeled_images/${LopId}/${FolderStudentID}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                //console.log(label + i + JSON.stringify(detections))
                descriptions.push(detections.descriptor)
            }
            document.body.append(label + ' Faces Loaded | ')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}
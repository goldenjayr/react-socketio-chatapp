import React, {memo, useState, useRef, useEffect} from 'react'
import { FileInput, Button } from 'react-md'

import './Upload.scss'

const Upload = ({file, setFile, uploadFile}) => {
    const [filePreview, setFilePreview] = useState([])
    const fileUpload = useRef(null)

    const clearFileUpload = () => {
        fileUpload.current.value = ''
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        uploadFile(e)
        clearFileUpload()
    }


    const urlToImage = (urls) => {
        const preview = urls.map(url => {
            return (<img key={Date.now()} width="300" height="auto" src={url} alt="preview" />);
        })
        setFilePreview((state) => [...state, ...preview])
    }

    const handleImageChange = (e) => {
        console.log('This has triggered')
        const urlCreator = window.URL || window.webkitURL;
        const imageUrlArr = []
        const files = []
        e.forEach(item => {
        console.log("TCL: handleImageChange -> item", item)
            const imageUrl = urlCreator.createObjectURL( item );
            imageUrlArr.push(imageUrl)
            files.push(item)
        })
        urlToImage(imageUrlArr)
        setFile((state) => {
            return [...state, ...files]
        })
    }



    console.log("TCL: Upload -> filePreview", filePreview)

    return (
        <div className="fileupload-container">
            <form onSubmit={handleSubmit}>
                <FileInput
                    id="image-input-2"
                    accept="image/*"
                    name="images"
                    primary
                    ref={fileUpload}
                    onChange={handleImageChange}
                    icon={null}
                    multiple
                    className="fileupload" />
                {filePreview.length > 0 &&
                <Button
                raised
                secondary
                iconBefore={false}
                type="submit">Upload</Button>
                }
            </form>
            <div className="image-preview">
                {filePreview}
            </div>
        </div>
    )
}

export default memo(Upload)
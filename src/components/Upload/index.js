import React, {memo, useState, useRef, useEffect} from 'react'
import { FileInput, Button } from 'react-md'

import './Upload.scss'

const Upload = ({file, setFile}) => {
    const [filePreview, setFilePreview] = useState([])
    const fileUpload = useRef(null)

    const urlToImage = (urls) => {
        const preview = urls.map(url => {
            return (<img key={Math.random()} width="300" height="auto" src={url} alt="preview" />);
        })
        setFilePreview((state) => preview)
    }

    const handleImageChange = (files) => {
        setFile((state) => {
            return [...state, ...files]
        })
    }

    useEffect(() => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrlArr = []
        file.forEach(item => {
            const imageUrl = urlCreator.createObjectURL( item );
            imageUrlArr.push(imageUrl)
        })
        urlToImage(imageUrlArr)

    }, [file])



    return (
        <div className="fileupload-container">
            <form>
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
            </form>
            <div className="image-preview">
                {filePreview}
            </div>
        </div>
    )
}

export default memo(Upload)
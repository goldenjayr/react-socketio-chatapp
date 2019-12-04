import React, {useState, useRef} from 'react'
import { FileInput, Button } from 'react-md'

import './Upload.scss'

const Upload = ({image, setImage, sendMessage}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState([])
    const fileUpload = useRef(null)

    const clearFileUpload = () => {
        fileUpload.current.value = ''
        setImagePreviewUrl('')
    }

    const handeSubmit = (e) => {
        e.preventDefault()
        sendMessage(e)
        clearFileUpload()
    }

    const handleImageChange = (e) => {
        const urlCreator = window.URL || window.webkitURL;
        e.forEach(file => {
            const imageUrl = urlCreator.createObjectURL( file );
            setImage((state) => {
                return [...state, file]
            })
            setImagePreviewUrl(state => [...state, imageUrl])
        })

    }
    let imagePreview = null;
    if (imagePreviewUrl.length > 0) {
        imagePreview = imagePreviewUrl.map(url => {
            return (<img key={Date.now()} width="300" height="auto" src={url} alt="preview" />);
        })
    } else {
        imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
        <div className="fileupload-container">
            <form onSubmit={handeSubmit}>
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
                {imagePreviewUrl &&
                <Button
                raised
                secondary
                iconBefore={false}
                type="submit">Upload</Button>
                }
            </form>
            <div className="image-preview">
                {imagePreview}
            </div>
        </div>
    )
}

export default Upload
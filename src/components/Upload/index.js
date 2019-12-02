import React, {useState, useRef} from 'react'
import { FileInput, Button } from 'react-md'

import './Upload.scss'

const Upload = ({image, setImage, sendMessage}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('')
    const fileUpload = useRef(null)

    const clearFileUpload = () => {
        fileUpload.current.value = ''
        setImagePreviewUrl('')
    }

    const handeSubmit = (e) => {
        console.log("TCL: handeSubmit -> e", e)
        e.preventDefault()
        console.log(fileUpload)
        sendMessage(e)
        clearFileUpload()
    }

    const handleImageChange = (e) => {
        let file = e
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL( file );
        setImage(file)
        setImagePreviewUrl(imageUrl)

    }
    let imagePreview = null;
    if (imagePreviewUrl) {
        imagePreview = (<img width="300" height="auto" src={imagePreviewUrl} alt="preview" />);
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
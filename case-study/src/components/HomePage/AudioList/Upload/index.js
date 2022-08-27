import React from 'react';
import { baseUrl } from '../../../../config';
import axios,{post} from 'axios'

const Uploader = () => {
    const handleChange = (event) => {
        let file = event.target.files
        let reader = new FileReader()
        reader.readAsDataURL(file[0])
        reader.onload = (event) => {
            const url = `${baseUrl}/api/service`
            const formData = {file:event.target.result}
            return post(url, formData)
            .then(res => console.log("result"+res))
        }

    }
    return (
        <div>
            <div className="onSubmit">
                <h2>upload deeeeee</h2>
                <input type="file" name='file' onChange={handleChange}/>
            </div>  
        </div>
    );
};

export default Uploader;
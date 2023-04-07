import { Button } from "@mui/material";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { postApiHandler } from "../../apihandler";
import { useForm } from 'react-hook-form';

// const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
    // const [file, setFile] = useState(null);

    const { handleSubmit, watch, register } = useForm();
    const file1 = watch('file')

    // const handleChange = (file) => {
    //     setFile(file);
    // };

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append("file", file1[0]);
        console.log("mahi===");
        const postRes = await postApiHandler("/postJson", formData)
        console.log("postres", postRes)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            {/* <FileUploader handleChange={handleChange} name="file" types={fileTypes} /> */}
            <input
                type={'file'}
                placeholder='file'
                {...register('file')}
            />
            <Button type="submit"> add</Button>
        </form>
    );
}

export default DragDrop;
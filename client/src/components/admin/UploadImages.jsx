import { useState } from "react"
import { toast } from "react-toastify"
import Resizer from "react-image-file-resizer"
import { deleteImages, uploadImages } from "../../api/product"
import { Loader, LoaderCircle } from 'lucide-react';
import useEcomStore from "../../store/store"
const UploadImages = ({ formValues, setFormValues }) => {
    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)
    const onHandleChange = (e) => {
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = formValues.images
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                // File Type Validate
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} Not Valid . Only Image Type Are Allowed`)
                    return;
                }
                // File Resize
                Resizer.imageFileResizer(file, 720, 720, "JPEG", 100, 0, (data) => {
                    uploadImages(token, data).then((res) => {
                        allFiles.push(res.data.data)
                        setFormValues((prev) => {
                            return { ...prev, images: allFiles }
                        })
                        setIsLoading(false)
                        toast.success(res.data.message)
                    }).catch(err => console.log(err))
                }, 'base64')
            }
        }
    }
    const handleDelete = (public_id) => {
        const images = formValues.images
        deleteImages(token, public_id).then((res) => {
            const filteredImages = images.filter((item, index) => {
                return item.public_id !== public_id
            })
            setFormValues((prev) => {
                return { ...prev, images: filteredImages }
            })
            toast.warning(res.data.message)
        }).catch(err => console.log(err))
    }
    return (
        <div className="my-4">
            <div className="flex mx-4 gap-4 my-4">
                {isLoading && <Loader className="animate-spin" />}
                {formValues.images?.map((item, index) => {
                    return <div className='relative' key={index}>
                        <img src={item.url} alt="image file" className="w-24 h-24 hover:scale-105" />
                        <span onClick={() => handleDelete(item.public_id)} className="absolute top-0 right-0 bg-red-500 p-1 rounded-md cursor-pointer">X</span>
                    </div>
                })}
            </div>
            <input type="file" name="images" multiple onChange={onHandleChange} />
        </div>
    )
}

export default UploadImages
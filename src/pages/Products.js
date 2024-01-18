import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
axios.defaults.withCredentials = true;

const Products = () => {
    const [cookies] = useCookies(["user"]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        title: "",
        quantity: 0,
        price: 0,
        thumbnail: null,
        images: []

    })

    const getProducts = async () => {
        try {
            const res = await axios
                .get("https://lengtith.onrender.com/api/fashions?page=1&limit=12", {
                    withCredentials: true,
                })
                .catch((err) => console.log(err));
            const data = await res.data;
            return setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        getProducts();

        const getUser = async () => {
            try {
                const res = await axios
                    .get("https://lengtith.onrender.com/api/users/user", {
                        withCredentials: true,
                    })
                    .catch((err) => console.log(err));
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        const getUserinfo = async () => {
            try {
                const res = await axios
                    .get("https://lengtith.onrender.com/api/users/info", {
                        withCredentials: true,
                    })
                    .catch((err) => console.log(err));
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        getUser();
        getUserinfo();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        setProduct({ ...product, thumbnail: file });
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        setProduct({ ...product, images: files });

        const selectedImagesArray = Array.from(files);

        const newSelectedImages = [...selectedImages, ...selectedImagesArray];
        setSelectedImages(newSelectedImages);

        const newPreviewImages = [...previewImages];
        selectedImagesArray.forEach((image) => {
            newPreviewImages.push(URL.createObjectURL(image));
        });
        setPreviewImages(newPreviewImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('quantity', product.quantity);
        formData.append('price', product.price);
        formData.append('thumbnail', product.thumbnail);

        for (let i = 0; i < product.images.length; i++) {
            formData.append('images', product.images[i]);
        }

        try {
            const res = await axios.post('https://lengtith.onrender.com/api/fashions', formData).catch(err => console.log(err));
            const data = await res.data;
            if (res.status === 400 || res.status === 401) {
                return `${data.error}`;
            }
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemove = async (id) => {
        try {
            const res = await axios.delete('https://lengtith.onrender.com/api/fashions/' + id).catch(err => console.log(err));
            if (res.status === 400 || res.status === 401) {
                return `${res.data.error}`;
            }
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleFavorite = async (id) => {
        return alert(cookies.user);
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.user}`,
            };
    
            const options = {
                headers: headers,
            };

            const res = await axios.post('https://lengtith.onrender.com/api/favorites/', { product: id }, options);
            if (res && res.data) {
                alert("Successfully")
                console.log(res.data);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else if (error.request) {
                alert("No response received:", error.request);
            } else {
                alert("Error during request setup:", error.message);
            }
        }
    }

    return (
        <div>
            <div className='bg-white p-5 rounded-lg shadow-lg mb-5'>
                <h3>Product</h3>
                <form action="" onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2.5'>
                        <input className='border' type="text" name="title" id="" required value={product.title} onChange={handleChange} />
                        <input className='border' type="number" name="quantity" id="" required value={product.quantity} onChange={handleChange} />
                        <input className='border' type="number" name="price" id="" required value={product.price} onChange={handleChange} />
                        <input className='border' type="file" name="thumbnail" id="" onChange={handleThumbnailChange} />
                        <input className='border' type="file" multiple name="images" id="" onChange={handleImageChange} />
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
            <div className='bg-white p-5 rounded-lg shadow-lg'>
                {
                    products && products.map((product, index) => {
                        return (
                            <div key={index}>
                                <h5>{product.title}</h5>
                                <div className='flex justify-between border-2 border-red-600 rounded-lg p-1'>
                                    <div key={index} className='w-fit flex gap-2'>
                                        {product.images.map((previewImage, index) => (
                                            <img key={index} src={`https://lengtith.onrender.com/uploads/products/` + previewImage} className='w-10 h-10 object-contain object-center' alt={`Preview ${index + 1}`} />
                                        ))}
                                    </div>
                                    <div>
                                        <Link to={`/products/${product.slug}`} className='text-yellow-500 text-xs'>Edit</Link>
                                        <span> / </span>
                                        <button onClick={() => handleRemove(product._id)} className='text-red-600 text-xs'>Remove</button>
                                        <span> / </span>
                                        <button onClick={() => handleFavorite(product._id)} className='text-red-600 text-xs'>Love</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products
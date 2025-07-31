import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

type ProductData = {
  name: string;
  originalPrice: string;
  discountPercentage: string;
  description: string;
  mainImageUrl: File | null;
  subimageUrls: File[];
  category: string;
  stockQuantity: string;
  saleType: string;
};

const AddProduct: React.FC = () => {
  const [form, setForm] = useState<ProductData>({
    name: '',
    originalPrice: '',
    discountPercentage: '',
    description: '',
    mainImageUrl: null,
    subimageUrls: [],
    category: '',
    stockQuantity: '',
    saleType: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);
  const [salePrice, setSalePrice] = useState<number | null>(null);

  const categories = ['Food', 'Electronics', 'Realestate', 'Medical & Para Medical'];
  const saleTypes = ['none', 'Flash sale', 'Best selling'];

  useEffect(() => {
    const price = parseFloat(form.originalPrice);
    const discount = parseFloat(form.discountPercentage);

    if (!isNaN(price)) {
      const discountAmount = !isNaN(discount) ? (price * discount) / 100 : 0;
      const calculatedSalePrice = price - discountAmount;
      setSalePrice(Number(calculatedSalePrice.toFixed(2)));
    } else {
      setSalePrice(null);
    }
  }, [form.originalPrice, form.discountPercentage]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateImageSize = (file: File, type: 'main' | 'sub'): boolean => {
    const sizeInKB = file.size / 1024;
    if (type === 'main') {
      return sizeInKB >= 300 && sizeInKB <= 1024; // 300KB to 1MB
    } else {
      return sizeInKB >= 100 && sizeInKB <= 300; // 100KB to 300KB
    }
  };

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (!validateImageSize(file, 'main')) {
        setErrors((prev) => ({ ...prev, mainImage: 'Main image must be between 300KB and 1MB' }));
        return;
      }
      setErrors((prev) => ({ ...prev, mainImage: '' }));
    }
    setForm((prev) => ({ ...prev, mainImage: file }));
    setMainImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!validateImageSize(file, 'sub')) {
        setErrors((prev) => ({ ...prev, subImages: 'Sub images must be between 100KB and 300KB' }));
        return;
      }
      setErrors((prev) => ({ ...prev, subImages: '' }));

      const newFiles = [...form.subimageUrls];
      const newPreviews = [...subImagePreviews];

      if (index < newFiles.length) {
        newFiles[index] = file;
        newPreviews[index] = URL.createObjectURL(file);
      } else {
        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }

      setForm((prev) => ({ ...prev, subImages: newFiles }));
      setSubImagePreviews(newPreviews);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.title = 'Title is required';
    if (
      !form.originalPrice.trim() ||
      isNaN(Number(form.originalPrice)) ||
      Number(form.originalPrice) <= 0
    ) {
      newErrors.originalPrice = 'Valid original price is required';
    }
    if (
      form.discountPercentage &&
      (isNaN(Number(form.discountPercentage)) ||
        Number(form.discountPercentage) < 0 ||
        Number(form.discountPercentage) > 100)
    ) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.mainImageUrl) newErrors.mainImage = 'Main image is required';
    if (form.subimageUrls.length !== 4) newErrors.subImages = 'Exactly 4 sub-images are required';
    if (!form.category) newErrors.category = 'Category is required';
    if (
      !form.stockQuantity.trim() ||
      isNaN(Number(form.stockQuantity)) ||
      Number(form.stockQuantity) < 0
    ) {
      newErrors.stockQuantity = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('title', form.name);
    formData.append('originalPrice', form.originalPrice);
    formData.append('discount', form.discountPercentage);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('stockQuantity', form.stockQuantity);
    formData.append('saleType', form.saleType);
    if (form.mainImageUrl) {
      formData.append('mainImage', form.mainImageUrl);
    }
    form.subimageUrls.forEach((file, i) => {
      formData.append(`subImage${i + 1}`, file);
    });

    console.log('Submitting product:', {
      ...form,
      salePrice,
    });

    setForm({
      name: '',
      originalPrice: '',
      discountPercentage: '',
      description: '',
      mainImageUrl: null,
      subimageUrls: [],
      category: '',
      stockQuantity: '',
      saleType: 'none',
    });
    setMainImagePreview(null);
    setSubImagePreviews([]);
    setErrors({});
    setSalePrice(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
            Add Product
          </h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
            {/* Product Information Section */}
            <div className="pb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Add Single Product
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Name*
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Original Price*
                  </label>
                  <input
                    name="originalPrice"
                    type="text"
                    value={form.originalPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.originalPrice && (
                    <p className="text-red-600 text-sm mt-1">{errors.originalPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={form.discountPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.discount && (
                    <p className="text-red-600 text-sm mt-1">{errors.discount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Sale Price
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={salePrice !== null ? salePrice.toFixed(2) : ''}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Stock Quantity*
                  </label>
                  <input
                    name="stockQuantity"
                    type="number"
                    min="0"
                    value={form.stockQuantity}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.stockQuantity && (
                    <p className="text-red-600 text-sm mt-1">{errors.stockQuantity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Sale Type
                  </label>
                  <select
                    name="saleType"
                    value={form.saleType}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="disabled selected">Select sale type</option>
                    {saleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="pb-4">
              <h3 className="text-base font-semibold text-gray-800 mb-2">Product Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Image* (300KB-1MB)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                        {mainImagePreview ? (
                          <img
                            src={mainImagePreview}
                            alt="Main Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="text-center p-1">
                            <span className="text-3xl text-gray-400">+</span>
                            <p className="text-xs text-gray-500">Add</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMainImageChange}
                          className="hidden"
                        />
                      </label>
                      {mainImagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({ ...prev, mainImage: null }));
                            setMainImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                  {errors.mainImage && (
                    <p className="text-red-600 text-xs mt-1">{errors.mainImage}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub Images (4 required, 100KB-300KB each)*
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="relative">
                        <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-green-500">
                          {subImagePreviews[index] ? (
                            <img
                              src={subImagePreviews[index]}
                              alt={`Sub ${index + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <div className="text-center p-1">
                              <span className="text-3xl text-gray-400">+</span>
                              <p className="text-xs text-gray-500">Add {index + 1}</p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSubImageChange(e, index)}
                            className="hidden"
                          />
                        </label>
                        {subImagePreviews[index] && (
                          <button
                            type="button"
                            onClick={() => {
                              const newFiles = [...form.subimageUrls];
                              const newPreviews = [...subImagePreviews];
                              newFiles.splice(index, 1);
                              newPreviews.splice(index, 1);
                              setForm((prev) => ({ ...prev, subImages: newFiles }));
                              setSubImagePreviews(newPreviews);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.subImages && (
                    <p className="text-red-600 text-xs mt-1">{errors.subImages}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-md text-lg transition-colors shadow-md"
              >
                Add Product
              </button>
            </div>
          </form>

          {/* <div className="flex justify-center">
            <p className="mt-4">OR</p>
          </div> */}

          {/* Bulk Upload Section */}
          {/* <div className="pt-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Add Multiple Products
            </h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log('Bulk file selected:', file);
                    alert(`Selected file: ${file.name}`);
                  }
                }}
                className="block w-full max-w-sm text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer"
              />
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md text-lg transition-colors shadow-md"
              >
                Upload
              </button>
            </div>
            <p className="text-sm text-center text-gray-500 mt-2">
              Supported formats: .csv, .xlsx, .xls (Max: 5MB)
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

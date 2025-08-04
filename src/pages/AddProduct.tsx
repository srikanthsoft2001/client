import { createProduct } from '@/api/api';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

type ProductData = {
  name: string;
  originalPrice: string;
  discountPercentage: string;
  description: string;
  mainImage: File | null;
  subImages: File[];
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
    mainImage: null,
    subImages: [],
    category: '',
    stockQuantity: '',
    saleType: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Food', 'Electronics', 'Realestate', 'Medical & Para Medical'];
  const saleTypes = ['none', 'Flash sale', 'Best selling'];

  useEffect(() => {
    const price = parseFloat(form.originalPrice);
    const discount = parseFloat(form.discountPercentage);

    if (!isNaN(price)) {
      const discountAmount = !isNaN(discount) ? (price * discount) / 100 : 0;
      const calculatedSalePrice = price - discountAmount;
      setSalePrice(calculatedSalePrice);
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
      return sizeInKB >= 300 && sizeInKB <= 1024;
    } else {
      return sizeInKB >= 100 && sizeInKB <= 300;
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

      const newFiles = [...form.subImages];
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

    if (!form.name.trim()) newErrors.name = 'Name is required';
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
      newErrors.discountPercentage = 'Discount must be between 0 and 100';
    }
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.mainImage) newErrors.mainImage = 'Main image is required';
    if (form.subImages.length !== 4) newErrors.subImages = 'Exactly 4 sub-images are required';
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all product data
      formData.append('name', form.name);
      formData.append('originalPrice', form.originalPrice);
      formData.append('discountPercentage', form.discountPercentage || '0');
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('stockQuantity', form.stockQuantity);
      formData.append('saleType', form.saleType || 'none');

      // Calculate and append sale price
      const original = parseFloat(form.originalPrice);
      const discount = parseFloat(form.discountPercentage || '0');
      const salePrice = (original - (original * discount) / 100).toFixed(2);
      formData.append('salePrice', salePrice);

      // Append image files with correct field names
      if (form.mainImage) {
        formData.append('mainImage', form.mainImage);
      }

      form.subImages.forEach((file) => {
        formData.append('subImages', file);
      });

      // Send to API
      await createProduct(formData);

      // Reset form on success
      setForm({
        name: '',
        originalPrice: '',
        discountPercentage: '',
        description: '',
        mainImage: null,
        subImages: [],
        category: '',
        stockQuantity: '',
        saleType: '',
      });
      setMainImagePreview(null);
      setSubImagePreviews([]);
      setErrors({});
      setSalePrice(null);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error submitting product:', error);
      setErrors((prev) => ({ ...prev, submit: 'Failed to submit product. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
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
                Product Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
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
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Category Field */}
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

                {/* Original Price Field */}
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Original Price*
                  </label>
                  <input
                    name="originalPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.originalPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.originalPrice && (
                    <p className="text-red-600 text-sm mt-1">{errors.originalPrice}</p>
                  )}
                </div>

                {/* Discount Percentage Field */}
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    name="discountPercentage"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={form.discountPercentage}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.discountPercentage && (
                    <p className="text-red-600 text-sm mt-1">{errors.discountPercentage}</p>
                  )}
                </div>

                {/* Sale Price Field (Read-only) */}
                <div>
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    readOnly
                    value={salePrice !== null ? salePrice.toFixed(2) : ''}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 md:p-3 bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* Stock Quantity Field */}
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

                {/* Sale Type Field */}
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
                    <option value="">Select sale type</option>
                    {saleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description Field */}
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

            {/* Product Images Section */}
            <div className="pb-4">
              <h3 className="text-base font-semibold text-gray-800 mb-2">Product Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Image Upload */}
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

                {/* Sub Images Upload */}
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
                              const newFiles = [...form.subImages];
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
                disabled={isSubmitting}
                className={`bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-md text-lg transition-colors shadow-md ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
            {errors.submit && (
              <p className="text-red-600 text-sm text-center mt-2">{errors.submit}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

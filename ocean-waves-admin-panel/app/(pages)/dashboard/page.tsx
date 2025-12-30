"use client";

import { useState, useRef, DragEvent, ChangeEvent, useEffect, useCallback } from "react";
import { useAuthStore } from "../../store/auth-store";
import { uploadMultipleImages, UploadProgress } from "../../service/storage";
import { createProduct, getProducts, updateProduct, deleteProducts } from "../../service/product";
import { getInquiries, deleteInquiries } from "../../service/inquiry";
import { ProductData } from "../../interface/product-create";
import { Product } from "../../interface/product";
import { Inquiry } from "../../interface/inquiry";
import ShortLoadingScreen from "../../components/ui/short-loading";

type TabType = "products" | "inquiries";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<TabType>("products");
  
  // Image Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, UploadProgress>>({});
  const [imageError, setImageError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Product State
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<ProductData>({
    title: "",
    description: "",
    image: [],
    features: [],
  });
  const [newFeature, setNewFeature] = useState("");
  const resetUploadState = () => {
    setUploadProgress({});
    setImageError(null);
    setIsUploading(false);
    setIsDragging(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetProductFormState = () => {
    setProductForm({ title: "", description: "", image: [], features: [] });
    setNewFeature("");
    setEditingProduct(null);
    resetUploadState();
  };

  // Inquiry State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);
  const [selectedInquiries, setSelectedInquiries] = useState<string[]>([]);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryDetail, setInquiryDetail] = useState<Inquiry | null>(null);

  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setProductError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Ürünler yüklenirken bir hata oluştu");
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  const loadInquiries = useCallback(async () => {
    setIsLoadingInquiries(true);
    setInquiryError(null);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      setInquiryError(err instanceof Error ? err.message : "İletişim formları yüklenirken bir hata oluştu");
    } finally {
      setIsLoadingInquiries(false);
    }
  }, []);

  // Load Products
  useEffect(() => {
    if (activeTab === "products") {
      loadProducts();
    }
  }, [activeTab, loadProducts]);

  // Load Inquiries
  useEffect(() => {
    if (activeTab === "inquiries") {
      loadInquiries();
    }
  }, [activeTab, loadInquiries]);

  // Image Upload Handlers
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    
    if (imageFiles.length === 0) {
      setImageError("Lütfen geçerli bir resim dosyası seçin");
      return;
    }

    setIsUploading(true);
    setImageError(null);
    setUploadProgress({});

    try {
      const results = await uploadMultipleImages(
        imageFiles,
        "images/products/",
        (index, progress) => {
          setUploadProgress((prev) => ({
            ...prev,
            [index]: progress,
          }));
        }
      );

      const newImageUrls = results.map((result) => result.url);

      setProductForm((prev) => ({
        ...prev,
        image: [...(prev.image || []), ...newImageUrls],
      }));
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Resim yüklenirken bir hata oluştu");
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // Product Handlers
  const handleCreateProduct = async () => {
    if (!productForm.title || !productForm.description || !productForm.image || productForm.image.length === 0) {
      setProductError("Lütfen tüm zorunlu alanları doldurun");
      return;
    }

    try {
      setProductError(null);
      if (editingProduct) {
        await updateProduct(productForm, editingProduct.id);
      } else {
        await createProduct(productForm);
      }
      setIsProductModalOpen(false);
      resetProductFormState();
      await loadProducts();
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Ürün kaydedilirken bir hata oluştu");
    }
  };

  const handleDeleteProducts = async () => {
    if (selectedProducts.length === 0) return;

    if (!confirm(`${selectedProducts.length} ürünü silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      setProductError(null);
      await deleteProducts(selectedProducts);
      setSelectedProducts([]);
      await loadProducts();
    } catch (err) {
      setProductError(err instanceof Error ? err.message : "Ürünler silinirken bir hata oluştu");
    }
  };

  const handleEditProduct = (product: Product) => {
    resetUploadState();
    setNewFeature("");
    setEditingProduct(product);
    setProductForm({
      title: product.title || "",
      description: product.description || "",
      image: product.image || [],
      features: product.features || [],
    });
    setIsProductModalOpen(true);
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setProductForm((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleRemoveImageUrl = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      image: prev.image?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    setProductForm((prev) => {
      const images = [...(prev.image || [])];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= images.length) {
        return prev;
      }

      [images[index], images[targetIndex]] = [images[targetIndex], images[index]];
      return { ...prev, image: images };
    });
  };

  // Inquiry Handlers
  const handleDeleteInquiries = async () => {
    if (selectedInquiries.length === 0) return;

    if (!confirm(`${selectedInquiries.length} iletişim formunu silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      setInquiryError(null);
      await deleteInquiries(selectedInquiries);
      setSelectedInquiries([]);
      await loadInquiries();
    } catch (err) {
      setInquiryError(err instanceof Error ? err.message : "İletişim formları silinirken bir hata oluştu");
    }
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleInquirySelection = (id: string) => {
    setSelectedInquiries((prev) =>
      prev.includes(id) ? prev.filter((iid) => iid !== id) : [...prev, id]
    );
  };

  const toggleAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
  };

  const toggleAllInquiries = () => {
    if (selectedInquiries.length === inquiries.length) {
      setSelectedInquiries([]);
    } else {
      setSelectedInquiries(inquiries.map((i) => i.id));
    }
  };

  const openInquiryDetail = (inquiry: Inquiry) => {
    setInquiryDetail(inquiry);
    setIsInquiryModalOpen(true);
  };

  const closeInquiryDetail = () => {
    setInquiryDetail(null);
    setIsInquiryModalOpen(false);
  };

  const totalProgress = Object.values(uploadProgress).length > 0
    ? Math.round(
        Object.values(uploadProgress).reduce((sum, p) => sum + p.progress, 0) /
        Object.values(uploadProgress).length
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Hoş geldiniz, {user?.fullName || user?.email}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: "products" as TabType, label: "Ürünler" },
            { id: "inquiries" as TabType, label: "İletişim Formları" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-[#e23e3e] text-[#e23e3e]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Ürün Yönetimi</h2>
            <button
              onClick={() => {
                resetProductFormState();
                setIsProductModalOpen(true);
              }}
              className="bg-[#e23e3e] text-white px-4 py-2 rounded-md font-medium hover:bg-[#c73535] transition-colors"
            >
              Yeni Ürün Ekle
            </button>
          </div>

          {productError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{productError}</p>
            </div>
          )}

          {selectedProducts.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex justify-between items-center">
              <span className="text-sm text-blue-800">
                {selectedProducts.length} ürün seçildi
              </span>
              <button
                onClick={handleDeleteProducts}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Seçilenleri Sil
              </button>
            </div>
          )}

          {isLoadingProducts ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <ShortLoadingScreen message="Ürünler yükleniyor..." size="md" variant="inline" />
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Henüz ürün bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === products.length && products.length > 0}
                        onChange={toggleAllProducts}
                        className="rounded border-gray-300 text-[#e23e3e] focus:ring-[#e23e3e]"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Başlık
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Açıklama
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resimler
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Özellikler
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded border-gray-300 text-[#e23e3e] focus:ring-[#e23e3e]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">{product.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{product.image?.length || 0} resim</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{product.features?.length || 0} özellik</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-[#e23e3e] hover:text-[#c73535] mr-4"
                        >
                          Düzenle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Inquiries Tab */}
      {activeTab === "inquiries" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">İletişim Formları</h2>
          </div>

          {inquiryError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{inquiryError}</p>
            </div>
          )}

          {selectedInquiries.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex justify-between items-center">
              <span className="text-sm text-blue-800">
                {selectedInquiries.length} iletişim formu seçildi
              </span>
              <button
                onClick={handleDeleteInquiries}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Seçilenleri Sil
              </button>
            </div>
          )}

          {isLoadingInquiries ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <ShortLoadingScreen message="İletişim formları yükleniyor..." size="md" variant="inline" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Henüz iletişim formu bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedInquiries.length === inquiries.length && inquiries.length > 0}
                        onChange={toggleAllInquiries}
                        className="rounded border-gray-300 text-[#e23e3e] focus:ring-[#e23e3e]"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ad Soyad
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-posta
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefon
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Konu
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mesaj
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => openInquiryDetail(inquiry)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedInquiries.includes(inquiry.id)}
                          onChange={() => toggleInquirySelection(inquiry.id)}
                          className="rounded border-gray-300 text-[#e23e3e] focus:ring-[#e23e3e]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{inquiry.fullName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{inquiry.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{inquiry.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{inquiry.subject}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">{inquiry.message}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {new Date(inquiry.createdAt).toLocaleDateString("tr-TR")}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {isInquiryModalOpen && inquiryDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">İletişim Formu Detayı</h3>
                <button
                  onClick={closeInquiryDetail}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Kapat"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Ad Soyad:</span>
                  <span>{inquiryDetail.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">E-posta:</span>
                  <span>{inquiryDetail.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Telefon:</span>
                  <span>{inquiryDetail.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Konu:</span>
                  <span>{inquiryDetail.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Tarih:</span>
                  <span>{new Date(inquiryDetail.createdAt).toLocaleString("tr-TR")}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900 block mb-1">Mesaj:</span>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-md whitespace-pre-wrap">
                    {inquiryDetail.message}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeInquiryDetail}
                  className="px-4 py-2 bg-[#e23e3e] text-white rounded-md font-medium hover:bg-[#c73535] transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
                </h3>
                <button
                  onClick={() => {
                    setIsProductModalOpen(false);
                    resetProductFormState();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={productForm.title}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e23e3e] focus:border-[#e23e3e] outline-none text-gray-900 bg-white"
                    placeholder="Ürün başlığı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama *
                  </label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e23e3e] focus:border-[#e23e3e] outline-none text-gray-900 bg-white"
                    placeholder="Ürün açıklaması"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resimler *
                  </label>
                  <div className="space-y-3">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        isDragging
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      } ${isUploading ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                      onClick={() => !isUploading && fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileInputChange}
                        className="hidden"
                        disabled={isUploading}
                      />

                      {isUploading ? (
                        <div className="relative">
                          <ShortLoadingScreen
                            message={`Yükleniyor... %${totalProgress}`}
                            size="md"
                            variant="inline"
                          />
                        </div>
                      ) : (
                        <div>
                          <svg
                            className="mx-auto h-10 w-10 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="mt-3">
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold text-blue-600">
                                Dosyaları tıklayın veya sürükleyip bırakın
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              PNG, JPG, GIF (Maksimum 10MB). Yüklenen resimler otomatik eklenir.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {imageError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-800">{imageError}</p>
                      </div>
                    )}

                    {productForm.image && productForm.image.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {productForm.image.map((url, index) => (
                          <div
                            key={`${url}-${index}`}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
                          >
                            <div className="relative bg-gray-100 flex items-center justify-center h-44">
                              <img
                                src={url}
                                alt={`Ürün resmi ${index + 1}`}
                                className="w-full h-full object-contain"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.backgroundColor = '#f3f4f6';
                                }}
                              />
                            </div>
                            <div className="p-3 bg-gray-50 flex flex-col gap-2">
                              <div className="flex items-center justify-between text-xs text-gray-600">
                                <span className="font-medium text-gray-800">Resim {index + 1}</span>
                                <span>{index + 1} / {productForm.image?.length ?? 0}</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleMoveImage(index, "up")}
                                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium border ${
                                    index === 0
                                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-[#e23e3e] hover:text-[#e23e3e]"
                                  }`}
                                >
                                  Yukarı
                                </button>
                                <button
                                  type="button"
                                  disabled={index === (productForm.image?.length ?? 0) - 1}
                                  onClick={() => handleMoveImage(index, "down")}
                                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium border ${
                                    index === (productForm.image?.length ?? 0) - 1
                                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-[#e23e3e] hover:text-[#e23e3e]"
                                  }`}
                                >
                                  Aşağı
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImageUrl(index)}
                                  className="px-3 py-2 rounded-md text-xs font-medium border bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                >
                                  Kaldır
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özellikler
                  </label>
                  <div className="space-y-2">
                    {productForm.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md">
                          {feature}
                        </span>
                        <button
                          onClick={() => handleRemoveFeature(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e23e3e] focus:border-[#e23e3e] outline-none text-gray-900 bg-white"
                        placeholder="Yeni özellik ekle"
                      />
                      <button
                        onClick={handleAddFeature}
                        className="px-4 py-2 bg-[#e23e3e] text-white rounded-md hover:bg-[#c73535] transition-colors"
                      >
                        Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsProductModalOpen(false);
                    resetProductFormState();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleCreateProduct}
                  className="px-4 py-2 bg-[#e23e3e] text-white rounded-md font-medium hover:bg-[#c73535] transition-colors"
                >
                  {editingProduct ? "Güncelle" : "Oluştur"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import {fetchProducts,addProduct,updateProduct,deleteProduct,} from '../../api/productApi';
import { fetchCategories } from '../../api/categoryApi';
import type { Product } from '../../types/Product';
import type { Category } from '../../types/Category';
import ProductTable from '../admin/components/ProductTable';
import SharedForm from './components/SharedForm';
import BackButton from '../../components/Common/BackButton';
const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    imageFile: null as File | null,
    categoryId: '',
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });

    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleEditClick = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleAdd = async () => {
    if (!token) return;
    try {
      const p = await addProduct(newProduct, token);
      setProducts((prev) => [...prev, p]);
      setNewProduct({
        name: '',
        price: 0,
        description: '',
        imageFile: null,
        categoryId: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('❌ Không thể thêm sản phẩm: ' + err.message);
        console.log(err.message)
      } else {
        alert('❌ Lỗi không xác định khi thêm sản phẩm.');
      }
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct || !token) return;
    try {
      const updated = await updateProduct(editingProduct, token);
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditingProduct(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('❌ Không thể cập nhật: ' + err.message);
      }
    }
  };
  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('❌ Không thể xóa sản phẩm: ' + err.message);
      }
    }
  };

  return (
  <>
  <BackButton/>
    <ProductTable
      products={products}
      categories={categories}
      editingProduct={editingProduct}
      onEdit={handleEditClick}
      onCancelEdit={() => setEditingProduct(null)}
      onChangeEdit={(field, value) =>
        setEditingProduct((prev) =>
          prev ? { ...prev, [field]: value } : prev
        )
      }
      onImageChange={(file) =>
        setEditingProduct((prev) =>
          prev ? { ...prev, imageFile: file } : prev
        )
      }
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
    <SharedForm
      form={newProduct}
      categories={categories}
      categoryType="Product"
      onChange={(field, value) =>
        setNewProduct((prev) => ({ ...prev, [field]: value }))
      }
      onImageChange={(file) =>
        setNewProduct((prev) => ({ ...prev, imageFile: file }))
      }
      onSubmit={handleAdd}
      submitLabel="Thêm sản phẩm"
    />
  </>
);
};
export default ProductManager;
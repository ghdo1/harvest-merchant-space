
import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { useAdminData } from '@/hooks/useAdminData';
import { AccessCheckingScreen } from '@/components/admin/AccessCheckingScreen';
import { AdminDashboardContent } from '@/components/admin/AdminDashboardContent';

const AdminDashboard = () => {
  const { user } = useAuth();
  // Remove the explicit type cast to fix the type mismatch
  const { adminAccess, isCheckingAccess } = useAdminAccess(user || null);
  const { 
    products, 
    categories, 
    users, 
    loading, 
    fetchData, 
    fetchProducts,
    fetchCategories,
    fetchUsers
  } = useAdminData();
  
  // Only fetch data when the component mounts and admin access is granted
  // This will prevent infinite loops from repeated data fetching
  React.useEffect(() => {
    if (adminAccess && products.length === 0 && categories.length === 0 && users.length === 0) {
      fetchData();
    }
  }, [adminAccess, products.length, categories.length, users.length, fetchData]);

  return (
    <MainLayout>
      {isCheckingAccess || !adminAccess ? (
        <AccessCheckingScreen />
      ) : (
        <AdminDashboardContent
          users={users}
          products={products}
          categories={categories}
          loading={loading}
          onRefreshData={fetchData}
          onRefreshProducts={fetchProducts}
          onRefreshCategories={fetchCategories}
          onRefreshUsers={fetchUsers}
        />
      )}
    </MainLayout>
  );
};

export default AdminDashboard;
